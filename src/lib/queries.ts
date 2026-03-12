import { createClient } from '@/src/lib/supabase/server'
import type { SitterLanguage, SitterCertification, SitterAvailability } from '@/src/lib/supabase/types'

// ── Return types ──

export interface SitterListItem {
  id: string
  name: string
  bio: string | null
  hourly_rate: number
  rating_avg: number
  review_count: number
  languages: SitterLanguage[]
  certifications: SitterCertification[]
  is_verified: boolean
}

export interface SitterReview {
  id: string
  rating: number
  keywords: string[]
  comment: string | null
  created_at: string
  parent_name: string
}

export interface SitterDetail extends SitterListItem {
  response_rate: number
  reviews: SitterReview[]
  availability: SitterAvailability[]
}

// ── Helpers ──

export type SitterBadge = { label: string; variant: 'verified' | 'language' | 'certification' }

export function buildSitterBadges(sitter: Pick<SitterListItem, 'is_verified' | 'languages' | 'certifications'>): SitterBadge[] {
  const badges: SitterBadge[] = []
  if (sitter.is_verified) {
    badges.push({ label: 'Verified', variant: 'verified' })
  }
  for (const lang of sitter.languages) {
    badges.push({ label: `${lang.level} ${lang.lang}`, variant: 'language' })
  }
  for (const cert of sitter.certifications) {
    badges.push({ label: cert.name, variant: 'certification' })
  }
  return badges
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function formatAvailability(slots: SitterAvailability[]): string[] {
  if (slots.length === 0) return []
  const groups: { days: number[]; start: string; end: string }[] = []
  for (const slot of slots) {
    const existing = groups.find(g => g.start === slot.start_time && g.end === slot.end_time)
    if (existing) {
      existing.days.push(slot.day_of_week)
    } else {
      groups.push({ days: [slot.day_of_week], start: slot.start_time, end: slot.end_time })
    }
  }
  return groups.map(g => {
    const sorted = g.days.sort((a, b) => a - b)
    const dayRange = sorted.length === 1
      ? DAY_NAMES[sorted[0]]
      : `${DAY_NAMES[sorted[0]]} — ${DAY_NAMES[sorted[sorted.length - 1]]}`
    return `${dayRange}: ${g.start.slice(0, 5)} – ${g.end.slice(0, 5)}`
  })
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (diff < 1) return 'today'
  if (diff < 7) return `${diff} day${diff > 1 ? 's' : ''} ago`
  if (diff < 30) { const w = Math.floor(diff / 7); return `${w} week${w > 1 ? 's' : ''} ago` }
  if (diff < 365) { const m = Math.floor(diff / 30); return `${m} month${m > 1 ? 's' : ''} ago` }
  const y = Math.floor(diff / 365); return `${y} year${y > 1 ? 's' : ''} ago`
}

// ── Queries ──

export async function getSitters(limit?: number): Promise<SitterListItem[] | null> {
  const supabase = await createClient()

  let query = supabase
    .from('sitter_profiles')
    .select(`
      id,
      bio,
      hourly_rate,
      rating_avg,
      review_count,
      languages,
      certifications,
      is_verified,
      profiles!sitter_profiles_id_fkey (full_name)
    `)
    .eq('is_active', true)
    .order('rating_avg', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error || !data) return null

  return data.map((row) => ({
    id: row.id,
    name: (row.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Unknown',
    bio: row.bio,
    hourly_rate: row.hourly_rate,
    rating_avg: row.rating_avg,
    review_count: row.review_count,
    languages: (row.languages ?? []) as SitterLanguage[],
    certifications: (row.certifications ?? []) as SitterCertification[],
    is_verified: row.is_verified,
  }))
}

export async function getSitterById(id: string): Promise<SitterDetail | null> {
  const supabase = await createClient()

  const { data: sitter, error } = await supabase
    .from('sitter_profiles')
    .select(`
      id,
      bio,
      hourly_rate,
      rating_avg,
      review_count,
      languages,
      certifications,
      is_verified,
      response_rate,
      profiles!sitter_profiles_id_fkey (full_name)
    `)
    .eq('id', id)
    .single()

  if (error || !sitter) return null

  const reviews = await getSitterReviews(id, 3)

  const { data: availabilityData } = await supabase
    .from('sitter_availability')
    .select('*')
    .eq('sitter_id', id)
    .eq('is_active', true)
    .order('day_of_week')

  const availability = (availabilityData ?? []) as SitterAvailability[]

  return {
    id: sitter.id,
    name: (sitter.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Unknown',
    bio: sitter.bio,
    hourly_rate: sitter.hourly_rate,
    rating_avg: sitter.rating_avg,
    review_count: sitter.review_count,
    languages: (sitter.languages ?? []) as SitterLanguage[],
    certifications: (sitter.certifications ?? []) as SitterCertification[],
    is_verified: sitter.is_verified,
    response_rate: sitter.response_rate,
    reviews: reviews ?? [],
    availability,
  }
}

export async function getSitterReviews(sitterId: string, limit?: number): Promise<SitterReview[] | null> {
  const supabase = await createClient()

  let query = supabase
    .from('reviews')
    .select(`
      id,
      rating,
      keywords,
      comment,
      created_at,
      profiles!reviews_parent_id_fkey (full_name)
    `)
    .eq('sitter_id', sitterId)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error || !data) return null

  return data.map((row) => ({
    id: row.id,
    rating: row.rating,
    keywords: row.keywords ?? [],
    comment: row.comment,
    created_at: row.created_at,
    parent_name: (row.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Anonymous',
  }))
}
