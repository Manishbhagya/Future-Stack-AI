'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function StoryCard({ bg, label, title, desc, glassContent, delay }: {
  bg: string; label: string; title: string; desc: string;
  glassContent: React.ReactNode; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="lp-photo-card"
    >
      <div className="lp-photo-card-bg">
        <div style={{ position: 'absolute', inset: 0, background: `url(${bg}) center / cover`, opacity: 0.9 }} />
      </div>
      <div className="lp-photo-card-overlay" />
      <div className="lp-photo-card-content">
        <div className="lp-photo-card-glass">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.4vw,19px)', letterSpacing: '0.06em', color: '#fff' }}>{label}</p>
          {glassContent}
        </div>
        <div className="lp-photo-card-bottom">
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px,1.7vw,24px)', fontWeight: 400, color: '#fff' }}>{title}</h3>
          <p style={{ marginTop: 8, fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.35, color: '#d3d3d3' }}>{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ConnectionRow({ color, label }: { color: string; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 10px', borderRadius: 8, width: 'fit-content',
      background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
      marginBottom: 4,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: 10, color: '#fff' }}>{label}</span>
    </div>
  )
}

const generateSteps = [
  { name: 'GPT-4o', role: 'Primary LLM', color: '#3b82f6' },
  { name: 'Pinecone', role: 'Vector DB', color: '#a78bfa' },
  { name: 'Supabase', role: 'Data Layer', color: '#34d399' },
]

const providers = [
  { name: 'AWS', status: 'Deployed', color: '#fbbf24' },
  { name: 'Vercel', status: 'Live', color: '#34d399' },
  { name: 'Cloudflare', status: 'Active', color: '#f472b6' },
  { name: 'Kubernetes', status: 'Ready', color: '#3b82f6' },
]

const metrics = [
  { label: 'CPU', pct: 42, color: '#34d399' },
  { label: 'Memory', pct: 68, color: '#3b82f6' },
  { label: 'Requests', pct: 2300, color: '#a78bfa', format: true },
  { label: 'Latency', pct: 0, color: '#fbbf24', text: '0.12s' },
]

export default function StoryCards() {
  const [typing, setTyping] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const fullText = 'Build an AI support agent for our healthcare platform.'

  const handleCardEnter = () => {
    if (!typing && !typingDone) {
      setTyping(true)
      let i = 0
      const interval = setInterval(() => {
        i++
        if (i >= fullText.length) {
          clearInterval(interval)
          setTyping(false)
          setTimeout(() => setTypingDone(true), 500)
        }
      }, 30)
    }
  }

  return (
    <section className="lp-section lp-paper-grain" style={{ padding: '100px 24px' }}>
      <div className="lp-container" style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 className="lp-heading-lg" style={{ color: '#fff' }}>
          Find the <i className="lp-italic">right</i> infrastructure.
        </h2>
        <p style={{ marginTop: 24, marginLeft: 'auto', marginRight: 'auto', maxWidth: 640, color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(15px,1.6vw,19px)', lineHeight: 1.45 }}>
          From knowledge indexing to production deployment — Future Stack gives you the full AI engineering platform.
        </p>
      </div>

      <div className="lp-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {/* Card 1: Understand your business */}
        <StoryCard
          bg="/company-bg.webp"
          label="KNOWLEDGE INDEXING"
          title="Understands your business."
          desc="Connect your tools and let Future Stack index everything your company knows."
          delay={0}
          glassContent={
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <ConnectionRow color="#e01e5a" label="Connect Slack" />
              <ConnectionRow color="#ea4335" label="Connect Gmail" />
              <ConnectionRow color="#34a853" label="Connect Drive" />
              <ConnectionRow color="#6e40c9" label="Connect GitHub" />
            </div>
          }
        />

        {/* Card 2: Build AI Systems */}
        <motion.div
          className="lp-photo-card"
          onViewportEnter={handleCardEnter}
        >
          <div className="lp-photo-card-bg">
            <div style={{ position: 'absolute', inset: 0, background: 'url(/leads-bg.webp) center / cover', opacity: 0.9 }} />
          </div>
          <div className="lp-photo-card-overlay" />
          <div className="lp-photo-card-content">
            <div className="lp-photo-card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.4vw,19px)', letterSpacing: '0.06em', color: '#fff', marginBottom: 16 }}>AI GENERATION</p>
              {!typing && !typingDone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Waiting to generate...
                </div>
              )}
              {typing && !typingDone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Generating architecture...
                </div>
              )}
              <AnimatePresence>
                {typingDone && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {generateSteps.map((s, i) => (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        <span style={{ width: 18, height: 18, borderRadius: 6, background: `${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: s.color, fontWeight: 700 }}>{s.name[0]}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{s.name}</span>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>{s.role}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="lp-photo-card-bottom">
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px,1.7vw,24px)', fontWeight: 400, color: '#fff' }}>Build production AI in minutes.</h3>
              <p style={{ marginTop: 8, fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,16px)', lineHeight: 1.35, color: '#d3d3d3' }}>Describe what you want. Future Stack generates the architecture, models, and deployment.</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Deploy Everywhere */}
        <StoryCard
          bg="/info-bg.webp"
          label="DEPLOYMENT"
          title="Deploy with confidence."
          desc="Ship to any cloud with one click. Auto-scaling, monitoring, and rollbacks built in."
          delay={260}
          glassContent={
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
                {providers.map((p) => (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
                    {p.name}
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: p.color }}>{p.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
                {metrics.map((m) => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', width: 50 }}>{m.label}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      {m.format ? (
                        <div style={{ width: '100%', height: '100%', background: m.color, borderRadius: 4 }} />
                      ) : (
                        <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 4 }} />
                      )}
                    </div>
                    <span style={{ fontSize: 10, color: m.color, width: 40, textAlign: 'right' }}>{m.text || `${m.pct}%`}</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </section>
  )
}
