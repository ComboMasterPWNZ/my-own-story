'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UIThemeId, UITheme } from '@/lib/types';
import { uiThemes } from '@/lib/ui-themes';

interface UIThemeContextType {
  currentUITheme: UITheme;
  setUITheme: (themeId: UIThemeId) => void;
  currentUIThemeId: UIThemeId;
}

const UIThemeContext = createContext<UIThemeContextType | undefined>(undefined);

export function UIThemeProvider({ children }: { children: ReactNode }) {
  const [currentUIThemeId, setCurrentUIThemeId] = useState<UIThemeId>('candy');

  useEffect(() => {
    const saved = localStorage.getItem('ui-theme') as UIThemeId;
    if (saved && uiThemes[saved]) {
      setCurrentUIThemeId(saved);
    }
  }, []);

  const setUITheme = (themeId: UIThemeId) => {
    setCurrentUIThemeId(themeId);
    localStorage.setItem('ui-theme', themeId);
  };

  const currentUITheme = uiThemes[currentUIThemeId];

  return (
    <UIThemeContext.Provider value={{ currentUITheme, setUITheme, currentUIThemeId }}>
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