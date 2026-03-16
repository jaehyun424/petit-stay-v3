import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('id, parent_id, status')
    .eq('id', id)
    .single()

  if (fetchError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.parent_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (booking.status === 'cancelled' || booking.status === 'completed') {
    return NextResponse.json(
      { error: 'Cannot cancel a booking that is already cancelled or completed' },
      { status: 400 },
    )
  }

  const { error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
