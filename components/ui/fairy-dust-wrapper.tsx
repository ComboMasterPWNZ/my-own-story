'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { FairyDust } from './fairy-dust';
import { ReactNode } from 'react';

interface FairyDustWrapperProps {
  children: ReactNode;
  intensity?: number;
  behavior?: 'appear' | 'float' | 'sparkle' | 'rotate';
  className?: string;
}

export function FairyDustWrapper({ 
  children, 
  intensity = 1,
  behavior = 'float',
  className = ''
}: FairyDustWrapperProps) {
  const { fairyDustEnabled } = useUITheme();

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Сказочная пыль на фоне */}
      {fairyDustEnabled && (
        <FairyDust 
          enabled={fairyDustEnabled}
          intensity={intensity}
          behavior={behavior}
          maxParticles={40}
        />
      )}
      
      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}