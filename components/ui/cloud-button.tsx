'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ThemeConfig } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface CloudButtonProps {
  onClick: () => void;
  currentTheme: ThemeConfig;
  profile: any;
  className?: string;
}

export function CloudButton({ onClick, currentTheme, profile, className }: CloudButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInternalClick = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Increased delay to allow the "pop" and scale animation to be visible
    setTimeout(() => {
      onClick();
      setIsAnimating(false);
    }, 600); // Increased from 300ms to 600ms
  }, [isAnimating, onClick]);

  return (
    <motion.button
      onClick={handleInternalClick}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? { scale: 1.1, y: -12 } : {}}
      className={cn(
        "relative w-full group py-10 px-8 flex flex-col items-center justify-center transition-all duration-500",
        isAnimating && "pointer-events-none",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
        borderRadius: '60% 40% 50% 50% / 60% 50% 60% 40%',
        boxShadow: `
          0 20px 40px -10px ${currentTheme.primary}60,
          0 10px 20px -5px ${currentTheme.secondary}40,
          inset 0 -8px 15px rgba(0,0,0,0.1),
          inset 0 8px 15px rgba(255,255,255,0.4)
        `,
      }}
    >
      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <motion.div
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-4 left-10"
        >
          <Sparkles className="w-4 h-4 text-white/40" />
        </motion.div>
        <motion.div
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-6 right-12"
        >
          <Sparkles className="w-6 h-6 text-white/30" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </motion.div>
          <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-tight">
            Создать сказку
          </span>
        </div>

        {/* Stats Badge */}
        {profile?.subscription_tier !== 'premium' && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-inner"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
              Текст: {Math.max(0, 3 - (profile?.free_generations_used || 0))}
            </span>
            <div className="w-px h-3 bg-white/20 self-center" />
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-200">
              С фото: {profile?.ad_generations_remaining || 0}
            </span>
          </motion.div>
        )}
      </div>

      {/* Volume Highlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, white 0%, transparent 60%)',
          borderRadius: 'inherit'
        }}
      />
    </motion.button>
  );
}
