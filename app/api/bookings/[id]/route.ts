import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      id,
      parent_id,
      sitter_id,
      status,
      date,
      start_time,
      end_time,
      total_amount,
      service_fee,
      net_amount,
      created_at,
      updated_at,
      sitter_profiles!bookings_sitter_id_fkey (
        is_verified,
        rating_avg,
        profiles!sitter_profiles_id_fkey (full_name, avatar_url)
      ),
      booking_children (id, booking_id, name, age, special_notes),
      booking_emergency_contacts (id, booking_id, name, phone, relationship),
      session_reports (id, booking_id, sitter_id, check_in_at, check_out_at, activities, mood_behavior, sleep_notes, additional_notes, created_at),
      reviews (id, booking_id, parent_id, sitter_id, rating, keywords, comment, created_at)
    `)
    .eq('id', id)
    .single()

  if (error || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.parent_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(booking)
}
