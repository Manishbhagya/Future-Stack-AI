'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

const powerups = [
  { icon: '🎨', title: 'Hero Sections', desc: 'Multiple hero layouts with split-screen, centered, and full-width options.' },
  { icon: '📋', title: 'Feature Grids', desc: 'Configurable feature grids in 2, 3, and 4-column arrangements.' },
  { icon: '💬', title: 'Testimonial Blocks', desc: 'Quote cards, carousels, and grid layouts for social proof.' },
  { icon: '💰', title: 'Pricing Tables', desc: 'Flexible pricing layouts with toggle, comparison, and tiered displays.' },
  { icon: '❓', title: 'FAQ Accordions', desc: 'Collapsible FAQ sections with category grouping and search.' },
  { icon: '👥', title: 'Team Sections', desc: 'Team member grids with avatars, roles, and hover details.' },
  { icon: '📊', title: 'Stats Counters', desc: 'Animated stat counters for social proof and key metrics.' },
  { icon: '📝', title: 'Contact Forms', desc: 'Multi-field forms with validation, textarea, and file upload support.' },
  { icon: '📰', title: 'Blog Layouts', desc: 'Blog listing grids with pagination, categories, and featured posts.' },
  { icon: '🔗', title: 'Integration Logos', desc: 'Client logo rows, integration grids, and partner showcases.' },
  { icon: '📱', title: 'CTAs & Banners', desc: 'Call-to-action sections with dark, gradient, and accent backgrounds.' },
  { icon: '📄', title: 'Legal Pages', desc: 'Privacy policy, terms of service, and cookie consent templates.' },
]

export default function PowerUpsPage() {
  return (
    <>
      <section className="powerups-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Components
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Power-Ups
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            A library of reusable UI sections to mix, match, and extend your site.
          </motion.p>
        </div>
      </section>

      <section className="powerups-section">
        <div className="section-container">
          <div className="powerups-grid">
            {powerups.map((item, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="powerup-item">
                  <span className="powerup-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <FadeIn>
            <div className="cta-card">
              <h2 className="cta-title">Want a custom component?</h2>
              <p className="cta-desc">
                Need something specific? We build custom components tailored to your brand and requirements.
              </p>
              <Link href="/contact" className="btn-white btn-large">
                Request a Component
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
