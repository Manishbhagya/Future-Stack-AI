import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': process.env.OPENROUTER_REFERER || 'https://future-stack-ai.vercel.app',
    'X-Title': 'Future Stack AI',
  },
})

const MODEL = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free'

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
  }

  const { messages } = body
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array is required' }), { status: 400 })
  }

  const coreMessages = messages.map((m) => ({
    role: m.role,
    content: m.content || m.parts?.filter((p) => p.type === 'text').map((p) => p.text).join('') || '',
  }))

  let result
  try {
    result = streamText({
      model: openrouter.chat(MODEL),
      abortSignal: req.signal,
      system: `You are a helpful AI assistant for Future Stack AI — a company that builds AI-native systems for businesses.

Your expertise covers:
- AI Chatbots (conversational AI, customer support, lead gen, WhatsApp integration)
- Machine Learning (custom models, predictions, pattern recognition)
- Web Development (Next.js, React, modern web apps)
- Data Analytics (dashboards, BI, insights)
- Cloud Solutions (AWS, GCP, Azure, infrastructure)
- AI Automation (RPA, workflow optimization)

Be concise, friendly, and knowledgeable. If asked about something outside these areas, politely redirect to the company's scope. Keep responses under 3 paragraphs.`,
      messages: coreMessages,
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
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
