'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useUITheme } from '@/context/UIThemeContext';

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: any;
}

export function ThemedCard({ className, children, style, ...props }: ThemedCardProps) {
  const { currentTheme, temperature, colorMode } = useUITheme();
  const colors = currentTheme.colors[colorMode];

  return (
    <div
      className={cn(
        "border-2 p-6 transition-all duration-300",
        className
      )}
      style={{
        background: colors.card,
        borderColor: colors.border.light,
        color: colors.text.primary,
        borderRadius: currentTheme.styles.borderRadius.md,
        boxShadow: currentTheme.styles.shadows.md,
        transition: currentTheme.animations.durations.normal + ' ' + currentTheme.animations.easings.standard,
        transform: `scale(${1 + temperature * 0.02})`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
