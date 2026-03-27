'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, BookOpen, Sparkles } from 'lucide-react';
import { UITheme } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface MagicBookButtonProps {
  onClick: () => void;
  currentTheme: UITheme;
  profile: any;
  className?: string;
}

export function MagicBookButton({ onClick, currentTheme, profile, className }: MagicBookButtonProps) {
  const t = useTranslations('Create');
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInternalClick = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Increased delay to allow the "opening book" animation to be fully appreciated
    // especially on touch devices where hover state isn't persistent
    setTimeout(() => {
      onClick();
      // We don't strictly need to set isAnimating(false) here if we are navigating away,
      // but it's good practice for consistency.
      setIsAnimating(false);
    }, 800); // Increased from 400ms to 800ms
  }, [isAnimating, onClick]);

  const isActive = isHovered || isAnimating;

  return (
    <motion.button
      onClick={handleInternalClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "relative flex flex-col items-center justify-center group py-12 px-8 w-full transition-all duration-500 focus:outline-none",
        isAnimating && "pointer-events-none",
        className
      )}
    >
      {/* Magic Glow Background */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 pointer-events-none blur-[20px] rounded-full bg-blue-500/20"
            style={{ 
              boxShadow: `0 0 20px 5px rgba(59, 130, 246, 0.8)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Book Icon Container */}
      <div className="relative z-10 mb-6">
        <motion.div
          animate={{ 
            y: isActive ? -12 : 0,
            scale: isActive ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
              >
                <BookOpen 
                  size={80} 
                  className="drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] text-blue-500"
                />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Book 
                  size={80} 
                  className="drop-shadow-lg text-blue-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Sparkles when active */}
          {isActive && (
            <>
              <motion.div
                animate={{ y: [-10, -30], opacity: [0, 1, 0], x: [-10, -20] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-4 -left-4"
              >
                <Sparkles size={20} className="text-yellow-300" />
              </motion.div>
              <motion.div
                animate={{ y: [-10, -40], opacity: [0, 1, 0], x: [10, 25] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-8 -right-6"
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center space-y-2">
        <motion.span 
          animate={{ 
            opacity: isActive ? 1 : 0.6,
            scale: isActive ? 1.05 : 1,
          }}
          className="text-2xl sm:text-3xl font-black tracking-tight block transition-colors duration-300 text-blue-600"
        >
          {t('createStory')}
        </motion.span>
        
        {profile?.subscription_tier !== 'premium' && (
          <motion.div 
            animate={{ opacity: isActive ? 1 : 0.4 }}
            className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600"
          >
            <span>{t('text')}: {Math.max(0, 3 - (profile?.free_generations_used || 0))}</span>
            <div className="w-1 h-1 rounded-full bg-current opacity-30" />
            <span className="text-yellow-400">{t('photo')}: {profile?.ad_generations_remaining || 0}</span>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
