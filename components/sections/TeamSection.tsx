'use client'

import { motion } from 'framer-motion'

const founders = [
  {
    name: 'Manish Bhagyasagar',
    role: 'Co-Founder & CEO',
    bio: 'Software Developer | Building AI-Powered FutureStack.',
    initials: 'MB', color: '#3b82f6',
    image: '/Profile/manish-bhagya .jpeg',
  },
  {
    name: 'Manish Bhaktisagar',
    role: 'Founder & CTO',
    bio: 'Youngest Founder @ adtext.org • Helping Al chat apps make money without ruining the experience',
    initials: 'MB', color: '#8b5cf6',
    image: '/Profile/manish-bhakti.jpg',
  },
  {
    name: ' Marina Saint - Amant ',
    role: 'Head of Strategy',
    bio: 'Intl. Physics Olympiad honoree.',
    initials: 'MS', color: '#ec4899',
  },
  {
    name: 'Vision AI',
    role: 'COO',
    bio: 'Youngest intern at GlobalLogic (Hitachi) at 19.',
    initials: 'VA', color: '#f59e0b',
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
                {f.image ? (
                  <div style={{ position: 'absolute', inset: 0, background: `url("${f.image}") center / cover` }} />
                ) : (
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${f.color}, ${f.color}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, fontWeight: 700, color: '#fff',
                    boxShadow: `0 0 40px ${f.color}33`,
                  }}>
                    {f.initials}
                  </div>
                )}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#fff' }}>{f.name}</h3>
                  <div style={{ marginTop: 4, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>{f.role}</div>
                  <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.4, color: '#cdcdcd' }}>{f.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
