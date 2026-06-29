'use client'

import { motion } from 'framer-motion'

export default function FinalCTASection() {
  return (
    <section style={{
      position: 'relative',
      margin: '0 auto 48px',
      width: 'calc(100% - 24px)',
      maxWidth: 1200,
      overflow: 'hidden',
      borderRadius: 28,
      background: '#0b0d12',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(/final-cta.webp) center / cover',
          opacity: 0.5,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, transparent 5%, #0b0d12)' }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: 440,
        padding: '80px 24px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lp-heading-xl"
          style={{ lineHeight: 0.95, color: '#fff' }}
        >
          Stop hunting.
          <br />
          Start <i className="lp-italic">shipping</i>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 24, maxWidth: '44ch', fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}
        >
          Let Future Stack handle the infrastructure so you can focus on building, deploying, and scaling AI products.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          href="/auth/signup"
          className="lp-btn-primary"
          style={{ marginTop: 32, fontSize: 15, padding: '14px 32px' }}
        >
          Start Building Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </section>
  )
}
