'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface LoadingScreenProps {
  phrase?: string;
  showRandomPhrases?: boolean;
}

export function LoadingScreen({ phrase, showRandomPhrases = true }: LoadingScreenProps) {
  const { currentTheme } = useTheme();
  const t = useTranslations('Loading');
  const [mounted, setMounted] = useState(false);

  const MAGIC_PHRASES = useMemo(() => [
    t('gatheringStars'),
    t('openingChest'),
    t('magicBegins'),
    t('castingSpells'),
    t('summoningData'),
    t('lightingMagic'),
    t('openingBook'),
    t('settingWand')
  ], [t]);

  const [currentPhrase, setCurrentPhrase] = useState(phrase || MAGIC_PHRASES[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Смена фраз каждые 2.5 секунды
  useEffect(() => {
    if (!showRandomPhrases || phrase) return;
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % MAGIC_PHRASES.length;
      setCurrentPhrase(MAGIC_PHRASES[index]);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [showRandomPhrases, phrase, MAGIC_PHRASES]);

  // Генерируем стабильные позиции для звезд только на клиенте
  const stars = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100, // в процентах
      y: Math.random() * 100, // в процентах
      size: Math.random() * 20 + 10,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      emoji: ['⭐', '✨', '🌟', '💫'][i % 4]
    }));
  }, []);

  const backgroundColor = currentTheme?.colors?.background || '#1A1A3D';
  const textColor = currentTheme?.colors?.text || '#FFFFFF';
  const primaryColor = currentTheme?.colors?.primary || '#FFB6C1';
  const cardColor = currentTheme?.colors?.card || '#2A2A5A';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-[100] overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Фоновые магические частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`,
              fontSize: star.size
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {star.emoji}
          </motion.div>
        ))}
      </div>

      {/* Центральный контент */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Волшебный спиннер */}
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: primaryColor,
              borderRightColor: primaryColor,
              filter: `drop-shadow(0 0 10px ${primaryColor})`
            }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center text-4xl"
          >
            ✨
          </motion.div>
          
          {/* Дополнительное кольцо */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full border-2 border-dashed opacity-20"
            style={{ borderColor: primaryColor }}
          />
        </div>

        {/* Карточка с текстом */}
        <div 
          className="px-8 py-6 rounded-[2.5rem] shadow-2xl text-center backdrop-blur-xl border border-white/10 min-w-[300px]"
          style={{ backgroundColor: `${cardColor}CC` }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium tracking-wide"
              style={{ color: textColor }}
            >
              {currentPhrase}
            </motion.p>
          </AnimatePresence>

          {/* Прогресс-бар (декоративный) */}
          <div className="mt-6 h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="h-full w-1/2 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` 
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
