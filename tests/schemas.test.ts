import { describe, it, expect } from 'vitest'
import { waitlistSchema, enquirySchema, chatRequestSchema } from '../lib/schemas'

describe('waitlistSchema', () => {
  it('accepts valid input', () => {
    const result = waitlistSchema.safeParse({
      firstName: 'John',
      email: 'john@example.com',
    })
    expect(result.success).toBe(true)
    expect(result.data.firstName).toBe('John')
    expect(result.data.email).toBe('john@example.com')
  })

  it('rejects missing required fields', () => {
    const result = waitlistSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = waitlistSchema.safeParse({
      firstName: 'John',
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('applies defaults for optional fields', () => {
    const result = waitlistSchema.safeParse({
      firstName: 'John',
      email: 'john@example.com',
    })
    expect(result.success).toBe(true)
    expect(result.data.lastName).toBe('')
    expect(result.data.company).toBe('')
  })
})

describe('enquirySchema', () => {
  it('accepts valid input', () => {
    const result = enquirySchema.safeParse({
      serviceSlug: 'chatbots',
      name: 'John',
      email: 'john@example.com',
      message: 'I need a chatbot',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing serviceSlug', () => {
    const result = enquirySchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      message: 'I need a chatbot',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty message', () => {
    const result = enquirySchema.safeParse({
      serviceSlug: 'chatbots',
      name: 'John',
      email: 'john@example.com',
      message: '',
    })
    expect(result.success).toBe(false)
  })
})

describe('chatRequestSchema', () => {
  it('accepts valid messages', () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'Hello' }],
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty messages array', () => {
    const result = chatRequestSchema.safeParse({ messages: [] })
    expect(result.success).toBe(false)
  })

  it('rejects invalid role', () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: 'invalid', content: 'Hello' }],
    })
    expect(result.success).toBe(false)
  })

  it('accepts messages with parts instead of content', () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: 'user', parts: [{ type: 'text', text: 'Hello' }] }],
    })
    expect(result.success).toBe(true)
  })
})
