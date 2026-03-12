import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { stripe } from '@/src/lib/stripe'

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { bookingId: string; paymentIntentId: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { bookingId, paymentIntentId } = body
  if (!bookingId || !paymentIntentId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Verify payment on Stripe side
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  if (paymentIntent.status !== 'succeeded') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
  }

  if (paymentIntent.metadata.bookingId !== bookingId) {
    return NextResponse.json({ error: 'Payment mismatch' }, { status: 400 })
  }

  // Verify booking ownership
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('id, parent_id, status')
    .eq('id', bookingId)
    .single()

  if (error || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.parent_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (booking.status === 'confirmed') {
    return NextResponse.json({ success: true })
  }

  // Update booking status
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
