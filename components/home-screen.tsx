'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Heart, User, BookOpen, Search, Palette, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeConfig } from '@/lib/themes';
import { ImagePlaceholder } from './image-placeholder';
import { ThemedButton } from './ui/themed-button';
import { ThemedCard } from './ui/themed-card';
import { Skeleton } from './ui/skeleton';
import { EmptyState } from './empty-state';
import { MagicBookButton } from './ui/magic-book-button';
import { useTranslations } from 'next-intl';

interface HomeScreenProps {
  profile: any;
  currentTheme: ThemeConfig;
  onNavigate: (screen: 'home' | 'create' | 'profile') => void;
  onSelectStory: (id: string) => void;
  onUpdateProfile: (updated: any) => void;
}

export function HomeScreen({ profile, currentTheme, onNavigate, onSelectStory, onUpdateProfile }: HomeScreenProps) {
  const t = useTranslations('Home');
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const supabase = createClient();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, { 
      day: 'numeric', 
      month: 'short' 
    }).format(date);
  };

  const formatTitle = (title: string, childName: string) => {
    if (!title) return '';
    return title.replace(/\[ИМЯ_КТО\]/g, childName || 'Малыш');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;
      setLoading(true);
      
      const { data: storiesData, error } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });
      
      setStories(storiesData || []);
      setLoading(false);
    };

    fetchData();
  }, [profile?.id]);

  const filteredStories = activeTab === 'all' 
    ? stories 
    : stories.filter(s => s.is_favorite);

  const toggleFavorite = async (e: React.MouseEvent, storyId: string, isFavorite: boolean) => {
    e.stopPropagation();
    const newStories = stories.map(s => s.id === storyId ? { ...s, is_favorite: !isFavorite } : s);
    setStories(newStories);
    await supabase.from('stories').update({ is_favorite: !isFavorite } as any).eq('id', storyId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 pb-24 relative z-10">
        {/* Guide Character (Mascot) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-24 right-4 z-50 group pointer-events-none sm:pointer-events-auto"
        >
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-white rounded-2xl shadow-2xl border-2 border-indigo-100 flex items-center justify-center text-3xl cursor-help pointer-events-auto"
            >
              🦉
            </motion.div>
            <div className="absolute bottom-full right-0 mb-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-indigo-50 text-xs font-bold text-slate-600 relative">
                {t('mascotGreeting')}
                <div className="absolute top-full right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-indigo-50 rotate-45 -translate-y-1.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Create Button */}
        <MagicBookButton 
          onClick={() => onNavigate('create')}
          currentTheme={currentTheme}
          profile={profile}
          className="mb-10"
        />

        {/* Tabs */}
        <div 
          className="flex gap-3 mb-8 p-2 rounded-[2.5rem] backdrop-blur-md border border-white/10"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
            <button 
              onClick={() => setActiveTab('all')}
              className={cn(
                "flex-1 py-4 rounded-[2rem] text-sm font-black transition-all duration-300",
                activeTab === 'all' 
                  ? "bg-white text-black shadow-xl scale-[1.02]" 
                  : "text-white/40 hover:text-white/60"
              )}
              style={activeTab === 'all' ? { 
                backgroundColor: currentTheme.colors.primary, 
                color: currentTheme.isDark ? '#000' : '#fff' 
              } : {}}
            >
              {t('allStories')}
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={cn(
                "flex-1 py-4 rounded-[2rem] text-sm font-black transition-all duration-300",
                activeTab === 'favorites' 
                  ? "bg-white text-black shadow-xl scale-[1.02]" 
                  : "text-white/40 hover:text-white/60"
              )}
              style={activeTab === 'favorites' ? { 
                backgroundColor: currentTheme.colors.primary, 
                color: currentTheme.isDark ? '#000' : '#fff' 
              } : {}}
            >
              {t('favorites')}
            </button>
        </div>

        {/* Stories Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[1, 2, 3, 4].map((i) => (
                <ThemedCard key={i} theme={currentTheme} className="p-0 overflow-hidden border-none shadow-lg">
                  <Skeleton className="aspect-[16/10] w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </ThemedCard>
              ))}
            </motion.div>
          ) : filteredStories.length > 0 ? (
            <motion.div 
              key={`${activeTab}-${filteredStories.length}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {filteredStories.map((story) => {
                const isPremium = profile?.subscription_tier === 'premium';
                const hasImage = !!story.cover_image_url;

                return (
                  <motion.div 
                    key={story.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectStory(story.id)}
                    className="cursor-pointer"
                  >
                    <ThemedCard 
                      theme={currentTheme}
                      className="p-0 overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm h-full flex flex-col"
                    >
                      <div className="aspect-[16/10] relative overflow-hidden shrink-0">
                        {hasImage && isPremium ? (
                          <img 
                            src={story.cover_image_url} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black/20">
                            <div className="flex flex-col items-center gap-2 opacity-40">
                              <BookOpen className="w-12 h-12" />
                              {!isPremium && hasImage && <span className="text-[10px] font-bold uppercase tracking-widest">{t('premium')}</span>}
                            </div>
                          </div>
                        )}
                        
                        {/* Favorite Button with Bubble Animation */}
                        <div className="absolute top-3 right-3 z-10">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => toggleFavorite(e, story.id, story.is_favorite)}
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-colors",
                              story.is_favorite 
                                ? "bg-red-500 text-white" 
                                : "bg-white/80 text-slate-400 hover:text-red-400"
                            )}
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={story.is_favorite ? 'active' : 'inactive'}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              >
                                <Heart className={cn("w-5 h-5", story.is_favorite && "fill-current")} />
                              </motion.div>
                            </AnimatePresence>
                            
                            {/* Bubble effect on click */}
                            {story.is_favorite && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                className="absolute inset-0 bg-red-400 rounded-full pointer-events-none"
                              />
                            )}
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-xl font-black leading-tight mb-2 line-clamp-2 min-h-[3.5rem]">
                          {formatTitle(story.title, story.child_name)}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">
                              👤
                            </div>
                            <span className="text-xs font-bold opacity-60">{story.child_name}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-40">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[10px] font-bold">{formatDate(story.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </ThemedCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <EmptyState 
              variant={activeTab} 
              currentTheme={currentTheme} 
              onCreateClick={() => onNavigate('create')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
