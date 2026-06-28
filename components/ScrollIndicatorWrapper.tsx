'use client'

import dynamic from 'next/dynamic'

const ScrollIndicator = dynamic(
  () => import('./ScrollIndicator'),
  { ssr: false }
)

export default function ScrollIndicatorWrapper(props) {
  return <ScrollIndicator {...props} />
}
