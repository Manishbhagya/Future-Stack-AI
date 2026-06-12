'use client'

import { useRef, useState } from 'react'
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
]

const clients = [
  'TechCorp', 'DataFlow', 'CloudBase', 'NeuralSys',
  'AxiomAI', 'Stratify', 'PulseIQ', 'Vantage',
]

const testimonials = [
  {
    name: 'Emily Ray',
    role: 'UX Designer',
    initials: 'ER',
    quote: 'Future Stack AI completely transformed how our team operates. The AI chatbot we built together reduced our support tickets by 60%.',
  },
  {
    name: 'Sofia Delgado',
    role: 'Product Manager, NovaTech',
    initials: 'SD',
    quote: 'We launched three AI-powered features in one quarter after working with Future Stack. Their ML models are incredibly accurate.',
  },
  {
    name: 'Ryan Chen',
    role: 'Creative Director',
    initials: 'RC',
    quote: 'As a small agency, time is everything. Future Stack helped us automate client reporting — now we deliver projects 2x faster.',
  },
  {
    name: 'Jessica Moore',
    role: 'Head of Operations',
    initials: 'JM',
    quote: 'The cloud infrastructure they built for us handles 10x our previous traffic with zero downtime. Absolutely rock solid.',
  },
  {
    name: 'Alex Romero',
    role: 'COO, FreshScale Labs',
    initials: 'AR',
    quote: 'Future Stack AI has become the backbone of our data pipeline. From ingestion to insights, everything flows effortlessly.',
  },
]

const integrations = [
  { name: 'OpenAI', icon: '⚡' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GCP', icon: '🔷' },
  { name: 'Azure', icon: '🔵' },
  { name: 'Slack', icon: '💬' },
  { name: 'GitHub', icon: '🐙' },
]

const nextGenFeatures = [
  { icon: '☁️', title: 'Cloud-based accessibility', desc: 'Access your AI systems anytime, anywhere — no downloads or installations needed.' },
  { icon: '⚡', title: 'Fast & secure performance', desc: 'Enterprise-grade security with lightning-fast inference and real-time processing.' },
  { icon: '🎨', title: 'Effortless integration', desc: 'Plug into your existing stack with pre-built connectors and APIs.' },
  { icon: '🔄', title: 'Hassle-free scaling', desc: 'Auto-scaling infrastructure that grows with your business, no manual intervention.' },
  { icon: '📤', title: 'One-click deployment', desc: 'Deploy models, updates, and new features with a single click.' },
  { icon: '🔒', title: 'Enterprise security', desc: 'End-to-end encryption, SOC 2 compliance, and role-based access control.' },
]

const solutions = [
  'Startups & Scaleups',
  'Enterprise Teams',
  'Marketing Agencies',
  'Product Teams',
  'Data Engineering',
  'Tech & SaaS Companies',
]

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

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
              <Link href="/contact" className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
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

      <section className="client-section">
        <div className="section-container">
          <div className="client-marquee">
            <div className="client-track">
              {[...clients, ...clients].map((name, i) => (
                <span key={i} className="client-logo">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Our Services</span>
            <h2 className="section-title">The ultimate toolkit for AI-powered teams</h2>
            <p className="section-desc">
              Everything you need to build, deploy, and scale intelligent systems — all in a single, integrated platform.
            </p>
          </FadeIn>
          <div className="feature-grid">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={0.1 * i}>
                <Link href={`/services/${service.slug}`} className="feature-card">
                  <div className="feature-image-wrap">
                    <div className="feature-image-placeholder">
                      <span>{service.icon}</span>
                    </div>
                  </div>
                  <div className="feature-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="btn-arrow">→</span>
                  </div>
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

      <section className="integration-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Integrations</span>
            <h2 className="section-title section-title-center">One platform, unlimited integrations</h2>
            <p className="section-desc section-desc-center">
              Connect with the tools you already use. Our platform integrates seamlessly with your existing stack.
            </p>
          </FadeIn>
          <div className="integration-grid">
            {integrations.map((item, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <div className="integration-card">
                  <span className="integration-icon">{item.icon}</span>
                  <span className="integration-name">{item.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/contact" className="btn-outline">
                View all integrations
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label" style={{ color: '#D4A853' }}>/ Features</span>
            <h2 className="benefits-title-light">Power up your workflow with next-gen features</h2>
          </FadeIn>
          <div className="benefits-grid">
            {nextGenFeatures.map((feature, i) => (
              <FadeIn key={i} delay={0.06 * i}>
                <div className="benefits-card">
                  <div className="benefits-card-icon">{feature.icon}</div>
                  <h3 className="benefits-card-title">{feature.title}</h3>
                  <p className="benefits-card-desc">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-container">
          <div className="testimonial-layout">
            <FadeIn>
              <h2 className="section-title">Loved by teams that build with us</h2>
            </FadeIn>
            <div className="testimonial-main">
              <div className="testimonial-avatars">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    className={`testimonial-avatar-btn ${activeTestimonial === i ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                  >
                    {t.initials}
                  </button>
                ))}
              </div>
              <FadeIn key={activeTestimonial}>
                <div className="testimonial-card">
                  <p className="testimonial-quote">&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <strong>{testimonials[activeTestimonial].name}</strong>
                    <span>{testimonials[activeTestimonial].role}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="home-pricing-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Pricing</span>
            <h2 className="section-title section-title-center">Flexible plans for every team</h2>
            <p className="section-desc section-desc-center">
              Start with a free consultation. Upgrade as you grow — no lock-in, no surprises.
            </p>
          </FadeIn>
          <div className="home-pricing-grid">
            <FadeIn delay={0.1}>
              <div className="home-pricing-card">
                <h3>Starter</h3>
                <div className="home-pricing-price">$19<span>/mo</span></div>
                <p>For individuals and small projects</p>
                <ul>
                  <li>1 active project</li>
                  <li>AI chatbot integration</li>
                  <li>Basic analytics</li>
                  <li>Community support</li>
                </ul>
                <Link href="/pricing" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Learn More
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="home-pricing-card featured">
                <h3>Professional</h3>
                <div className="home-pricing-price">$49<span>/mo</span></div>
                <p>For freelancers and growing teams</p>
                <ul>
                  <li>Unlimited projects</li>
                  <li>Custom ML models</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
                <Link href="/pricing" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Started
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="home-pricing-card">
                <h3>Enterprise</h3>
                <div className="home-pricing-price">$99<span>/mo</span></div>
                <p>For businesses at scale</p>
                <ul>
                  <li>Everything in Pro</li>
                  <li>Dedicated AI engineer</li>
                  <li>Custom integrations</li>
                  <li>24/7 support + SLA</li>
                </ul>
                <Link href="/pricing" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Learn More
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="solution-section">
        <div className="section-container">
          <div className="solution-layout">
            <FadeIn>
              <div className="solution-visual">
                <div className="solution-placeholder">AI</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="solution-content">
                <span className="section-label">/ Solutions</span>
                <h2 className="section-title">The perfect AI solution for every workflow</h2>
                <p className="section-desc">
                  Discover how our platform fits your needs, whether you&apos;re a startup, enterprise, or agency.
                </p>
                <div className="solution-list">
                  {solutions.map((item, i) => (
                    <div key={i} className="solution-list-item">
                      <span className="solution-arrow">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="section-container">
          <FadeIn>
            <div className="cta-card cta-gradient">
              <h2 className="cta-title">Take your workflow to the next level</h2>
              <p className="cta-desc">
                Supercharge your business with AI-powered systems and effortless collaboration — perfect for teams of any size.
              </p>
              <Link href="/services" className="btn-white btn-large">
                Get Started
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
