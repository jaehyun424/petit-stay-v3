// ── Supabase nested join result types ──
// Supabase's .select() with joins returns opaque types.
// These types + guards replace unsafe `as unknown as` casts.

export interface ProfileJoinResult {
  full_name: string
  avatar_url: string | null
}

export interface SitterProfileJoinResult {
  is_verified: boolean
  rating_avg: number
  profiles: ProfileJoinResult | null
}

// ── Type guard functions ──

export function asProfileJoin(data: unknown): ProfileJoinResult | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.full_name !== 'string') return null
  return {
    full_name: d.full_name,
    avatar_url: typeof d.avatar_url === 'string' ? d.avatar_url : null,
  }
}

export function asSitterProfileJoin(data: unknown): SitterProfileJoinResult | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.is_verified !== 'boolean') return null
  if (typeof d.rating_avg !== 'number') return null
  return {
    is_verified: d.is_verified,
    rating_avg: d.rating_avg,
    profiles: asProfileJoin(d.profiles),
  }
}

export function asReviewerProfileJoin(data: unknown): { full_name: string } | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.full_name !== 'string') return null
  return { full_name: d.full_name }
}

// ── Booking children join ──

export interface BookingChildJoinResult {
  id: string
  name: string
  age: number
  special_notes: string | null
}

export function asBookingChildrenJoin(data: unknown): BookingChildJoinResult[] {
  if (!Array.isArray(data)) return []
  return data.filter((item): item is BookingChildJoinResult => {
    if (!item || typeof item !== 'object') return false
    const d = item as Record<string, unknown>
    return typeof d.id === 'string' && typeof d.name === 'string' && typeof d.age === 'number'
  })
}

export function asIdArrayLength(data: unknown): number {
  if (!Array.isArray(data)) return 0
  return data.filter(item =>
    !!item && typeof item === 'object' && typeof (item as Record<string, unknown>).id === 'string'
  ).length
}

// ── Sitter availability join ──

export interface AvailabilityJoinResult {
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

export function asAvailabilityJoin(data: unknown): AvailabilityJoinResult[] {
  if (!Array.isArray(data)) return []
  return data.filter((item): item is AvailabilityJoinResult => {
    if (!item || typeof item !== 'object') return false
    const d = item as Record<string, unknown>
    return typeof d.day_of_week === 'number' && typeof d.start_time === 'string'
      && typeof d.end_time === 'string' && typeof d.is_active === 'boolean'
  })
}

// ── Session report join ──

export interface SessionReportJoinResult {
  id: string
  check_in_at: string
  check_out_at: string | null
  activities: string | null
  mood_behavior: string | null
  sleep_notes: string | null
  additional_notes: string | null
}

export function asSessionReportsJoin(data: unknown): SessionReportJoinResult[] {
  if (!Array.isArray(data)) return []
  return data.filter((item): item is SessionReportJoinResult => {
    if (!item || typeof item !== 'object') return false
    const d = item as Record<string, unknown>
    return typeof d.id === 'string' && typeof d.check_in_at === 'string'
  })
}

// ── Partner booking join (from partner_referrals → bookings) ──

export interface PartnerBookingJoinResult {
  id: string
  date: string
  start_time: string
  end_time: string
  status: string
  total_amount: number
  profiles: { full_name: string } | null
  sitter_profiles: { profiles: { full_name: string } | null } | null
  booking_children: { id: string }[]
  session_reports: SessionReportJoinResult[]
}

export function asPartnerBookingJoin(data: unknown): PartnerBookingJoinResult | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.id !== 'string') return null

  let sitterProfiles: PartnerBookingJoinResult['sitter_profiles'] = null
  if (d.sitter_profiles && typeof d.sitter_profiles === 'object') {
    const sp = d.sitter_profiles as Record<string, unknown>
    sitterProfiles = { profiles: asReviewerProfileJoin(sp.profiles) }
  }

  return {
    id: d.id,
    date: typeof d.date === 'string' ? d.date : '',
    start_time: typeof d.start_time === 'string' ? d.start_time : '',
    end_time: typeof d.end_time === 'string' ? d.end_time : '',
    status: typeof d.status === 'string' ? d.status : 'unknown',
    total_amount: typeof d.total_amount === 'number' ? d.total_amount : 0,
    profiles: asReviewerProfileJoin(d.profiles),
    sitter_profiles: sitterProfiles,
    booking_children: Array.isArray(d.booking_children)
      ? d.booking_children.filter((c): c is { id: string } =>
          !!c && typeof c === 'object' && typeof (c as Record<string, unknown>).id === 'string')
      : [],
    session_reports: asSessionReportsJoin(d.session_reports),
  }
}

// ── Partner referral join ──

export interface PartnerReferralJoinResult {
  id: string
  created_at: string
  booking_id: string
  bookings: PartnerBookingJoinResult | null
}

export function asPartnerReferralsJoin(data: unknown): PartnerReferralJoinResult[] {
  if (!Array.isArray(data)) return []
  return data.map(item => {
    if (!item || typeof item === 'function') return null
    const d = (typeof item === 'object' ? item : null) as Record<string, unknown> | null
    if (!d || typeof d.id !== 'string') return null
    return {
      id: d.id,
      created_at: typeof d.created_at === 'string' ? d.created_at : '',
      booking_id: typeof d.booking_id === 'string' ? d.booking_id : '',
      bookings: asPartnerBookingJoin(d.bookings),
    }
  }).filter((x): x is PartnerReferralJoinResult => x !== null)
}

// ── My page bookings join ──

export interface MyBookingJoinResult {
  id: string
  date: string
  start_time: string
  end_time: string
  status: string
  total_amount: number
  sitter_profiles: {
    profiles: { full_name: string }
  }
}

export function asMyBookingsJoin(data: unknown): MyBookingJoinResult[] {
  if (!Array.isArray(data)) return []
  return data.map(item => {
    if (!item || typeof item !== 'object') return null
    const d = item as Record<string, unknown>
    if (typeof d.id !== 'string') return null

    let fullName = 'Unknown'
    if (d.sitter_profiles && typeof d.sitter_profiles === 'object') {
      const sp = d.sitter_profiles as Record<string, unknown>
      const profile = asReviewerProfileJoin(sp.profiles)
      if (profile) fullName = profile.full_name
    }

    return {
      id: d.id,
      date: typeof d.date === 'string' ? d.date : '',
      start_time: typeof d.start_time === 'string' ? d.start_time : '',
      end_time: typeof d.end_time === 'string' ? d.end_time : '',
      status: typeof d.status === 'string' ? d.status : '',
      total_amount: typeof d.total_amount === 'number' ? d.total_amount : 0,
      sitter_profiles: { profiles: { full_name: fullName } },
    }
  }).filter((x): x is MyBookingJoinResult => x !== null)
}
