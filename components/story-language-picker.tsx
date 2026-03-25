'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
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
  const { currentTheme } = useTheme();
  const { user } = useUser();
  const supabase = createClient();
  const t = useTranslations('StoryLanguage');
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
        className={cn("p-4 flex items-center justify-between cursor-pointer group border-2 rounded-[2rem]", currentTheme.cardStyle)}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center border-4"
            style={{ 
              borderColor: currentTheme.colors.primary,
              backgroundColor: `${currentTheme.colors.primary}20`
            }}
          >
            <BookOpen className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
          </div>
          <div className="text-left">
            <p className="font-black text-lg">{t(selectedLang.code)}</p>
            <p className="text-xs font-bold opacity-40 uppercase tracking-wider">{t(`${selectedLang.code}Desc`)}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
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
                backgroundColor: currentTheme?.colors?.background || '#1A1A3D',
                border: `2px solid ${currentTheme?.colors?.primary || '#FFB6C1'}40`
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: currentTheme?.colors?.primary || '#FFB6C1' + '30' }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#FFB6C1'}, ${currentTheme?.colors?.secondary || '#FFD700'})` }}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {t('label')}
                    </h2>
                    <p className="text-xs text-white/50">
                      {t('description')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
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
                          ? "border-white shadow-lg"
                          : "border-white/10 hover:border-white/30"
                      )}
                      style={{ 
                        backgroundColor: selectedLanguage === lang.code 
                          ? `${currentTheme.colors.primary}20` 
                          : 'rgba(255,255,255,0.03)'
                      }}
                    >
                      {/* Flag */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                        style={{ backgroundColor: selectedLanguage === lang.code ? `${currentTheme.colors.primary}40` : 'rgba(255,255,255,0.1)' }}
                      >
                        {lang.flag}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-bold text-white truncate">{t(lang.code)}</span>
                        <span className="text-xs text-white/50">{t(`${lang.code}Desc`)}</span>
                      </div>
                      
                      {/* Check */}
                      {selectedLanguage === lang.code && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0"
                        >
                          <Check className="w-5 h-5 text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t" style={{ borderColor: currentTheme?.colors?.primary || '#FFB6C1' + '30' }}>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-2xl font-bold text-white text-sm shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#FFB6C1'}, ${currentTheme?.colors?.secondary || '#FFD700'})`
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