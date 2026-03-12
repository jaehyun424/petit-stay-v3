import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role, created_at')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'sitter') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Sitter profile
  const { data: sitterProfile } = await supabase
    .from('sitter_profiles')
    .select('is_verified, languages, rating_avg, review_count, bio, hourly_rate')
    .eq('id', user.id)
    .single()

  // This month boundaries
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const today = now.toISOString().split('T')[0]

  // Stats: this month sessions (completed)
  const { count: monthSessions } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('sitter_id', user.id)
    .eq('status', 'completed')
    .gte('date', monthStart)

  // Stats: this month earnings
  const { data: monthEarningsData } = await supabase
    .from('bookings')
    .select('net_amount')
    .eq('sitter_id', user.id)
    .eq('status', 'completed')
    .gte('date', monthStart)

  const monthEarnings = (monthEarningsData ?? []).reduce((sum, b) => sum + b.net_amount, 0)

  // Stats: avg rating
  const avgRating = sitterProfile?.rating_avg ?? 0

  // Stats: pending requests count
  const { count: pendingCount } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('sitter_id', user.id)
    .eq('status', 'pending')

  // Upcoming sessions (confirmed + pending, date >= today, limit 3)
  const { data: upcomingData } = await supabase
    .from('bookings')
    .select(`
      id, date, start_time, end_time, status,
      profiles!bookings_parent_id_fkey (full_name),
      booking_children (id)
    `)
    .eq('sitter_id', user.id)
    .in('status', ['confirmed', 'pending'])
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(3)

  const upcomingSessions = (upcomingData ?? []).map((b) => ({
    id: b.id,
    date: b.date,
    start_time: b.start_time,
    end_time: b.end_time,
    parent_name: (b.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Unknown',
    child_count: (b.booking_children as unknown as { id: string }[])?.length ?? 0,
    status: b.status,
  }))

  // Pending requests (with children info + notes)
  const { data: pendingData } = await supabase
    .from('bookings')
    .select(`
      id, date, start_time, end_time,
      profiles!bookings_parent_id_fkey (full_name),
      booking_children (id, name, age, special_notes)
    `)
    .eq('sitter_id', user.id)
    .eq('status', 'pending')
    .order('date', { ascending: true })

  const pendingRequests = (pendingData ?? []).map((b) => {
    const children = (b.booking_children ?? []) as unknown as { id: string; name: string; age: number; special_notes: string | null }[]
    const notes = children.map(c => c.special_notes).filter(Boolean).join('; ')
    return {
      id: b.id,
      date: b.date,
      start_time: b.start_time,
      end_time: b.end_time,
      parent_name: (b.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Unknown',
      children: children.map(c => ({ name: c.name, age: c.age })),
      special_notes: notes || null,
    }
  })

  // Availability
  const { data: availabilityData } = await supabase
    .from('sitter_availability')
    .select('day_of_week, start_time, end_time, is_active')
    .eq('sitter_id', user.id)
    .order('day_of_week')

  const availability = availabilityData ?? []

  // Earnings: completed bookings this month
  const { data: earningsData } = await supabase
    .from('bookings')
    .select(`
      id, date, start_time, end_time, net_amount, total_amount, service_fee, status,
      profiles!bookings_parent_id_fkey (full_name)
    `)
    .eq('sitter_id', user.id)
    .eq('status', 'completed')
    .gte('date', monthStart)
    .order('date', { ascending: false })

  const earnings = (earningsData ?? []).map((b) => {
    const [sH, sM] = b.start_time.split(':').map(Number)
    const [eH, eM] = b.end_time.split(':').map(Number)
    const hours = Math.round(((eH + (eM || 0) / 60) - (sH + (sM || 0) / 60)) * 10) / 10
    return {
      date: b.date,
      parent_name: (b.profiles as unknown as { full_name: string } | null)?.full_name ?? 'Unknown',
      hours,
      amount: b.net_amount,
      status: 'Paid',
    }
  })

  const totalEarnings = (earningsData ?? []).reduce((s, b) => s + b.total_amount, 0)
  const totalFees = (earningsData ?? []).reduce((s, b) => s + b.service_fee, 0)
  const totalNet = (earningsData ?? []).reduce((s, b) => s + b.net_amount, 0)
  const sessionsCount = (earningsData ?? []).length

  const earningsSummary = {
    total: totalEarnings,
    sessions: sessionsCount,
    avgPerSession: sessionsCount > 0 ? Math.round(totalNet / sessionsCount) : 0,
    platformFee: totalFees,
    netPayout: totalNet,
  }

  return NextResponse.json({
    profile: {
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      is_verified: sitterProfile?.is_verified ?? false,
      languages: sitterProfile?.languages ?? [],
      bio: sitterProfile?.bio ?? null,
      hourly_rate: sitterProfile?.hourly_rate ?? 0,
      created_at: profile.created_at,
    },
    stats: {
      monthSessions: monthSessions ?? 0,
      monthEarnings,
      avgRating,
      pendingCount: pendingCount ?? 0,
    },
    upcomingSessions,
    pendingRequests,
    availability,
    earnings,
    earningsSummary,
  })
}
