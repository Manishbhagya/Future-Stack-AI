import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { createClient } from '../../../../lib/supabase/server'
import { logger } from '../../../../lib/logger'

export async function POST(request) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  try {
    const payload = await request.text()
    const headers = Object.fromEntries(request.headers)

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')
    let evt
    try {
      evt = wh.verify(payload, {
        'svix-id': headers['svix-id'],
        'svix-timestamp': headers['svix-timestamp'],
        'svix-signature': headers['svix-signature'],
      })
    } catch {
      logger.warn('Invalid Clerk webhook signature', { request_id: requestId })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const { type, data } = evt
    logger.info(`Clerk webhook received: ${type}`, { request_id: requestId, type })

    const supabase = await createClient()

    switch (type) {
      case 'user.created':
      case 'user.updated': {
        const { error } = await supabase.from('profiles').upsert({
          id: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || '',
        }, { onConflict: 'id' })

        if (error) throw error
        logger.info(`Profile ${type === 'user.created' ? 'created' : 'updated'}: ${data.id}`, { request_id: requestId })
        break
      }

      case 'user.deleted': {
        const { error } = await supabase.from('profiles').delete().eq('id', data.id)
        if (error) throw error
        logger.info(`Profile deleted: ${data.id}`, { request_id: requestId })
        break
      }

      default:
        logger.debug(`Unhandled webhook type: ${type}`, { request_id: requestId })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error('Webhook processing failed', { error: err.message, request_id: requestId })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
