'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { useUser } from '@/hooks/useUser';
import { useState, useEffect } from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { LanguagePickerModal } from './language-picker-modal';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export function LanguageSwitcher() {
  const { currentTheme, colorMode } = useUITheme();
  const { user } = useUser();
  const supabase = createClient();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('ru');
  const colors = currentTheme.colors[colorMode];

  useEffect(() => {
    // Загружаем язык из Supabase или URL
    const loadLanguage = async () => {
      if (user) {
        // Загружаем язык из профиля пользователя
        const { data } = await (supabase as any)
          .from('profiles')
          .select('language')
          .eq('id', user.id)
          .single();
        
        if (data?.language) {
          setCurrentLocale(data.language);
        }
      } else {
        // Получаем текущую локаль из URL
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          const localeFromPath = path.split('/')[1];
          if (localeFromPath && ['ru', 'en'].includes(localeFromPath)) {
            setCurrentLocale(localeFromPath);
          }
        }
      }
    };
    
    loadLanguage();
  }, [user, supabase]);

  const languageNames: Record<string, { name: string; flag: string }> = {
    ru: { name: 'Русский', flag: '🇷🇺' },
    en: { name: 'English', flag: '🇺🇸' },
  };

  return (
    <>
      <Card 
        className={cn("p-4 flex items-center justify-between cursor-pointer group border-2 rounded-[2rem]")}
        onClick={() => setIsLanguageModalOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center border-4"
            style={{ 
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}20`
            }}
          >
            <Globe className="w-6 h-6" style={{ color: colors.primary }} />
          </div>
          <div className="text-left">
            <p className="font-black text-lg" style={{ color: colors.text.primary }}>{languageNames[currentLocale]?.name || 'Language'}</p>
            <p className="text-xs font-bold opacity-40 uppercase tracking-wider" style={{ color: colors.text.secondary }}>{languageNames[currentLocale]?.flag || '🌐'}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: colors.text.secondary }} />
      </Card>

      <LanguagePickerModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </>
  );
}
