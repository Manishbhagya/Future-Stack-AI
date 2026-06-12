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

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is Future Stack AI?',
        a: 'Future Stack AI is a full-service AI and technology company that builds intelligent systems — from chatbots and ML models to cloud infrastructure and data analytics.',
      },
      {
        q: 'Do I need technical knowledge to work with you?',
        a: 'Not at all. We handle the technical implementation from start to finish. You provide the vision, we build the solution.',
      },
      {
        q: 'What industries do you serve?',
        a: 'We work with businesses across industries including healthcare, finance, e-commerce, education, and technology.',
      },
      {
        q: 'How do I get started?',
        a: 'Browse our services, select the one you need, and submit an enquiry. Our team will get back to you within 24 hours.',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        q: 'What AI services do you offer?',
        a: 'We offer AI chatbots, machine learning solutions, web development, data analytics, cloud solutions, and AI automation.',
      },
      {
        q: 'Can you work with existing systems?',
        a: 'Yes. We design our solutions to integrate with your existing tech stack, minimizing disruption to your operations.',
      },
      {
        q: 'Do you offer custom ML models?',
        a: 'Yes. We build custom machine learning models tailored to your specific data, use case, and performance requirements.',
      },
      {
        q: 'What cloud platforms do you support?',
        a: 'We support AWS, Google Cloud Platform, and Microsoft Azure — we recommend the best platform for your specific needs.',
      },
    ],
  },
  {
    category: 'Pricing & Support',
    items: [
      {
        q: 'How much do your services cost?',
        a: 'Pricing varies by project scope. We provide detailed proposals after understanding your requirements. See our pricing page for starting plans.',
      },
      {
        q: 'Do you offer ongoing support?',
        a: 'Yes. We offer maintenance and support packages to ensure your systems run smoothly post-launch.',
      },
      {
        q: 'What is the typical project timeline?',
        a: 'Most projects run 4-12 weeks from discovery to deployment. We provide a detailed timeline during the proposal phase.',
      },
      {
        q: 'Is there a free consultation?',
        a: 'Yes! We offer a free initial consultation to discuss your project, answer questions, and provide recommendations.',
      },
    ],
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {question}
        <span className="faq-icon">+</span>
      </button>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  )
}

export default function FAQsPage() {
  return (
    <>
      <section className="faq-page-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            FAQs
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Frequently asked questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Find quick answers to common questions about Future Stack AI.
          </motion.p>
        </div>
      </section>

      <section className="faq-page-section">
        <div className="section-container">
          {faqs.map((group) => (
            <FadeIn key={group.category}>
              <div className="faq-category">
                <h3 className="faq-category-title">{group.category}</h3>
                <div className="faq-list">
                  {group.items.map((faq, i) => (
                    <FadeIn key={i} delay={0.04 * i}>
                      <FAQItem question={faq.q} answer={faq.a} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="cta-section" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <FadeIn>
            <div className="cta-card">
              <h2 className="cta-title">Still have questions?</h2>
              <p className="cta-desc">
                We&apos;re here to help. Reach out to our team and we&apos;ll get back to you promptly.
              </p>
              <Link href="/contact" className="btn-white btn-large">
                Contact Us
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
