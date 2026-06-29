'use client'

import { motion, type Variants } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  type?: 'words' | 'chars'
  delay?: number
  stagger?: number
}

export default function SplitText({
  children,
  as: Tag = 'h2',
  className = '',
  type = 'words',
  delay = 0,
  stagger = 0.04,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const parts = type === 'words' ? children.split(' ') : children.split('')

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const ease = [0.16, 1, 0.3, 1] as const

  const childVariant: Variants = {
    hidden: { opacity: 0, y: 24, rotateX: -12 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      style={{ display: 'inline' }}
    >
      <Tag style={{ display: 'inline' }}>
        {parts.map((part, i) => (
          <motion.span
            key={`${part}-${i}`}
            variants={childVariant}
            style={{ display: type === 'words' ? 'inline-block' : 'inline-block' }}
            className="lp-split-char"
          >
            {part}
            {type === 'words' && i < parts.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
