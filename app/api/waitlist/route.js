import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'
import { logger } from '../../../lib/logger'
import { ValidationError, ConflictError } from '../../../lib/errors'
import { waitlistSchema } from '../../../lib/schemas'

export async function POST(request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  
  try {
    const body = await request.json()
    
    const parsed = waitlistSchema.safeParse(body)
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })))
    }

    const { firstName, lastName, email, company, Role, building, source, 'Use-Cases': useCases } = parsed.data

    const supabase = await createClient()

    const { error } = await supabase.from('waitlist').insert({
      first_name: firstName,
      last_name: lastName || '',
      email,
      company: company || '',
      role: Role || '',
      use_cases: useCases || '',
      building: building || '',
      source: source || '',
    })

    if (error) {
      if (error.code === '23505') {
        throw new ConflictError('This email is already on the waitlist.')
      }
      throw error
    }

    logger.info('Waitlist signup successful', { email, request_id: requestId })
    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error('Waitlist signup failed', { error: err.message, request_id: requestId })

    if (err.name === 'ValidationError') {
      return NextResponse.json({ title: 'VALIDATION_ERROR', status: 422, detail: err.message, errors: err.errors }, { status: 422 })
    }
    if (err.name === 'ConflictError') {
      return NextResponse.json({ title: 'CONFLICT', status: 409, detail: err.message }, { status: 409 })
    }

    return NextResponse.json({ title: 'INTERNAL_ERROR', status: 503, detail: 'Failed to join waitlist. Please try again.' }, { status: 503 })
  }
}
