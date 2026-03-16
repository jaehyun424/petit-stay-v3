import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import type { SitterLanguage, SitterCertification } from '@/src/lib/supabase/types'
import { asProfileJoin } from '@/src/lib/database.types'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
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
      profiles!sitter_profiles_id_fkey (full_name, avatar_url)
    `)
    .eq('id', id)
    .single()

  if (error || !sitter) {
    return NextResponse.json({ error: 'Sitter not found' }, { status: 404 })
  }

  const profile = asProfileJoin(sitter.profiles)

  return NextResponse.json({
    id: sitter.id,
    name: profile?.full_name ?? 'Unknown',
    avatar_url: profile?.avatar_url ?? null,
    bio: sitter.bio,
    hourly_rate: sitter.hourly_rate,
    rating_avg: sitter.rating_avg,
    review_count: sitter.review_count,
    languages: (sitter.languages ?? []) as SitterLanguage[],
    certifications: (sitter.certifications ?? []) as SitterCertification[],
    is_verified: sitter.is_verified,
    response_rate: sitter.response_rate,
  })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
