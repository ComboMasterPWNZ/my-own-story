'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useUITheme } from '@/context/UIThemeContext';

interface ThemedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: any;
}

export function ThemedInput({ 
  label, 
  error, 
  className, 
  style,
  ...props 
}: ThemedInputProps) {
  const { currentTheme, temperature, colorMode } = useUITheme();
  const colors = currentTheme.colors[colorMode];

  return (
    <div className="w-full">
      {label && (
        <label 
          className="block mb-2 font-medium"
          style={{ color: colors.text.primary }}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 border-2 transition-all duration-300 focus:outline-none",
          className
        )}
        style={{
          backgroundColor: colors.card,
          borderColor: error ? colors.error : colors.border.light,
          color: colors.text.primary,
          borderRadius: currentTheme.styles.borderRadius.md,
          boxShadow: `0 4px 0 ${colors.border.light}40`,
          transition: currentTheme.animations.durations.normal + ' ' + currentTheme.animations.easings.standard,
          transform: `scale(${1 + temperature * 0.01})`,
          ...style
        }}
        {...props}
      />
      {error && (
        <p 
          className="mt-1 text-sm"
          style={{ color: colors.error }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
