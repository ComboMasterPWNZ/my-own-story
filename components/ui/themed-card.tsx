'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSafeTheme } from '@/hooks/useSafeTheme';

interface ThemedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: any;
}

export function ThemedCard({ className, children, style, ...props }: ThemedCardProps) {
  const theme = useSafeTheme();
  const { colors, borderRadius } = theme;

  return (
    <div
      className={cn(
        "border-2 p-6 shadow-xl transition-all duration-300",
        className
      )}
      style={{
        backgroundColor: colors.card,
        borderColor: `${colors.primary}20`,
        color: colors.text,
        borderRadius: borderRadius?.card || '2.5rem',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
