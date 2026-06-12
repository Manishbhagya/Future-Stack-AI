import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { serviceSlug, name, email, message } = body

    if (!serviceSlug || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', oneHourAgo)

    if (count >= 5) {
      return NextResponse.json({ error: 'Too many enquiries. Please try again later.' }, { status: 429 })
    }

    const { error } = await supabase.from('enquiries').insert({
      user_id: userId,
      service_slug: serviceSlug,
      name: name || 'Unknown',
      email: email || 'unknown@email.com',
      message
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Enquiry error:', err)
    return NextResponse.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 503 })
  }
}
