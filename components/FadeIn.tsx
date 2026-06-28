'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '../lib/animationVariants'

export default function FadeIn({ children, delay = 0, className = undefined, as = 'div', once = true }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}
