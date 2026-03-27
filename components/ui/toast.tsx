'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUITheme } from '@/context/UIThemeContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const { currentTheme, colorMode } = useUITheme();
  const themeColors = currentTheme.colors[colorMode];
  
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };
  
  const toastColors = {
    success: { bg: '#10B981', text: '#FFFFFF' },
    error: { bg: '#EF4444', text: '#FFFFFF' },
    warning: { bg: '#F59E0B', text: '#FFFFFF' },
    info: { bg: themeColors.primary, text: '#FFFFFF' }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[280px] max-w-[90vw] border border-white/10 backdrop-blur-md"
      style={{ backgroundColor: toastColors[type].bg }}
    >
      <span style={{ color: toastColors[type].text }} className="shrink-0">{icons[type]}</span>
      <span className="text-sm font-bold flex-1" style={{ color: toastColors[type].text }}>{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 p-1 rounded-full hover:bg-black/10 transition-colors shrink-0"
      >
        <X className="w-4 h-4" style={{ color: toastColors[type].text }} />
      </button>
    </motion.div>
  );
}
