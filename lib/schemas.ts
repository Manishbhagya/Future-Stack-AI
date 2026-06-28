import { z } from 'zod'

const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().max(100).default(''),
  email: z.string().email('Valid email is required'),
  company: z.string().max(200).default(''),
  Role: z.string().max(100).default(''),
  building: z.string().max(200).default(''),
  source: z.string().max(200).default(''),
  'Use-Cases': z.string().max(500).default(''),
})

const enquirySchema = z.object({
  serviceSlug: z.string().min(1, 'Service slug is required'),
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Valid email is required'),
  message: z.string().min(1, 'Message is required').max(2000),
})

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().optional(),
  parts: z.array(z.object({ type: z.string(), text: z.string().optional() })).optional(),
})

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, 'At least one message is required'),
})

export { waitlistSchema, enquirySchema, chatRequestSchema }
