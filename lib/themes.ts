import { 
  Sparkles, 
  Flame, 
  Wand2, 
  Trees, 
  Waves, 
  Star, 
  Candy, 
  Tent,
  LucideIcon 
} from 'lucide-react';

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    background: string;
    text: string;
    card: string;
    border: string;
    accent: string;
    accentGlow: string;
  };
  borderRadius: {
    button: string;
    card: string;
    input: string;
  };
  buttonStyle: string;
  cardStyle: string;
  icon: LucideIcon;
  isDark: boolean;
  pattern?: string;
}

export const themes: Record<string, ThemeConfig> = {
  'Единорожья магия': {
    name: 'Единорожья магия',
    colors: {
      background: '#1A1A3D',
      card: '#2A2A5A',
      primary: '#FF85A2',
      primaryLight: '#FFB6C1',
      secondary: '#FFD700',
      text: '#FFFFFF',
      border: 'rgba(224, 187, 228, 0.3)',
      accent: '#FF69B4',
      accentGlow: 'rgba(255, 133, 162, 0.3)',
    },
    borderRadius: {
      button: '2rem',
      card: '2.5rem',
      input: '1.5rem',
    },
    buttonStyle: 'shadow-[0_0_20px_rgba(255,182,193,0.4)]',
    cardStyle: 'bg-[#2A2A5A]/80 backdrop-blur-md border-2 border-[#FFB6C1]/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    icon: Sparkles,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' fill='%23FFB6C1' fill-opacity='0.1'/%3E%3C/svg%3E\")",
  },
  'Драконий огонь': {
    name: 'Драконий огонь',
    colors: {
      background: '#1F1F2E',
      card: '#2D2D3D',
      primary: '#FF4500',
      primaryLight: '#FF6347',
      secondary: '#FFD700',
      text: '#FFFFFF',
      border: 'rgba(255, 69, 0, 0.4)',
      accent: '#FFD700',
      accentGlow: 'rgba(255, 69, 0, 0.15)',
    },
    borderRadius: {
      button: '2rem',
      card: '2.5rem',
      input: '1.5rem',
    },
    buttonStyle: 'shadow-[0_0_25px_rgba(255,69,0,0.4)] border-b-4 border-[#B22222]',
    cardStyle: 'bg-[#2D2D3D]/80 border-2 border-[#FF4500]/40 shadow-[0_0_40px_rgba(255,69,0,0.1)]',
    icon: Flame,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 20L50 25L35 30L30 45L25 30L10 25L25 20Z' fill='%23FF4500' fill-opacity='0.05'/%3E%3C/svg%3E\")",
  },
  'Фееричное сияние': {
    name: 'Фееричное сияние',
    colors: {
      background: '#0B0B1F',
      card: '#1A1A3A',
      primary: '#E0BBE4',
      primaryLight: '#F3E5F5',
      secondary: '#B8E2F2',
      text: '#FFFFFF',
      border: '#E0BBE4',
      accent: '#B8E2F2',
      accentGlow: 'rgba(224, 187, 228, 0.2)',
    },
    borderRadius: {
      button: '9999px',
      card: '3rem',
      input: '2rem',
    },
    buttonStyle: 'rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/50 text-white font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/20',
    cardStyle: 'bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl',
    icon: Wand2,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23E0BBE4' fill-opacity='0.2'/%3E%3C/svg%3E\")",
  },
  'Лесные чудеса': {
    name: 'Лесные чудеса',
    colors: {
      background: '#1A2F1A',
      card: '#254125',
      primary: '#4A785A',
      primaryLight: '#6BA37D',
      secondary: '#C49A6C',
      text: '#F0F7F0',
      border: '#C49A6C',
      accent: '#C49A6C',
      accentGlow: 'rgba(74, 120, 90, 0.2)',
    },
    borderRadius: {
      button: '1rem',
      card: '2rem',
      input: '1rem',
    },
    buttonStyle: 'rounded-2xl bg-gradient-to-b from-[#4A785A] to-[#2D4F39] border-2 border-[#C49A6C]/50 text-[#F0F7F0] font-bold shadow-lg',
    cardStyle: 'bg-[#254125] border-2 border-[#C49A6C]/20 shadow-inner',
    icon: Trees,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c0 5-4 10-4 10s8-5 8-10-4-5-4-5z' fill='%234A785A' fill-opacity='0.1'/%3E%3C/svg%3E\")",
  },
  'Подводное царство': {
    name: 'Подводное царство',
    colors: {
      background: '#0A1F44',
      card: '#152E5A',
      primary: '#40E0D0',
      primaryLight: '#7FFFD4',
      secondary: '#FF7F50',
      text: '#FFFFFF',
      border: '#40E0D0',
      accent: '#FF7F50',
      accentGlow: 'rgba(64, 224, 208, 0.15)',
    },
    borderRadius: {
      button: '9999px',
      card: '2.5rem',
      input: '1.5rem',
    },
    buttonStyle: 'rounded-full bg-gradient-to-r from-[#40E0D0] to-[#00CED1] text-[#0A1F44] font-black shadow-[0_0_20px_rgba(64,224,208,0.4)] relative overflow-hidden after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-1/2 after:bg-white/20',
    cardStyle: 'bg-[#152E5A]/90 backdrop-blur-lg border-2 border-[#40E0D0]/30 shadow-[0_10px_40px_rgba(0,0,0,0.4)]',
    icon: Waves,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' fill='none' stroke='%2340E0D0' stroke-opacity='0.1' stroke-width='2'/%3E%3C/svg%3E\")",
  },
  'Звёздные сны': {
    name: 'Звёздные сны',
    colors: {
      background: '#0B1026',
      card: '#1A1F3D',
      primary: '#FFFACD',
      primaryLight: '#FFFDE7',
      secondary: '#C0C0C0',
      text: '#FFFFFF',
      border: '#FFFACD',
      accent: '#FFFACD',
      accentGlow: 'rgba(255, 250, 205, 0.1)',
    },
    borderRadius: {
      button: '9999px',
      card: '2.5rem',
      input: '1.5rem',
    },
    buttonStyle: 'rounded-full bg-[#1A1F3D] border-2 border-[#FFFACD] text-[#FFFACD] font-bold shadow-[0_0_15px_rgba(255,250,205,0.3)]',
    cardStyle: 'bg-[#1A1F3D]/80 border border-[#C0C0C0]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]',
    icon: Star,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='1' fill='%23FFFACD' fill-opacity='0.3'/%3E%3C/svg%3E\")",
  },
  'Сладкое королевство': {
    name: 'Сладкое королевство',
    colors: {
      background: '#3D2314',
      card: '#52301C',
      primary: '#FF69B4',
      primaryLight: '#FF85C1',
      secondary: '#98FF98',
      text: '#FFFFFF',
      border: '#FF69B4',
      accent: '#98FF98',
      accentGlow: 'rgba(255, 105, 180, 0.15)',
    },
    borderRadius: {
      button: '2rem',
      card: '2.5rem',
      input: '1.5rem',
    },
    buttonStyle: 'rounded-[2rem] bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white font-black shadow-[0_8px_0_0_#C71585] active:translate-y-1 active:shadow-[0_4px_0_0_#C71585]',
    cardStyle: 'bg-[#52301C] border-4 border-[#FF69B4]/40 shadow-2xl',
    icon: Candy,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='5' fill='%23FF69B4' fill-opacity='0.1'/%3E%3C/svg%3E\")",
  },
  'Волшебный цирк': {
    name: 'Волшебный цирк',
    colors: {
      background: '#2E1B3A',
      card: '#3F264F',
      primary: '#E63946',
      primaryLight: '#F05D67',
      secondary: '#FFC857',
      text: '#FFFFFF',
      border: '#FFC857',
      accent: '#FFC857',
      accentGlow: 'rgba(230, 57, 70, 0.2)',
    },
    borderRadius: {
      button: '0px',
      card: '0px',
      input: '0px',
    },
    buttonStyle: 'rounded-none bg-[#E63946] border-4 border-[#FFC857] text-white font-black shadow-[8px_8px_0_0_#FFC857] active:translate-x-1 active:translate-y-1 active:shadow-none',
    cardStyle: 'bg-[#3F264F] border-4 border-[#E63946]/50 shadow-[0_0_30px_rgba(230,57,70,0.2)]',
    icon: Tent,
    isDark: true,
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L30 60L60 0' fill='%23E63946' fill-opacity='0.05'/%3E%3C/svg%3E\")",
  },
};
