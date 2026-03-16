import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { stripe } from '@/src/lib/stripe'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: { bookingId: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { bookingId } = body
    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 })
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('id, parent_id, total_amount, status')
      .eq('id', bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (booking.parent_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (booking.status === 'confirmed') {
      return NextResponse.json({ error: 'Booking already paid' }, { status: 400 })
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json({ error: 'Booking is cancelled' }, { status: 400 })
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.total_amount,
        currency: 'krw',
        metadata: { bookingId: booking.id },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch {
      return NextResponse.json({ error: 'Payment service error' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
