'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

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
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="waitlist-section">
      <div className="waitlist-card">
        <motion.span
          className="hero-badge"
          style={{ marginBottom: 24 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Coming Soon
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join the waitlist
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          We&apos;re launching something new. Be the first to know when we go live.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {submitted ? (
            <div className="enquiry-success" style={{ textAlign: 'center', maxWidth: 440, margin: '0 auto' }}>
              You&apos;re on the list! We&apos;ll be in touch.
            </div>
          ) : (
            <form
              className="waitlist-form"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn-white" style={{ flexShrink: 0 }}>
                Notify Me
                <span className="btn-arrow">→</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
