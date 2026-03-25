'use client';

import { BookOpen, Lock, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeConfig } from '@/lib/themes';

interface ImagePlaceholderProps {
  className?: string;
  showText?: boolean;
  variant?: 'premium' | 'missing';
  currentTheme?: ThemeConfig;
}

export function ImagePlaceholder({ 
  className, 
  showText = true, 
  variant = 'premium',
  currentTheme
}: ImagePlaceholderProps) {
  const isPremiumVariant = variant === 'premium';

  return (
    <div 
      className={cn(
        "w-full h-full flex flex-col items-center justify-center p-6 text-center gap-3",
        className
      )}
      style={{ backgroundColor: currentTheme?.colors.card || 'rgba(0,0,0,0.1)' }}
    >
      <div className="relative">
        {isPremiumVariant ? (
          <>
            <BookOpen className="w-12 h-12 opacity-20" style={{ color: currentTheme?.colors.text }} />
            <div 
              className="absolute -top-1 -right-1 rounded-full p-1 shadow-sm"
              style={{ backgroundColor: currentTheme?.colors.primary }}
            >
              <Lock className="w-3 h-3" style={{ color: currentTheme?.isDark ? '#000' : '#fff' }} />
            </div>
          </>
        ) : (
          <ImageOff className="w-12 h-12 opacity-20" style={{ color: currentTheme?.colors.text }} />
        )}
      </div>
      {showText && (
        <div className="space-y-1">
          <p className="font-bold text-sm opacity-60" style={{ color: currentTheme?.colors.text }}>
            {isPremiumVariant ? "Иллюстрация недоступна" : "Без иллюстрации"}
          </p>
          {isPremiumVariant && (
            <p className="text-xs leading-tight opacity-40" style={{ color: currentTheme?.colors.text }}>
              Доступно только в <span className="font-bold" style={{ color: currentTheme?.colors.primary }}>Premium</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
