'use client';
import { useEffect, useRef } from 'react';
import { useUITheme } from '@/context/UIThemeContext';

export function Sparkles({ children }: { children: React.ReactNode }) {
  const { temperature } = useUITheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparkle = (x: number, y: number) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'fixed pointer-events-none text-xl animate-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.fontSize = `${10 + Math.random() * 20}px`;
    sparkle.textContent = ['✨', '⭐', '🌟', '💫', '⚡'][Math.floor(Math.random() * 5)];
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (temperature > 0.3) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      for (let i = 0; i < Math.floor(3 + temperature * 5); i++) {
        setTimeout(() => {
          createSparkle(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
        }, i * 50);
      }
    }
  };

  return (
    <div ref={containerRef} onClick={handleClick}>
      {children}
    </div>
  );
}
