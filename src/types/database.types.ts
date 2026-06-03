export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          id: string
          name: string
          speed: string
          price: string
          description: string | null
          features: string[] | null
          active: boolean
          is_popular: boolean
          category: "internet_only" | "internet_tv"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          speed: string
          price: string
          description?: string | null
          features?: string[] | null
          active?: boolean
          is_popular?: boolean
          category?: "internet_only" | "internet_tv"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          speed?: string
          price?: string
          description?: string | null
          features?: string[] | null
          active?: boolean
          is_popular?: boolean
          category?: "internet_only" | "internet_tv"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      areas: {
        Row: {
          id: string
          city: string
          slug: string
          description: string | null
          latitude: number | null
          longitude: number | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city: string
          slug: string
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city?: string
          slug?: string
          description?: string | null
          latitude?: number | null
          longitude?: number | null
          active?: boolean
          created_at?: string
          updated_at?: string
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

