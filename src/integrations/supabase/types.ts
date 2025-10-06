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
      categories: {
        Row: {
          created_at: string
          id: string
          image_url: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: Json
          total: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: Json
          total: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: Json
          total?: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          available: boolean | null
          category_slug: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          name: string
          price: number
          unit: string | null
          updated_at: string
        }
        Insert: {
          available?: boolean | null
          category_slug: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          name: string
          price: number
          unit?: string | null
          updated_at?: string
        }
        Update: {
          available?: boolean | null
          category_slug?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          name?: string
          price?: number
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
