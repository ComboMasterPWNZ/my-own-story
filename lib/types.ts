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
