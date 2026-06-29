'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestions = [
  'Build an AI healthcare assistant with HIPAA compliance',
  'Create a customer support bot that knows our product',
  'Deploy a RAG pipeline for our legal documents',
]

const generated = [
  { label: 'Architecture', value: 'RAG + Agent + API Gateway' },
  { label: 'Model', value: 'GPT-4o (primary) + Claude 3.5 (fallback)' },
  { label: 'Vector DB', value: 'Pinecone — 256d embeddings' },
  { label: 'Data Layer', value: 'Supabase + PostgreSQL' },
  { label: 'Deployment', value: 'Vercel Edge + AWS ECS' },
  { label: 'Security', value: 'SOC2, end-to-end encryption' },
  { label: 'Est. Cost', value: '$0.03/query — ~$850/mo at scale' },
  { label: 'Timeline', value: 'Production in 4 hours' },
]

export default function SolutionsSection() {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!input.trim()) return
    setLoading(true)
    setSubmitted(false)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  return (
    <section className="lp-section lp-section-alt lp-paper-grain" style={{ padding: '100px 24px' }}>
      <div className="lp-container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: 'left', marginBottom: 40 }}>
          <h2 className="lp-heading-md" style={{ color: '#fff' }}>
            Solutions for <i className="lp-italic">everything</i>.
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(15px,1.6vw,19px)', lineHeight: 1.5, maxWidth: 500 }}>
            Describe your problem. Future Stack designs the architecture.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: -48, top: 0, width: 176, height: 176, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)', filter: 'blur(44px)' }} />
            <div style={{ position: 'absolute', right: -40, top: 96, width: 208, height: 208, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.20), transparent 70%)', filter: 'blur(52px)' }} />
          </div>

          <div className="lp-glass" style={{ borderRadius: 20, padding: '4px 4px 4px 20px', display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Build a HIPAA-compliant AI healthcare assistant..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '14px 0', fontSize: 'clamp(15px, 1.6vw, 18px)',
                color: '#fff', fontFamily: 'var(--font-body)',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              style={{
                width: 36, height: 36, borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, hsl(213 94% 68%), hsl(221 83% 50%))',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: loading || !input.trim() ? 0.4 : 1,
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.3)',
                transition: 'opacity 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

          {!submitted && !loading && (
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); handleSubmit() }}
                  style={{
                    fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 100, padding: '6px 14px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence>
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: 12, padding: '10px 20px', borderRadius: 20, background: 'rgba(22,22,26,0.55)', border: '1px solid rgba(255,255,255,0.12)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span style={{ display: 'flex', gap: 4 }}>
                  {[0, 0.16, 0.32].map((d) => (
                    <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', animation: `lp-bounce 1s ease-in-out infinite`, animationDelay: `${d}s` }} />
                  ))}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Designing architecture...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {submitted && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: 16 }}
              >
                <div className="lp-glass" style={{ borderRadius: 20, padding: 20 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                    Based on your requirements, here is the recommended architecture:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {generated.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.04 }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</span>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'right' }}>{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <a
                    href="/auth/signup"
                    className="lp-btn-primary"
                    style={{ marginTop: 16, display: 'inline-flex', fontSize: 13 }}
                  >
                    Deploy this architecture
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
