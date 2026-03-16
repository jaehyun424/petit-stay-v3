import { createClient } from '@/src/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
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
      profiles!sitter_profiles_id_fkey (full_name, avatar_url),
      sitter_availability (day_of_week, start_time, end_time, is_active)
    `)
    .eq('is_active', true)
    .order('rating_avg', { ascending: false })

  if (error || !data) {
    return NextResponse.json([])
  }

  const sitters = data.map((row) => {
    const p = row.profiles as unknown as { full_name: string; avatar_url: string | null } | null
    const availability = (
      (row.sitter_availability ?? []) as unknown as {
        day_of_week: number
        start_time: string
        end_time: string
        is_active: boolean
      }[]
    ).filter((a) => a.is_active)

    return {
      id: row.id,
      name: p?.full_name ?? 'Unknown',
      avatar_url: p?.avatar_url ?? null,
      bio: row.bio,
      hourly_rate: row.hourly_rate,
      rating_avg: row.rating_avg,
      review_count: row.review_count,
      languages: row.languages ?? [],
      certifications: row.certifications ?? [],
      is_verified: row.is_verified,
      availability,
    }
  })

    return NextResponse.json(sitters)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
