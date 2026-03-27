'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Sparkles, Paintbrush } from 'lucide-react';
import { useUITheme } from '@/context/UIThemeContext';
import { useUser } from '@/hooks/useUser';
import { useTranslations } from 'next-intl';
import { LanguagePickerModal } from './language-picker-modal';
import { UIThemeModal } from './ui-theme-modal';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack = false, onBack, title }: HeaderProps) {
  const router = useRouter();
  const { currentTheme, currentThemeId, colorMode, setTheme } = useUITheme();
  const { user } = useUser();
  const t = useTranslations('App');
  const [isUIThemeModalOpen, setIsUIThemeModalOpen] = useState(false);

  const colors = currentTheme.colors[colorMode] || currentTheme.colors.light;
  
  return (
    <>
      <header 
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: `${colors.card}CC`,
          borderColor: colors.border.light 
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
                <ArrowLeft className="w-5 h-5" style={{ color: colors.text.primary }} />
              </button>
            )}
            
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Sparkles className="w-6 h-6" style={{ color: colors.primary }} />
              <span className="text-xl font-bold bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                {title || t('title')}
              </span>
            </button>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {user && (
              <>
                <button
                  onClick={() => setIsUIThemeModalOpen(true)}
                  className="w-9 h-9 rounded-full overflow-hidden border-2 hover:scale-105 transition-all cursor-pointer relative z-20"
                  style={{ borderColor: colors.primary }}
                  aria-label="Настройки интерфейса"
                  type="button"
                >
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                    <Paintbrush className="w-5 h-5" style={{ color: colors.text.onPrimary }} />
                  </div>
                </button>
                <button
                  onClick={() => router.push('/profile')}
                  className="w-9 h-9 rounded-full overflow-hidden border-2"
                  style={{ borderColor: colors.primary }}
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                      <span className="text-sm font-bold" style={{ color: colors.text.onPrimary }}>
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
      
      {/* UI Theme Modal */}
      <UIThemeModal
        isOpen={isUIThemeModalOpen}
        onClose={() => setIsUIThemeModalOpen(false)}
      />
    </>
  );
}
