/* ============================================================
   Petit Stay V3 — Supabase Database Types (manual)
   Supabase CLI 없이 수동 정의. schema.sql과 동기화 유지할 것.
   ============================================================ */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ── Enums ──

export type UserRole = 'parent' | 'sitter' | 'partner' | 'admin'
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type BusinessType = 'hotel' | 'residence' | 'airbnb' | 'other'

// ── JSON sub-types ──

export interface SitterLanguage {
  lang: string
  level: 'L1' | 'L2' | 'L3'
}

export interface SitterCertification {
  name: string
  issued_by?: string
  year?: number
}

// ── Database ──

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: UserRole
          full_name: string
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: UserRole
          full_name: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: UserRole
          full_name?: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      sitter_profiles: {
        Row: {
          id: string
          bio: string | null
          hourly_rate: number
          languages: SitterLanguage[]
          certifications: SitterCertification[]
          is_verified: boolean
          is_active: boolean
          rating_avg: number
          review_count: number
          response_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          bio?: string | null
          hourly_rate: number
          languages?: SitterLanguage[]
          certifications?: SitterCertification[]
          is_verified?: boolean
          is_active?: boolean
          rating_avg?: number
          review_count?: number
          response_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bio?: string | null
          hourly_rate?: number
          languages?: SitterLanguage[]
          certifications?: SitterCertification[]
          is_verified?: boolean
          is_active?: boolean
          rating_avg?: number
          review_count?: number
          response_rate?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sitter_profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }

      sitter_availability: {
        Row: {
          id: string
          sitter_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean
        }
        Insert: {
          id?: string
          sitter_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean
        }
        Update: {
          id?: string
          sitter_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'sitter_availability_sitter_id_fkey'
            columns: ['sitter_id']
            referencedRelation: 'sitter_profiles'
            referencedColumns: ['id']
          },
        ]
      }

      bookings: {
        Row: {
          id: string
          parent_id: string
          sitter_id: string
          partner_referral_id: string | null
          status: BookingStatus
          date: string
          start_time: string
          end_time: string
          total_amount: number
          service_fee: number
          net_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          sitter_id: string
          partner_referral_id?: string | null
          status?: BookingStatus
          date: string
          start_time: string
          end_time: string
          total_amount: number
          service_fee: number
          net_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          sitter_id?: string
          partner_referral_id?: string | null
          status?: BookingStatus
          date?: string
          start_time?: string
          end_time?: string
          total_amount?: number
          service_fee?: number
          net_amount?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_parent_id_fkey'
            columns: ['parent_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_sitter_id_fkey'
            columns: ['sitter_id']
            referencedRelation: 'sitter_profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_partner_referral_id_fkey'
            columns: ['partner_referral_id']
            referencedRelation: 'partner_referrals'
            referencedColumns: ['id']
          },
        ]
      }

      booking_children: {
        Row: {
          id: string
          booking_id: string
          name: string
          age: number
          special_notes: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          name: string
          age: number
          special_notes?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          name?: string
          age?: number
          special_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'booking_children_booking_id_fkey'
            columns: ['booking_id']
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
        ]
      }

      booking_emergency_contacts: {
        Row: {
          id: string
          booking_id: string
          name: string
          phone: string
          relationship: string
        }
        Insert: {
          id?: string
          booking_id: string
          name: string
          phone: string
          relationship: string
        }
        Update: {
          id?: string
          booking_id?: string
          name?: string
          phone?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: 'booking_emergency_contacts_booking_id_fkey'
            columns: ['booking_id']
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
        ]
      }

      session_reports: {
        Row: {
          id: string
          booking_id: string
          sitter_id: string
          check_in_at: string
          check_out_at: string | null
          activities: string | null
          mood_behavior: string | null
          sleep_notes: string | null
          additional_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          sitter_id: string
          check_in_at: string
          check_out_at?: string | null
          activities?: string | null
          mood_behavior?: string | null
          sleep_notes?: string | null
          additional_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          sitter_id?: string
          check_in_at?: string
          check_out_at?: string | null
          activities?: string | null
          mood_behavior?: string | null
          sleep_notes?: string | null
          additional_notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'session_reports_booking_id_fkey'
            columns: ['booking_id']
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'session_reports_sitter_id_fkey'
            columns: ['sitter_id']
            referencedRelation: 'sitter_profiles'
            referencedColumns: ['id']
          },
        ]
      }

      reviews: {
        Row: {
          id: string
          booking_id: string
          parent_id: string
          sitter_id: string
          rating: number
          keywords: string[]
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          parent_id: string
          sitter_id: string
          rating: number
          keywords?: string[]
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          parent_id?: string
          sitter_id?: string
          rating?: number
          keywords?: string[]
          comment?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_booking_id_fkey'
            columns: ['booking_id']
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_parent_id_fkey'
            columns: ['parent_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_sitter_id_fkey'
            columns: ['sitter_id']
            referencedRelation: 'sitter_profiles'
            referencedColumns: ['id']
          },
        ]
      }

      partner_accounts: {
        Row: {
          id: string
          business_name: string
          business_type: BusinessType
          referral_code: string
          created_at: string
        }
        Insert: {
          id: string
          business_name: string
          business_type: BusinessType
          referral_code: string
          created_at?: string
        }
        Update: {
          id?: string
          business_name?: string
          business_type?: BusinessType
          referral_code?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'partner_accounts_id_fkey'
            columns: ['id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }

      partner_referrals: {
        Row: {
          id: string
          partner_id: string
          booking_id: string
          created_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          booking_id: string
          created_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          booking_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'partner_referrals_partner_id_fkey'
            columns: ['partner_id']
            referencedRelation: 'partner_accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'partner_referrals_booking_id_fkey'
            columns: ['booking_id']
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
        ]
      }
    }

    Views: Record<string, never>

    Functions: Record<string, never>

    Enums: {
      user_role: UserRole
      booking_status: BookingStatus
      business_type: BusinessType
    }
  }
}

// ── Convenience aliases ──

export type Profile = Database['public']['Tables']['profiles']['Row']
export type SitterProfile = Database['public']['Tables']['sitter_profiles']['Row']
export type SitterAvailability = Database['public']['Tables']['sitter_availability']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type BookingChild = Database['public']['Tables']['booking_children']['Row']
export type BookingEmergencyContact = Database['public']['Tables']['booking_emergency_contacts']['Row']
export type SessionReport = Database['public']['Tables']['session_reports']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type PartnerAccount = Database['public']['Tables']['partner_accounts']['Row']
export type PartnerReferral = Database['public']['Tables']['partner_referrals']['Row']
