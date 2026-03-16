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
