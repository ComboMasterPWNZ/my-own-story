'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSafeTheme } from '@/hooks/useSafeTheme';
import { useUITheme } from '@/context/UIThemeContext';

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: any;
}

export function ThemedCard({ className, children, style, ...props }: ThemedCardProps) {
  const theme = useSafeTheme();
  const { currentUITheme } = useUITheme();
  const { colors } = theme;

  return (
    <div
      className={cn(
        "border-2 p-6 transition-all duration-300",
        className
      )}
      style={{
        background: currentUITheme.card?.background || colors.card,
        borderColor: currentUITheme.card?.border?.includes('linear-gradient') 
          ? 'transparent' 
          : currentUITheme.card?.border || `${colors.primary}20`,
        color: colors.text,
        borderRadius: currentUITheme.card?.borderRadius || '2.5rem',
        boxShadow: currentUITheme.card?.shadow || '0 10px 20px rgba(0,0,0,0.1)',
        borderImage: currentUITheme.card?.borderImage,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
