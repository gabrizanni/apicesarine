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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      booking_audit: {
        Row: {
          action: string
          booking_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          user_email: string | null
        }
        Insert: {
          action: string
          booking_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
        }
        Update: {
          action?: string
          booking_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_audit_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          assigned_educator_id: string | null
          created_at: string
          id: string
          internal_notes: string | null
          message: string | null
          notes: string | null
          organization: string | null
          participants_count: number | null
          preferred_date: string | null
          requester_email: string
          requester_name: string
          requester_phone: string | null
          status: string | null
          updated_at: string
          workshop_id: string | null
        }
        Insert: {
          assigned_educator_id?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          message?: string | null
          notes?: string | null
          organization?: string | null
          participants_count?: number | null
          preferred_date?: string | null
          requester_email: string
          requester_name: string
          requester_phone?: string | null
          status?: string | null
          updated_at?: string
          workshop_id?: string | null
        }
        Update: {
          assigned_educator_id?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          message?: string | null
          notes?: string | null
          organization?: string | null
          participants_count?: number | null
          preferred_date?: string | null
          requester_email?: string
          requester_name?: string
          requester_phone?: string | null
          status?: string | null
          updated_at?: string
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_assigned_educator_id_fkey"
            columns: ["assigned_educator_id"]
            isOneToOne: false
            referencedRelation: "educators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      educators: {
        Row: {
          availability_notes: string | null
          available_days: Json | null
          available_regions: Json | null
          avatar_url: string | null
          bio: string | null
          cover_image_alt: string | null
          cover_image_url: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          slug: string | null
          specialization: string | null
          updated_at: string
        }
        Insert: {
          availability_notes?: string | null
          available_days?: Json | null
          available_regions?: Json | null
          avatar_url?: string | null
          bio?: string | null
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          slug?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          availability_notes?: string | null
          available_days?: Json | null
          available_regions?: Json | null
          avatar_url?: string | null
          bio?: string | null
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          slug?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      material_access_codes: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          created_at: string
          description: string | null
          download_count: number | null
          file_size: string | null
          file_type: string
          file_url: string | null
          id: string
          is_premium: boolean | null
          tags: Json | null
          target_age_group: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_size?: string | null
          file_type: string
          file_url?: string | null
          id?: string
          is_premium?: boolean | null
          tags?: Json | null
          target_age_group?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_size?: string | null
          file_type?: string
          file_url?: string | null
          id?: string
          is_premium?: boolean | null
          tags?: Json | null
          target_age_group?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_alt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          slug: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_alt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_alt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          slug?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string
          id: string
          ip_address: string
          request_count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address: string
          request_count?: number
          updated_at?: string
          window_start: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      redirects: {
        Row: {
          created_at: string
          from_path: string
          id: string
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_path: string
          id?: string
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_path?: string
          id?: string
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workshops: {
        Row: {
          cover_image_alt: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          max_participants: number | null
          price: number | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          price?: number | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_alt?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          price?: number | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_educator_profiles: {
        Args: Record<PropertyKey, never>
        Returns: {
          available_days: Json
          available_regions: Json
          avatar_url: string
          bio: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          specialization: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_download_count: {
        Args: { material_id: string }
        Returns: undefined
      }
      log_booking_audit: {
        Args: {
          p_action: string
          p_booking_id?: string
          p_metadata?: Json
          p_user_email: string
        }
        Returns: undefined
      }
      validate_access_code: {
        Args: { input_code: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
