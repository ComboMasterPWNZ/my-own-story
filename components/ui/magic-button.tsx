'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MagicButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  theme?: any;
  style?: React.CSSProperties;
}

export function MagicButton({ onClick, children, className, disabled, type = 'button', style }: MagicButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn(
        "relative group bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400",
        "text-white rounded-full px-6 sm:px-12 py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all",
        "duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        "w-full min-h-[56px] sm:min-h-[72px]",
        className
      )}
      style={style}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse shrink-0" />
        <span className="text-lg sm:text-2xl font-black tracking-tight whitespace-nowrap">{children}</span>
      </div>
    </motion.button>
  );
}
