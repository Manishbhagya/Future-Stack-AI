'use client'

import type { ReactNode } from 'react'
import MobileMenuItem from './MobileMenuItem'

export type NavItem = {
  label: string
  href: string
  desc?: string
}

type Props = {
  label: string
  items: NavItem[]
  indexOffset: number
  onClose: () => void
  children?: ReactNode
}

export default function MobileMenuSection({ label, items, indexOffset, onClose, children }: Props) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.40)',
          padding: '0 14px',
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      {items.map((item, i) => (
        <MobileMenuItem
          key={item.href}
          label={item.label}
          href={item.href}
          desc={item.desc}
          index={indexOffset + i}
          onClose={onClose}
        />
      ))}
      {children}
    </div>
  )
}
