import { createClient } from '../../../lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'ok',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {},
  }

  const startDb = Date.now()
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('profiles').select('id').limit(1)
    checks.checks.database = {
      status: error ? 'degraded' : 'ok',
      latencyMs: Date.now() - startDb,
      error: error?.message,
    }
  } catch (error) {
    checks.checks.database = {
      status: 'down',
      latencyMs: Date.now() - startDb,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  const startOpenRouter = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    })
    clearTimeout(timeout)
    checks.checks.openrouter = {
      status: res.ok ? 'ok' : 'degraded',
      latencyMs: Date.now() - startOpenRouter,
      error: res.ok ? undefined : `HTTP ${res.status}`,
    }
  } catch (error) {
    checks.checks.openrouter = {
      status: 'down',
      latencyMs: Date.now() - startOpenRouter,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  const startClerk = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://api.clerk.com/v1/health', {
      signal: controller.signal,
    })
    clearTimeout(timeout)
    checks.checks.clerk = {
      status: res.ok ? 'ok' : 'degraded',
      latencyMs: Date.now() - startClerk,
      error: res.ok ? undefined : `HTTP ${res.status}`,
    }
  } catch (error) {
    checks.checks.clerk = {
      status: 'down',
      latencyMs: Date.now() - startClerk,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }

  const hasDown = Object.values(checks.checks).some((c) => c.status === 'down')
  const hasDegraded = Object.values(checks.checks).some((c) => c.status === 'degraded')

  if (hasDown) checks.status = 'down'
  else if (hasDegraded) checks.status = 'degraded'

  return NextResponse.json(checks, {
    status: checks.status === 'down' ? 503 : 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}