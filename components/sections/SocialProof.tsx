'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Future Stack cut our AI pipeline setup from 3 weeks to 3 days. The architecture generation alone saves my team 20 hours per project.',
    author: 'Sarah Chen', role: 'VP Engineering, StackBlitz',
  },
  {
    quote: 'We evaluated every AI deployment platform. Future Stack was the only one that understood enterprise-grade security without sacrificing speed.',
    author: 'Marcus Rivera', role: 'CTO, InfluxData',
  },
  {
    quote: 'The knowledge graph integration is a game-changer. We finally have a single source of truth across all our AI models.',
    author: 'Elena Voss', role: 'Head of AI, Neo4j',
  },
]

export default function SocialProof() {
  return (
    <section className="lp-section lp-paper-grain" style={{ padding: '100px 24px' }}>
      <div className="lp-container">
        <h2 className="lp-heading-sm" style={{ color: '#fff', textAlign: 'left' }}>
          Early <i className="lp-italic">adopters</i>.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="lp-glass" style={{ borderRadius: 24, padding: '32px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6" opacity="0.2" style={{ marginBottom: 16 }}>
                  <path d="M9.5 4C5.6 4 3 7 3 10.5c0 3.8 2.3 5.5 4.5 5.5 1.7 0 3-1 3-2.5 0-1.4-1-2.5-2.5-2.5-.6 0-1.1.1-1.5.4C6.2 10 7.5 7 10 6.5c-.2-.9-1-2.5-2.5-3.5zM19.5 4c-3.9 0-6.5 3-6.5 6.5 0 3.8 2.3 5.5 4.5 5.5 1.7 0 3-1 3-2.5 0-1.4-1-2.5-2.5-2.5-.6 0-1.1.1-1.5.4.3-1.4 1.6-4.4 4.1-4.5-.2-.9-1-2.5-2.5-3.5z" />
                </svg>
                <p style={{ flex: 1, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>{t.quote}</p>
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
