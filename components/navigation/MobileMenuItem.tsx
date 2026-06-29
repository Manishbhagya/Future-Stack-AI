'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  label: string
  href: string
  desc?: string
  index: number
  onClose: () => void
}

export default function MobileMenuItem({ label, href, desc, index, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: 'easeOut' }}
    >
      <Link
        href={href}
        onClick={onClose}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '14px',
          borderRadius: 12,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 500,
            color: '#fff',
          }}
        >
          {label}
        </span>
        {desc && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {desc}
          </span>
        )}
      </Link>
    </motion.div>
  )
}
