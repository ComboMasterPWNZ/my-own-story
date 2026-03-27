'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, CloudOff } from 'lucide-react';
import { Button } from './ui/button';
import { UITheme } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  currentTheme?: UITheme;
  className?: string;
}

export function ErrorMessage({ message, onRetry, currentTheme, className }: ErrorMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-[2.5rem] bg-white/5 border-2 border-dashed border-red-500/20",
        className
      )}
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center"
        >
          <CloudOff className="w-10 h-10 text-red-500" />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <AlertCircle className="w-6 h-6 text-red-400 fill-white" />
        </motion.div>
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-2">Ой, что-то пошло не так</h3>
      <p className="text-slate-500 font-medium mb-8 max-w-[240px]">
        {message || "Волшебство временно не работает. Попробуй ещё раз."}
      </p>

      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-8"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Попробовать снова
        </Button>
      )}
    </motion.div>
  );
}
