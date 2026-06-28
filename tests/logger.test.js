import { describe, it, expect } from 'vitest'

describe('logger', () => {
  it('logs info message (basic smoke test)', () => {
    // Just verify the module loads without errors
    const logger = require('../lib/logger')
    expect(logger.logger).toBeDefined()
    expect(logger.requestId).toBeDefined()
    expect(typeof logger.requestId.generate()).toBe('string')
  })
})
