'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const oldWayItems = [
  'Scouring GitHub for AI infrastructure solutions',
  'Hand-rolling RAG pipelines from scratch',
  'Managing model deployments across 5 providers',
  'Researching vector databases one by one',
]

const statCards = [
  { value: '20 min', label: 'Avg. time to a production-ready AI architecture with Future Stack' },
  { value: '40 hrs', label: 'Saved on infrastructure setup every week' },
]

export default function ProblemSection() {
  return (
    <section className="lp-section lp-paper-grain" style={{ padding: '100px 24px' }}>
      <div className="lp-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 60 }}>
          <div>
            <h2 className="lp-heading-xl" style={{ color: '#fff', maxWidth: '14ch' }}>
              Stop <i className="lp-italic">wasting time</i> on manual AI ops.
            </h2>

            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>The old way</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {oldWayItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <motion.span
                      variants={{
                        hidden: { color: 'rgba(255,255,255,0.3)' },
                        visible: { color: 'rgba(255,255,255,0.15)', transition: { duration: 0.5 } },
                      }}
                      style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                      </svg>
                    </motion.span>
                    <motion.span
                      variants={{
                        hidden: { color: 'rgba(255,255,255,0.8)' },
                        visible: { color: 'rgba(255,255,255,0.3)', transition: { delay: i * 0.15 + 0.3, duration: 0.5 } },
                      }}
                      style={{ position: 'relative', fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.7vw, 20px)' }}
                    >
                      {item}
                      <motion.span
                        variants={{
                          hidden: { scaleX: 0 },
                          visible: { scaleX: 1, transition: { delay: i * 0.15 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        style={{ position: 'absolute', left: 0, top: '50%', height: 2, background: '#3b82f6', borderRadius: 2, width: '100%', transformOrigin: 'left' }}
                      />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link href="/services" className="lp-btn-primary" style={{ marginTop: 40, display: 'inline-flex' }}>
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div style={{ maxWidth: 460, marginLeft: 'auto' }}>
            <div className="lp-photo-card" style={{ aspectRatio: '532/767' }}>
              <div className="lp-photo-card-bg">
                <div style={{ position: 'absolute', inset: 0, background: 'url(/stop-bg.webp) center / cover', opacity: 0.9 }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '6.4%', padding: '8.5% 12% 9.8%' }}>
                {statCards.map((s) => (
                  <div key={s.value} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    borderRadius: 24, padding: '0 9%',
                    background: 'rgba(15,15,19,0.52)',
                    backdropFilter: 'blur(16px) saturate(150%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.20), 0 24px 50px -16px rgba(0,0,0,0.55)',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(44px, 6.4vw, 68px)', fontWeight: 600, lineHeight: 0.95, color: '#fff' }}>{s.value}</p>
                    <p style={{ marginTop: 8, maxWidth: '20ch', fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 1.1vw, 14px)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.65)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
