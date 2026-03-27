'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProfessionalUITheme, ColorMode } from '@/lib/types';

interface ThemePreviewProps {
  theme: ProfessionalUITheme;
  colorMode: ColorMode;
  isActive?: boolean;
  onClick?: () => void;
  showParticles?: boolean;
}

export function ThemePreview({ 
  theme, 
  colorMode, 
  isActive = false,
  onClick,
  showParticles = true
}: ThemePreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = theme.colors[colorMode] || theme.colors.light;
  const floatingElements = theme.background?.animations?.floatingElements || ['✨', '⭐', '🌟', '💫'];

  // Статичные элементы для предпросмотра (без анимации)
  const previewElements = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    emoji: floatingElements[i % floatingElements.length],
    x: 20 + i * 30, // Равномерное распределение
    y: 40,
    size: 14 + i * 2,
    opacity: 0.4 + i * 0.1,
  }));

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="relative w-full h-32 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200"
      style={{
        borderColor: isActive ? colors.primary : `${colors.primary}20`,
        backgroundColor: isActive ? `${colors.primary}15` : colors.card,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Фоновый градиент */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Статичные элементы предпросмотра (без анимации) */}
      {showParticles && previewElements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-opacity duration-300"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity * (isHovered || isActive ? 1 : 0.5),
            filter: `drop-shadow(0 0 1px ${colors.primary})`,
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Информация о теме */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.text.onPrimary,
            boxShadow: `0 4px 8px ${colors.primary}40`,
          }}
        >
          {theme.name.split(' ')[0]}
        </div>
        
        <p 
          className="text-sm font-semibold text-center truncate max-w-full"
          style={{ color: colors.text.primary }}
        >
          {theme.name}
        </p>
        
        <p 
          className="text-xs opacity-60 text-center mt-1 truncate max-w-full"
          style={{ color: colors.text.secondary }}
        >
          {theme.description}
        </p>
      </div>

      {/* Индикатор выбора */}
      {isActive && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      )}

      {/* Подсказка для тачскринов */}
      {!isHovered && !isActive && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <p 
            className="text-xs opacity-40"
            style={{ color: colors.text.secondary }}
          >
            Коснитесь для предпросмотра
          </p>
        </div>
      )}
    </motion.div>
  );
}