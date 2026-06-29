'use client'

import { forwardRef } from 'react'

const HamburgerButton = forwardRef<HTMLButtonElement, { open: boolean; onClick: () => void }>(
  ({ open, onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="nav-mobile-toggle"
    >
      <span
        style={{
          display: 'block',
          width: 18,
          height: 2,
          background: 'var(--text-primary-dark)',
          borderRadius: 2,
          transition: 'all 0.3s',
          ...(open ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}),
        }}
      />
      <span
        style={{
          display: 'block',
          width: 18,
          height: 2,
          background: 'var(--text-primary-dark)',
          borderRadius: 2,
          transition: 'all 0.3s',
          ...(open ? { opacity: 0 } : {}),
        }}
      />
      <span
        style={{
          display: 'block',
          width: 18,
          height: 2,
          background: 'var(--text-primary-dark)',
          borderRadius: 2,
          transition: 'all 0.3s',
          ...(open ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}),
        }}
      />
    </button>
  )
)

HamburgerButton.displayName = 'HamburgerButton'
export default HamburgerButton
