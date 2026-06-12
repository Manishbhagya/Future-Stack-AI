'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    slug: 'ai-chatbots',
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Intelligent conversational AI for customer support, lead generation, and engagement.',
  },
  {
    slug: 'machine-learning',
    icon: '📊',
    title: 'Machine Learning',
    description: 'Custom ML models for predictions, pattern recognition, and data-driven decisions.',
  },
  {
    slug: 'web-development',
    icon: '💻',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with Next.js, React, and cutting-edge tech.',
  },
  {
    slug: 'data-analytics',
    icon: '📈',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with powerful analytics solutions.',
  },
  {
    slug: 'cloud-solutions',
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure on AWS, GCP, and Azure — secure and cost-effective.',
  },
  {
    slug: 'ai-automation',
    icon: '⚙️',
    title: 'AI Automation',
    description: 'Automate business processes with intelligent RPA and AI-powered workflows.',
  },
]

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

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-text">
            <motion.span
              className="hero-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI Services Platform
            </motion.span>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Build the Future<br />of <em>Intelligence</em>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              We craft AI-native systems that transform how businesses operate — from intelligent chatbots to cloud infrastructure, every layer of the stack.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link href="/services" className="btn-white">
                Explore Services
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/#contact" className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                Get in Touch
              </Link>
            </motion.div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orb" />
            <div className="hero-orb-secondary" />
            <div className="hero-grid" />
            <div className="hero-glyph">FSA</div>
            <div className="hero-glyph-accent">✦</div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-container">
          <div className="stats-row">
            <FadeIn>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Clients Served</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Uptime Guaranteed</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Our Services</span>
            <h2 className="section-title">What We Build</h2>
            <p className="section-desc">
              From intelligent chatbots to cloud infrastructure — every service engineered for scale and performance.
            </p>
          </FadeIn>
          <div className="feature-grid">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={0.06 * i}>
                <Link href={`/services/${service.slug}`} className="feature-card">
                  <span className="feature-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="btn-arrow">→</span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ How We Work</span>
            <h2 className="section-title">From Concept to Deployment</h2>
            <p className="section-desc">
              A streamlined process that takes your idea from discovery to production, with transparency at every stage.
            </p>
          </FadeIn>
          <div className="process-steps">
            <FadeIn delay={0.1}>
              <div className="process-step">
                <div className="step-number">01</div>
                <h3 className="step-title">Discovery & Strategy</h3>
                <p className="step-desc">We learn about your business, goals, and challenges to define a clear roadmap for success.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="process-step">
                <div className="step-number">02</div>
                <h3 className="step-title">Design & Development</h3>
                <p className="step-desc">Our team builds your solution using modern architectures with regular progress updates.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="process-step">
                <div className="step-number">03</div>
                <h3 className="step-title">Deploy & Scale</h3>
                <p className="step-desc">We launch, monitor, and optimize — ensuring your system grows with your business.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="section-container">
          <FadeIn>
            <div className="cta-card">
              <h2 className="cta-title">Ready to build something exceptional?</h2>
              <p className="cta-desc">
                Let&apos;s talk about your project. No commitment — just a conversation about what&apos;s possible.
              </p>
              <Link href="/services" className="btn-white btn-large">
                Start a Project
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
