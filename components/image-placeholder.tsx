'use client';

import { BookOpen, Lock, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UITheme } from '@/lib/types';

interface ImagePlaceholderProps {
  className?: string;
  showText?: boolean;
  variant?: 'premium' | 'missing';
  currentTheme?: UITheme;
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
        "w-full h-full flex flex-col items-center justify-center p-6 text-center gap-3 bg-slate-100",
        className
      )}
    >
      <div className="relative">
        {isPremiumVariant ? (
          <>
            <BookOpen className="w-12 h-12 opacity-20 text-slate-400" />
            <div className="absolute -top-1 -right-1 rounded-full p-1 shadow-sm bg-blue-500">
              <Lock className="w-3 h-3 text-white" />
            </div>
          </>
        ) : (
          <ImageOff className="w-12 h-12 opacity-20 text-slate-400" />
        )}
      </div>
      {showText && (
        <div className="space-y-1">
          <p className="font-bold text-sm opacity-60 text-slate-600">
            {isPremiumVariant ? "Иллюстрация недоступна" : "Без иллюстрации"}
          </p>
          {isPremiumVariant && (
            <p className="text-xs leading-tight opacity-40 text-slate-600">
              Доступно только в <span className="font-bold text-blue-500">Premium</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
