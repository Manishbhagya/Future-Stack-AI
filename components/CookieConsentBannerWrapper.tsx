'use client'

import dynamic from 'next/dynamic'

const CookieConsentBanner = dynamic(
  () => import('./CookieConsentBanner'),
  { ssr: false }
)

export default function CookieConsentBannerWrapper() {
  return <CookieConsentBanner
    previewMode="none"
    language="auto"
    consentExpiryDays={365}
    glassEffect={true}
    colors={{
      accent: '#D4A853',
      accentFont: '#0F1117',
      font: '#FFFFFF',
      background: 'rgba(15, 17, 23, 0.95)',
    }}
    links={{
      privacy: '/privacy-policy',
      imprint: '/',
      cookie: '/privacy-policy',
    }}
  />
}
