'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="privacy-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className="privacy-date"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Last updated: June 12, 2026
          </motion.p>
        </div>
      </section>

      <section className="privacy-section">
        <div className="privacy-content">
          <FadeIn>
            <h2>Collecting Personal Information</h2>
            <p>Future Stack AI values your privacy. This policy outlines how we collect, use, and protect your information when you use our website and services.</p>

            <h2>1. Information We Collect</h2>
            <p><strong>Personal Information:</strong> Name, email address, payment details, and other information you provide when using our services or contacting us.</p>
            <p><strong>Non-Personal Information:</strong> IP address, browser type, device information, cookies, and usage data collected automatically.</p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Provide and improve our services</li>
              <li>Process payments and manage accounts</li>
              <li>Send updates, promotions, and service-related communications</li>
              <li>Comply with legal obligations</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>

            <h2>3. Sharing Your Information</h2>
            <p>We only share data with trusted service providers or as required by law. We do not sell your personal information to third parties.</p>

            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.</p>

            <h2>5. Your Rights</h2>
            <p>You may request to access, correct, or delete your personal data at any time. You can also opt out of marketing communications. Contact us at privacy@futurestack.ai for any requests.</p>

            <h2>6. Cookies</h2>
            <p>We use cookies and similar technologies to improve your experience, analyze traffic, and personalize content. You can control cookie preferences through your browser settings.</p>

            <h2>7. Contact</h2>
            <p>For questions about this privacy policy, please reach out to us at privacy@futurestack.ai.</p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
