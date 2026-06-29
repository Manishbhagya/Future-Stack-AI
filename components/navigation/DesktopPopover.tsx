'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

export type PopoverItem = {
  label: string
  href: string
  desc: string
}

const stagger = 0.04

const easeOut = 'easeOut' as const

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: easeOut, staggerChildren: stagger },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.18, ease: easeOut, staggerChildren: 0.02, staggerDirection: -1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: easeOut } },
  exit: { opacity: 0, x: -4, transition: { duration: 0.12 } },
}

type Props = {
  items: PopoverItem[]
  onClose: () => void
}

export default function DesktopPopover({ items, onClose }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'calc(100% + 8px)',
        width: 430,
        background: 'rgba(18,22,30,0.96)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 28,
        padding: 24,
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      {items.map((item) => (
        <motion.div key={item.href} variants={itemVariants}>
          <Link
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '14px',
              borderRadius: 16,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
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
              {item.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.3,
              }}
            >
              {item.desc}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
