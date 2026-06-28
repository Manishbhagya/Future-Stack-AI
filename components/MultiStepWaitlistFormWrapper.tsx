'use client'

import dynamic from 'next/dynamic'

const MultiStepWaitlistForm = dynamic(
  () => import('./MultiStepWaitlistForm'),
  { ssr: false }
)

export default function MultiStepWaitlistFormWrapper(props) {
  return (
    <form
      action="/api/waitlist"
      method="POST"
      onSubmit={(e) => {
        const form = e.currentTarget
        const data = new FormData(form)
        fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(data.entries())),
        }).catch((err) => console.error('Waitlist submit error:', err))
      }}
    >
      <MultiStepWaitlistForm
        {...props}
        darkMode={true}
        theme={{
          darkMode: true,
          cardRadius: 16,
          accentColor: '#D4A853',
        }}
        colors={{
          accentColor: '#D4A853',
          labelTagBg: 'rgba(212, 168, 83, 0.15)',
          titleColor: '#FFFFFF',
          subtitleColor: 'rgba(200, 230, 225, 0.55)',
          bodyTextColor: 'rgba(200, 230, 225, 0.7)',
          cardBackground: 'rgba(34, 38, 58, 0.85)',
        }}
        fonts={{
          title: { fontFamily: 'Outfit', fontStyle: 'normal', fontWeight: 700 },
          subtitle: { fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 300 },
          body1: { fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 400 },
          body2: { fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 500 },
        }}
        indicatorStyle="bar"
        previewStep=""
      />
    </form>
  )
}
