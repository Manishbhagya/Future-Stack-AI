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

const posts = [
  {
    slug: 'why-ai-is-the-future-of-business',
    title: 'Why AI Is the Future of Business Software',
    date: 'June 10, 2026',
    excerpt: 'AI is reshaping every industry. Here\'s how businesses are using intelligent systems to gain a competitive edge.',
  },
  {
    slug: 'choosing-the-right-ml-model',
    title: 'Choosing the Right ML Model for Your Use Case',
    date: 'June 5, 2026',
    excerpt: 'A practical guide to selecting machine learning models based on your data, goals, and infrastructure.',
  },
  {
    slug: 'scaling-cloud-infrastructure',
    title: 'Scaling Cloud Infrastructure for AI Workloads',
    date: 'May 28, 2026',
    excerpt: 'Learn how to design cloud architectures that can handle the compute and storage demands of AI applications.',
  },
  {
    slug: 'ai-chatbots-customer-support',
    title: 'How AI Chatbots Are Transforming Customer Support',
    date: 'May 20, 2026',
    excerpt: 'Discover how intelligent chatbots are reducing response times and improving customer satisfaction.',
  },
  {
    slug: 'data-analytics-for-growth',
    title: 'Data Analytics Strategies for Business Growth',
    date: 'May 12, 2026',
    excerpt: 'Turn raw data into actionable insights with proven analytics frameworks and modern tooling.',
  },
  {
    slug: 'automation-best-practices',
    title: 'AI Automation Best Practices for 2026',
    date: 'May 4, 2026',
    excerpt: 'A comprehensive overview of automation strategies that deliver real ROI without disrupting operations.',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="blog-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The Future Stack Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Insights, guides, and best practices for building with AI.
          </motion.p>
        </div>
      </section>

      <section className="blog-section">
        <div className="section-container">
          <div className="blog-grid">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={0.06 * i}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-card-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="btn-arrow">→</span>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="pagination">
            <span className="current">1</span>
            <a href="#">2</a>
            <a href="#">Next →</a>
          </div>
        </div>
      </section>
    </>
  )
}
