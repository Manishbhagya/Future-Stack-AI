'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MultiStepWaitlistFormWrapper from '../../components/MultiStepWaitlistFormWrapper'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

export default function WaitlistPage() {
  return (
    <section className="waitlist-section">
      <div className="waitlist-card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <FadeIn>
          <MultiStepWaitlistFormWrapper />
        </FadeIn>
      </div>
    </section>
  )
}
