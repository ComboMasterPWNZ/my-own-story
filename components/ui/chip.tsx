'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  selected?: boolean; // Added for prompt requirement
  children: React.ReactNode;
  theme?: any;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active, selected, children, ...props }, ref) => {
    const isSelected = selected ?? active;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        initial={false}
        animate={{ scale: 1 }}
        className={cn(
          "relative flex items-center justify-center gap-2 rounded-2xl border-4 px-6 py-3 font-black transition-all duration-300",
          isSelected
            ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-200 text-white shadow-xl shadow-indigo-200 scale-[1.02]"
            : "bg-white border-slate-50 text-slate-400 hover:border-indigo-100 hover:text-slate-600 shadow-sm",
          className
        )}
        {...(props as any)}
      >
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 45 }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-indigo-100"
            >
              <Check className="h-4 w-4 text-indigo-600 stroke-[4px]" />
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </motion.button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip };
