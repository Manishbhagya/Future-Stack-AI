'use client'

import { ClerkProvider } from '@clerk/nextjs'

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function Providers({ children }) {
  return <ClerkProvider publishableKey={clerkPubKey}>{children}</ClerkProvider>
}
