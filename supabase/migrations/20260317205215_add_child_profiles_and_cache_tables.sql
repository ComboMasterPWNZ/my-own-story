BEGIN;

-- Child Profiles table
CREATE TABLE IF NOT EXISTS public.child_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 2 AND age <= 10),
    avatar_url TEXT,
    gender TEXT CHECK (gender IN ('boy', 'girl')),
    hair_color TEXT CHECK (hair_color IN ('blond', 'brown', 'red', 'dark')),
    hair_length TEXT CHECK (hair_length IN ('short', 'medium', 'long')),
    eye_color TEXT CHECK (eye_color IN ('blue', 'green', 'brown', 'grey')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cached Stories (with images)
CREATE TABLE IF NOT EXISTS public.cached_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    art_style TEXT NOT NULL,
    moral_theme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cached Text Stories (without images)
CREATE TABLE IF NOT EXISTS public.cached_text_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    moral_theme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User access to cached stories
CREATE TABLE IF NOT EXISTS public.user_cached_stories (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    story_id UUID REFERENCES public.cached_stories(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id, story_id)
);

-- User access to cached text stories
CREATE TABLE IF NOT EXISTS public.user_cached_text_stories (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    story_id UUID REFERENCES public.cached_text_stories(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id, story_id)
);

-- Enable RLS
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_text_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cached_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cached_text_stories ENABLE ROW LEVEL SECURITY;

-- Policies for child_profiles
CREATE POLICY "Users can view their own children" ON public.child_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own children" ON public.child_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own children" ON public.child_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own children" ON public.child_profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for cached stories
CREATE POLICY "Authenticated users can view cached stories" ON public.cached_stories
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view cached text stories" ON public.cached_text_stories
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for user_cached_stories
CREATE POLICY "Users can view their own cached story links" ON public.user_cached_stories
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own cached text story links" ON public.user_cached_text_stories
    FOR SELECT USING (auth.uid() = user_id);

COMMIT;
