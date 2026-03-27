'use client';

import { motion } from 'framer-motion';
import { useUITheme } from '@/context/UIThemeContext';
import { useMemo, useEffect, useState } from 'react';
import { ProfessionalUITheme } from '@/lib/types';

interface FairyDustProps {
  intensity?: number; // Множитель интенсивности (0-2)
  enabled?: boolean; // Включены ли частицы
  behavior?: 'appear' | 'float' | 'sparkle' | 'rotate'; // Тип поведения
  maxParticles?: number; // Максимальное количество частиц
  className?: string;
}

export function FairyDust({ 
  intensity = 1,
  enabled = true,
  behavior = 'appear',
  maxParticles = 50,
  className = ''
}: FairyDustProps) {
  const { currentTheme, colorMode, temperature, settings } = useUITheme();
  const [isVisible, setIsVisible] = useState(enabled);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'appearing' | 'disappearing'>('idle');

  // Плавное включение/выключение
  useEffect(() => {
    if (enabled && !isVisible) {
      setAnimationPhase('appearing');
      setIsVisible(true);
      const timer = setTimeout(() => setAnimationPhase('idle'), 1500);
      return () => clearTimeout(timer);
    } else if (!enabled && isVisible) {
      setAnimationPhase('disappearing');
      const timer = setTimeout(() => {
        setIsVisible(false);
        setAnimationPhase('idle');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [enabled, isVisible]);

  // Генерация частиц на основе темы с системой запрещенных зон
  const particles = useMemo(() => {
    if (!isVisible) return [];

    const theme = currentTheme as ProfessionalUITheme;
    const floatingElements = theme.background?.animations?.floatingElements || ['✨', '⭐', '🌟', '💫'];
    const baseCount = theme.background?.animations?.particleCount || 15;
    
    // Рассчитываем количество частиц с учётом температуры и интенсивности
    const particleCount = Math.min(
      maxParticles,
      Math.floor(baseCount * (1 + temperature * 2) * intensity)
    );

    // Запрещенные зоны (в процентах от ширины/высоты)
    const forbiddenZones = [
      // Центральная зона (где обычно находится контент)
      { x: 30, y: 30, width: 40, height: 40 },
      // Зона прозрачной кнопки "Создать сказку" (точные координаты)
      { x: 35, y: 5, width: 30, height: 25 },
      // Область вокруг кнопки (буферная зона)
      { x: 30, y: 0, width: 40, height: 35 },
      // Углы (где могут быть навигационные элементы)
      { x: 0, y: 0, width: 15, height: 15 },
      { x: 85, y: 0, width: 15, height: 15 },
      { x: 0, y: 85, width: 15, height: 15 },
      { x: 85, y: 85, width: 15, height: 15 },
      // Нижняя часть (где может быть навигация)
      { x: 0, y: 85, width: 100, height: 15 },
    ];

    const particles = [];
    let attempts = 0;
    const maxAttempts = particleCount * 3;

    while (particles.length < particleCount && attempts < maxAttempts) {
      attempts++;
      
      // Генерируем случайную позицию
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Проверяем, не попадает ли позиция в запрещенную зону
      const isInForbiddenZone = forbiddenZones.some(zone => 
        x >= zone.x && x <= zone.x + zone.width &&
        y >= zone.y && y <= zone.y + zone.height
      );
      
      if (isInForbiddenZone) continue;

      const elementIndex: number = particles.length % floatingElements.length;
      const element: string = floatingElements[elementIndex];
      
      // Разные параметры в зависимости от поведения
      let animationParams;
      switch (behavior) {
        case 'float':
          animationParams = {
            y: [0, -15 - temperature * 10, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0, 0.3 + temperature * 0.2, 0],
            scale: [0.3, 0.8 + temperature * 0.2, 0.3],
            rotate: [0, 180, 360],
          };
          break;
        case 'sparkle':
          animationParams = {
            y: [0, -8, 0],
            opacity: [0, 0.5 + temperature * 0.2, 0],
            scale: [0.2, 0.9 + temperature * 0.2, 0.2],
            rotate: [0, 360],
          };
          break;
        case 'rotate':
          animationParams = {
            y: [0, -10, 0],
            opacity: [0.2, 0.5 + temperature * 0.2, 0.2],
            scale: [0.4, 0.8 + temperature * 0.2, 0.4],
            rotate: [0, 720],
          };
          break;
        case 'appear':
        default:
          animationParams = {
            y: [0, -12 - temperature * 8, 0],
            opacity: [0, 0.4 + temperature * 0.3, 0],
            scale: [0.3, 0.8 + temperature * 0.3, 0.3],
            rotate: [0, 180, 360],
          };
          break;
      }

      // Параметры для анимации включения/выключения
      const phaseMultiplier = animationPhase === 'appearing' ? 0 : animationPhase === 'disappearing' ? 1 : 0.5;
      const phaseOffset = animationPhase === 'appearing' ? 1 : animationPhase === 'disappearing' ? 0 : 0.5;

      particles.push({
        id: particles.length,
        emoji: element,
        x,
        y,
        size: 10 + Math.random() * 14, // Уменьшенный размер (10-24px вместо 12-36px)
        duration: 2 + Math.random() * 3 + (behavior === 'sparkle' ? -1 : 0),
        delay: Math.random() * 5,
        animationParams,
        phaseMultiplier,
        phaseOffset,
      });
    }

    return particles;
  }, [currentTheme, colorMode, temperature, intensity, behavior, maxParticles, isVisible, animationPhase]);

  if (!isVisible && animationPhase === 'idle') return null;

  const colors = currentTheme.colors[colorMode] || currentTheme.colors.light;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => {
        // Определяем анимацию в зависимости от фазы
        let currentAnimation;
        let currentTransition;
        
        if (animationPhase === 'appearing') {
          currentAnimation = {
            opacity: 1,
            scale: 1,
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          };
          currentTransition = {
            duration: 1.5,
            ease: "easeInOut" as const,
          };
        } else if (animationPhase === 'disappearing') {
          currentAnimation = {
            opacity: 0,
            scale: 0,
            x: `${particle.x + (Math.random() - 0.5) * 100}%`,
            y: `${particle.y + (Math.random() - 0.5) * 100}%`,
          };
          currentTransition = {
            duration: 1.5,
            ease: "easeInOut" as const,
          };
        } else {
          currentAnimation = particle.animationParams;
          currentTransition = {
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "loop" as const,
            ease: behavior === 'sparkle' ? "easeInOut" : "easeInOut" as const,
          };
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: particle.size,
              filter: `drop-shadow(0 0 4px ${colors.primary}${Math.round(temperature * 80)})`,
            }}
            initial={{
              opacity: animationPhase === 'appearing' ? 0 : animationPhase === 'disappearing' ? 1 : 0,
              scale: animationPhase === 'appearing' ? 0 : animationPhase === 'disappearing' ? 1 : 0.5,
              x: animationPhase === 'appearing' ? '50%' : animationPhase === 'disappearing' ? `${particle.x}%` : `${particle.x}%`,
              y: animationPhase === 'appearing' ? '50%' : animationPhase === 'disappearing' ? `${particle.y}%` : `${particle.y}%`,
            }}
            animate={currentAnimation}
            transition={currentTransition}
          >
            {particle.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}