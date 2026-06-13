import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, Role, building, source } = body

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('waitlist').insert({
      first_name: firstName,
      last_name: lastName || '',
      email,
      company: company || '',
      role: Role || '',
      use_cases: body['Use-Cases'] || '',
      building: building || '',
      source: source || '',
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Failed to join waitlist. Please try again.' }, { status: 503 })
  }
}
