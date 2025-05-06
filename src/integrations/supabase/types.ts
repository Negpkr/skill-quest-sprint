export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          content: string | null
          created_at: string | null
          day: number
          description: string | null
          id: string
          resources: string | null
          sprint_id: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          day: number
          description?: string | null
          id?: string
          resources?: string | null
          sprint_id?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          day?: number
          description?: string | null
          id?: string
          resources?: string | null
          sprint_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          likes: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sprints: {
        Row: {
          category: string
          cover_image: string | null
          created_at: string | null
          description: string | null
          difficulty: string
          duration: number | null
          id: string
          title: string
        }
        Insert: {
          category: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          difficulty: string
          duration?: number | null
          id?: string
          title: string
        }
        Update: {
          category?: string
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string
          duration?: number | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      streaks: {
        Row: {
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          user_id?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          description: string | null
          file_url: string | null
          id: string
          title: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          challenge_id: string | null
          completed: boolean | null
          completed_date: string | null
          id: string
          notes: string | null
          sprint_id: string | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          challenge_id?: string | null
          completed?: boolean | null
          completed_date?: string | null
          id?: string
          notes?: string | null
          sprint_id?: string | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string | null
          completed?: boolean | null
          completed_date?: string | null
          id?: string
          notes?: string | null
          sprint_id?: string | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          id: number
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          password?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
