import { describe, it, expect } from 'vitest'
import { logger, requestId } from '../lib/logger'

describe('logger', () => {
  it('logs info message (basic smoke test)', () => {
    expect(logger).toBeDefined()
    expect(requestId).toBeDefined()
    expect(typeof requestId.generate()).toBe('string')
  })
})
