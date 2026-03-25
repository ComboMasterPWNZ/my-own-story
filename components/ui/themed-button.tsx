'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useSafeTheme } from '@/hooks/useSafeTheme';
import { useUITheme } from '@/context/UIThemeContext';

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  theme?: any;
}

export function ThemedButton({ 
  variant = 'primary', 
  size = 'md', 
  loading, 
  className, 
  children, 
  ...props 
}: ThemedButtonProps) {
  const theme = useSafeTheme();
  const { currentUITheme } = useUITheme();
  const { colors, borderRadius, isDark, buttonStyle } = theme;

  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: `linear-gradient(135deg, ${currentUITheme.button.gradientStart}, ${currentUITheme.button.gradientEnd})`,
          color: currentUITheme.button.textColor,
          borderColor: 'transparent',
          boxShadow: currentUITheme.button.shadow,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          color: '#000',
          borderColor: colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.primary,
          borderColor: colors.primary,
          borderWidth: '2px',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.text,
          borderColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: 'transparent',
          color: '#ef4444',
          borderColor: '#ef4444',
          borderWidth: '2px',
        };
      default:
        return {};
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98, y: 2 }}
      whileHover={{ 
        scale: parseFloat(currentUITheme.button.hoverScale),
        y: -2 
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-black transition-all shadow-lg disabled:opacity-50 disabled:pointer-events-none",
        buttonStyle, // Применяем специфичные для темы стили (тени, границы)
        sizeClasses[size],
        className
      )}
      style={{
        ...getStyles(),
        borderRadius: currentUITheme.button.borderRadius,
        transition: currentUITheme.animation.transition,
      }}
      disabled={loading || props.disabled}
      {...(props as any)}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="opacity-0">{children}</span>
        </>
      ) : children}
    </motion.button>
  );
}
