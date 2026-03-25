export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          name: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cached_stories: {
        Row: {
          art_style: string
          child_age: number | null
          content: Json
          created_at: string
          id: string
          interests: string[] | null
          last_accessed: string | null
          moral_theme: string | null
          parameters_hash: string | null
          title: string
          usage_count: number | null
        }
        Insert: {
          art_style: string
          child_age?: number | null
          content: Json
          created_at?: string
          id?: string
          interests?: string[] | null
          last_accessed?: string | null
          moral_theme?: string | null
          parameters_hash?: string | null
          title: string
          usage_count?: number | null
        }
        Update: {
          art_style?: string
          child_age?: number | null
          content?: Json
          created_at?: string
          id?: string
          interests?: string[] | null
          last_accessed?: string | null
          moral_theme?: string | null
          parameters_hash?: string | null
          title?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      cached_text_stories: {
        Row: {
          art_style: string | null
          child_age: number | null
          content: Json
          created_at: string
          id: string
          interests: string[] | null
          last_accessed: string | null
          moral_theme: string | null
          parameters_hash: string | null
          title: string
          usage_count: number | null
        }
        Insert: {
          art_style?: string | null
          child_age?: number | null
          content: Json
          created_at?: string
          id?: string
          interests?: string[] | null
          last_accessed?: string | null
          moral_theme?: string | null
          parameters_hash?: string | null
          title: string
          usage_count?: number | null
        }
        Update: {
          art_style?: string | null
          child_age?: number | null
          content?: Json
          created_at?: string
          id?: string
          interests?: string[] | null
          last_accessed?: string | null
          moral_theme?: string | null
          parameters_hash?: string | null
          title?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      child_profiles: {
        Row: {
          age: number
          appearance: Json | null
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          age: number
          appearance?: Json | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          age?: number
          appearance?: Json | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ad_generations_remaining: number | null
          created_at: string
          email: string | null
          free_generations_used: number | null
          full_name: string | null
          id: string
          last_ad_reset: string | null
          selected_theme: string | null
          subscription_tier: string | null
          theme: string | null
        }
        Insert: {
          ad_generations_remaining?: number | null
          created_at?: string
          email?: string | null
          free_generations_used?: number | null
          full_name?: string | null
          id: string
          last_ad_reset?: string | null
          selected_theme?: string | null
          subscription_tier?: string | null
          theme?: string | null
        }
        Update: {
          ad_generations_remaining?: number | null
          created_at?: string
          email?: string | null
          free_generations_used?: number | null
          full_name?: string | null
          id?: string
          last_ad_reset?: string | null
          selected_theme?: string | null
          subscription_tier?: string | null
          theme?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          art_style: string | null
          child_age: number
          child_id: string | null
          child_name: string
          content: Json | null
          cover_image_url: string | null
          created_at: string
          id: string
          interests: string[] | null
          is_favorite: boolean | null
          moral_theme: string | null
          title: string
          user_id: string
        }
        Insert: {
          art_style?: string | null
          child_age: number
          child_id?: string | null
          child_name: string
          content?: Json | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          interests?: string[] | null
          is_favorite?: boolean | null
          moral_theme?: string | null
          title: string
          user_id: string
        }
        Update: {
          art_style?: string | null
          child_age?: number
          child_id?: string | null
          child_name?: string
          content?: Json | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          interests?: string[] | null
          is_favorite?: boolean | null
          moral_theme?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "child_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          category_id: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          account_id: string
          amount: number
          category_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number
          category_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_cached_stories: {
        Row: {
          story_id: string
          user_id: string
        }
        Insert: {
          story_id: string
          user_id: string
        }
        Update: {
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_cached_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "cached_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_cached_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_cached_text_stories: {
        Row: {
          story_id: string
          user_id: string
        }
        Insert: {
          story_id: string
          user_id: string
        }
        Update: {
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_cached_text_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "cached_text_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_cached_text_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
