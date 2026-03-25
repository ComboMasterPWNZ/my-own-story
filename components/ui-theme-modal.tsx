'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { useTheme } from '@/context/ThemeContext';
import { uiThemes } from '@/lib/ui-themes';
import { UIThemeId } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UIThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UIThemeModal({ isOpen, onClose }: UIThemeModalProps) {
  const { currentUITheme, setUITheme, currentUIThemeId } = useUITheme();
  const { currentTheme } = useTheme();
  const t = useTranslations('UITheme');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
          style={{ 
            backgroundColor: currentTheme.colors.card,
            border: `2px solid ${currentTheme.colors.primary}40`
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: `${currentTheme.colors.primary}30` }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})` }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: currentTheme.colors.text }}>
                  {t('title')}
                </h2>
                <p className="text-xs opacity-60" style={{ color: currentTheme.colors.text }}>
                  {t('description')}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-1 gap-3">
              {Object.values(uiThemes).map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    setUITheme(theme.id);
                    onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden"
                  style={{
                    borderColor: currentUIThemeId === theme.id ? theme.previewColor : `${currentTheme.colors.primary}20`,
                    backgroundColor: currentUIThemeId === theme.id ? `${theme.previewColor}15` : 'transparent',
                  }}
                >
                  {/* Background gradient preview */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ background: theme.background.gradient }}
                  />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Theme preview circle */}
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
                        style={{ 
                          background: theme.button ? `linear-gradient(135deg, ${theme.button.gradientStart}, ${theme.button.gradientEnd})` : `linear-gradient(135deg, ${theme.previewColor}, ${theme.previewColor}88)`,
                          boxShadow: theme.button?.shadow || `0 4px 0 ${theme.previewColor}88`,
                        }}
                      >
                        {t(theme.nameKey).split(' ')[0]}
                      </div>
                      
                      {/* Theme info */}
                      <div className="flex-1">
                        <p className="font-bold text-base" style={{ color: currentTheme.colors.text }}>
                          {t(theme.nameKey)}
                        </p>
                        <p className="text-xs opacity-60 mt-1" style={{ color: currentTheme.colors.text }}>
                          {t(theme.descriptionKey)}
                        </p>
                        
                        {/* Preview elements */}
                        <div className="flex gap-2 mt-3">
                          {/* Button preview */}
                          <div 
                            className="px-3 py-1 text-[10px] font-bold"
                            style={{
                              borderRadius: theme.button.borderRadius,
                              background: `linear-gradient(135deg, ${theme.button.gradientStart}, ${theme.button.gradientEnd})`,
                              color: theme.button.textColor,
                              boxShadow: theme.button.shadow.replace('0 8px 0', '0 2px 0'),
                            }}
                          >
                            {t('button')}
                          </div>
                          
                          {/* Card preview */}
                          <div 
                            className="px-3 py-1 text-[10px]"
                            style={{
                              borderRadius: theme.card.borderRadius,
                              backgroundColor: theme.card.background,
                              border: theme.card.border,
                              color: theme.chip.textColor,
                            }}
                          >
                            {t('card')}
                          </div>
                          
                          {/* Chip preview */}
                          <div 
                            className="px-3 py-1 text-[10px]"
                            style={{
                              borderRadius: theme.chip.borderRadius,
                              backgroundColor: theme.chip.background,
                              color: theme.chip.textColor,
                            }}
                          >
                            {t('chip')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Check mark */}
                    {currentUIThemeId === theme.id && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.previewColor }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t" style={{ borderColor: `${currentTheme.colors.primary}30` }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-2xl font-bold text-sm"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                color: 'white',
              }}
            >
              {t('done')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}