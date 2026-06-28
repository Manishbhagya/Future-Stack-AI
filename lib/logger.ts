const requestId = {
  generate() {
    return `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  },
}

const logger = {
  info(message, meta = {}) {
    console.log(JSON.stringify({ level: 'info', message, ...meta, timestamp: new Date().toISOString() }))
  },
  warn(message, meta = {}) {
    console.warn(JSON.stringify({ level: 'warn', message, ...meta, timestamp: new Date().toISOString() }))
  },
  error(message, meta = {}) {
    console.error(JSON.stringify({ level: 'error', message, ...meta, timestamp: new Date().toISOString() }))
  },
  debug(message, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({ level: 'debug', message, ...meta, timestamp: new Date().toISOString() }))
    }
  },
}

function withRequestId(handler) {
  return async (req, ...args) => {
    req.requestId = requestId.generate()
    logger.info('Request started', { method: req.method, url: req.url, request_id: req.requestId })
    try {
      const response = await handler(req, ...args)
      logger.info('Request completed', { method: req.method, url: req.url, status: response.status, request_id: req.requestId })
      return response
    } catch (err) {
      logger.error('Request failed', { error: err.message, request_id: req.requestId })
      throw err
    }
  }
}

export { logger, requestId, withRequestId }
