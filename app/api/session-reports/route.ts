import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const { bookingId, checkInAt, activities, moodBehavior, sleepNotes, additionalNotes } = body as {
    bookingId: string
    checkInAt: string
    activities: string | null
    moodBehavior: string | null
    sleepNotes: string | null
    additionalNotes: string | null
  }

  if (!bookingId || !checkInAt) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  // Verify booking exists and sitter is the current user
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, sitter_id, status')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.sitter_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (booking.status !== 'in_progress') {
    return NextResponse.json({ error: 'Booking is not in progress' }, { status: 400 })
  }

  const { data: report, error: insertError } = await supabase
    .from('session_reports')
    .insert({
      booking_id: bookingId,
      sitter_id: user.id,
      check_in_at: checkInAt,
      activities: activities || null,
      mood_behavior: moodBehavior || null,
      sleep_notes: sleepNotes || null,
      additional_notes: additionalNotes || null,
    })
    .select('id')
    .single()

  if (insertError || !report) {
    return NextResponse.json({ error: 'Failed to create session report' }, { status: 500 })
  }

    return NextResponse.json({ reportId: report.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
