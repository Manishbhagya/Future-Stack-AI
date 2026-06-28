'use client'

import { motion } from 'framer-motion'
import FeatureWheel from '../../components/FeatureWheel'
import FadeIn from '../../components/FadeIn'

export default function TotalControlPage() {
  return (
    <>
      <section className="total-control-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            / Platform Overview
          </motion.span>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Total Control.<br />
            <em>Zero Chaos.</em>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            We handle the heavy lifting of organization and tracking to keep your firm running smoothly.
          </motion.p>
        </div>
      </section>

      <section className="total-control-features">
        <div className="section-container">
          <FeatureWheel />
        </div>
      </section>

      <section className="total-control-cta">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="section-label">/ Get Started</span>
            <h2 className="section-title section-title-center">Ready to take full control?</h2>
            <p className="section-desc section-desc-center" style={{ marginBottom: 32 }}>
              Join thousands of teams who trust Future Stack AI to power their workflow.
            </p>
            <a href="/contact" className="btn-primary">
              Talk to our team
              <span className="btn-arrow">→</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
