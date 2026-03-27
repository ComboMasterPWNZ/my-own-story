'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UIThemeId, ProfessionalUITheme, ColorMode, UIAppearanceSettings } from '@/lib/types';
import { professionalThemes } from '@/lib/professional-themes';

interface UIThemeContextType {
  // Новая система
  currentTheme: ProfessionalUITheme;
  setTheme: (themeId: UIThemeId) => void;
  currentThemeId: UIThemeId;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  temperature: number;
  setTemperature: (value: number) => void;
  fairyDustEnabled: boolean;
  setFairyDustEnabled: (enabled: boolean) => void;
  settings: UIAppearanceSettings;
  
  // Обратная совместимость со старой системой
  currentUITheme: any; // преобразованный ProfessionalUITheme → UITheme
  setUITheme: (themeId: UIThemeId) => void;
  currentPaletteId: string;
  setPalette: (paletteId: string) => void;
}

const UIThemeContext = createContext<UIThemeContextType | undefined>(undefined);

export function UIThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UIAppearanceSettings>({
    themeId: 'candy',
    colorMode: 'light',
    temperature: 0.5,
    fairyDustEnabled: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('ui-appearance');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      } catch (e) {}
    }
  }, []);

  const setTheme = (themeId: UIThemeId) => {
    const newSettings = { ...settings, themeId };
    setSettings(newSettings);
    localStorage.setItem('ui-appearance', JSON.stringify(newSettings));
  };

  const setColorMode = (mode: ColorMode) => {
    const newSettings = { ...settings, colorMode: mode };
    setSettings(newSettings);
    localStorage.setItem('ui-appearance', JSON.stringify(newSettings));
  };

  const setTemperature = (value: number) => {
    const newSettings = { ...settings, temperature: Math.min(1, Math.max(0, value)) };
    setSettings(newSettings);
    localStorage.setItem('ui-appearance', JSON.stringify(newSettings));
  };

  const setFairyDustEnabled = (enabled: boolean) => {
    const newSettings = { ...settings, fairyDustEnabled: enabled };
    setSettings(newSettings);
    localStorage.setItem('ui-appearance', JSON.stringify(newSettings));
  };

  const currentTheme = professionalThemes[settings.themeId] || professionalThemes.candy;

  // Функция для преобразования ProfessionalUITheme в старый формат UITheme
  const convertToLegacyTheme = (theme: ProfessionalUITheme, colorMode: ColorMode): any => {
    if (!theme) {
      return {
        id: 'candy',
        name: 'Конфетный',
        description: 'Сладкая тема',
        previewColor: '#FF69B4',
        background: {
          gradient: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
          pattern: undefined
        },
        floatingElements: ['🍬', '🍭', '🍫', '🧁', '🍰'],
        icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '✨' },
        animations: {
          button: 'bounce',
          card: 'wiggle',
          hover: 'scale',
          transition: '0.3s ease'
        },
        font: {
          title: "'Bubblegum Sans', cursive",
          body: "'Comic Neue', cursive",
          size: { title: '28px', body: '16px' }
        },
        cursor: 'default',
        buttonStyle: {
          borderRadius: '20px',
          shadow: '0 4px 8px rgba(255, 105, 180, 0.2)',
          gradient: 'linear-gradient(135deg, #FF69B4, #FFB6C1)'
        },
        cardStyle: {
          borderRadius: '16px',
          shadow: '0 4px 8px rgba(255, 105, 180, 0.1)',
          border: '1px solid #FFC0CB'
        },
        chipStyle: {
          borderRadius: '12px',
          background: '#FF69B420',
          activeBackground: '#FF69B4'
        },
        sound: 'pop',
        magic: {
          particles: true,
          glow: true,
          sparkles: true,
          soundEnabled: true
        },
        tempRange: {
          saturation: [0.8, 1.2],
          animationIntensity: [0.5, 1.5],
          particleCount: [5, 20]
        }
      };
    }
    
    const colors = theme.colors[colorMode] || theme.colors.light;
    
    return {
      id: theme.id,
      name: theme.name,
      description: theme.description,
      previewColor: colors.primary,
      colors: {
        [colorMode]: colors,
        light: theme.colors.light,
        dark: theme.colors.dark
      },
      background: {
        gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        pattern: undefined
      },
      floatingElements: theme.background.animations.floatingElements,
      icons: theme.decorations.icons,
      animations: {
        button: theme.animations.effects.button,
        card: theme.animations.effects.card,
        hover: theme.animations.effects.hover,
        transition: `${theme.animations.durations.normal} ${theme.animations.easings.standard}`
      },
      font: {
        title: theme.typography.fonts.title,
        body: theme.typography.fonts.body,
        size: { title: theme.typography.sizes.lg, body: theme.typography.sizes.md }
      },
      cursor: theme.decorations.cursor,
      buttonStyle: {
        borderRadius: theme.styles.borderRadius.md,
        shadow: theme.styles.shadows.md,
        gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
      },
      cardStyle: {
        borderRadius: theme.styles.borderRadius.md,
        shadow: theme.styles.shadows.md,
        border: `1px solid ${colors.border.light}`
      },
      chipStyle: {
        borderRadius: theme.styles.borderRadius.sm,
        background: `${colors.primary}20`,
        activeBackground: colors.primary
      },
      sound: theme.decorations.sound,
      magic: {
        particles: true,
        glow: true,
        sparkles: true,
        soundEnabled: true
      },
      tempRange: {
        saturation: [0.8, 1.2],
        animationIntensity: [0.5, 1.5],
        particleCount: [5, 20]
      }
    };
  };

  const currentUITheme = convertToLegacyTheme(currentTheme, settings.colorMode);
  const setUITheme = setTheme;
  const currentPaletteId = 'pastel'; // временное значение для совместимости
  const setPalette = () => {}; // временная заглушка

  return (
    <UIThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      currentThemeId: settings.themeId,
      colorMode: settings.colorMode,
      setColorMode,
      temperature: settings.temperature,
      setTemperature,
      fairyDustEnabled: settings.fairyDustEnabled,
      setFairyDustEnabled,
      settings,
      // Обратная совместимость
      currentUITheme,
      setUITheme,
      currentPaletteId,
      setPalette
    }}>
      {children}
    </UIThemeContext.Provider>
  );
}

export function useUITheme() {
  const context = useContext(UIThemeContext);
  if (context === undefined) {
    throw new Error('useUITheme must be used within a UIThemeProvider');
  }
  return context;
}
