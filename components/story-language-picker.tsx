'use client';

import { useState, useEffect } from 'react';
import { useUITheme } from '@/context/UIThemeContext';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, ChevronRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface StoryLanguagePickerProps {
  onLanguageChange?: (language: string) => void;
}

const languages = [
  { code: 'ru', flag: '🇷🇺' },
  { code: 'en', flag: '🇬🇧' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'de', flag: '🇩🇪' },
];

export function StoryLanguagePicker({ onLanguageChange }: StoryLanguagePickerProps) {
  const { currentTheme, colorMode } = useUITheme();
  const { user } = useUser();
  const supabase = createClient();
  const t = useTranslations('StoryLanguage');
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const colors = currentTheme.colors[colorMode];

  useEffect(() => {
    if (user) {
      const loadStoryLanguage = async () => {
        const { data } = await (supabase as any)
          .from('profiles')
          .select('story_language')
          .eq('id', user.id)
          .single();
        if (data?.story_language) {
          setSelectedLanguage(data.story_language);
        }
      };
      loadStoryLanguage();
    }
  }, [user, supabase]);

  const handleSelect = async (langCode: string) => {
    if (langCode === selectedLanguage) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setSelectedLanguage(langCode);

    if (user) {
      await (supabase as any)
        .from('profiles')
        .update({ story_language: langCode })
        .eq('id', user.id);
    }

    if (onLanguageChange) {
      onLanguageChange(langCode);
    }

    setLoading(false);
    setIsOpen(false);
  };

  const selectedLang = languages.find(l => l.code === selectedLanguage) || languages[0];

  return (
    <>
      <Card 
        className={cn("p-4 flex items-center justify-between cursor-pointer group border-2 rounded-[2rem]")}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center border-4"
            style={{ 
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}20`
            }}
          >
            <BookOpen className="w-6 h-6" style={{ color: colors.primary }} />
          </div>
          <div className="text-left">
            <p className="font-black text-lg" style={{ color: colors.text.primary }}>{t(selectedLang.code)}</p>
            <p className="text-xs font-bold opacity-40 uppercase tracking-wider" style={{ color: colors.text.secondary }}>{t(`${selectedLang.code}Desc`)}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: colors.text.secondary }} />
      </Card>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
              style={{ 
                backgroundColor: colors.background,
                border: `2px solid ${colors.primary}40`
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.primary + '30' }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: colors.text.onPrimary }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: colors.text.primary }}>
                      {t('label')}
                    </h2>
                    <p className="text-xs" style={{ color: colors.text.secondary }}>
                      {t('description')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: colors.primary, color: colors.text.onPrimary }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 relative overflow-hidden",
                        selectedLanguage === lang.code
                          ? "shadow-lg"
                          : "hover:border-opacity-30"
                      )}
                      style={{ 
                        backgroundColor: selectedLanguage === lang.code 
                          ? `${colors.primary}20` 
                          : `${colors.surface}20`,
                        borderColor: selectedLanguage === lang.code 
                          ? colors.primary 
                          : `${colors.border}10`,
                        color: colors.text.primary
                      }}
                    >
                      {/* Flag */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                        style={{ backgroundColor: selectedLanguage === lang.code ? `${colors.primary}40` : `${colors.surface}40` }}
                      >
                        {lang.flag}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-bold truncate">{t(lang.code)}</span>
                        <span className="text-xs" style={{ color: colors.text.secondary }}>{t(`${lang.code}Desc`)}</span>
                      </div>
                      
                      {/* Check */}
                      {selectedLanguage === lang.code && (
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
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-2xl font-bold text-sm shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: colors.text.onPrimary
                  }}
                >
                  {t('done')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}