class AppError extends Error {
  code!: string
  statusCode!: number
  isOperational!: boolean

  constructor(message, code, statusCode, isOperational = true) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND', 404)
  }
}

class ValidationError extends AppError {
  errors!: any

  constructor(errors) {
    super('Validation failed', 'VALIDATION_ERROR', 422)
    this.errors = errors
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 'FORBIDDEN', 403)
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 'CONFLICT', 409)
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 'RATE_LIMIT', 429)
  }
}

class ExternalServiceError extends AppError {
  constructor(service, message) {
    super(`${service} error: ${message}`, 'EXTERNAL_SERVICE_ERROR', 502)
  }
}

function formatErrorResponse(err: AppError & { errors?: any }, requestId?: string) {
  const body: Record<string, unknown> = {
    title: err.code || 'INTERNAL_ERROR',
    status: err.statusCode || 500,
    detail: err.isOperational ? err.message : 'An unexpected error occurred',
    request_id: requestId || null,
  }
  if (err.errors) body.errors = err.errors
  return body
}

export {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitError,
  ExternalServiceError,
  formatErrorResponse,
}
