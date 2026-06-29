'use client'

import { motion } from 'framer-motion'

const osItems = [
  { label: 'Deployments', value: '12 active', color: '#3b82f6' },
  { label: 'Knowledge Base', value: '2,341 docs', color: '#60a5fa' },
  { label: 'Agents', value: '8 running', color: '#34d399' },
  { label: 'Models', value: 'GPT-4o, Claude', color: '#a78bfa' },
  { label: 'API Keys', value: '6 in use', color: '#f472b6' },
  { label: 'Playground', value: '0.2s avg', color: '#fbbf24' },
  { label: 'Usage', value: '84.2K tokens', color: '#22d3ee' },
  { label: 'Monitoring', value: '99.9% uptime', color: '#34d399' },
]

const activityFeed = [
  { event: 'Deploy prod-v3', status: 'Success', time: '2m ago' },
  { event: 'Model fine-tune complete', status: 'Success', time: '8m ago' },
  { event: 'Knowledge sync', status: 'Running', time: '12m ago' },
  { event: 'API rate alert', status: 'Resolved', time: '23m ago' },
  { event: 'Agent retry', status: 'Failed → OK', time: '31m ago' },
]

export default function HeroSection() {
  return (
    <section className="lp-hero-section" style={{ position: 'relative', overflow: 'hidden', background: '#0b0d12' }}>
      {/* Cinematic cloud infrastructure background */}
      <div style={{ position: 'absolute', inset: 0, height: 820 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(/hero-sky.jpg) center top / cover',
          opacity: 0.75,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.12)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 560, height: 260, background: 'linear-gradient(to bottom, transparent, #0b0d12)' }} />

      <div style={{ position: 'relative', margin: '0 auto', maxWidth: 1400, padding: '120px 24px 60px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            color: '#fff',
            maxWidth: '15ch',
            margin: '24px auto 0',
          }}
        >
          <span>Build AI products</span>
          <br />
          <span>that <i style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>actually</i> scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 28,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            lineHeight: 1.6,
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Future Stack helps companies build production-ready AI systems with enterprise infrastructure built in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}
        >
          <a href="/auth/signup" className="lp-btn-primary" style={{ fontSize: 15, padding: '16px 36px' }}>
            Start Building
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a href="/contact" className="lp-btn-ghost" style={{ fontSize: 15, padding: '16px 36px' }}>
            Book Demo
          </a>
        </motion.div>

        {/* Floating AI OS Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 48,
                borderRadius: 28,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(16,18,24,0.92)',
                backdropFilter: 'blur(28px) saturate(160%)',
                boxShadow: '0 50px 140px -24px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              {/* OS chrome bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ef4444', '#fbbf24', '#34d399'].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
                  ))}
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                  Future Stack OS — v2.4.1 — Production
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>All Systems Nominal</span>
                </div>
              </div>

              {/* OS body: sidebar + main */}
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 360 }}>
                {/* Sidebar */}
                <div style={{ padding: 16, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Workspace</div>
                  {['Dashboard', 'Deployments', 'Agents', 'Models', 'Knowledge', 'API Keys', 'Monitoring', 'Logs'].map((item) => (
                    <div key={item} style={{
                      padding: '8px 10px', borderRadius: 8, fontSize: 13, color: item === 'Deployments' ? '#fff' : 'rgba(255,255,255,0.45)',
                      background: item === 'Deployments' ? 'rgba(59,130,246,0.15)' : 'transparent', cursor: 'pointer',
                      transition: 'all 0.2s', marginBottom: 2,
                    }}>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Top row: metric cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {[
                      { label: 'Active Deployments', value: '12', color: '#3b82f6' },
                      { label: 'Token Usage (24h)', value: '84.2K', color: '#a78bfa' },
                      { label: 'Avg Latency', value: '0.12s', color: '#34d399' },
                      { label: 'Uptime', value: '99.97%', color: '#34d399' },
                    ].map((m) => (
                      <div key={m.label} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{m.label}</div>
                        <div style={{ fontSize: 20, fontWeight: 600, color: m.color, letterSpacing: '-0.02em' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom row: activity feed */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Recent Activity</div>
                      {activityFeed.map((a, i) => (
                        <motion.div
                          key={a.event}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', fontSize: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}
                        >
                          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{a.event}</span>
                          <span style={{ color: a.status === 'Success' || a.status === 'Resolved' ? '#34d399' : a.status === 'Running' ? '#fbbf24' : '#ef4444', fontSize: 11 }}>{a.status}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>System Health</div>
                      {osItems.slice(0, 4).map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 + i * 0.08 }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                          </div>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
      </div>
    </section>
  )
}
