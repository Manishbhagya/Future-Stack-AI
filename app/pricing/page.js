'use client'

import { useState, useRef } from 'react'
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

const plans = [
  {
    name: 'Starter',
    monthly: 19,
    yearly: 190,
    desc: 'For individuals and small projects just getting started.',
    features: ['1 active project', 'AI chatbot integration', 'Basic analytics', 'Community support', 'Cloud deployment'],
    featured: false,
  },
  {
    name: 'Professional',
    monthly: 49,
    yearly: 490,
    desc: 'For freelancers and teams scaling their AI capabilities.',
    features: ['Unlimited projects', 'Custom ML models', 'Advanced analytics', 'Priority support', 'Cloud infrastructure'],
    featured: true,
  },
  {
    name: 'Enterprise',
    monthly: 99,
    yearly: 990,
    desc: 'For growing businesses that need dedicated AI infrastructure.',
    features: ['Everything in Pro', 'Dedicated AI engineer', 'Custom integrations', '24/7 support', 'SLA guarantee'],
    featured: false,
  },
]

const comparisons = [
  { feature: 'AI-powered chatbots', free: '✓', pro: '✓', biz: '✓' },
  { feature: 'Machine learning models', free: '—', pro: '✓', biz: '✓' },
  { feature: 'Data analytics dashboards', free: '✓', pro: '✓', biz: '✓' },
  { feature: 'Custom model training', free: '—', pro: '✓', biz: '✓' },
  { feature: 'Cloud infrastructure', free: 'Basic', pro: 'Advanced', biz: 'Enterprise' },
  { feature: 'API access', free: '—', pro: '✓', biz: '✓' },
  { feature: 'Dedicated support', free: '—', pro: 'Email', biz: '24/7' },
  { feature: 'SLA guarantee', free: '—', pro: '—', biz: '99.95%' },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      <section className="pricing-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perfect plan for you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Choose a plan that grows with you. Start with a free consultation and upgrade anytime.
          </motion.p>
        </div>
      </section>

      <section className="services-section">
        <div className="section-container">
          <FadeIn>
            <div className="pricing-toggle">
              <span className={`pricing-toggle-label ${!yearly ? 'active' : ''}`}>Monthly</span>
              <button
                onClick={() => setYearly(!yearly)}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  border: 'none',
                  background: yearly ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.3s',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 3,
                  left: yearly ? 25 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.3s',
                  display: 'block',
                }} />
              </button>
              <span className={`pricing-toggle-label ${yearly ? 'active' : ''}`}>Yearly</span>
              <span className="pricing-toggle-badge">Save 20%</span>
            </div>
          </FadeIn>

          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <FadeIn key={plan.name} delay={0.1 * i}>
                <div className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                  <p className="pricing-name">{plan.name}</p>
                  <div className="pricing-price">
                    ${yearly ? plan.yearly : plan.monthly}
                  </div>
                  <p className="pricing-period">/{yearly ? 'year' : 'month'}</p>
                  <p className="pricing-desc">{plan.desc}</p>
                  <ul className="pricing-features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={plan.featured ? 'btn-primary' : 'btn-outline'}>
                    Get Started
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Comparison</span>
            <h2 className="section-title">Compare plans</h2>
          </FadeIn>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th>Professional</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className={row.free === '✓' ? 'check' : 'dash'}>{row.free}</td>
                    <td className={row.pro === '✓' ? 'check' : 'dash'}>{row.pro}</td>
                    <td className={row.biz === '✓' ? 'check' : 'dash'}>{row.biz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <FadeIn>
            <div className="cta-card">
              <h2 className="cta-title">Not sure which plan fits?</h2>
              <p className="cta-desc">
                We offer free consultations to help you find the right solution for your business.
              </p>
              <Link href="/contact" className="btn-white btn-large">
                Talk to Us
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
