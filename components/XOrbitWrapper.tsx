'use client'

import dynamic from 'next/dynamic'

const XOrbit = dynamic(
  () => import('./XOrbit'),
  { ssr: false }
)

export default function XOrbitWrapper(props) {
  return <XOrbit {...props} />
}
