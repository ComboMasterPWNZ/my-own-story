'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useSafeTheme } from '@/hooks/useSafeTheme';

interface ThemedChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
  theme?: any;
}

export function ThemedChip({ active = false, className, children, ...props }: ThemedChipProps) {
  const theme = useSafeTheme();
  const { colors, borderRadius, isDark } = theme;

  return (
    <motion.button
      type="button" // Явно указываем тип, чтобы не срабатывал submit в формах
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative flex items-center justify-center gap-2 border-4 px-6 py-3 font-black transition-all duration-300",
        className
      )}
      style={{
        backgroundColor: active ? colors.primary : 'transparent',
        borderColor: active ? colors.primary : colors.border,
        color: active ? (isDark ? '#000' : '#fff') : colors.text,
        borderRadius: borderRadius?.button || '1.5rem',
        opacity: active ? 1 : 0.7
      }}
      {...(props as any)}
    >
      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2" 
            style={{ borderColor: colors.primary }}
          >
            <Check className="w-3 h-3" style={{ color: colors.primary }} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}
