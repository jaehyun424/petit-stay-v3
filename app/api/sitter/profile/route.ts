import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function PATCH(request: Request) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check sitter role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'sitter') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { bio, hourlyRate, languages, fullName, avatarUrl } = body as {
    bio?: string
    hourlyRate?: number
    languages?: { lang: string; level: string }[]
    fullName?: string
    avatarUrl?: string
  }

  // Update sitter_profiles
  const sitterUpdate: Record<string, unknown> = {}
  if (bio !== undefined) sitterUpdate.bio = bio
  if (hourlyRate !== undefined) sitterUpdate.hourly_rate = hourlyRate
  if (languages !== undefined) sitterUpdate.languages = languages

  if (Object.keys(sitterUpdate).length > 0) {
    const { error: sitterError } = await supabase
      .from('sitter_profiles')
      .update(sitterUpdate)
      .eq('id', user.id)

    if (sitterError) {
      return NextResponse.json({ error: 'Failed to update sitter profile' }, { status: 500 })
    }
  }

  // Update profiles (full_name, avatar_url)
  const profileUpdate: Record<string, unknown> = {}
  if (fullName) profileUpdate.full_name = fullName
  if (avatarUrl !== undefined) profileUpdate.avatar_url = avatarUrl

  if (Object.keys(profileUpdate).length > 0) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdate)
      .eq('id', user.id)

    if (profileError) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
