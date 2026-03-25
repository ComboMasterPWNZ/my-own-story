'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, X } from 'lucide-react';
import { themes, ThemeConfig } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeName: string;
  onSelect: (themeName: string) => void;
  onCancel?: () => void;
  currentTheme?: any;
}

export function ThemePickerModal({ isOpen, onClose, currentThemeName, onSelect, onCancel, currentTheme }: ThemePickerModalProps) {
  const t = useTranslations('Profile');
  const tThemes = useTranslations('Themes');
  const [selectedTheme, setSelectedTheme] = useState(currentThemeName);
  const [originalTheme, setOriginalTheme] = useState(currentThemeName);

  // Маппинг названий тем на ключи переводов
  const themeNameToKey: Record<string, string> = {
    'Единорожья магия': 'unicornMagic',
    'Драконий огонь': 'dragonFire',
    'Фееричное сияние': 'fairyGlow',
    'Лесные чудеса': 'forestWonders',
    'Подводное царство': 'underwaterKingdom',
    'Звёздные сны': 'starDreams',
    'Сладкое королевство': 'sweetKingdom',
    'Волшебный цирк': 'magicCircus'
  };
  const [isApplying, setIsApplying] = useState(false);

  // Синхронизируем selectedTheme и originalTheme с currentThemeName при открытии
  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(currentThemeName);
      setOriginalTheme(currentThemeName);
    }
  }, [isOpen, currentThemeName]);

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

  const handleSelect = async (themeName: string) => {
    setSelectedTheme(themeName);
    setIsApplying(true);
    
    try {
      // Вызываем callback для применения темы
      onSelect(themeName);
      
      // Небольшая задержка для анимации
      setTimeout(() => {
        setIsApplying(false);
      }, 300);
    } catch (error) {
      console.error('Error applying theme:', error);
      setIsApplying(false);
    }
  };

  const handleClose = () => {
    // При закрытии крестиком всегда вызываем функцию отмены если она есть
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const handleDone = () => {
    // При нажатии "готово" сохраняем выбранную тему
    onSelect(selectedTheme);
    onClose();
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
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {tThemes('title')}
                  </h2>
                  <p className="text-xs text-white/50">
                    {tThemes('description')}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-3">
                {Object.values(themes).map((theme) => (
                  <motion.button
                    key={theme.name}
                    onClick={() => handleSelect(theme.name)}
                    disabled={isApplying}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 relative overflow-hidden",
                      selectedTheme === theme.name
                        ? "border-white shadow-lg"
                        : "border-white/10 hover:border-white/30"
                    )}
                    style={{ 
                      backgroundColor: selectedTheme === theme.name 
                        ? `${theme.colors.primary}20` 
                        : 'rgba(255,255,255,0.03)'
                    }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
                    >
                      <theme.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-white truncate">{tThemes(themeNameToKey[theme.name] || theme.name)}</span>
                      <div className="flex gap-1.5 mt-1.5">
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: theme.colors.primary }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: theme.colors.secondary }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: theme.colors.background }} />
                      </div>
                    </div>
                    
                    {/* Check */}
                    {selectedTheme === theme.name && (
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
                onClick={handleDone}
                disabled={isApplying}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-2xl font-bold text-white text-sm shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme?.colors?.primary || '#FFB6C1'}, ${currentTheme?.colors?.secondary || '#FFD700'})`
                }}
              >
                {isApplying ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Применяем магию...
                  </div>
                ) : (
                  'Готово ✨'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}