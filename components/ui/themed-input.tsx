'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSafeTheme } from '@/hooks/useSafeTheme';

interface ThemedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: any;
}

export function ThemedInput({ label, error, className, ...props }: ThemedInputProps) {
  const theme = useSafeTheme();
  const { colors, borderRadius } = theme;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          className="ml-2 text-sm font-bold opacity-60" 
          style={{ color: colors.text }}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex h-14 w-full border-2 px-6 py-4 text-base font-bold transition-all focus:outline-none",
          className
        )}
        style={{
          backgroundColor: colors.card,
          borderColor: error ? '#ef4444' : `${colors.primary}40`,
          color: colors.text,
          borderRadius: borderRadius?.input || '1.5rem'
        }}
        {...props}
      />
      {error && <p className="ml-2 text-xs font-bold text-red-500">{error}</p>}
    </div>
  );
}
