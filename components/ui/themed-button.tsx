'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useUITheme } from '@/context/UIThemeContext';
import { Sparkles } from '@/components/Sparkles';

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
  const { currentTheme, temperature, colorMode } = useUITheme();
  const colors = currentTheme.colors[colorMode];
  const animations = currentTheme.animations;

  // Создаем градиент для кнопки
  const getGradient = () => {
    return `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
  };

  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: getGradient(),
          color: colors.text.onPrimary,
          borderColor: 'transparent',
          boxShadow: `0 8px 0 ${colors.secondary}80`,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          color: colors.text.onSecondary,
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
          color: colors.text.primary,
          borderColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: 'transparent',
          color: colors.error,
          borderColor: colors.error,
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
    <Sparkles>
      <motion.button
        whileTap={{ scale: 0.98, y: 2 }}
        whileHover={{ 
          scale: 1 + temperature * 0.05,
          y: -2 
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-black transition-all shadow-lg disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          className
        )}
        style={{
          ...getStyles(),
          borderRadius: currentTheme.styles.borderRadius.md,
          transition: currentTheme.animations.durations.normal + ' ' + currentTheme.animations.easings.standard,
          transform: `scale(${1 + temperature * 0.05})`,
          cursor: 'pointer',
          border: 'none',
          fontWeight: 'bold',
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
    </Sparkles>
  );
}
