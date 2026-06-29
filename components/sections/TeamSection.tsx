'use client'

import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Pavan Kumar',
    role: 'Co-Founder & CEO',
    bio: 'Youngest intern at Cisco. Scaled Cliqk to $25K MRR. 28M views.',
    initials: 'PK', color: '#3b82f6',
  },
  {
    name: 'Pratham Patel',
    role: 'Co-Founder & CTO',
    bio: 'Built open-source app to 10K+ users in 6 months. Research @ DA-IICT.',
    initials: 'PP', color: '#8b5cf6',
  },
  {
    name: 'Clarissa Saputra',
    role: 'Head of Engineering',
    bio: 'Intl. Physics Olympiad honoree. Published at AAAI 2026. 150K+ following.',
    initials: 'CS', color: '#ec4899',
  },
  {
    name: 'Tejas Gupta',
    role: 'COO',
    bio: 'Scaled a company to $40M. Youngest intern at GlobalLogic (Hitachi) at 19.',
    initials: 'TG', color: '#f59e0b',
  },
]

export default function TeamSection() {
  return (
    <section className="lp-section lp-section-alt" style={{ padding: '100px 24px' }}>
      <div className="lp-container">
        <h2 className="lp-heading-sm" style={{ color: '#fff', textAlign: 'left' }}>
          Who you&apos;re <i className="lp-italic">working with</i>.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 48 }}>
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ position: 'relative', aspectRatio: '311/434', width: '100%', overflow: 'hidden', borderRadius: 30, background: '#14161c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${f.color}, ${f.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 700, color: '#fff',
                  boxShadow: `0 0 40px ${f.color}33`,
                }}>
                  {f.initials}
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#fff' }}>{f.name}</h3>
                  <div style={{ marginTop: 4, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>{f.role}</div>
                  <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.4, color: '#cdcdcd' }}>{f.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 600, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <a href="https://www.jsv.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', textDecoration: 'none', transition: 'background 0.3s' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Jackson Square Ventures</div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Lead Investor</span>
            </a>
            <a href="https://f.inc" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', textDecoration: 'none', transition: 'background 0.3s', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Founders, Inc.</div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Backer</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
