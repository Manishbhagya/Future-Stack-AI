import { auth } from '@clerk/nextjs/server'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { logger } from '../../../lib/logger'
import { config } from '../../../lib/config'
import { chatRequestSchema } from '../../../lib/schemas'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openrouter.apiKey,
  headers: {
    'HTTP-Referer': config.openrouter.referer,
    'X-Title': 'Future Stack AI',
  },
})

const MODEL = config.openrouter.model

export async function POST(req) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  const { userId } = await auth()
  if (!userId) {
    return new Response(JSON.stringify({ title: 'UNAUTHORIZED', status: 401, detail: 'Authentication required' }), { status: 401 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    logger.warn('Invalid JSON in chat request', { request_id: requestId })
    return new Response(JSON.stringify({ title: 'VALIDATION_ERROR', status: 400, detail: 'Invalid JSON body' }), { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    logger.warn('Invalid chat request', { errors: parsed.error.issues, request_id: requestId })
    return new Response(JSON.stringify({
      title: 'VALIDATION_ERROR',
      status: 422,
      detail: 'Invalid messages format',
      errors: parsed.error.issues.map(e => ({ field: e.path.join('.'), message: e.message })),
    }), { status: 422 })
  }

  const { messages } = parsed.data

  const coreMessages = messages.map((m) => ({
    role: m.role,
    content: m.content || m.parts?.filter((p) => p.type === 'text').map((p) => p.text).join('') || '',
  }))

  let result
  try {
    result = streamText({
      model: openrouter.chat(MODEL),
      abortSignal: req.signal,
      system: [
        'You are a helpful AI assistant for Future Stack AI — a company that builds AI-native systems for businesses.',
        '',
        'Your expertise covers:',
        '- AI Chatbots (conversational AI, customer support, lead gen, WhatsApp integration)',
        '- Machine Learning (custom models, predictions, pattern recognition)',
        '- Web Development (Next.js, React, modern web apps)',
        '- Data Analytics (dashboards, BI, insights)',
        '- Cloud Solutions (AWS, GCP, Azure, infrastructure)',
        '- AI Automation (RPA, workflow optimization)',
        '',
        'Be concise, friendly, and knowledgeable. If asked about something outside these areas, politely redirect to the company\'s scope. Keep responses under 3 paragraphs.',
      ].join('\n'),
      messages: coreMessages,
    })
  } catch (e) {
    logger.error('Chat stream initialization failed', { error: e.message, request_id: requestId })
    return new Response(JSON.stringify({ title: 'EXTERNAL_SERVICE_ERROR', status: 502, detail: 'AI service unavailable. Please try again.' }), { status: 502 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      const sendJson = (data) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        for await (const part of result.fullStream) {
          if (req.signal.aborted) break
          if (part.type === 'text-start') {
            sendJson({ type: 'text-start', id: part.id })
          } else if (part.type === 'text-delta') {
            sendJson({ type: 'text-delta', id: part.id, delta: part.text })
          } else if (part.type === 'text-end') {
            sendJson({ type: 'text-end', id: part.id })
          } else if (part.type === 'error') {
            sendJson({ type: 'error', errorText: part.error })
          } else if (part.type === 'finish') {
            sendJson({ type: 'finish', finishReason: part.finishReason })
          }
        }
      } catch {
        // stream interrupted by client disconnect
      }

      if (!req.signal.aborted) {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
    },
  })
}
