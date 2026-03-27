'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { useNameDeclension } from '@/hooks/useNameDeclension';
import { ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, BookOpen, Sparkles, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImagePlaceholder } from './image-placeholder';
import { PuzzleGame } from './games/puzzle-game';
import { MemoryGame } from './games/memory-game';
import { ColoringGame } from './games/coloring-game';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChildProfile, Appearance } from '@/lib/types';
import { useUITheme } from '@/context/UIThemeContext';

interface StoryReaderScreenProps {
  storyId: string;
  onBack: () => void;
}

export function StoryReaderScreen({ storyId, onBack }: StoryReaderScreenProps) {
  const [story, setStory] = useState<Record<string, any> | null>(null);
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [activeGame, setActiveGame] = useState<'puzzle' | 'memory' | 'coloring' | null>(null);
  const { isPremium } = useProfile();
  const { declineName } = useNameDeclension();
  const supabase = createClient();
  const t = useTranslations('Story');
  const { currentUITheme, colorMode } = useUITheme();
  const colors = currentUITheme.colors[colorMode];

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*, child_profiles(*)')
        .eq('id', storyId)
        .single();
      
      if (data) {
        setStory(data as Record<string, any>);
        setChild((data as any).child_profiles as ChildProfile);
      }
      setLoading(false);
    };

    fetchStory();
  }, [storyId]);

  useEffect(() => {
    setImageLoading(true);
  }, [currentPage]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)] gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <BookOpen className="w-12 h-12 text-[var(--color-primary)]" />
      </motion.div>
      <p className="text-[var(--color-text)] font-bold animate-pulse">Opening the book...</p>
    </div>
  );
  if (!story) return <div className="p-8 text-center">Story not found</div>;

  const appearance = child?.appearance as Appearance | null | undefined;
  const gender = appearance?.gender === 'girl' ? 'female' : 'male';

  const replacePlaceholders = (text: string) => {
    if (!text || !child) return text;
    return text
      .replace(/\[ИМЯ_КТО\]/g, child.name)
      .replace(/\[ИМЯ_КОГО\]/g, declineName(child.name, gender, 'genitive'))
      .replace(/\[ИМЯ_КОМУ\]/g, declineName(child.name, gender, 'dative'))
      .replace(/\[ИМЯ_КОГО_ВИН\]/g, declineName(child.name, gender, 'accusative'))
      .replace(/\[ИМЯ_КЕМ\]/g, declineName(child.name, gender, 'instrumental'))
      .replace(/\[ИМЯ_О_КОМ\]/g, declineName(child.name, gender, 'prepositional'))
      .replace(/\[ИМЯ\]/g, child.name);
  };

  const rawPages = Array.isArray(story.content) ? story.content : [];
  const pages = rawPages.map((page: any) => ({
    ...page,
    text: replacePlaceholders(page.text)
  }));

  const totalPages = pages.length + 1; // Add 1 for the Magic Games page
  const isLastPage = currentPage === pages.length;
  const currentPageData = !isLastPage ? pages[currentPage] : null;
  const hasImage = !!currentPageData?.image_url;

  // Собираем все картинки из сказки для игр
  const storyImages = pages
    .map((p: any) => p.image_url)
    .filter(Boolean);
  
  // Если картинок в тексте нет, используем обложку
  const gameImages = storyImages.length > 0 ? storyImages : [story.cover_image_url].filter(Boolean);

  const toggleFavorite = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newValue = !story.is_favorite;
    setStory({ ...story, is_favorite: newValue });
    await (supabase as any)
      .from('stories')
      .update({ is_favorite: newValue })
      .eq('id', storyId);
  };

  if (activeGame) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] safe-top">
        {activeGame === 'puzzle' && <PuzzleGame images={gameImages} onBack={() => setActiveGame(null)} />}
        {activeGame === 'memory' && <MemoryGame images={gameImages} onBack={() => setActiveGame(null)} />}
        {activeGame === 'coloring' && <ColoringGame images={gameImages} onBack={() => setActiveGame(null)} />}
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col min-h-screen relative overflow-hidden" 
      style={{ 
        background: `linear-gradient(to bottom, ${colors.background}, ${colors.card})` 
      }}
    >
      {/* Decorative Background Elements */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none" 
        style={{ backgroundColor: colors.primary }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none" 
        style={{ backgroundColor: colors.secondary }}
      />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col h-full"
          >
            {!isLastPage ? (
              <>
                {/* Illustration Section (Max 40% height) */}
                <div className="h-[40vh] min-h-[300px] relative shrink-0 p-6">
                  <div 
                    className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative border-4"
                    style={{ borderColor: `${colors.primary}20` }}
                  >
                    {hasImage ? (
                      isPremium ? (
                        <>
                          {imageLoading && <Skeleton className="absolute inset-0 z-10" />}
                          <Image 
                            src={currentPageData.image_url} 
                            alt={`Page ${currentPage + 1}`}
                            fill
                            className={cn(
                              "object-cover transition-transform duration-1000 hover:scale-105",
                              imageLoading ? "opacity-0" : "opacity-100"
                            )}
                            onLoadingComplete={() => setImageLoading(false)}
                          />
                        </>
                      ) : (
                        <ImagePlaceholder variant="premium" currentTheme={currentUITheme} />
                      )
                    ) : (
                      <ImagePlaceholder variant="missing" currentTheme={currentUITheme} />
                    )}
                    
                    {/* Gradient Overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Text Content Section */}
                <div className="flex-1 px-8 py-4 flex flex-col items-center text-center overflow-y-auto custom-scrollbar">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl w-full"
                  >
                    <p 
                      className="text-2xl sm:text-3xl leading-[1.7] font-medium tracking-tight"
                      style={{ color: colors.text.primary }}
                    >
                      {currentPageData?.text || "Loading text..."}
                    </p>
                  </motion.div>
                </div>
              </>
            ) : (
              /* Magic Games Page */
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl"
                  style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
                >
                  <Gamepad2 className="w-12 h-12" />
                </motion.div>
                
                <h2 className="text-4xl font-black mb-4" style={{ color: colors.text.primary }}>{t('playTime')}</h2>
                <p className="opacity-60 font-bold mb-12 max-w-[280px]" style={{ color: colors.text.secondary }}>{t('playTimeSub')}</p>

                <div className="grid grid-cols-1 gap-4 w-full max-w-[320px]">
                    {[
                      { id: 'puzzle', icon: '🧩', label: t('puzzle'), sub: t('puzzleSub'), color: 'indigo' },
                      { id: 'memory', icon: '🎴', label: t('memory'), sub: t('memorySub'), color: 'purple' },
                      { id: 'coloring', icon: '🎨', label: t('coloring'), sub: t('coloringSub'), color: 'pink' }
                    ].map((game) => (
                    <motion.button 
                      key={game.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveGame(game.id as any)}
                      className="flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all shadow-lg"
                      style={{ 
                        backgroundColor: colors.card,
                        borderColor: `${colors.primary}20`
                      }}
                    >
                      <span className="text-4xl">{game.icon}</span>
                      <div className="text-left">
                        <p className="font-black text-lg" style={{ color: colors.text.primary }}>{game.label}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: colors.text.secondary }}>{game.sub}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation & Actions Footer */}
      <footer className="px-8 pb-10 pt-4 flex flex-col gap-8 relative z-20">
        {/* Page Indicator & Navigation */}
        <div className="flex items-center justify-between">
          <motion.button 
            disabled={currentPage === 0}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(p => p - 1)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-2 disabled:opacity-20 transition-all"
            style={{ 
              backgroundColor: colors.card,
              borderColor: `${colors.primary}40`,
              color: colors.primary
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          <div className="flex flex-col items-center gap-2">
            <div 
              className="px-6 py-2 rounded-full border-2 backdrop-blur-md shadow-lg"
              style={{ 
                backgroundColor: `${colors.card}80`,
                borderColor: `${colors.primary}20`
              }}
            >
              <span className="font-black text-lg tracking-widest" style={{ color: colors.text.primary }}>
                {t('pages', { current: currentPage + 1, total: totalPages })}
              </span>
            </div>
          </div>

          <motion.button 
            disabled={currentPage === totalPages - 1}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-2 disabled:opacity-20 transition-all"
            style={{ 
              backgroundColor: colors.card,
              borderColor: `${colors.primary}40`,
              color: colors.primary
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={toggleFavorite}
            className={cn(
              "flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg border-2 transition-all font-black text-sm uppercase tracking-widest",
              story.is_favorite 
                ? "bg-red-500 border-red-400 text-white" 
                : "bg-white/10 border-white/10 text-white/60"
            )}
          >
            <Heart className={cn("w-5 h-5", story.is_favorite && "fill-current")} />
            {story.is_favorite ? t('inFavorites') : t('favorite')}
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.8 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-all"
            style={{ 
              backgroundColor: `${colors.card}80`,
              borderColor: `${colors.primary}20`,
              color: colors.text.primary
            }}
          >
            <Share2 className="w-6 h-6" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
