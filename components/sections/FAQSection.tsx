'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What infrastructure do I need to start?',
    a: 'Nothing. Future Stack is fully managed. We handle model hosting, vector databases, caching, and deployment infrastructure. You just build.',
  },
  {
    q: 'Can I use my own cloud provider?',
    a: 'Yes. AWS, GCP, Azure, or your own data center. All components are containerized and Kubernetes-ready. Self-hosted enterprise plans available.',
  },
  {
    q: 'What models do you support?',
    a: 'GPT-4o, Claude 3.5, Gemini 2.0, Llama 3, Mistral, and 20+ open-source models. Fine-tuning and custom model deployment supported.',
  },
  {
    q: 'How fast can I go from signup to production?',
    a: 'Standard architectures deploy in 2-4 hours. Custom enterprise deployments take 1-3 days with our solutions team.',
  },
  {
    q: 'How does pricing work?',
    a: 'Flat platform fee based on query volume and infrastructure usage. No hidden costs. Enterprise plans include dedicated support and custom SLAs. Free tier for first 10K queries.',
  },
  {
    q: 'Do I need ML experience?',
    a: 'No. Describe your problem in plain English and we generate the architecture — model selection, RAG pipeline, API setup, deployment config. No ML expertise required.',
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 24, background: 'none', border: 'none', cursor: 'pointer',
          color: open ? '#fff' : 'rgba(255,255,255,0.6)',
          fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 400,
          textAlign: 'left', padding: '24px 0', fontFamily: 'var(--font-body)',
          letterSpacing: '-0.005em',
          transition: 'color 0.2s',
        }}
      >
        <span>{faq.q}</span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              maxWidth: '62ch', paddingBottom: 24, paddingRight: 48,
              fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.5,
              color: 'rgba(255,255,255,0.5)',
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section className="lp-section lp-section-alt lp-paper-grain" style={{ padding: '100px 24px' }}>
      <div className="lp-container" style={{ maxWidth: 800 }}>
        <h2 className="lp-heading-xs" style={{ color: '#fff', textAlign: 'left' }}>
          The questions <i className="lp-italic">before the call</i>.
        </h2>

        <div style={{ marginTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
