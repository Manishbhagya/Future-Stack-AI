import { describe, it, expect } from 'vitest'
import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitError,
  ExternalServiceError,
  formatErrorResponse,
} from '../lib/errors'

describe('AppError', () => {
  it('creates error with correct properties', () => {
    const err = new AppError('Test error', 'TEST_CODE', 400)
    expect(err.message).toBe('Test error')
    expect(err.code).toBe('TEST_CODE')
    expect(err.statusCode).toBe(400)
    expect(err.isOperational).toBe(true)
  })

  it('marks as non-operational when specified', () => {
    const err = new AppError('Test', 'TEST', 500, false)
    expect(err.isOperational).toBe(false)
  })
})

describe('NotFoundError', () => {
  it('creates error with resource message', () => {
    const err = new NotFoundError('User', '123')
    expect(err.message).toBe('User not found: 123')
    expect(err.statusCode).toBe(404)
    expect(err.code).toBe('NOT_FOUND')
  })
})

describe('ValidationError', () => {
  it('creates error with field errors', () => {
    const errors = [{ field: 'email', message: 'Invalid email' }]
    const err = new ValidationError(errors)
    expect(err.message).toBe('Validation failed')
    expect(err.statusCode).toBe(422)
    expect(err.errors).toEqual(errors)
  })
})

describe('UnauthorizedError', () => {
  it('creates unauthorized error', () => {
    const err = new UnauthorizedError()
    expect(err.statusCode).toBe(401)
    expect(err.code).toBe('UNAUTHORIZED')
  })
})

describe('ForbiddenError', () => {
  it('creates forbidden error', () => {
    const err = new ForbiddenError()
    expect(err.statusCode).toBe(403)
    expect(err.code).toBe('FORBIDDEN')
  })
})

describe('ConflictError', () => {
  it('creates conflict error', () => {
    const err = new ConflictError('Already exists')
    expect(err.statusCode).toBe(409)
    expect(err.message).toBe('Already exists')
  })
})

describe('RateLimitError', () => {
  it('creates rate limit error', () => {
    const err = new RateLimitError()
    expect(err.statusCode).toBe(429)
    expect(err.code).toBe('RATE_LIMIT')
  })
})

describe('ExternalServiceError', () => {
  it('creates external service error', () => {
    const err = new ExternalServiceError('OpenRouter', 'Timeout')
    expect(err.message).toBe('OpenRouter error: Timeout')
    expect(err.statusCode).toBe(502)
  })
})

describe('formatErrorResponse', () => {
  it('formats operational error', () => {
    const err = new AppError('Something failed', 'TEST', 400)
    const result = formatErrorResponse(err, 'req_123')
    expect(result).toEqual({
      title: 'TEST',
      status: 400,
      detail: 'Something failed',
      request_id: 'req_123',
    })
  })

  it('hides details for non-operational errors', () => {
    const err = new AppError('Internal crash', 'INTERNAL', 500, false)
    const result = formatErrorResponse(err)
    expect(result.detail).toBe('An unexpected error occurred')
  })

  it('includes field errors when present', () => {
    const err = new ValidationError([{ field: 'name', message: 'Required' }])
    const result = formatErrorResponse(err)
    expect(result.errors).toEqual([{ field: 'name', message: 'Required' }])
  })
})
