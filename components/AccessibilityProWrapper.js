'use client'

import dynamic from 'next/dynamic'

const AccessibilityPro = dynamic(
  () => import('./AccessibilityPro'),
  { ssr: false }
)

export default function AccessibilityProWrapper() {
  return <AccessibilityPro
    startPosition="Bottom Left"
    buttonSize={52}
    buttonColor="#D4A853"
    triggerIcon="Access"
    panelAppearance="Auto"
  />
}
