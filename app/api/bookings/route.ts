import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { sitterId, date, startTime, endTime, children, emergencyContact } = body as {
    sitterId: string
    date: string
    startTime: string
    endTime: string
    children: { name: string; age: number; specialNotes?: string }[]
    emergencyContact: { name: string; phone: string; relationship: string }
  }

  if (!sitterId || !date || !startTime || !endTime || !children?.length || !emergencyContact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Get sitter's hourly rate (server-side to prevent tampering)
  const { data: sitter, error: sitterError } = await supabase
    .from('sitter_profiles')
    .select('hourly_rate')
    .eq('id', sitterId)
    .single()

  if (sitterError || !sitter) {
    return NextResponse.json({ error: 'Sitter not found' }, { status: 404 })
  }

  // Calculate amounts server-side
  const [startH, startM] = startTime.split(':').map(Number)
  const [endH, endM] = endTime.split(':').map(Number)
  const hours = (endH + (endM || 0) / 60) - (startH + (startM || 0) / 60)

  if (hours <= 0) {
    return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 })
  }

  const base = Math.round(sitter.hourly_rate * hours)
  const serviceFee = Math.round(base * 0.2)
  const totalAmount = base + serviceFee
  const netAmount = base

  // Insert booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      parent_id: user.id,
      sitter_id: sitterId,
      status: 'pending' as const,
      date,
      start_time: startTime,
      end_time: endTime,
      total_amount: totalAmount,
      service_fee: serviceFee,
      net_amount: netAmount,
    })
    .select('id')
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }

  // Insert children
  const { error: childrenError } = await supabase
    .from('booking_children')
    .insert(
      children.map((c) => ({
        booking_id: booking.id,
        name: c.name,
        age: c.age,
        special_notes: c.specialNotes || null,
      })),
    )

  if (childrenError) {
    await supabase.from('bookings').delete().eq('id', booking.id)
    return NextResponse.json({ error: 'Failed to save children info' }, { status: 500 })
  }

  // Insert emergency contact
  const { error: contactError } = await supabase
    .from('booking_emergency_contacts')
    .insert({
      booking_id: booking.id,
      name: emergencyContact.name,
      phone: emergencyContact.phone,
      relationship: emergencyContact.relationship,
    })

  if (contactError) {
    await supabase.from('booking_children').delete().eq('booking_id', booking.id)
    await supabase.from('bookings').delete().eq('id', booking.id)
    return NextResponse.json({ error: 'Failed to save emergency contact' }, { status: 500 })
  }

  return NextResponse.json({ bookingId: booking.id })
}
