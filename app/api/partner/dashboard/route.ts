import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { asPartnerReferralsJoin, type PartnerReferralJoinResult } from '@/src/lib/database.types'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

  // Demo account bypass — demo@petitstay.com can view as Grand Hyatt Seoul
  const isDemoUser = user.email === 'demo@petitstay.com'
  const DEMO_PARTNER_ID = 'c1111111-1111-1111-1111-111111111111'
  const effectivePartnerId = isDemoUser ? DEMO_PARTNER_ID : user.id

  // Check role (skip for demo user)
  if (!isDemoUser) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile || profile.role !== 'partner') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  // Partner account
  const { data: account, error: accountError } = await supabase
    .from('partner_accounts')
    .select('business_name, business_type, referral_code, created_at')
    .eq('id', effectivePartnerId)
    .single()

  if (accountError || !account) {
    // For demo user, return fallback account data so dashboard renders
    if (isDemoUser) {
      return NextResponse.json({
        account: {
          business_name: 'Grand Hyatt Seoul',
          business_type: 'hotel',
          referral_code: 'GRANDHYATT',
          created_at: '2025-01-01T00:00:00Z',
        },
        stats: { monthReferrals: 0, monthCompleted: 0, monthTotalValue: 0 },
        recentActivity: [],
        bookings: [],
        reports: [],
      })
    }
    return NextResponse.json({ error: 'Partner account not found' }, { status: 404 })
  }

  // This month boundaries
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]

  // All referrals for this partner
  let referrals: PartnerReferralJoinResult[] = []
  try {
    const { data: allReferrals, error: referralError } = await supabase
      .from('partner_referrals')
      .select(`
        id, created_at, booking_id,
        bookings!partner_referrals_booking_id_fkey (
          id, date, start_time, end_time, status, total_amount,
          profiles!bookings_parent_id_fkey (full_name),
          sitter_profiles!bookings_sitter_id_fkey (
            profiles!sitter_profiles_id_fkey (full_name)
          ),
          booking_children (id),
          session_reports (id, check_in_at, check_out_at, activities, mood_behavior, sleep_notes, additional_notes)
        )
      `)
      .eq('partner_id', effectivePartnerId)
      .order('created_at', { ascending: false })

    if (!referralError) {
      referrals = asPartnerReferralsJoin(allReferrals)
    }
  } catch {
    // If partner_referrals table doesn't exist or query fails, continue with empty array
    referrals = []
  }

  // Stats: this month
  const monthReferrals = referrals.filter(r => r.created_at >= monthStart)
  const monthCompleted = monthReferrals.filter(r => {
    return r.bookings?.status === 'completed'
  })
  const monthTotalValue = monthReferrals.reduce((sum, r) => {
    return sum + (r.bookings?.total_amount ?? 0)
  }, 0)

  // Recent activity (last 5)
  const recentActivity = referrals.slice(0, 5).map(r => {
    const b = r.bookings
    return {
      date: b?.date ?? '',
      parent_name: b?.profiles?.full_name ?? 'Unknown',
      sitter_name: b?.sitter_profiles?.profiles?.full_name ?? 'Unknown',
      status: b?.status ?? 'unknown',
    }
  })

  // All bookings
  const bookings = referrals.map(r => {
    const b = r.bookings
    return {
      id: b?.id ?? '',
      date: b?.date ?? '',
      start_time: b?.start_time ?? '',
      end_time: b?.end_time ?? '',
      status: b?.status ?? 'unknown',
      total_amount: b?.total_amount ?? 0,
      parent_name: b?.profiles?.full_name ?? 'Unknown',
      sitter_name: b?.sitter_profiles?.profiles?.full_name ?? 'Unknown',
      child_count: b?.booking_children?.length ?? 0,
    }
  })

  // Reports: session reports from completed bookings
  const reports = referrals
    .filter(r => {
      return r.bookings?.status === 'completed' && (r.bookings?.session_reports?.length ?? 0) > 0
    })
    .map(r => {
      const b = r.bookings
      if (!b || b.session_reports.length === 0) return null
      const report = b.session_reports[0]
      return {
        id: report.id,
        date: b.date,
        start_time: b.start_time,
        end_time: b.end_time,
        parent_name: b.profiles?.full_name ?? 'Unknown',
        sitter_name: b.sitter_profiles?.profiles?.full_name ?? 'Unknown',
        child_count: b.booking_children?.length ?? 0,
        check_in_at: report.check_in_at,
        check_out_at: report.check_out_at,
        activities: report.activities,
        mood_behavior: report.mood_behavior,
        sleep_notes: report.sleep_notes,
        additional_notes: report.additional_notes,
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  return NextResponse.json({
    account: {
      business_name: account.business_name,
      business_type: account.business_type,
      referral_code: account.referral_code,
      created_at: account.created_at,
    },
    stats: {
      monthReferrals: monthReferrals.length,
      monthCompleted: monthCompleted.length,
      monthTotalValue,
    },
    recentActivity,
    bookings,
    reports,
  })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
