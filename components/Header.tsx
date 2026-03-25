'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Sparkles, Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/hooks/useUser';
import { useTranslations } from 'next-intl';
import { ThemePickerModal } from './theme-picker-modal';
import { LanguagePickerModal } from './language-picker-modal';
import { createClient } from '@/lib/supabase/client';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack = false, onBack, title }: HeaderProps) {
  const router = useRouter();
  const { currentTheme, setTheme } = useTheme();
  const { user } = useUser();
  const t = useTranslations('App');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [originalTheme, setOriginalTheme] = useState(currentTheme.name);
  const supabase = createClient();

  const handleOpenThemeModal = () => {
    setOriginalTheme(currentTheme.name);
    setIsThemeModalOpen(true);
  };

  const handleThemeChange = async (themeId: string) => {
    console.log('Theme change requested:', themeId);
    console.log('User ID:', user?.id);
    setTheme(themeId);
    
    // Сохраняем в базу данных
    if (user) {
      try {
        console.log('Attempting to save theme to database...');
        const { data, error } = await (supabase as any)
          .from('profiles')
          .update({ selected_theme: themeId })
          .eq('id', user.id)
          .select();
        
        if (error) {
          console.error('Error saving theme:', error);
        } else {
          console.log('Theme saved to database successfully:', data);
        }
      } catch (error) {
        console.error('Exception saving theme:', error);
      }
    } else {
      console.log('No user, cannot save theme');
    }
  };

  return (
    <>
      <header 
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: `${currentTheme.colors.background}CC`,
          borderColor: currentTheme.colors.border 
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Левая часть */}
          <div className="flex items-center gap-2">
            {showBack && (
              <button
                onClick={onBack || (() => router.back())}
                className="p-2 rounded-full hover:opacity-70 transition"
                aria-label="Назад"
              >
                <ArrowLeft className="w-5 h-5" style={{ color: currentTheme.colors.text }} />
              </button>
            )}
            
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Sparkles className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform">
                {title || t('title')}
              </span>
            </button>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {user && (
              <>
              <button
                onClick={handleOpenThemeModal}
                className="w-9 h-9 rounded-full overflow-hidden border-2 hover:scale-105 transition-all cursor-pointer relative z-20"
                style={{ borderColor: currentTheme.colors.primary }}
                aria-label="Выбрать тему"
                type="button"
              >
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.primary }}>
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                </button>
                <button
                  onClick={() => router.push('/profile')}
                  className="w-9 h-9 rounded-full overflow-hidden border-2"
                  style={{ borderColor: currentTheme.colors.primary }}
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.primary }}>
                      <span className="text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Theme Picker Modal */}
      <ThemePickerModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeName={currentTheme.name}
        onSelect={handleThemeChange}
        onCancel={() => setTheme(originalTheme)}
        currentTheme={currentTheme}
      />
      
    </>
  );
}