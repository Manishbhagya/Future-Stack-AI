'use client'

import { motion } from 'framer-motion'
import FadeIn from '../../components/FadeIn'

const changes = [
  { version: 'v1.0.0', date: 'June 12, 2026', desc: 'Initial release. Homepage, services, about, blog, pricing, and contact pages.' },
  { version: 'v0.9.0', date: 'June 1, 2026', desc: 'Beta launch with core pages and Clerk authentication integration.' },
  { version: 'v0.8.0', date: 'May 15, 2026', desc: 'Internal alpha. Foundation layout and service detail pages.' },
]

export default function ChangelogPage() {
  return (
    <>
      <section className="changelog-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Updates
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Changelog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ color: 'var(--text-light)' }}
          >
            Track every update, improvement, and release.
          </motion.p>
        </div>
      </section>

      <section className="changelog-section">
        {changes.map((change, i) => (
          <FadeIn key={i} delay={0.1 * i}>
            <div className="changelog-item">
              <div className="changelog-version">{change.version}</div>
              <div className="changelog-date">{change.date}</div>
              <div className="changelog-desc">{change.desc}</div>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  )
}
