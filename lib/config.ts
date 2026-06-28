const warn = (msg) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[config] ${msg}`)
  }
}

const requiredEnv = (name) => {
  const value = process.env[name]
  if (!value) {
    warn(`Missing required env var: ${name}. App may not function correctly.`)
  }
  return value || ''
}

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production',

  clerk: {
    publishableKey: requiredEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
    secretKey: requiredEnv('CLERK_SECRET_KEY'),
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in',
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard',
  },

  supabase: {
    url: requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },

  openrouter: {
    apiKey: requiredEnv('OPENROUTER_API_KEY'),
    referer: process.env.OPENROUTER_REFERER || 'https://future-stack-ai.vercel.app',
    model: process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  },

  production: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://future-stack-ai.vercel.app',
    isVercel: !!process.env.VERCEL,
    vercelUrl: process.env.VERCEL_URL || null,
  },
}

export { config, requiredEnv }
