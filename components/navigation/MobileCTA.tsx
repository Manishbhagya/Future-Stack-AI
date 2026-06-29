'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  onClose: () => void
}

export default function MobileCTA({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
      style={{ padding: '0 14px 14px' }}
    >
      <Link
        href="/sign-up"
        onClick={onClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 56,
          padding: '0 20px',
          borderRadius: 100,
          background: '#fff',
          color: '#111',
          textDecoration: 'none',
          transition: 'transform 0.25s',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        Start Building
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#111',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.25s',
          }}
          className="mobile-cta-arrow"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </Link>
    </motion.div>
  )
}
