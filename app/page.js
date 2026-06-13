'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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



const logoLogos = [
  'TechCorp', 'DataFlow', 'CloudBase', 'NeuralSys',
  'AxiomAI', 'Stratify', 'PulseIQ', 'Vantage',
  'NovaTech', 'HexCore', 'BrightAI', 'FusionX',
]

function LogoGarden() {
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const animRef = useRef(null)

  const all = [...logoLogos, ...logoLogos, ...logoLogos]

  const speed = 40

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const tick = () => {
      if (isHovered || isDragging) {
        animRef.current = requestAnimationFrame(tick)
        return
      }
      const dx = speed * (16 / 1000)
      let currentX = parseFloat(track.dataset.x || '0') - dx
      const totalW = logoLogos.length * 140
      if (currentX <= -totalW) currentX += totalW
      track.dataset.x = currentX
      track.style.transform = `translate3d(${currentX}px, 0, 0)`
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [isHovered, isDragging])

  const handleBar = (e) => {
    const bar = barRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const totalW = logoLogos.length * 140
    const track = trackRef.current
    if (!track) return
    track.dataset.x = -pct * totalW
    track.style.transform = `translate3d(${-pct * totalW}px, 0, 0)`
  }

  const onBarMouseDown = (e) => {
    setIsDragging(true)
    handleBar(e)
    const onMove = (ev) => handleBar(ev)
    const onUp = () => { setIsDragging(false); document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div className="logo-garden">
      <div className="logo-garden-fade">
        <div
          ref={trackRef}
          className="logo-garden-track"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {all.map((name, i) => (
            <span key={`${name}-${i}`} className="logo-garden-item">{name}</span>
          ))}
        </div>
      </div>
      <div className="logo-garden-bar" ref={barRef} onMouseDown={onBarMouseDown}>
        <div className="logo-garden-bar-track">
          <div className="logo-garden-bar-thumb" />
        </div>
      </div>
    </div>
  )
}

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

const featureColors = [
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#06b6d4', to: '#3b82f6' },
  { from: '#f59e0b', to: '#ef4444' },
  { from: '#10b981', to: '#059669' },
  { from: '#8b5cf6', to: '#ec4899' },
  { from: '#f97316', to: '#eab308' },
]

function ProgressSlideshow() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(null)

  const duration = 4000

  useEffect(() => {
    const tick = () => {
      if (!startTimeRef.current) startTimeRef.current = Date.now()
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct >= 1) {
        setActive(a => (a + 1) % nextGenFeatures.length)
        startTimeRef.current = Date.now()
        setProgress(0)
      }
    }

    intervalRef.current = setInterval(tick, 16)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current)
    } else {
      startTimeRef.current = Date.now() - progress * duration
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current
        const pct = Math.min(elapsed / duration, 1)
        setProgress(pct)
        if (pct >= 1) {
          setActive(a => (a + 1) % nextGenFeatures.length)
          startTimeRef.current = Date.now()
          setProgress(0)
        }
      }, 16)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isHovered, active])

  const f = nextGenFeatures[active]
  const color = featureColors[active % featureColors.length]

  return (
    <div
      className="progress-slideshow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="progress-slideshow-cards">
        {nextGenFeatures.map((item, i) => (
          <button
            key={i}
            className={`progress-slideshow-card ${active === i ? 'active' : ''}`}
            onClick={() => { setActive(i); startTimeRef.current = Date.now(); setProgress(0) }}
          >
            <div className="progress-slideshow-card-header">
              <span className="progress-slideshow-card-icon">{item.icon}</span>
              <div>
                <strong className="progress-slideshow-card-title">{item.title}</strong>
                <p className="progress-slideshow-card-desc">{item.desc}</p>
              </div>
            </div>
            {active === i && (
              <div className="progress-slideshow-bar-track">
                <div className="progress-slideshow-bar-fill" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="progress-slideshow-visual">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="progress-slideshow-visual-inner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
          >
            <span className="progress-slideshow-visual-icon">{f.icon}</span>
            <h3 className="progress-slideshow-visual-title">{f.title}</h3>
            <p className="progress-slideshow-visual-desc">{f.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const solutions = [
  'Startups & Scaleups',
  'Enterprise Teams',
  'Marketing Agencies',
  'Product Teams',
  'Data Engineering',
  'Tech & SaaS Companies',
]

const faqs = [
  {
    q: 'What is Future Stack AI?',
    a: 'Future Stack AI is a full-service AI and technology company that builds intelligent systems — from chatbots and ML models to cloud infrastructure and data analytics.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'Not at all. We handle the technical implementation from start to finish. You provide the vision, we build the solution.',
  },
  {
    q: 'How do I get started?',
    a: 'Browse our services, select the one you need, and submit an enquiry. Our team will get back to you within 24 hours.',
  },
  {
    q: 'What services do you offer?',
    a: 'We offer AI chatbots, machine learning solutions, web development, data analytics, cloud solutions, and AI automation — all tailored to your business needs.',
  },
]

function FAQItem({ number, question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'faq-item-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span className="faq-number">{number}</span>
        <span className="faq-question-text">{question}</span>
        <span className={`faq-icon ${open ? 'faq-icon-open' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div className={`faq-answer ${open ? 'faq-answer-open' : ''}`}>
        <div className="faq-answer-inner">
          <span className="faq-answer-number">{number}</span>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

function TypewriterEffect() {
  const words = ['Intelligence', 'Automation', 'Innovation', 'Efficiency', 'Growth']
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const currentWord = words[wordIndex % words.length]

  useEffect(() => {
    if (!isDeleting && charIndex < currentWord.length) {
      const t = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 100)
      return () => clearTimeout(t)
    }
    if (!isDeleting && charIndex === currentWord.length) {
      const t = setTimeout(() => setIsDeleting(true), 1500)
      return () => clearTimeout(t)
    }
    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 50)
      return () => clearTimeout(t)
    }
    if (isDeleting && charIndex === 0) {
      const t = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex(i => i + 1)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [charIndex, isDeleting, currentWord])

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(blink)
  }, [])

  return (
    <span className="typewriter">
      <span>{displayed}</span>
      <span className={`typewriter-cursor ${showCursor ? '' : 'typewriter-cursor-hidden'}`}>|</span>
    </span>
  )
}

function FluidButton({ href, children }) {
  return (
    <Link href={href} className="fluid-btn">
      <span className="fluid-btn-text">{children}</span>
      <span className="fluid-btn-text fluid-btn-text-lower">{children}</span>
      <span className="fluid-btn-overlay" />
    </Link>
  )
}

function BookCallButton({ href, children }) {
  return (
    <Link href={href} className="book-call-btn">
      <span className="book-call-icons">
        <span className="book-call-person">
          <span className="book-call-circle">
            <svg className="book-call-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </span>
        </span>
        <span className="book-call-person book-call-person-2">
          <span className="book-call-circle">
            <svg className="book-call-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </span>
        </span>
        <span className="book-call-plus">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </span>
      </span>
      <span className="book-call-text">{children}</span>
    </Link>
  )
}

const testimonialData = [
  {
    text: 'Future Stack AI completely transformed how our team operates. The AI chatbot we built together reduced our support tickets by 60%.',
    name: 'Emily Ray',
    role: 'UX Designer',
    initials: 'ER',
    color: '#D4A853',
  },
  {
    text: 'We launched three AI-powered features in one quarter after working with Future Stack. Their ML models are incredibly accurate.',
    name: 'Sofia Delgado',
    role: 'Product Manager, NovaTech',
    initials: 'SD',
    color: '#7C3AED',
  },
  {
    text: 'As a small agency, time is everything. Future Stack helped us automate client reporting — now we deliver projects 2x faster.',
    name: 'Ryan Chen',
    role: 'Creative Director',
    initials: 'RC',
    color: '#0EA5E9',
  },
  {
    text: 'The cloud infrastructure they built for us handles 10x our previous traffic with zero downtime. Absolutely rock solid.',
    name: 'Jessica Moore',
    role: 'Head of Operations',
    initials: 'JM',
    color: '#10B981',
  },
]

function TabsSlider() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setDirection(-1); setActive(a => (a - 1 + testimonialData.length) % testimonialData.length) }
      if (e.key === 'ArrowRight') { e.preventDefault(); setDirection(1); setActive(a => (a + 1) % testimonialData.length) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const t = testimonialData[active]

  return (
    <div className="tabs-slider">
      <div className="tabs-slider-card-wrap">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            className="tabs-slider-card"
            custom={direction}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="tabs-slider-text">&ldquo;{t.text}&rdquo;</p>
            <div className="tabs-slider-author">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="tabs-slider-avatars">
        {testimonialData.map((item, i) => (
          <motion.button
            key={i}
            className={`tabs-slider-avatar ${active === i ? 'active' : ''}`}
            onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderColor: active === i ? item.color : 'transparent',
              borderWidth: 3,
              opacity: active === i ? 1 : 0.4,
            }}
            aria-label={`View testimonial ${i + 1}`}
          >
            <div className="tabs-slider-avatar-inner" style={{ background: item.color }}>
              {item.initials}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

const pricingTiers = ['Starter', 'Professional', 'Enterprise']

function DynamicToggle({ active, onChange }) {
  return (
    <div className="dynamic-toggle">
      <div className="dynamic-toggle-slider" style={{
        width: `calc(${100 / pricingTiers.length}% - 4px)`,
        transform: `translateX(${active * 100}%)`,
      }} />
      {pricingTiers.map((tier, i) => (
        <button
          key={tier}
          className={`dynamic-toggle-label ${active === i ? 'dynamic-toggle-active' : ''}`}
          onClick={() => onChange(i)}
        >
          {tier}
        </button>
      ))}
    </div>
  )
}

export default function Home() {
  const [pricingTier, setPricingTier] = useState(1)

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
              Build the Future<br />of <TypewriterEffect />
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
              <FluidButton href="/services">Explore Services</FluidButton>
              <BookCallButton href="/contact">Book a 15-min talk</BookCallButton>
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
        <LogoGarden />
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
          <FadeIn delay={0.1}>
            <ProgressSlideshow />
          </FadeIn>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-container">
          <FadeIn>
            <h2 className="section-title section-title-center">Loved by teams that build with us</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TabsSlider />
          </FadeIn>
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
          <FadeIn delay={0.05}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
              <DynamicToggle active={pricingTier} onChange={setPricingTier} />
            </div>
          </FadeIn>
          <div className="home-pricing-grid">
            <FadeIn delay={0.1}>
              <div className={`home-pricing-card${pricingTier === 0 ? ' featured' : ''}`}>
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
              <div className={`home-pricing-card${pricingTier === 1 ? ' featured' : ''}`}>
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
              <div className={`home-pricing-card${pricingTier === 2 ? ' featured' : ''}`}>
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

      <section className="faq-section">
        <div className="section-container">
          <div className="faq-layout">
            <div className="faq-left">
              <div className="faq-label">FAQ</div>
              <FadeIn>
                <span className="section-label">/ Questions & Answers</span>
                <h2 className="section-title">Got questions? We&apos;ve got answers.</h2>
                <p className="section-desc">
                  Have more questions? Don&apos;t hesitate to email us at{' '}
                  <a href="mailto:hello@futurestack.ai" className="faq-email">hello@futurestack.ai</a>
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="faq-contact-buttons">
                  <a href="tel:+1234567890" className="btn-outline">
                    Call Us
                    <span className="btn-arrow">→</span>
                  </a>
                  <a href="mailto:hello@futurestack.ai" className="btn-outline">
                    Email Us
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="faq-right">
              {faqs.map((item, i) => (
                <FadeIn key={i} delay={0.08 * i}>
                  <FAQItem number={String(i + 1).padStart(2, '0')} question={item.q} answer={item.a} />
                </FadeIn>
              ))}
            </div>
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
              <FluidButton href="/services">Get Started</FluidButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
