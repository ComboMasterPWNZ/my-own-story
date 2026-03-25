'use client';

import { useState, useEffect, use } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/useUser';
import { useTheme } from '@/context/ThemeContext';
import { HomeScreen } from '@/components/home-screen';
import { AuthScreen } from '@/components/auth-screen';
import { CreateStoryScreen } from '@/components/create-story-screen';
import { ProfileScreen } from '@/components/profile-screen';
import { StoryReaderScreen } from '@/components/story-reader-screen';
import { LoadingScreen } from '@/components/loading-screen';
import { Header } from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('App');
  const navT = useTranslations('Profile');
  const { user, isLoading: authLoading } = useUser();
  const { currentTheme } = useTheme();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'create' | 'profile' | 'reader'>('home');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        if (!authLoading) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user, authLoading, supabase]);

  const handleNavigate = (screen: 'home' | 'create' | 'profile' | 'reader') => {
    setCurrentScreen(screen);
    if (screen !== 'reader') setSelectedStoryId(null);
  };

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setCurrentScreen('reader');
  };

  const isAppLoading = authLoading || loading;

  return (
    <>
      <AnimatePresence mode="wait">
        {isAppLoading && (
          <LoadingScreen key="loading-screen" />
        )}
      </AnimatePresence>

      {!isAppLoading && !user && (
        <AuthScreen />
      )}

      {!isAppLoading && user && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen transition-colors duration-500 pb-24"
          style={{ 
            backgroundColor: currentTheme.colors.background,
            color: currentTheme.colors.text,
            backgroundImage: currentTheme.pattern || 'none'
          }}
        >
          <Header 
            showBack={currentScreen !== 'home'}
            onBack={() => {
              if (currentScreen === 'reader') {
                setCurrentScreen('home');
              } else {
                handleNavigate('home');
              }
            }}
          />
          
          <main className="container mx-auto px-4 py-6">
            {currentScreen === 'home' && (
              <HomeScreen 
                profile={profile} 
                currentTheme={currentTheme}
                onNavigate={handleNavigate}
                onSelectStory={handleSelectStory}
                onUpdateProfile={setProfile}
              />
            )}

            {currentScreen === 'create' && (
              <CreateStoryScreen 
                profile={profile}
                currentTheme={currentTheme}
                onBack={() => handleNavigate('home')}
                onComplete={handleSelectStory}
                onStartLoading={() => setLoading(true)}
              />
            )}

            {currentScreen === 'profile' && (
              <ProfileScreen 
                profile={profile}
                currentTheme={currentTheme}
                onBack={() => handleNavigate('home')}
                onUpdateProfile={setProfile}
              />
            )}

            {currentScreen === 'reader' && selectedStoryId && (
              <StoryReaderScreen 
                storyId={selectedStoryId}
                currentTheme={currentTheme}
                onBack={() => handleNavigate('home')}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          {currentScreen !== 'reader' && (
            <nav className="fixed bottom-6 left-6 right-6 z-50">
              <div className="max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-2 flex items-center gap-2 shadow-2xl">
                <button 
                  onClick={() => handleNavigate('home')}
                  className={`flex-1 py-3 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${currentScreen === 'home' ? 'shadow-lg' : 'opacity-60'}`}
                  style={currentScreen === 'home' ? { 
                    backgroundColor: currentTheme.colors.primary, 
                    color: currentTheme.isDark ? '#000' : '#fff' 
                  } : { color: currentTheme.colors.text }}
                >
                  <span className="text-xl">🏠</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{navT('stories')}</span>
                </button>
                
                <button 
                  onClick={() => handleNavigate('create')}
                  className={`flex-1 py-3 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${currentScreen === 'create' ? 'shadow-lg' : 'opacity-60'}`}
                  style={currentScreen === 'create' ? { 
                    backgroundColor: currentTheme.colors.primary, 
                    color: currentTheme.isDark ? '#000' : '#fff' 
                  } : { color: currentTheme.colors.text }}
                >
                  <span className="text-xl">✨</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{t('title')}</span>
                </button>

                <button 
                  onClick={() => handleNavigate('profile')}
                  className={`flex-1 py-3 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${currentScreen === 'profile' ? 'shadow-lg' : 'opacity-60'}`}
                  style={currentScreen === 'profile' ? { 
                    backgroundColor: currentTheme.colors.primary, 
                    color: currentTheme.isDark ? '#000' : '#fff' 
                  } : { color: currentTheme.colors.text }}
                >
                  <span className="text-xl">👤</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{navT('myChildren')}</span>
                </button>
              </div>
            </nav>
          )}
        </motion.div>
      )}
    </>
  );
}
