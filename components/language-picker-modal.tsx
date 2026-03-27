'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';
import { useUITheme } from '@/context/UIThemeContext';

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { id: 'ru', label: 'Русский', flag: '🇷🇺', native: 'Русский' },
  { id: 'en', label: 'English', flag: '🇺🇸', native: 'English' }
];

export function LanguagePickerModal({ isOpen, onClose }: LanguagePickerModalProps) {
  const { user } = useUser();
  const { currentTheme, colorMode } = useUITheme();
  const supabase = createClient();
  const [currentLocale, setCurrentLocale] = useState('ru');
  const colors = currentTheme.colors[colorMode];

  useEffect(() => {
    // Получаем текущую локаль из URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const localeFromPath = path.split('/')[1];
      if (localeFromPath && ['ru', 'en'].includes(localeFromPath)) {
        setCurrentLocale(localeFromPath);
      }
    }
  }, [isOpen]);

  // Блокируем скролл при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = async (newLocale: string) => {
    if (newLocale === currentLocale) {
      onClose();
      return;
    }
    
    // Сохраняем язык в Supabase если пользователь авторизован
    if (user) {
      try {
        await (supabase as any)
          .from('profiles')
          .update({ language: newLocale })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error saving language to Supabase:', error);
      }
    }
    
    // Сохраняем язык в cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Получаем текущий путь и заменяем локаль
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    // Переходим на новый путь
    window.location.href = newPath;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
            style={{ 
              backgroundColor: colors.background,
              border: `2px solid ${colors.primary}40`
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.primary + '30' }}>
              <div>
                    <h2 className="text-lg font-bold" style={{ color: colors.text.primary }}>
                      Язык
                    </h2>
                    <p className="text-xs" style={{ color: colors.text.secondary }}>
                      Выберите язык интерфейса
                    </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.primary, color: colors.text.onPrimary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="space-y-3">
                {LANGUAGES.map((lang) => (
                  <motion.button
                    key={lang.id}
                    onClick={() => handleSelect(lang.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 relative overflow-hidden",
                      currentLocale === lang.id
                        ? "shadow-lg"
                        : "hover:border-opacity-30"
                    )}
                      style={{ 
                        backgroundColor: currentLocale === lang.id 
                          ? `${colors.primary}20` 
                          : `${colors.surface}20`,
                        borderColor: currentLocale === lang.id 
                          ? colors.primary 
                          : `${colors.border}10`,
                        color: colors.text.primary
                      }}
                  >
                    {/* Flag */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                      style={{ backgroundColor: currentLocale === lang.id ? `${colors.primary}40` : `${colors.surface}40` }}
                    >
                      {lang.flag}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-bold truncate">{lang.label}</span>
                      <span className="text-xs" style={{ color: colors.text.secondary }}>{lang.native}</span>
                    </div>
                    
                    {/* Check */}
                    {currentLocale === lang.id && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: colors.primary, color: colors.text.onPrimary }}
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t" style={{ borderColor: colors.primary + '30' }}>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-2xl font-bold text-sm shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.text.onPrimary
                }}
              >
                Закрыть
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}