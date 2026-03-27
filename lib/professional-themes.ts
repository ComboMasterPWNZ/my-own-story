import { ProfessionalUITheme, UIThemeId } from './types';

// Базовые URL для фоновых изображений (временные, позже заменим на реальные)
const BASE_BACKGROUND_URL = '/themes/backgrounds';

export const professionalThemes: Record<UIThemeId, ProfessionalUITheme> = {
  candy: {
    id: 'candy',
    name: '🍬 Конфетный мир',
    description: 'Сладкое приключение в мире леденцов и пирожных',
    
    colors: {
      light: {
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        accent: '#FFD700',
        
        background: '#FFF0F5',
        card: '#FFFFFF',
        surface: '#FFE4E1',
        
        text: {
          primary: '#4A4A4A',
          secondary: '#7A7A7A',
          disabled: '#B0B0B0',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#FFC0CB',
          medium: '#FF69B4',
          strong: '#C41E3A',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        accent: '#FFD700',
        
        background: '#1A1A2E',
        card: '#2A2A4A',
        surface: '#3A3A5A',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#FF69B4',
          medium: '#FFB6C1',
          strong: '#FFC0CB',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/candy/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/candy/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.3,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(255,192,203,0.1) 0%, rgba(255,105,180,0.1) 100%)',
        noise: true,
        grain: false,
        vignette: true,
      },
      
      animations: {
        floatingElements: ['🍬', '🍭', '🍫', '🧁', '🍰', '🍪', '🍩'],
        particleCount: 15,
        glowIntensity: 0.7,
        sparkleFrequency: 0.5,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      shadows: {
        sm: '0 2px 4px rgba(255, 105, 180, 0.1)',
        md: '0 4px 8px rgba(255, 105, 180, 0.15)',
        lg: '0 8px 16px rgba(255, 105, 180, 0.2)',
        xl: '0 12px 24px rgba(255, 105, 180, 0.25)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'bounce',
        card: 'wiggle',
        hover: 'scale',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Bubblegum Sans', cursive",
        body: "'Comic Neue', cursive",
        accent: "'Bubblegum Sans', cursive",
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        xxl: '36px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '✨',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23FF69B4\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'pop',
    },
  },
  
  ocean: {
    id: 'ocean',
    name: '🌊 Океанское дно',
    description: 'Погружение в мир волн, пузырьков и морских обитателей',
    
    colors: {
      light: {
        primary: '#40E0D0',
        secondary: '#20B2AA',
        accent: '#FFD700',
        
        background: '#E0FFFF',
        card: '#FFFFFF',
        surface: '#B0E0E6',
        
        text: {
          primary: '#008B8B',
          secondary: '#5F9EA0',
          disabled: '#A9A9A9',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#87CEEB',
          medium: '#40E0D0',
          strong: '#008B8B',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#40E0D0',
        secondary: '#20B2AA',
        accent: '#FFD700',
        
        background: '#0A1F44',
        card: '#152E5A',
        surface: '#1E3D72',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#40E0D0',
          medium: '#20B2AA',
          strong: '#008B8B',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/ocean/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/ocean/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.4,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(32, 178, 170, 0.1) 100%)',
        noise: true,
        grain: true,
        vignette: false,
      },
      
      animations: {
        floatingElements: ['🐟', '🐠', '🐡', '🐙', '🐬', '🐳', '🌟', '💧'],
        particleCount: 12,
        glowIntensity: 0.6,
        sparkleFrequency: 0.4,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      shadows: {
        sm: '0 2px 4px rgba(64, 224, 208, 0.1)',
        md: '0 4px 8px rgba(64, 224, 208, 0.15)',
        lg: '0 8px 16px rgba(64, 224, 208, 0.2)',
        xl: '0 12px 24px rgba(64, 224, 208, 0.25)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '200ms',
        normal: '400ms',
        slow: '600ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'float',
        card: 'wave',
        hover: 'rise',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Quicksand', system-ui",
        body: "'Quicksand', system-ui",
        accent: "'Quicksand', system-ui",
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        xxl: '36px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '🌊',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%2340E0D0\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'wave',
    },
  },
  
  forest: {
    id: 'forest',
    name: '🌲 Волшебный лес',
    description: 'Путешествие по зелёным полянам с грибочками и лесными жителями',
    
    colors: {
      light: {
        primary: '#228B22',
        secondary: '#32CD32',
        accent: '#FFD700',
        
        background: '#F0FFF0',
        card: '#FFFFFF',
        surface: '#E8F5E9',
        
        text: {
          primary: '#2E5C2E',
          secondary: '#5A7D5A',
          disabled: '#A9A9A9',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#90EE90',
          medium: '#32CD32',
          strong: '#228B22',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#32CD32',
        secondary: '#228B22',
        accent: '#FFD700',
        
        background: '#1A2F1A',
        card: '#254125',
        surface: '#2F532F',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#32CD32',
          medium: '#228B22',
          strong: '#90EE90',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/forest/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/forest/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.35,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(144, 238, 144, 0.1) 0%, rgba(50, 205, 50, 0.1) 100%)',
        noise: true,
        grain: false,
        vignette: true,
      },
      
      animations: {
        floatingElements: ['🍄', '🌿', '🍃', '🐞', '🐝', '🦋', '🐿️', '🌰'],
        particleCount: 10,
        glowIntensity: 0.5,
        sparkleFrequency: 0.3,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
      shadows: {
        sm: '0 2px 4px rgba(34, 139, 34, 0.1)',
        md: '0 4px 8px rgba(34, 139, 34, 0.15)',
        lg: '0 8px 16px rgba(34, 139, 34, 0.2)',
        xl: '0 12px 24px rgba(34, 139, 34, 0.25)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '180ms',
        normal: '350ms',
        slow: '550ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'pop',
        card: 'leaf',
        hover: 'grow',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Nunito', system-ui",
        body: "'Nunito', system-ui",
        accent: "'Nunito', system-ui",
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        xxl: '36px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '🍃',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23228B22\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'leaf',
    },
  },
  
  space: {
    id: 'space',
    name: '🚀 Космическое путешествие',
    description: 'Полет к звёздам через далёкие галактики и туманности',
    
    colors: {
      light: {
        primary: '#4B0082',
        secondary: '#8A2BE2',
        accent: '#FFD700',
        
        background: '#F0F0FF',
        card: '#FFFFFF',
        surface: '#E6E6FA',
        
        text: {
          primary: '#1A1A2E',
          secondary: '#4A4A6A',
          disabled: '#A0A0B0',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#D8BFD8',
          medium: '#8A2BE2',
          strong: '#4B0082',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#8A2BE2',
        secondary: '#4B0082',
        accent: '#FFD700',
        
        background: '#0B1026',
        card: '#1A1F3D',
        surface: '#2A2F54',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#8A2BE2',
          medium: '#4B0082',
          strong: '#D8BFD8',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/space/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/space/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.5,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(75, 0, 130, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%)',
        noise: true,
        grain: true,
        vignette: true,
      },
      
      animations: {
        floatingElements: ['⭐', '🌟', '✨', '🚀', '🛸', '🌙', '☄️', '🪐'],
        particleCount: 20,
        glowIntensity: 0.8,
        sparkleFrequency: 0.6,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      shadows: {
        sm: '0 2px 4px rgba(138, 43, 226, 0.2)',
        md: '0 4px 8px rgba(138, 43, 226, 0.3)',
        lg: '0 8px 16px rgba(138, 43, 226, 0.4)',
        xl: '0 12px 24px rgba(138, 43, 226, 0.5)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '100ms',
        normal: '250ms',
        slow: '400ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'spin',
        card: 'glow',
        hover: 'lift',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Orbitron', monospace",
        body: "'Orbitron', system-ui",
        accent: "'Orbitron', monospace",
      },
      sizes: {
        xs: '11px',
        sm: '13px',
        md: '15px',
        lg: '18px',
        xl: '24px',
        xxl: '32px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '🚀',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%234B0082\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'whoosh',
    },
  },
  
  rainbow: {
    id: 'rainbow',
    name: '🌈 Радужный праздник',
    description: 'Весёлый праздник со всеми цветами радуги и волшебством',
    
    colors: {
      light: {
        primary: '#FF0000',
        secondary: '#FF8C00',
        accent: '#FFD700',
        
        background: '#FFFFF0',
        card: '#FFFFFF',
        surface: '#FFF8DC',
        
        text: {
          primary: '#4A4A4A',
          secondary: '#7A7A7A',
          disabled: '#B0B0B0',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#FF6B6B',
          medium: '#FF8C00',
          strong: '#FF0000',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#FF8C00',
        secondary: '#FF0000',
        accent: '#FFD700',
        
        background: '#2E1B3A',
        card: '#3F264F',
        surface: '#503160',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#FF8C00',
          medium: '#FF0000',
          strong: '#FF6B6B',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/rainbow/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/rainbow/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.4,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(255, 0, 0, 0.05) 0%, rgba(255, 140, 0, 0.05) 25%, rgba(255, 215, 0, 0.05) 50%, rgba(0, 128, 0, 0.05) 75%, rgba(0, 0, 255, 0.05) 100%)',
        noise: false,
        grain: false,
        vignette: false,
      },
      
      animations: {
        floatingElements: ['🌈', '☀️', '🌟', '🌸', '🦄', '🎈', '🎉', '✨'],
        particleCount: 25,
        glowIntensity: 0.9,
        sparkleFrequency: 0.7,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '10px',
        sm: '15px',
        md: '20px',
        lg: '25px',
        xl: '30px',
      },
      shadows: {
        sm: '0 2px 4px rgba(255, 0, 0, 0.1)',
        md: '0 4px 8px rgba(255, 140, 0, 0.15)',
        lg: '0 8px 16px rgba(255, 215, 0, 0.2)',
        xl: '0 12px 24px rgba(0, 128, 0, 0.25)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '120ms',
        normal: '280ms',
        slow: '450ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'rainbow',
        card: 'colorful',
        hover: 'glow',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Bungee', cursive",
        body: "'Comic Neue', cursive",
        accent: "'Bungee', cursive",
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        xxl: '36px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '🌈',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%23FF8C00\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'magic',
    },
  },
  
  underwater: {
    id: 'underwater',
    name: '🐠 Подводное царство',
    description: 'Глубоководное приключение с морскими обитателями и сокровищами',
    
    colors: {
      light: {
        primary: '#40E0D0',
        secondary: '#20B2AA',
        accent: '#FF7F50',
        
        background: '#E0FFFF',
        card: '#FFFFFF',
        surface: '#B0E0E6',
        
        text: {
          primary: '#008B8B',
          secondary: '#5F9EA0',
          disabled: '#A9A9A9',
          onPrimary: '#FFFFFF',
          onSecondary: '#FFFFFF',
        },
        
        border: {
          light: '#87CEEB',
          medium: '#40E0D0',
          strong: '#008B8B',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      
      dark: {
        primary: '#40E0D0',
        secondary: '#20B2AA',
        accent: '#FF7F50',
        
        background: '#0A1F44',
        card: '#152E5A',
        surface: '#1E3D72',
        
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#A0A0A0',
          onPrimary: '#000000',
          onSecondary: '#000000',
        },
        
        border: {
          light: '#40E0D0',
          medium: '#20B2AA',
          strong: '#008B8B',
        },
        
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
    },
    
    background: {
      image: {
        light: `${BASE_BACKGROUND_URL}/underwater/light.svg`,
        dark: `${BASE_BACKGROUND_URL}/underwater/dark.svg`,
        blendMode: 'overlay',
        opacity: 0.4,
        position: 'center',
        size: 'cover',
      },
      
      effects: {
        overlay: 'linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(255, 127, 80, 0.1) 100%)',
        noise: true,
        grain: true,
        vignette: false,
      },
      
      animations: {
        floatingElements: ['🐠', '🐟', '🐡', '🐙', '🐬', '🐳', '🌟', '💧', '🐚', '🦈'],
        particleCount: 15,
        glowIntensity: 0.6,
        sparkleFrequency: 0.5,
      },
    },
    
    styles: {
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
      shadows: {
        sm: '0 2px 4px rgba(64, 224, 208, 0.1)',
        md: '0 4px 8px rgba(64, 224, 208, 0.15)',
        lg: '0 8px 16px rgba(64, 224, 208, 0.2)',
        xl: '0 12px 24px rgba(64, 224, 208, 0.25)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    animations: {
      durations: {
        fast: '180ms',
        normal: '350ms',
        slow: '550ms',
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      effects: {
        button: 'float',
        card: 'wave',
        hover: 'rise',
        focus: 'glow',
      },
    },
    
    typography: {
      fonts: {
        title: "'Quicksand', system-ui",
        body: "'Quicksand', system-ui",
        accent: "'Quicksand', system-ui",
      },
      sizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '28px',
        xxl: '36px',
      },
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
    
    decorations: {
      icons: {
        home: '🏠',
        create: '✨',
        profile: '👤',
        favorite: '❤️',
        back: '⬅️',
        theme: '🎨',
        magic: '🐠',
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'14\' fill=\'%2340E0D0\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Ccircle cx=\'22\' cy=\'10\' r=\'3\' fill=\'white\'/%3E%3Cpath d=\'M8 20 Q16 28 24 20\' stroke=\'white\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"), auto',
      sound: 'wave',
    },
  },
};
