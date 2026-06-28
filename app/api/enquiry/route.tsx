import { auth } from '@clerk/nextjs/server'
import { createClient } from '../../../lib/supabase/server'
import { NextResponse } from 'next/server'
import { logger } from '../../../lib/logger'
import { ValidationError, UnauthorizedError, RateLimitError } from '../../../lib/errors'
import { enquirySchema } from '../../../lib/schemas'

export async function POST(request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  try {
    const { userId } = await auth() as any
    if (!userId) {
      throw new UnauthorizedError()
    }

    const body = await request.json()

    const parsed = enquirySchema.safeParse(body)
    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })))
    }

    const { serviceSlug, name, email, message } = parsed.data

    const supabase = await createClient()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', oneHourAgo)

    if (count >= 5) {
      throw new RateLimitError('Too many enquiries. Please try again later.')
    }

    const { error } = await supabase.from('enquiries').insert({
      user_id: userId,
      service_slug: serviceSlug,
      name,
      email,
      message
    })

    if (error) throw error

    logger.info('Enquiry submitted', { serviceSlug, userId, request_id: requestId })
    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error('Enquiry submission failed', { error: err.message, request_id: requestId })

    if (err.name === 'UnauthorizedError') {
      return NextResponse.json({ title: 'UNAUTHORIZED', status: 401, detail: err.message }, { status: 401 })
    }
    if (err.name === 'ValidationError') {
      return NextResponse.json({ title: 'VALIDATION_ERROR', status: 422, detail: err.message, errors: err.errors }, { status: 422 })
    }
    if (err.name === 'RateLimitError') {
      return NextResponse.json({ title: 'RATE_LIMIT', status: 429, detail: err.message }, { status: 429 })
    }

    return NextResponse.json({ title: 'INTERNAL_ERROR', status: 503, detail: 'Failed to submit enquiry. Please try again.' }, { status: 503 })
  }
}
