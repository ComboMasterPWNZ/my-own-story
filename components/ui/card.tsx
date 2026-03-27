'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useUITheme } from '@/context/UIThemeContext';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: any;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, style, ...props }, ref) => {
    const { currentTheme, colorMode } = useUITheme();
    const colors = currentTheme.colors[colorMode];

    return (
      <div
        ref={ref}
        className={cn(
          "border-2 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[1.01]",
          className
        )}
        style={{
          backgroundColor: colors.card,
          borderColor: `${colors.primary}20`,
          color: colors.text.primary,
          borderRadius: currentTheme.styles.borderRadius.lg || '2.5rem',
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card };
