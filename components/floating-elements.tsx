'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export function FloatingElements() {
  const { currentUITheme } = useUITheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (!currentUITheme.floatingElements || currentUITheme.floatingElements.length === 0) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = currentUITheme.floatingElements.map((emoji, i) => ({
      id: i,
      emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setElements(newElements);
  }, [currentUITheme]);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animation: `float ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
}