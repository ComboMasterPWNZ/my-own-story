'use client';

import { useUITheme } from '@/context/UIThemeContext';

export function ThemeBackground() {
  const { currentTheme, colorMode, temperature } = useUITheme();
  const { background } = currentTheme;
  
  const imageUrl = colorMode === 'light' 
    ? background.image.light 
    : background.image.dark;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Основное фоновое изображение */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: background.image.position,
          backgroundSize: background.image.size,
          backgroundRepeat: 'no-repeat',
          opacity: background.image.opacity * (0.8 + temperature * 0.2),
          mixBlendMode: background.image.blendMode as any,
        }}
      />
      
      {/* Градиентный оверлей */}
      {background.effects.overlay && (
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: background.effects.overlay,
            opacity: 0.3 + temperature * 0.2,
          }}
        />
      )}
      
      {/* Шумовой эффект */}
      {background.effects.noise && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.05 + temperature * 0.05,
          }}
        />
      )}
      
      {/* Зернистый эффект */}
      {background.effects.grain && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, rgba(255,255,255,0.1) 2px)`,
            backgroundSize: '4px 4px',
            opacity: 0.1 + temperature * 0.1,
          }}
        />
      )}
      
      {/* Виньетка */}
      {background.effects.vignette && (
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 70%)`,
            opacity: 0.2 + temperature * 0.1,
          }}
        />
      )}
      
      {/* Анимированные элементы фона */}
      <div className="absolute inset-0">
        {/* Здесь будут рендериться floating elements из компонента FloatingElements */}
      </div>
    </div>
  );
}