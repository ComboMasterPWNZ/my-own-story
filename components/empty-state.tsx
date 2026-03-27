'use client';

import { BookOpen, Heart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { MagicBookButton } from '@/components/ui/magic-book-button';
import { useUITheme } from '@/context/UIThemeContext';

interface EmptyStateProps {
  variant: 'all' | 'favorites';
  onCreateClick?: () => void;
}

export function EmptyState({ variant, onCreateClick }: EmptyStateProps) {
  const { currentUITheme, colorMode } = useUITheme();
  const colors = currentUITheme.colors[colorMode];
  const isFavorites = variant === 'favorites';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-32 h-32 rounded-full flex items-center justify-center relative z-10"
          style={{ 
            backgroundColor: `${colors.primary}20`,
            border: `2px dashed ${colors.primary}40`
          }}
        >
          {isFavorites ? (
            <Heart className="w-16 h-16" style={{ color: colors.primary }} />
          ) : (
            <BookOpen className="w-16 h-16" style={{ color: colors.primary }} />
          )}
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full blur-xl"
          style={{ backgroundColor: colors.secondary }}
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full blur-xl"
          style={{ backgroundColor: colors.primary }}
        />
      </div>

      <h3 className="text-2xl font-black mb-3" style={{ color: colors.text.primary }}>
        {isFavorites ? "Пока нет любимых сказок" : "Здесь ещё нет сказок"}
      </h3>
      
      <p className="text-lg opacity-60 font-medium max-w-[280px] mb-10" style={{ color: colors.text.secondary }}>
        {isFavorites 
          ? "Добавь их, нажав на сердечко в списке твоих историй" 
          : "Хочешь создать первую волшебную историю?"}
      </p>

      {!isFavorites && onCreateClick && (
        <MagicBookButton 
          onClick={onCreateClick}
          currentTheme={currentUITheme}
          profile={null}
          className="max-w-[300px]"
        />
      )}
    </motion.div>
  );
}
