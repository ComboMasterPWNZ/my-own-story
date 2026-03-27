'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUITheme } from '@/context/UIThemeContext';
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FairyDust } from '@/components/ui/fairy-dust';
import { ProfessionalUITheme } from '@/lib/types';

interface LoadingScreenProps {
  phrase?: string;
  showRandomPhrases?: boolean;
}

export function LoadingScreen({ phrase, showRandomPhrases = true }: LoadingScreenProps) {
  const { currentTheme, colorMode, currentThemeId } = useUITheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Loading');

  const colors = currentTheme.colors[colorMode] || currentTheme.colors.light;

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

  // Получаем тематический центральный элемент
  const getCentralElement = () => {
    const theme = currentTheme as ProfessionalUITheme;
    
    switch (currentThemeId) {
      case 'candy':
        return {
          emoji: '🍬',
          name: 'Вращающийся леденец',
          animation: {
            rotate: 360,
            scale: [1, 1.2, 1],
          },
          secondaryElements: ['🍭', '🍫', '🧁'],
        };
      case 'ocean':
        return {
          emoji: '🐚',
          name: 'Волшебная жемчужина',
          animation: {
            y: [0, -10, 0],
            rotate: 360,
          },
          secondaryElements: ['🐟', '🐠', '💧'],
        };
      case 'forest':
        return {
          emoji: '🍄',
          name: 'Светящийся гриб',
          animation: {
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          },
          secondaryElements: ['🌿', '🍃', '🐞'],
        };
      case 'space':
        return {
          emoji: '🪐',
          name: 'Вращающаяся планета',
          animation: {
            rotate: 360,
            scale: [1, 1.1, 1],
          },
          secondaryElements: ['⭐', '🌟', '🚀'],
        };
      case 'rainbow':
        return {
          emoji: '🔮',
          name: 'Переливающийся кристалл',
          animation: {
            rotate: 360,
            scale: [1, 1.2, 1],
            filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
          },
          secondaryElements: ['🌈', '✨', '☀️'],
        };
      case 'underwater':
        return {
          emoji: '🐠',
          name: 'Волшебная рыбка',
          animation: {
            x: [-10, 10, -10],
            y: [0, -5, 0],
            rotate: [0, 5, 0],
          },
          secondaryElements: ['🐙', '🐬', '🐚'],
        };
      default:
        return {
          emoji: '✨',
          name: 'Волшебная искра',
          animation: {
            rotate: 360,
            scale: [1, 1.3, 1],
          },
          secondaryElements: ['⭐', '🌟', '💫'],
        };
    }
  };

  const centralElement = getCentralElement();
  const backgroundColor = colors.background;
  const textColor = colors.text.primary;
  const primaryColor = colors.primary;
  const secondaryColor = colors.secondary;
  const cardColor = colors.card;

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-[100] overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Сказочная пыль (всегда включена в окне загрузки) */}
      <FairyDust 
        enabled={true}
        intensity={1.5}
        behavior="appear"
        maxParticles={30}
      />

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
        {/* Тематический центральный элемент */}
        <div className="relative mb-10">
          {/* Основное кольцо */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-28 h-28 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: primaryColor,
              borderRightColor: secondaryColor,
              borderBottomColor: primaryColor,
              borderLeftColor: secondaryColor,
              filter: `drop-shadow(0 0 15px ${primaryColor}80)`
            }}
          />
          
          {/* Второе кольцо */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border-2 border-dashed opacity-30"
            style={{ borderColor: secondaryColor }}
          />
          
          {/* Центральный элемент */}
          <motion.div
            animate={centralElement.animation}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="text-5xl flex items-center justify-center w-20 h-20 rounded-full"
              style={{
                background: `radial-gradient(circle, ${primaryColor}30, transparent 70%)`,
                filter: `drop-shadow(0 0 10px ${primaryColor})`,
              }}
            >
              {centralElement.emoji}
            </div>
          </motion.div>
          
          {/* Вторичные элементы вокруг */}
          {centralElement.secondaryElements.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${50 + 40 * Math.cos((index * 2 * Math.PI) / centralElement.secondaryElements.length)}%`,
                top: `${50 + 40 * Math.sin((index * 2 * Math.PI) / centralElement.secondaryElements.length)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            >
              <div className="text-2xl">{emoji}</div>
            </motion.div>
          ))}
        </div>

        {/* Карточка с текстом */}
        <div 
          className="px-8 py-6 rounded-[2.5rem] shadow-2xl text-center backdrop-blur-xl border min-w-[300px]"
          style={{ 
            backgroundColor: `${cardColor}CC`,
            borderColor: `${primaryColor}30`,
            boxShadow: `0 20px 40px ${primaryColor}20, inset 0 1px 0 ${primaryColor}10`
          }}
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

          {/* Тематический прогресс-бар */}
          <div className="mt-6 h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${primaryColor}20` }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="h-full w-1/3 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${primaryColor}, ${secondaryColor}, transparent)`,
                boxShadow: `0 0 10px ${primaryColor}`
              }}
            />
          </div>
          
          {/* Подпись темы */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-xs mt-3 font-medium"
            style={{ color: colors.text.secondary }}
          >
            {centralElement.name}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
