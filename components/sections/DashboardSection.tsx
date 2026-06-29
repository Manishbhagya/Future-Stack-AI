'use client'

import { motion } from 'framer-motion'

const sidebarItems = [
  { icon: '◆', label: 'Dashboard', active: false },
  { icon: '◉', label: 'Projects', active: true },
  { icon: '■', label: 'Knowledge Base', active: false },
  { icon: '◇', label: 'Model Manager', active: false },
  { icon: '○', label: 'Agents', active: false },
  { icon: '▽', label: 'Prompt Studio', active: false },
  { icon: '🔑', label: 'API Keys', active: false },
  { icon: '≡', label: 'Logs', active: false },
  { icon: '◈', label: 'Usage', active: false },
  { icon: '◎', label: 'Monitoring', active: false },
  { icon: '▲', label: 'Analytics', active: false },
  { icon: '▸', label: 'Deploy Pipeline', active: false },
  { icon: '⚙', label: 'Integrations', active: false },
]

const chartData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 38 },
  { label: 'Thu', value: 61 },
  { label: 'Fri', value: 55 },
  { label: 'Sat', value: 42 },
  { label: 'Sun', value: 48 },
]

const modelHealth = [
  { name: 'GPT-4o', status: 'Healthy', latency: '0.08s', tokens: '42.1K', color: '#34d399' },
  { name: 'Claude 3.5', status: 'Healthy', latency: '0.12s', tokens: '28.3K', color: '#34d399' },
  { name: 'Gemini 2.0', status: 'Degraded', latency: '0.45s', tokens: '6.2K', color: '#fbbf24' },
  { name: 'Llama 3', status: 'Healthy', latency: '0.09s', tokens: '12.8K', color: '#34d399' },
  { name: 'Mistral', status: 'Offline', latency: '—', tokens: '0', color: '#ef4444' },
]

export default function DashboardSection() {
  return (
    <section className="lp-section" style={{ padding: '60px 24px 120px' }}>
      <div className="lp-container" style={{ maxWidth: 1200 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="lp-heading-md" style={{ color: '#fff' }}>
            Your AI <i className="lp-italic">operating system</i>.
          </h2>
          <p style={{ marginTop: 14, color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
            One platform to build, deploy, and monitor all your AI systems.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(14,16,22,0.90)',
            backdropFilter: 'blur(24px) saturate(160%)',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ef4444', '#fbbf24', '#34d399'].map((c) => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.5 }} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>Future Stack — Project: Aurora</div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
              <span style={{ fontSize: 10, color: '#34d399' }}>Production</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 480 }}>
            {/* Sidebar */}
            <div className="lp-dashboard-scroll" style={{ padding: '12px 8px', borderRight: '1px solid rgba(255,255,255,0.06)', overflowY: 'auto', maxHeight: 480 }}>
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 10px', borderRadius: 8, fontSize: 12,
                    color: item.active ? '#fff' : 'rgba(255,255,255,0.35)',
                    background: item.active ? 'rgba(59,130,246,0.12)' : 'transparent',
                    marginBottom: 2, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Main panel */}
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Top metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'Total Requests', value: '148.2K', change: '+12%', up: true },
                  { label: 'Active Models', value: '5', change: '2 degraded', up: false },
                  { label: 'Avg Latency', value: '0.14s', change: '-8%', up: true },
                  { label: 'Token Usage', value: '1.2M', change: '+18%', up: false },
                ].map((m) => (
                  <div key={m.label} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{m.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>{m.value}</div>
                    <div style={{ fontSize: 11, marginTop: 4, color: m.up ? '#34d399' : '#fbbf24' }}>{m.change}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
                {/* Chart */}
                <div style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Requests (Last 7 Days)</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                    {chartData.map((d) => (
                      <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(d.value / 61) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          style={{ width: '100%', maxWidth: 28, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, rgba(59,130,246,0.6), rgba(59,130,246,0.2))', minHeight: 4 }}
                        />
                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model health */}
                <div className="lp-dashboard-scroll" style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', maxHeight: 140, overflowY: 'auto' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Model Health</div>
                  {modelHealth.map((m) => (
                    <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 11 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, boxShadow: m.status === 'Healthy' ? `0 0 6px ${m.color}` : 'none' }} />
                      <span style={{ color: 'rgba(255,255,255,0.6)', width: 70 }}>{m.name}</span>
                      <span style={{ color: m.color, flex: 1 }}>{m.status}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)', width: 35, textAlign: 'right' }}>{m.latency}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live logs bar */}
              <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
                <span>[INFO] Deploy prod-v3 — All containers healthy</span>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                <span>[INFO] Knowledge sync complete — 2,341 docs indexed</span>
                <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: 'auto' }}>streaming...</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
