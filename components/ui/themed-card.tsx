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
        background: currentUITheme.card.background,
        borderColor: currentUITheme.card.border.includes('linear-gradient') 
          ? 'transparent' 
          : currentUITheme.card.border,
        color: colors.text,
        borderRadius: currentUITheme.card.borderRadius,
        boxShadow: currentUITheme.card.shadow,
        borderImage: currentUITheme.card.borderImage,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
