import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'
import { reviewSchema } from '@/src/lib/validations'

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

  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map(e => e.message).join(', ') },
      { status: 400 },
    )
  }

  const { bookingId, rating, keywords, comment } = parsed.data

  // Verify booking exists, belongs to user, and is completed
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, parent_id, sitter_id, status')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.parent_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (booking.status !== 'completed') {
    return NextResponse.json({ error: 'Booking is not completed' }, { status: 400 })
  }

  // Check duplicate review
  const { data: existing } = await supabase
    .from('reviews')
    .select('id')
    .eq('booking_id', bookingId)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Review already submitted' }, { status: 409 })
  }

  // Insert review
  const { data: review, error: insertError } = await supabase
    .from('reviews')
    .insert({
      booking_id: bookingId,
      parent_id: user.id,
      sitter_id: booking.sitter_id,
      rating,
      keywords: keywords ?? [],
      comment: comment || null,
    })
    .select('id')
    .single()

  if (insertError || !review) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }

  // Recalculate sitter rating_avg and review_count
  const { data: allReviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('rating')
    .eq('sitter_id', booking.sitter_id)

  if (!reviewsError && allReviews && allReviews.length > 0) {
    const sum = allReviews.reduce((acc, r) => acc + r.rating, 0)
    const avg = Math.round((sum / allReviews.length) * 10) / 10

    const { error: updateError } = await supabase
      .from('sitter_profiles')
      .update({ rating_avg: avg, review_count: allReviews.length })
      .eq('id', booking.sitter_id)

    if (updateError) {
      console.error('Failed to update sitter rating:', updateError)
    }
  }

    return NextResponse.json({ reviewId: review.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
