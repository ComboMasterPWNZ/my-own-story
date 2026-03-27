'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { useMemo, useState, useEffect } from 'react';

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

export function FloatingElements() {
  const { currentTheme, temperature, fairyDustEnabled } = useUITheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Создаем сетку 6x6 для статичных элементов
  const elements = useMemo(() => {
    if (!isClient || !fairyDustEnabled) return [];

    const floatingElements = currentTheme.background.animations.floatingElements || ['✨', '⭐', '🌟', '💫', '⚡'];
    if (floatingElements.length === 0) return [];

    const gridSize = 6; // 6x6 сетка
    const elements: FloatingElement[] = [];

    // Используем детерминированный seed для генерации
    const seed = currentTheme.id.charCodeAt(0) + currentTheme.id.charCodeAt(1);
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Детерминированное пропускание ячеек
        const cellSeed = (row * gridSize + col + seed) % 10;
        if (cellSeed > 7) continue; // Пропускаем 30% ячеек

        const id = row * gridSize + col;
        const emoji = floatingElements[id % floatingElements.length];
        
        // Детерминированное распределение по сетке
        const x = (col / gridSize) * 100 + ((cellSeed - 5) / 10) * (100 / gridSize);
        const y = (row / gridSize) * 100 + (((cellSeed + 2) % 10 - 5) / 10) * (100 / gridSize);
        
        // Размер зависит от температуры и детерминирован
        const size = 16 + temperature * 8 + (cellSeed / 10) * 8;
        
        // Прозрачность для эстетичности
        const opacity = 0.15 + temperature * 0.1 + (cellSeed / 10) * 0.1;
        
        // Задержка анимации для мерцания
        const animationDelay = (cellSeed / 10) * 3;

        elements.push({
          id,
          emoji,
          x,
          y,
          size,
          opacity,
          animationDelay
        });
      }
    }

    return elements;
  }, [currentTheme, temperature, fairyDustEnabled, isClient]);

  if (!isClient || elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute transition-opacity duration-500"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            animation: `fairy-twinkle 3s ease-in-out infinite`,
            animationDelay: `${el.animationDelay}s`,
            filter: `drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))`,
            transform: `translateZ(0)`, // Для аппаратного ускорения
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
}
