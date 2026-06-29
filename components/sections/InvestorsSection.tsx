'use client'

import { motion } from 'framer-motion'

export default function InvestorsSection() {
  return (
    <section className="lp-section" style={{ padding: '80px 24px', background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 70%)' }}>
      <div className="lp-container" style={{ maxWidth: 1000 }}>
        <h2 className="lp-heading-md" style={{ color: '#fff', textAlign: 'center', marginBottom: 60 }}>
          Backed by <i className="lp-italic">top-tier investors</i>.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          {/* Jackson Square Ventures */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '60px 24px', gap: 24,
            borderRight: '1px solid rgba(255,255,255,0.08)'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                width: 200, height: 72, background: '#fff', borderRadius: 8,
                display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12
              }}
            >
              {/* JSV Fake Logo */}
              <div style={{ display: 'flex', gap: 2 }}>
                <div style={{ width: 14, height: 28, background: '#1d4ed8', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }} />
                <div style={{ width: 14, height: 28, background: '#3b82f6' }} />
                <div style={{ width: 14, height: 28, background: '#60a5fa', borderTopRightRadius: 4, borderBottomRightRadius: 4 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.02em' }}>JACKSON</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.02em' }}>SQUARE</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.02em' }}>VENTURES</span>
              </div>
            </motion.div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
              Jackson Square Ventures
            </div>
          </div>

          {/* Founders, Inc. */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '60px 24px', gap: 24
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                width: 200, height: 72, background: '#0a0a0a', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>FOUNDERS, INC.</span>
            </motion.div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
              Founders, Inc.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
