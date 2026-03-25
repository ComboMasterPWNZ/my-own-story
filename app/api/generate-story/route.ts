import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pLimit from 'p-limit';
import { Appearance } from '@/lib/types';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000;
const TIMEOUT_MS = 45000; // Increased timeout for 7 pages + images

// Административный клиент (использует service_role key, bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getParametersHash(age: number, interests: string[], moralTheme: string, artStyle: string) {
  const sortedInterests = [...interests].sort().join(',');
  const str = `${age}|${sortedInterests}|${moralTheme}|${artStyle}`;
  return crypto.createHash('md5').update(str).digest('hex');
}

function replacePlaceholder(text: string, name: string) {
  // Универсальная замена всех вариантов плейсхолдеров на имя (для простых случаев или логов)
  return text.replace(/\[ИМЯ(_[A-Z_]+)?\]/g, name);
}

export async function POST(req: Request) {
  try {
    // Обычный клиент для данных пользователя (использует anon key, подчиняется RLS)
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { child_id, interests, moral_theme, art_style, useAd } = await req.json();

    // 1. Get child profile - use regular supabase (RLS)
    const { data: child, error: childError } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('id', child_id)
      .eq('user_id', user.id)
      .single();

    if (childError || !child) {
      return NextResponse.json({ error: 'Child profile not found' }, { status: 404 });
    }

    // 2. Get user profile - use regular supabase (RLS)
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier, ad_generations_remaining, free_generations_used, story_language')
      .eq('id', user.id)
      .single();

    const isPremium = profile?.subscription_tier === 'premium';
    const adRemaining = profile?.ad_generations_remaining || 0;
    const freeUsed = profile?.free_generations_used || 0;
    const storyLanguage = profile?.story_language || 'ru';

    // 3. Hash parameters
    const paramsHash = getParametersHash(child.age, interests, moral_theme, art_style);

    // 4. Logic branching
    let finalStory: any = null;
    let isNewGeneration = false;
    let cacheTable: 'cached_stories' | 'cached_text_stories' = 'cached_text_stories';

    if (isPremium) {
      // Premium: Always generate new with images
      finalStory = await generateNewStory(child, interests, moral_theme, art_style, true, storyLanguage);
      isNewGeneration = true;
      cacheTable = 'cached_stories';
    } else if (useAd) {
      // Free with Ad: Try cache with images, then generate new with images
      if (adRemaining <= 0) {
        return NextResponse.json({ error: 'Лимит генераций за рекламу исчерпан' }, { status: 403 });
      }

      // Try to find in cache (with images) - use supabaseAdmin
      const { data: cached } = await supabaseAdmin
        .from('cached_stories')
        .select('*')
        .eq('parameters_hash', paramsHash)
        .order('usage_count', { ascending: false });

      // Filter out stories already seen by this user - use supabaseAdmin
      const { data: seen } = await supabaseAdmin
        .from('user_cached_stories')
        .select('story_id')
        .eq('user_id', user.id);
      
      const seenIds = seen?.map(s => s.story_id) || [];
      const available = cached?.filter(c => !seenIds.includes(c.id)) || [];

      if (available.length > 0) {
        const selected = available[0];
        // Update usage - use supabaseAdmin
        await supabaseAdmin.from('cached_stories').update({
          usage_count: (selected.usage_count || 0) + 1,
          last_accessed: new Date().toISOString()
        }).eq('id', selected.id);

        // Link to user - use supabaseAdmin
        await supabaseAdmin.from('user_cached_stories').insert({
          user_id: user.id,
          story_id: selected.id
        });

        // Decrement ad counter - use regular supabase (RLS)
        await supabase.from('profiles').update({
          ad_generations_remaining: adRemaining - 1
        }).eq('id', user.id);

        finalStory = {
          title: selected.title,
          pages: (selected.content as any[]).map(p => ({
            ...p,
            text: p.text
          }))
        };
      } else {
        // Generate new with images
        finalStory = await generateNewStory(child, interests, moral_theme, art_style, true, storyLanguage);
        isNewGeneration = true;
        cacheTable = 'cached_stories';
        
        // Decrement ad counter - use regular supabase (RLS)
        await supabase.from('profiles').update({
          ad_generations_remaining: adRemaining - 1
        }).eq('id', user.id);
      }
    } else {
      // Free without Ad: Try cache text-only, then generate new text-only
      if (freeUsed >= 3) {
        return NextResponse.json({ error: 'Лимит бесплатных сказок исчерпан' }, { status: 403 });
      }

      // Try to find in cache (text-only) - use supabaseAdmin
      const { data: cached } = await supabaseAdmin
        .from('cached_text_stories')
        .select('*')
        .eq('parameters_hash', paramsHash)
        .order('usage_count', { ascending: false });

      // Filter out stories already seen by this user - use supabaseAdmin
      const { data: seen } = await supabaseAdmin
        .from('user_cached_text_stories')
        .select('story_id')
        .eq('user_id', user.id);
      
      const seenIds = seen?.map(s => s.story_id) || [];
      const available = cached?.filter(c => !seenIds.includes(c.id)) || [];

      if (available.length > 0) {
        const selected = available[0];
        // Update usage - use supabaseAdmin
        await supabaseAdmin.from('cached_text_stories').update({
          usage_count: (selected.usage_count || 0) + 1,
          last_accessed: new Date().toISOString()
        }).eq('id', selected.id);

        // Link to user - use supabaseAdmin
        await supabaseAdmin.from('user_cached_text_stories').insert({
          user_id: user.id,
          story_id: selected.id
        });

        // Increment free counter - use regular supabase (RLS)
        await supabase.from('profiles').update({
          free_generations_used: freeUsed + 1
        }).eq('id', user.id);

        finalStory = {
          title: selected.title,
          pages: (selected.content as any[]).map(p => ({
            ...p,
            text: p.text
          }))
        };
      } else {
        finalStory = await generateNewStory(child, interests, moral_theme, art_style, false, storyLanguage);
        isNewGeneration = true;
        cacheTable = 'cached_text_stories';

        // Increment free counter - use regular supabase (RLS)
        await supabase.from('profiles').update({
          free_generations_used: freeUsed + 1
        }).eq('id', user.id);
      }
    }

    // 5. Save to cache if new
    if (isNewGeneration && finalStory) {
      console.log(`[GenerateStory] Attempting to save to cache table: ${cacheTable}`);
      
      // Check limit of 10 for this hash - use supabaseAdmin
      const { data: existing } = await supabaseAdmin
        .from(cacheTable)
        .select('id, last_accessed')
        .eq('parameters_hash', paramsHash)
        .order('last_accessed', { ascending: true });

      if (existing && existing.length >= 10) {
        console.log(`[GenerateStory] Cache limit reached for hash ${paramsHash}, deleting oldest entry`);
        await supabaseAdmin.from(cacheTable).delete().eq('id', existing[0].id);
      }

      // Подготовка данных для вставки
      const insertData: any = {
        title: finalStory.title,
        content: finalStory.pages, // уже с плейсхолдерами
        parameters_hash: paramsHash,
        child_age: child.age,
        interests: interests,
        moral_theme: moral_theme,
        art_style: art_style,
        usage_count: 0,
        created_at: new Date().toISOString(),
        last_accessed: new Date().toISOString()
      };

      console.log(`[GenerateStory] Inserting into ${cacheTable}...`);
      const { data: cachedEntry, error: cacheError } = await supabaseAdmin
        .from(cacheTable)
        .insert(insertData)
        .select()
        .single();

      if (cacheError) {
        console.error(`[GenerateStory] Failed to save to cache (${cacheTable}):`, cacheError);
      } else {
        console.log(`[GenerateStory] Successfully saved to cache (${cacheTable}), ID: ${cachedEntry?.id}`);
        
        if (!isPremium) {
          // Если пользователь бесплатный, добавляем связь - use supabaseAdmin
          const userCacheTable = cacheTable === 'cached_stories' ? 'user_cached_stories' : 'user_cached_text_stories';
          console.log(`[GenerateStory] Linking user to cached story in ${userCacheTable}`);

          const { error: linkError } = await supabaseAdmin.from(userCacheTable).insert({
            user_id: user.id,
            story_id: cachedEntry.id
          });
          
          if (linkError) {
            console.error(`[GenerateStory] Failed to link user to cache:`, linkError);
          }
        }
      }
    }

    // 6. Save to user's stories table - use regular supabase (RLS)
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .insert({
        user_id: user.id,
        child_id: child.id,
        title: finalStory.title,
        child_name: child.name,
        child_age: child.age,
        interests,
        moral_theme,
        art_style,
        cover_image_url: finalStory.pages[0].image_url,
        content: finalStory.pages,
      })
      .select()
      .single();

    if (storyError) throw storyError;

    return NextResponse.json({ storyId: story.id });

  } catch (error: any) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function generateNewStory(child: any, interests: string[], moralTheme: string, artStyle: string, withImages: boolean, language: string = 'ru') {
  const appearance = (child.appearance as unknown as Appearance) || {};
  const genderLabel = appearance.gender === 'girl' ? 'девочка' : 'мальчик';

  const systemPrompt = language === 'ru' 
    ? `Ты — детский писатель, идеально владеющий русским языком. Твои сказки всегда соответствуют строгим правилам:

    Главный герой — человек (ребёнок). Несмотря на интересы, главным героем всегда является ребёнок с указанным именем. Мир вокруг может быть полон динозавров, принцесс или машин, но главный герой — человек.

    Грамматический род и пол. Пол ребёнка: ${genderLabel}. Используй его для определения рода глаголов, прилагательных и местоимений. Интересы не влияют на род.

    Для имени главного героя используй ТОЛЬКО следующие плейсхолдеры (строго по списку):

    [ИМЯ_КТО] — именительный падеж (кто?)

    [ИМЯ_КОГО] — родительный падеж (кого?)

    [ИМЯ_КОМУ] — дательный падеж (кому?)

    [ИМЯ_КОГО_ВИН] — винительный падеж (кого?) — например, "встретил [ИМЯ_КОГО_ВИН]"

    [ИМЯ_КЕМ] — творительный падеж (кем?)

    [ИМЯ_О_КОМ] — предложный падеж (о ком?)

    НИКАКИХ других плейсхолдеров не использовать. Всегда применяй их в зависимости от падежа.

    Имена второстепенных персонажей (животные, предметы, волшебные существа) должны быть придуманы тобой. Например: ёжик Колючка, дракон Огонёк, фея Искорка. Никогда не используй имя главного героя для других персонажей.

    Сюжет: сказка должна быть доброй, поучительной и соответствовать заданной теме. Состоять из 7 страниц.

    СТИЛИСТИКА И ПОВТОРЫ: ВНИМАНИЕ! Избегай повторения имени в одном предложении. Если имя уже использовано в начале предложения, в продолжении используй местоимения (он, она, ему, у него, с ним и т.д.) или перестрой предложение. Например, не пиши: «[ИМЯ_КТО] подумал, и [ИМЯ_КТО] решил...». Правильно: «[ИМЯ_КТО] подумал, и он решил...» или «[ИМЯ_КТО] подумал и решил...».

    Всегда отвечай строго в JSON формате.`
    : `You are a children's storyteller, perfectly fluent in English. Your fairy tales always follow strict rules:

    The main character is a human (child). Despite the interests, the main character is always a child with the specified name. The world around can be full of dinosaurs, princesses or cars, but the main character is a human.

    Gender. Child's gender: ${genderLabel}. Use it to determine verb forms, adjectives and pronouns. Interests do not affect gender.

    For the main character's name, use ONLY the following placeholders (strictly by list):

    [ИМЯ_КТО] — subject (who?)

    [ИМЯ_КОГО] — possessive (whose?)

    [ИМЯ_КОМУ] — indirect object (to whom?)

    [ИМЯ_КОГО_ВИН] — direct object (whom?) — for example, "met [ИМЯ_КОГО_ВИН]"

    [ИМЯ_КЕМ] — instrumental (by whom?)

    [ИМЯ_О_КОМ] — prepositional (about whom?)

    NO other placeholders should be used. Always apply them depending on the case.

    Names of secondary characters (animals, objects, magical creatures) should be invented by you. For example: hedgehog Pointy, dragon Sparkle, fairy Glitter. Never use the main character's name for other characters.

    Plot: the fairy tale should be kind, instructive and correspond to the given theme. It should consist of 7 pages.

    STYLE AND REPETITIONS: ATTENTION! Avoid repeating the name in one sentence. If the name is already used at the beginning of the sentence, use pronouns (he, she, him, her, etc.) or restructure the sentence. For example, do not write: «[ИМЯ_КТО] thought, and [ИМЯ_КТО] decided...». Correct: «[ИМЯ_КТО] thought, and he decided...» or «[ИМЯ_КТО] thought and decided...».

    Always respond strictly in JSON format.`

  const userPrompt = language === 'ru'
    ? `Создай сказку для ребенка ${child.age} лет.
    Интересы: ${interests.join(', ')}.
    Моральная тема: ${moralTheme}.
    Сказка должна состоять ровно из 7 страниц.
    Каждая страница должна содержать 2-4 предложения текста.
    Формат ответа — JSON-объект с полями "title" (название) и "pages" (массив из 7 объектов).
    Каждый элемент в "pages" должен иметь:
    - "text": текст на русском языке с использованием плейсхолдеров падежей.
    - "image_prompt": детальное описание сцены на английском языке для генератора изображений в стиле ${artStyle}.`
    : `Create a fairy tale for a child ${child.age} years old.
    Interests: ${interests.join(', ')}.
    Moral theme: ${moralTheme}.
    The fairy tale should consist of exactly 7 pages.
    Each page should contain 2-4 sentences of text.
    Response format — JSON object with fields "title" (name) and "pages" (array of 7 objects).
    Each element in "pages" should have:
    - "text": text in English using placeholders for names.
    - "image_prompt": detailed scene description in English for the image generator in ${artStyle} style.`

  let storyData: any = null;
  let attempts = 0;

  while (attempts < 2) {
    attempts++;
    // Call DeepSeek
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      }),
    });

    if (!deepseekResponse.ok) throw new Error('DeepSeek API error');
    const dsData = await deepseekResponse.json();
    storyData = JSON.parse(dsData.choices[0].message.content);

    // Validation: Ensure exactly 7 pages
    if (storyData.pages && Array.isArray(storyData.pages) && storyData.pages.length === 7) {
      break;
    }
    
    console.warn(`Attempt ${attempts}: DeepSeek generated ${storyData.pages?.length || 0} pages instead of 7. Retrying...`);
  }

  // Fallback if still not 7 pages
  if (!storyData.pages || !Array.isArray(storyData.pages) || storyData.pages.length < 7) {
    const currentPages = Array.isArray(storyData.pages) ? storyData.pages : [];
    while (currentPages.length < 7) {
      currentPages.push({
        text: "И жили они долго и счастливо! [ИМЯ] всегда будет помнить это приключение.",
        image_prompt: `A happy ending scene, children's book illustration, style: ${artStyle}`
      });
    }
    storyData.pages = currentPages.slice(0, 7);
  }

  const genderStr = appearance.gender === 'boy' ? 'boy' : (appearance.gender === 'girl' ? 'girl' : 'child');
  
  const descParts = [];
  if (appearance.hair_color) descParts.push(`${appearance.hair_color} hair`);
  if (appearance.hair_length) descParts.push(`${appearance.hair_length} length`);
  if (appearance.eye_color) descParts.push(`${appearance.eye_color} eyes`);
  
  const appearanceDesc = descParts.length > 0 ? `, with ${descParts.join(', ')}` : '';
  const appearanceStr = `A ${genderStr} named ${child.name}, ${child.age} years old${appearanceDesc}`;

  // 1. Correctly configured pLimit for CogView-4 (concurrency limit = 5)
  const limit = pLimit(5);

  // 2. Helper for Z.ai API with retries and exponential backoff
  const fetchZhipuWithRetry = async (prompt: string, retries = 5) => {
    let currentBackoff = 2000; // Start with 2 seconds

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch('https://api.z.ai/api/paas/v4/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
          },
          body: JSON.stringify({
            model: "cogview-4-250304",
            prompt: `Children's book illustration in style: ${artStyle}. Scene: ${prompt}. Character: ${appearanceStr}. Vibrant, kind, magical atmosphere.`,
            size: "1024x1024"
          }),
        });

        if (response.ok) {
          const zData = await response.json();
          // 3. Delay after successful request to reduce load
          await sleep(300);
          return zData.data[0].url;
        }

        // Handle Rate Limit (429)
        if (response.status === 429) {
          if (i < retries - 1) {
            const jitter = Math.random() * 500;
            console.warn(`[Z.ai] Rate limit reached (429). Retrying in ${Math.round(currentBackoff + jitter)}ms... (Attempt ${i + 1}/${retries})`);
            await sleep(currentBackoff + jitter);
            currentBackoff *= 2; // Exponential backoff: 2s, 4s, 8s...
            continue;
          }
        }

        const errorData = await response.text();
        console.error(`[Z.ai] API error (Status ${response.status}):`, errorData);
        break; // Non-retryable error or last attempt
      } catch (e) {
        console.error(`[Z.ai] Fetch attempt ${i + 1} failed:`, e);
        if (i < retries - 1) {
          const jitter = Math.random() * 500;
          await sleep(currentBackoff + jitter);
          currentBackoff *= 2;
          continue;
        }
      }
    }
    return null;
  };

  // Generate images if requested
  const pagesWithImages = await Promise.all(storyData.pages.map(async (page: any) => {
    // Use the limiter to wrap the image generation logic. 
    // Promise.all starts all iterations, but pLimit(5) ensures only 5 run at once.
    return limit(async () => {
      let imageUrl = null;
      if (withImages) {
        try {
          const cleanImagePrompt = replacePlaceholder(page.image_prompt, child.name);
          imageUrl = await fetchZhipuWithRetry(cleanImagePrompt);
        } catch (e) {
          console.error('Image generation failed for page', e);
        }
      }
      return {
        text: page.text,
        image_url: imageUrl
      };
    });
  }));

  return {
    title: storyData.title,
    pages: pagesWithImages
  };
}
