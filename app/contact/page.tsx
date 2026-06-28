'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '../../components/FadeIn'

const faqs = [
  {
    q: 'What services does Future Stack AI offer?',
    a: 'We offer AI chatbots, machine learning solutions, web development, data analytics, cloud solutions, and AI automation — a full-stack AI services platform.',
  },
  {
    q: 'How do I get started with a project?',
    a: 'Simply browse our services, select the one you need, and submit an enquiry. Our team will get back to you within 24 hours to discuss your requirements.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'Not at all. We handle the technical implementation from start to finish. You provide the vision, we build the solution.',
  },
  {
    q: 'What is the typical project timeline?',
    a: 'Timelines vary by project scope. A typical engagement runs 4-12 weeks from discovery to deployment. We provide a detailed timeline during the proposal phase.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. We offer maintenance and support packages to ensure your systems run smoothly post-launch, including monitoring, updates, and optimization.',
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = React.useState(false)
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

import React from 'react'

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in touch with us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Have questions, need help, or want to learn more about our services?
            We&apos;re here to support you every step of the way.
          </motion.p>
        </div>
      </section>

      <section className="contact-main">
        <div className="section-container">
          <div className="contact-grid">
            <FadeIn>
              <div className="contact-form-wrap">
                <h2>Send us a message</h2>
                <form className="enquiry-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input type="text" placeholder="Your name" required />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="Your company" />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea placeholder="Tell us about your project..." required />
                  </div>
                  <button type="submit" className="btn-primary btn-large">
                    Send Message
                    <span className="btn-arrow">→</span>
                  </button>
                </form>
              </div>
            </FadeIn>
            <div className="contact-info-wrap">
              <FadeIn delay={0.1}>
                <div className="contact-info-card">
                  <h3>Support</h3>
                  <p className="contact-label">Need help? Our team is here for you.</p>
                  <p className="contact-value">support@futurestack.ai</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="contact-info-card">
                  <h3>Sales</h3>
                  <p className="contact-label">Interested in our services? Let&apos;s talk.</p>
                  <p className="contact-value">sales@futurestack.ai</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-faq">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ FAQs</span>
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-desc">
              Find quick answers to common questions about Future Stack AI.
            </p>
          </FadeIn>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <FAQItem question={faq.q} answer={faq.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
