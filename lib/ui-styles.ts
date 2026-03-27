import { UIStyle, ColorPalette, UIThemeId } from './types';

// Временный тип для совместимости
type ColorPaletteId = 'pastel' | 'bright' | 'dark' | 'warm';

export const uiStyles: Record<UIThemeId, UIStyle> = {
  candy: {
    id: 'candy',
    name: '🍬 Конфетный',
    description: 'Сладкий мир леденцов и пирожных',
    previewColor: '#FF69B4',
    background: {
      gradient: 'radial-gradient(circle at 20% 30%, {primary}, {secondary})',
      pattern: 'repeating-linear-gradient(45deg, {border}20 0px, {border}20 20px, transparent 20px, transparent 40px)',
    },
    floatingElements: ['🍬', '🍭', '🍫', '🧁', '🍰', '🍪', '🍩'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '✨' },
    animations: {
      button: 'bounce',
      card: 'wiggle',
      hover: 'scale',
      transition: '0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    font: { title: "'Bubblegum Sans', cursive", body: "'Comic Neue', cursive", size: { title: '28px', body: '16px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23FF69B4\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '60% 40% 50% 50% / 60% 50% 60% 40%',
      shadow: '0 8px 0 {secondary}80',
      gradient: 'linear-gradient(135deg, {primary}, {secondary})'
    },
    cardStyle: {
      borderRadius: '30px 20px 40px 25px',
      shadow: '0 10px 0 {secondary}80',
      border: '3px solid {primary}'
    },
    chipStyle: {
      borderRadius: '30px',
      background: '{primary}40',
      activeBackground: '{primary}'
    },
    sound: 'pop',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [0.8, 1.2], animationIntensity: [0.5, 1.5], particleCount: [5, 20] }
  },
  ocean: {
    id: 'ocean',
    name: '🌊 Океанский',
    description: 'Волны, пузырьки, подводный мир',
    previewColor: '#40E0D0',
    background: {
      gradient: 'linear-gradient(135deg, {primary}, {secondary})',
      pattern: 'radial-gradient(circle at 10% 20%, {border}20 2px, transparent 2px)',
    },
    floatingElements: ['🐟', '🐠', '🐡', '🐙', '🐬', '🐳', '🌟', '💧'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '🌊' },
    animations: {
      button: 'float',
      card: 'wave',
      hover: 'rise',
      transition: '0.3s ease-out'
    },
    font: { title: "'Quicksand', system-ui", body: "'Quicksand', system-ui", size: { title: '28px', body: '16px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%2340E0D0\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '30px 10px 30px 10px',
      shadow: '0 8px 0 {secondary}80',
      gradient: 'linear-gradient(135deg, {primary}, {secondary})'
    },
    cardStyle: {
      borderRadius: '20px 40px 20px 40px',
      shadow: '0 8px 0 {secondary}80',
      border: '3px solid {primary}'
    },
    chipStyle: {
      borderRadius: '20px',
      background: '{primary}40',
      activeBackground: '{primary}'
    },
    sound: 'wave',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [0.7, 1.3], animationIntensity: [0.4, 1.6], particleCount: [3, 15] }
  },
  forest: {
    id: 'forest',
    name: '🌲 Лесной',
    description: 'Зелёные поляны, грибочки, зверята',
    previewColor: '#228B22',
    background: {
      gradient: 'linear-gradient(135deg, {primary}, {secondary})',
      pattern: 'radial-gradient(circle at 15% 25%, {border} 1px, transparent 1px)',
    },
    floatingElements: ['🍄', '🌿', '🍃', '🐞', '🐝', '🦋', '🐿️', '🌰'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '🍃' },
    animations: {
      button: 'pop',
      card: 'leaf',
      hover: 'grow',
      transition: '0.2s ease'
    },
    font: { title: "'Nunito', system-ui", body: "'Nunito', system-ui", size: { title: '28px', body: '16px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23228B22\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '20px 8px 20px 8px',
      shadow: '0 6px 0 {secondary}80',
      gradient: 'linear-gradient(135deg, {primary}, {secondary})'
    },
    cardStyle: {
      borderRadius: '20px',
      shadow: '0 6px 0 {secondary}80',
      border: '3px solid {primary}'
    },
    chipStyle: {
      borderRadius: '16px',
      background: '{primary}40',
      activeBackground: '{primary}'
    },
    sound: 'leaf',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [0.6, 1.4], animationIntensity: [0.3, 1.7], particleCount: [4, 18] }
  },
  space: {
    id: 'space',
    name: '🚀 Космический',
    description: 'Звёзды, ракеты, далёкие галактики',
    previewColor: '#4B0082',
    background: {
      gradient: 'radial-gradient(circle at 20% 30%, {primary}, {secondary})',
      pattern: 'radial-gradient(white 1px, transparent 1px)',
    },
    floatingElements: ['⭐', '🌟', '✨', '🚀', '🛸', '🌙', '☄️', '🪐'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '🚀' },
    animations: {
      button: 'spin',
      card: 'glow',
      hover: 'lift',
      transition: '0.3s ease'
    },
    font: { title: "'Orbitron', monospace", body: "'Orbitron', system-ui", size: { title: '26px', body: '14px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%234B0082\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '15px 30px 15px 30px',
      shadow: '0 6px 0 {secondary}80',
      gradient: 'linear-gradient(135deg, {primary}, {secondary})'
    },
    cardStyle: {
      borderRadius: '20px',
      shadow: '0 8px 0 {secondary}80',
      border: '2px solid {primary}'
    },
    chipStyle: {
      borderRadius: '20px',
      background: '{primary}40',
      activeBackground: '{primary}'
    },
    sound: 'whoosh',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [0.9, 1.5], animationIntensity: [0.5, 1.8], particleCount: [8, 25] }
  },
  rainbow: {
    id: 'rainbow',
    name: '🌈 Радужный',
    description: 'Все цвета радуги, весёлый праздник',
    previewColor: '#FF8C00',
    background: {
      gradient: 'linear-gradient(135deg, {primary}, {secondary})',
      pattern: 'repeating-linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
    },
    floatingElements: ['🌈', '☀️', '🌟', '🌸', '🦄', '🎈', '🎉', '✨'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '🌈' },
    animations: {
      button: 'rainbow',
      card: 'colorful',
      hover: 'glow',
      transition: '0.2s linear'
    },
    font: { title: "'Bungee', cursive", body: "'Comic Neue', cursive", size: { title: '28px', body: '16px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23FF8C00\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '25px',
      shadow: '0 8px 0 {secondary}80',
      gradient: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)'
    },
    cardStyle: {
      borderRadius: '20px',
      shadow: '0 8px 0 {secondary}80',
      border: '3px solid gold'
    },
    chipStyle: {
      borderRadius: '20px',
      background: 'linear-gradient(45deg, red, orange)',
      activeBackground: 'linear-gradient(45deg, blue, violet)'
    },
    sound: 'magic',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [1.0, 1.8], animationIntensity: [0.6, 2.0], particleCount: [10, 30] }
  },
  underwater: {
    id: 'underwater',
    name: '🐠 Подводное царство',
    description: 'Глубоководное приключение с морскими обитателями и сокровищами',
    previewColor: '#40E0D0',
    background: {
      gradient: 'linear-gradient(135deg, {primary}, {secondary})',
      pattern: 'radial-gradient(circle at 10% 20%, {border}20 2px, transparent 2px)',
    },
    floatingElements: ['🐠', '🐟', '🐡', '🐙', '🐬', '🐳', '🌟', '💧', '🐚', '🦈'],
    icons: { home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨', magic: '🐠' },
    animations: {
      button: 'float',
      card: 'wave',
      hover: 'rise',
      transition: '0.3s ease-out'
    },
    font: { title: "'Quicksand', system-ui", body: "'Quicksand', system-ui", size: { title: '28px', body: '16px' } },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%2340E0D0\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '30px 10px 30px 10px',
      shadow: '0 8px 0 {secondary}80',
      gradient: 'linear-gradient(135deg, {primary}, {secondary})'
    },
    cardStyle: {
      borderRadius: '20px 40px 20px 40px',
      shadow: '0 8px 0 {secondary}80',
      border: '3px solid {primary}'
    },
    chipStyle: {
      borderRadius: '20px',
      background: '{primary}40',
      activeBackground: '{primary}'
    },
    sound: 'wave',
    magic: { particles: true, glow: true, sparkles: true, soundEnabled: true },
    tempRange: { saturation: [0.7, 1.3], animationIntensity: [0.4, 1.6], particleCount: [5, 18] }
  }
};

export const colorPalettes: Record<ColorPaletteId, ColorPalette> = {
  pastel: {
    id: 'pastel',
    name: 'Пастельная',
    colors: {
      primary: '#FFB6C1',
      secondary: '#C0F0C0',
      background: '#FFF9F0',
      card: '#FFFFFF',
      text: '#4A4A4A',
      border: '#E0E0E0'
    }
  },
  bright: {
    id: 'bright',
    name: 'Яркая',
    colors: {
      primary: '#FF4500',
      secondary: '#FFD700',
      background: '#FFF5E6',
      card: '#FFFFFF',
      text: '#1A1A1A',
      border: '#FFA500'
    }
  },
  dark: {
    id: 'dark',
    name: 'Тёмная',
    colors: {
      primary: '#8A2BE2',
      secondary: '#4B0082',
      background: '#0F0F1A',
      card: '#1E1E2A',
      text: '#EAEAEA',
      border: '#3A3A4A'
    }
  },
  warm: {
    id: 'warm',
    name: 'Тёплая',
    colors: {
      primary: '#E67E22',
      secondary: '#F1C40F',
      background: '#FEF5E7',
      card: '#FFFFFF',
      text: '#5D3A1A',
      border: '#F39C12'
    }
  }
};