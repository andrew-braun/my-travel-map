export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          capital_city: string | null
          continent: Database["public"]["Enums"]["continents"] | null
          country_name: string | null
          id: number
          iso2: string
          iso3: string | null
          latitude: number | null
          local_name: string | null
          longitude: number | null
          region_iso2: string | null
        }
        Insert: {
          capital_city?: string | null
          continent?: Database["public"]["Enums"]["continents"] | null
          country_name?: string | null
          id?: number
          iso2: string
          iso3?: string | null
          latitude?: number | null
          local_name?: string | null
          longitude?: number | null
          region_iso2?: string | null
        }
        Update: {
          capital_city?: string | null
          continent?: Database["public"]["Enums"]["continents"] | null
          country_name?: string | null
          id?: number
          iso2?: string
          iso3?: string | null
          latitude?: number | null
          local_name?: string | null
          longitude?: number | null
          region_iso2?: string | null
        }
      }
      countries_old: {
        Row: {
          capital_city: string | null
          iso2Code: string
          latitude: number | null
          longitude: number | null
          name: string
          region_iso_2_code: string | null
        }
        Insert: {
          capital_city?: string | null
          iso2Code: string
          latitude?: number | null
          longitude?: number | null
          name: string
          region_iso_2_code?: string | null
        }
        Update: {
          capital_city?: string | null
          iso2Code?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          region_iso_2_code?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      user_countries_visited: {
        Row: {
          created_at: string | null
          id: number
          iso2: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          iso2: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          iso2?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
