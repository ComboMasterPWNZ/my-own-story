import { Database } from '@/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Story = Database['public']['Tables']['stories']['Row'];

export type ChildProfile = Database['public']['Tables']['child_profiles']['Row'];
export type ChildProfileInsert = Database['public']['Tables']['child_profiles']['Insert'];
export type ChildProfileUpdate = Database['public']['Tables']['child_profiles']['Update'];

export type CachedStory = Database['public']['Tables']['cached_stories']['Row'];
export type CachedTextStory = Database['public']['Tables']['cached_text_stories']['Row'];

export type UserCachedStory = Database['public']['Tables']['user_cached_stories']['Row'];
export type UserCachedTextStory = Database['public']['Tables']['user_cached_text_stories']['Row'];

export interface StoryPage {
  text: string;
  image_url: string | null;
  image_prompt?: string;
}

export type Gender = 'boy' | 'girl';
export type HairColor = 'blond' | 'brown' | 'red' | 'dark';
export type HairLength = 'short' | 'medium' | 'long';
export type EyeColor = 'blue' | 'green' | 'brown' | 'grey';

export interface Appearance {
  gender?: Gender;
  hair_color?: HairColor;
  hair_length?: HairLength;
  eye_color?: EyeColor;
}

export type UIThemeId = 'candy' | 'ocean' | 'forest' | 'space' | 'rainbow' | 'underwater';
export type ColorMode = 'light' | 'dark';

// Новая профессиональная система тем с поддержкой light/dark режимов
export interface ProfessionalUITheme {
  id: UIThemeId;
  name: string;
  description: string;
  
  // Цветовая система с отдельными палитрами для light/dark
  colors: {
    light: {
      // Основные
      primary: string;
      secondary: string;
      accent: string;
      
      // Фоновые
      background: string;
      card: string;
      surface: string;
      
      // Текстовые
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        onPrimary: string;
        onSecondary: string;
      };
      
      // Границы
      border: {
        light: string;
        medium: string;
        strong: string;
      };
      
      // Системные
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    
    dark: {
      // Основные
      primary: string;
      secondary: string;
      accent: string;
      
      // Фоновые
      background: string;
      card: string;
      surface: string;
      
      // Текстовые
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        onPrimary: string;
        onSecondary: string;
      };
      
      // Границы
      border: {
        light: string;
        medium: string;
        strong: string;
      };
      
      // Системные
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  
  // Фоновая система
  background: {
    // Основное фоновое изображение
    image: {
      light: string; // URL к light версии
      dark: string;  // URL к dark версии
      blendMode: string;
      opacity: number;
      position: string;
      size: string;
    };
    
    // Дополнительные эффекты
    effects: {
      overlay: string; // CSS gradient overlay
      noise: boolean;
      grain: boolean;
      vignette: boolean;
    };
    
    // Анимированные элементы
    animations: {
      floatingElements: string[];
      particleCount: number;
      glowIntensity: number;
      sparkleFrequency: number;
    };
  };
  
  // Стилевые параметры
  styles: {
    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  
  // Анимации
  animations: {
    durations: {
      fast: string;
      normal: string;
      slow: string;
    };
    easings: {
      standard: string;
      entrance: string;
      exit: string;
    };
    effects: {
      button: string;
      card: string;
      hover: string;
      focus: string;
    };
  };
  
  // Типографика
  typography: {
    fonts: {
      title: string;
      body: string;
      accent: string;
    };
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    weights: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
      black: number;
    };
  };
  
  // Декоративные элементы
  decorations: {
    icons: Record<string, string>;
    cursor: string;
    sound: string;
  };
}

// Настройки внешнего вида
export interface UIAppearanceSettings {
  themeId: UIThemeId;
  colorMode: ColorMode;
  temperature: number; // 0-1 интенсивность анимаций
  fairyDustEnabled: boolean; // Включена ли "Сказочная пыль"
  customizations?: {
    // Пользовательские настройки
    backgroundOpacity?: number;
    animationSpeed?: number;
    particleDensity?: number;
  };
}

// Старые интерфейсы для обратной совместимости
export interface UIStyle {
  id: UIThemeId;
  name: string;
  description: string;
  previewColor: string;
  background: {
    gradient: string;
    pattern?: string;
  };
  floatingElements: string[];
  icons: Record<string, string>;
  animations: {
    button: string;
    card: string;
    hover: string;
    transition: string;
  };
  font: {
    title: string;
    body: string;
    size: { title: string; body: string };
  };
  cursor: string;
  buttonStyle: {
    borderRadius: string;
    shadow: string;
    gradient: string;
  };
  cardStyle: {
    borderRadius: string;
    shadow: string;
    border?: string;
  };
  chipStyle: {
    borderRadius: string;
    background: string;
    activeBackground: string;
  };
  sound: string;
  magic: {
    particles: boolean;
    glow: boolean;
    sparkles: boolean;
    soundEnabled: boolean;
  };
  tempRange: {
    saturation: [number, number];
    animationIntensity: [number, number];
    particleCount: [number, number];
  };
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    border: string;
  };
}

export interface UITheme {
  id: UIThemeId;
  nameKey: string;
  descriptionKey: string;
  previewColor: string;
  button?: {
    borderRadius: string;
    padding: string;
    shadow: string;
    hoverScale: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
  };
  card?: {
    borderRadius: string;
    shadow: string;
    background: string;
    border: string;
    borderImage?: string;
  };
  chip?: {
    borderRadius: string;
    background: string;
    activeBackground: string;
    textColor: string;
  };
  background: {
    main: string;
    gradient: string;
    pattern?: string;
  };
  typography?: {
    titleFont: string;
    bodyFont: string;
    titleWeight: string;
  };
  animation: {
    hoverEffect: string;
    transition: string;
  };
  font?: {
    title: string;
    body: string;
    size: {
      title: string;
      body: string;
    };
  };
  floatingElements?: string[];
  icons?: {
    home: string;
    create: string;
    profile: string;
    favorite: string;
    back: string;
    theme: string;
  };
  cursor?: string;
  sound?: string;
  buttonStyle?: {
    borderRadius: string;
    shadow: string;
    gradient: string;
    padding: string;
    hoverScale: string;
    textColor: string;
  };
  cardStyle?: {
    borderRadius: string;
    shadow: string;
    border: string;
    background: string;
  };
  chipStyle?: {
    borderRadius: string;
    background: string;
    activeBackground: string;
    textColor: string;
  };
}
