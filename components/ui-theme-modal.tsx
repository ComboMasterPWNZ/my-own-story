'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { professionalThemes } from '@/lib/professional-themes';
import { UIThemeId } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UIThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UIThemeModal({ isOpen, onClose }: UIThemeModalProps) {
  const { 
    currentTheme, 
    setTheme, 
    currentThemeId, 
    colorMode, 
    setColorMode, 
    temperature, 
    setTemperature,
    fairyDustEnabled,
    setFairyDustEnabled
  } = useUITheme();
  const t = useTranslations('UITheme');

  if (!isOpen) return null;

  const colors = currentTheme.colors[colorMode] || currentTheme.colors.light;

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
            backgroundColor: colors.card,
            border: `2px solid ${colors.primary}40`
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: `${colors.primary}30` }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: colors.text.primary }}>
                  Настройки интерфейса
                </h2>
                <p className="text-xs opacity-60" style={{ color: colors.text.secondary }}>
                  Настройте внешний вид приложения
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {/* Режим светлый/тёмный */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                Режим отображения
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setColorMode('light')}
                  className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${colorMode === 'light' ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    backgroundColor: colorMode === 'light' ? `${colors.primary}20` : `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text.primary,
                  }}
                >
                  <Sun className="w-5 h-5" />
                  <span>Светлый</span>
                </button>
                <button
                  onClick={() => setColorMode('dark')}
                  className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${colorMode === 'dark' ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    backgroundColor: colorMode === 'dark' ? `${colors.primary}20` : `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text.primary,
                  }}
                >
                  <Moon className="w-5 h-5" />
                  <span>Тёмный</span>
                </button>
              </div>
            </div>

            {/* Температура (интенсивность) */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                  Магия: {Math.round(temperature * 100)}%
                </h3>
                <span className="text-sm opacity-60" style={{ color: colors.text.secondary }}>
                  {temperature < 0.3 ? 'Спокойно' : temperature < 0.7 ? 'Волшебно' : 'Максимум!'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}30, ${colors.primary})`,
                }}
              />
            </div>

            {/* Сказочная пыль */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold" style={{ color: colors.text.primary }}>
                  Сказочная пыль
                </h3>
                <span className="text-sm opacity-60" style={{ color: colors.text.secondary }}>
                  {fairyDustEnabled ? 'Включено ✨' : 'Выключено'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFairyDustEnabled(true)}
                  className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${fairyDustEnabled ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    backgroundColor: fairyDustEnabled ? `${colors.primary}20` : `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text.primary,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Включить</span>
                </button>
                <button
                  onClick={() => setFairyDustEnabled(false)}
                  className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${!fairyDustEnabled ? 'ring-2 ring-offset-2' : ''}`}
                  style={{
                    backgroundColor: !fairyDustEnabled ? `${colors.primary}20` : `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text.primary,
                  }}
                >
                  <span>Выключить</span>
                </button>
              </div>
              <p className="text-xs opacity-60 mt-2" style={{ color: colors.text.secondary }}>
                Летающие элементы по всему приложению (кроме окна входа)
              </p>
            </div>

            {/* Выбор темы */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                Стиль интерфейса
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.values(professionalThemes).map((theme) => {
                  const themeColors = theme.colors[colorMode];
                  const isSelected = currentThemeId === theme.id;
                  
                  return (
                    <div key={theme.id} className="relative">
                      <motion.button
                        onClick={() => {
                          setTheme(theme.id);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden"
                        style={{
                          borderColor: isSelected ? themeColors.primary : `${colors.primary}20`,
                          backgroundColor: isSelected ? `${themeColors.primary}15` : 'transparent',
                        }}
                      >
                        {/* Background preview */}
                        <div 
                          className="absolute inset-0 opacity-10"
                          style={{ 
                            backgroundImage: `url('${colorMode === 'light' ? theme.background.image.light : theme.background.image.dark}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        
                        {/* Статичные элементы предпросмотра (без анимации) */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 3 }).map((_, i) => {
                            const element = theme.background.animations.floatingElements[i % theme.background.animations.floatingElements.length];
                            return (
                              <div
                                key={i}
                                className="absolute transition-opacity duration-300"
                                style={{
                                  left: `${20 + i * 30}%`,
                                  top: '30%',
                                  fontSize: `${14 + i * 2}px`,
                                  opacity: 0.3 + i * 0.1,
                                  filter: `drop-shadow(0 0 1px ${themeColors.primary})`,
                                }}
                              >
                                {element}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Theme preview circle */}
                            <div 
                              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
                              style={{ 
                                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                                boxShadow: theme.styles.shadows.md,
                                color: themeColors.text.onPrimary,
                              }}
                            >
                              {theme.name.split(' ')[0]}
                            </div>
                            
                            {/* Theme info */}
                            <div className="flex-1">
                              <p className="font-bold text-base" style={{ color: colors.text.primary }}>
                                {theme.name}
                              </p>
                              <p className="text-xs opacity-60 mt-1" style={{ color: colors.text.secondary }}>
                                {theme.description}
                              </p>
                              
                              {/* Color preview */}
                              <div className="flex gap-1 mt-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColors.primary }} />
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColors.secondary }} />
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColors.accent }} />
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColors.background }} />
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColors.card }} />
                              </div>
                            </div>
                          </div>
                          
                          {/* Check mark */}
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: themeColors.primary }}
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                      
                      {/* Hint for touch screens */}
                      <div className="absolute -bottom-2 left-0 right-0 text-center">
                        <p 
                          className="text-xs opacity-40"
                          style={{ color: colors.text.secondary }}
                        >
                          Коснитесь для предпросмотра частиц
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t" style={{ borderColor: `${colors.primary}30` }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-2xl font-bold text-sm"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: colors.text.onPrimary,
              }}
            >
              Готово
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}