'use client';

import { useTheme } from '@/context/ThemeContext';
import { themes } from '@/lib/themes';

export function useSafeTheme() {
  const { currentTheme } = useTheme();
  return currentTheme || themes['Единорожья магия'];
}
