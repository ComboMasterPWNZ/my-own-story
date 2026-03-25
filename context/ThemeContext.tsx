'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, themes } from '@/lib/themes';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [currentThemeName, setCurrentThemeName] = useState<string>('Единорожья магия');
  const supabase = createClient();

  useEffect(() => {
    async function loadProfileTheme() {
      console.log('Loading profile theme, user:', user?.id);
      if (user) {
        try {
          const { data, error } = await (supabase as any)
            .from('profiles')
            .select('selected_theme')
            .eq('id', user.id)
            .single();
          
          console.log('Profile theme data:', data);
          console.log('Profile theme error:', error);
          
          if (data?.selected_theme && themes[data.selected_theme]) {
            console.log('Setting theme to:', data.selected_theme);
            setCurrentThemeName(data.selected_theme);
          } else {
            console.log('No theme found in profile, using default');
          }
        } catch (err) {
          console.error('Exception loading profile theme:', err);
        }
      } else {
        console.log('No user, using default theme');
      }
    }
    loadProfileTheme();
  }, [user, supabase]);

  const currentTheme = themes[currentThemeName] || themes['Единорожья магия'];

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a default theme if used outside of provider to prevent crashes
    return {
      currentTheme: themes['Единорожья магия'],
      setTheme: () => {},
    };
  }
  return context;
}
