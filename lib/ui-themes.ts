import { UITheme, UIThemeId } from './types';

export const uiThemes: Record<UIThemeId, UITheme> = {
  candy: {
    id: 'candy',
    nameKey: 'candy',
    descriptionKey: 'candyDesc',
    previewColor: '#FF69B4',
    background: {
      main: '#FFF0F5',
      gradient: 'radial-gradient(circle at 20% 30%, #FFB6C1, #FF69B4)',
      pattern: 'repeating-linear-gradient(45deg, #FFB6C1 0px, #FFB6C1 20px, #FFC0CB 20px, #FFC0CB 40px)',
    },
    floatingElements: ['🍬', '🍭', '🍫', '🧁', '🍰', '🍪', '🍩'],
    icons: {
      home: '🏠', create: '✨', profile: '👤', favorite: '❤️', back: '⬅️', theme: '🎨'
    },
    animation: {
      hoverEffect: 'translateY(-8px) rotate(2deg)',
      transition: '0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    typography: {
      titleFont: "'Bubblegum Sans', cursive",
      bodyFont: "'Comic Neue', cursive",
      titleWeight: '800'
    },
    font: {
      title: "'Bubblegum Sans', cursive",
      body: "'Comic Neue', cursive",
      size: { title: '28px', body: '16px' }
    },
    cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23FF69B4\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
    buttonStyle: {
      borderRadius: '60% 40% 50% 50% / 60% 50% 60% 40%',
      shadow: '0 8px 0 #C41E3A',
      gradient: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
      padding: '12px 24px',
      hoverScale: '1.05',
      textColor: '#FFFFFF'
    },
    cardStyle: {
      borderRadius: '30px 20px 40px 25px',
      shadow: '0 10px 0 #C41E3A',
      border: '3px solid #FF69B4',
      background: 'linear-gradient(135deg, #FFF0F5, #FFE4E1)'
    },
    chipStyle: {
      borderRadius: '30px',
      background: '#FFB6C1',
      activeBackground: '#FF69B4',
      textColor: '#FFFFFF'
    },
    sound: 'pop'
  },
  ocean: {
    id: 'ocean',
    nameKey: 'ocean',
    descriptionKey: 'oceanDesc',
    previewColor: '#40E0D0',
    button: {
      borderRadius: '30px 10px 30px 10px',
      padding: '12px 24px',
      shadow: '0 8px 0 #008B8B',
      hoverScale: '1.05',
      gradientStart: '#40E0D0',
      gradientEnd: '#20B2AA',
      textColor: '#FFFFFF',
    },
    card: {
      borderRadius: '20px 40px 20px 40px',
      shadow: '0 8px 20px rgba(64, 224, 208, 0.3)',
      background: 'linear-gradient(135deg, #E0FFFF, #B0E0E6)',
      border: '3px solid #40E0D0',
    },
    chip: {
      borderRadius: '20px',
      background: '#7FFFD4',
      activeBackground: '#40E0D0',
      textColor: '#008B8B',
    },
    background: {
      main: '#E0FFFF',
      gradient: 'linear-gradient(135deg, #E0FFFF, #87CEEB, #40E0D0)',
    },
    typography: {
      titleFont: "'Quicksand', system-ui",
      bodyFont: "'Quicksand', system-ui",
      titleWeight: '700',
    },
    animation: {
      hoverEffect: 'translateY(-5px) scale(1.02)',
      transition: 'all 0.3s ease-out',
    },
  },
  forest: {
    id: 'forest',
    nameKey: 'forest',
    descriptionKey: 'forestDesc',
    previewColor: '#228B22',
    button: {
      borderRadius: '20px 8px 20px 8px',
      padding: '12px 24px',
      shadow: '0 6px 0 #2E5C2E',
      hoverScale: '1.05',
      gradientStart: '#32CD32',
      gradientEnd: '#228B22',
      textColor: '#FFFFFF',
    },
    card: {
      borderRadius: '20px',
      shadow: '0 6px 15px rgba(34, 139, 34, 0.3)',
      background: 'linear-gradient(135deg, #F0FFF0, #E8F5E9)',
      border: '3px solid #32CD32',
    },
    chip: {
      borderRadius: '16px',
      background: '#90EE90',
      activeBackground: '#32CD32',
      textColor: '#228B22',
    },
    background: {
      main: '#F0FFF0',
      gradient: 'linear-gradient(135deg, #F0FFF0, #C8E6C9, #A5D6A7)',
    },
    typography: {
      titleFont: "'Nunito', system-ui",
      bodyFont: "'Nunito', system-ui",
      titleWeight: '700',
    },
    animation: {
      hoverEffect: 'translateY(-4px)',
      transition: 'all 0.2s ease',
    },
  },
  space: {
    id: 'space',
    nameKey: 'space',
    descriptionKey: 'spaceDesc',
    previewColor: '#4B0082',
    button: {
      borderRadius: '15px 30px 15px 30px',
      padding: '12px 24px',
      shadow: '0 6px 0 #2E0854',
      hoverScale: '1.05',
      gradientStart: '#6A0DAD',
      gradientEnd: '#4B0082',
      textColor: '#FFD700',
    },
    card: {
      borderRadius: '20px',
      shadow: '0 8px 20px rgba(75, 0, 130, 0.4)',
      background: 'linear-gradient(135deg, #1A0B2E, #2D1B4E)',
      border: '2px solid #FFD700',
    },
    chip: {
      borderRadius: '20px',
      background: '#4B0082',
      activeBackground: '#8A2BE2',
      textColor: '#FFD700',
    },
    background: {
      main: '#0B0B2B',
      gradient: 'radial-gradient(circle at 30% 20%, #1A0B2E, #0B0B1A, #000000)',
    },
    typography: {
      titleFont: "'Orbitron', 'Courier New', monospace",
      bodyFont: "'Orbitron', system-ui",
      titleWeight: '700',
    },
    animation: {
      hoverEffect: 'translateY(-5px) scale(1.05)',
      transition: 'all 0.3s ease',
    },
  },
  rainbow: {
    id: 'rainbow',
    nameKey: 'rainbow',
    descriptionKey: 'rainbowDesc',
    previewColor: '#FF0000',
    button: {
      borderRadius: '25px',
      padding: '12px 24px',
      shadow: '0 8px 0 #FF8C00',
      hoverScale: '1.05',
      gradientStart: '#FF0000',
      gradientEnd: '#FFD700',
      textColor: '#FFFFFF',
    },
    card: {
      borderRadius: '20px',
      shadow: '0 8px 20px rgba(255, 0, 0, 0.3)',
      background: 'linear-gradient(135deg, #FFFFF0, #FFF8DC)',
      border: '3px solid',
      borderImage: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) 1',
    },
    chip: {
      borderRadius: '20px',
      background: 'linear-gradient(45deg, #FF6B6B, #FFD93D)',
      activeBackground: 'linear-gradient(45deg, #6BCB77, #4D96FF)',
      textColor: '#FFFFFF',
    },
    background: {
      main: '#FFFFF0',
      gradient: 'linear-gradient(135deg, #FFE5E5, #E5FFE5, #E5E5FF, #FFE5FF)',
    },
    typography: {
      titleFont: "'Comic Sans MS', 'Comic Neue', cursive",
      bodyFont: "'Comic Neue', system-ui",
      titleWeight: '800',
    },
    animation: {
      hoverEffect: 'translateY(-4px) scale(1.02)',
      transition: 'all 0.2s ease-in-out',
    },
  },
  underwater: {
    id: 'underwater',
    nameKey: 'underwater',
    descriptionKey: 'underwaterDesc',
    previewColor: '#40E0D0',
    button: {
      borderRadius: '30px 10px 30px 10px',
      padding: '12px 24px',
      shadow: '0 8px 0 #008B8B',
      hoverScale: '1.05',
      gradientStart: '#40E0D0',
      gradientEnd: '#20B2AA',
      textColor: '#FFFFFF',
    },
    card: {
      borderRadius: '20px 40px 20px 40px',
      shadow: '0 8px 20px rgba(64, 224, 208, 0.3)',
      background: 'linear-gradient(135deg, #E0FFFF, #B0E0E6)',
      border: '3px solid #40E0D0',
    },
    chip: {
      borderRadius: '20px',
      background: '#7FFFD4',
      activeBackground: '#40E0D0',
      textColor: '#008B8B',
    },
    background: {
      main: '#E0FFFF',
      gradient: 'linear-gradient(135deg, #E0FFFF, #87CEEB, #40E0D0)',
    },
    typography: {
      titleFont: "'Quicksand', system-ui",
      bodyFont: "'Quicksand', system-ui",
      titleWeight: '700',
    },
    animation: {
      hoverEffect: 'translateY(-5px) scale(1.02)',
      transition: 'all 0.3s ease-out',
    },
  },
};
