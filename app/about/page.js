'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '../../components/FadeIn'

const team = [
  { name: 'Manish Bhagyasagar', role: 'Founder & CEO', initials: 'MB' },
  { name: 'Jane Lin', role: 'Co-Founder & Design Lead', initials: 'JL' },
  { name: 'Liam Chen', role: 'Marketing & Growth', initials: 'LC' },
  { name: 'Ethan Ross', role: 'Lead Engineer', initials: 'ER' },
]

const values = [
  {
    number: '01',
    title: 'Simple by Design',
    desc: 'We strip away unnecessary complexity so you can focus on ideas that matter most.',
  },
  {
    number: '02',
    title: 'Speed First',
    desc: 'We optimize every step for speed, helping you move from concept to execution faster.',
  },
  {
    number: '03',
    title: 'Seamless Collaboration',
    desc: 'We make collaboration effortless, allowing teams to share, edit, and build on ideas in real time.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="section-container">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Design isn&apos;t just what we do — it&apos;s how we think.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            At Future Stack AI, we&apos;re building the next generation of AI-native systems —
            intelligent, scalable, and built for the real world.
          </motion.p>
        </div>
      </section>

      <section className="mission-section">
        <div className="section-container">
          <div className="mission-grid">
            <FadeIn>
              <div className="mission-text">
                <span className="section-label">/ Our Mission</span>
                <h2 className="section-title">From Idea to Impact</h2>
                <p>
                  At Future Stack AI, we&apos;re building intelligent systems that transform how businesses
                  operate. Our mission is to empower teams to move from idea to execution without friction.
                </p>
                <p>
                  Born out of frustration with fragmented, rigid technology stacks, Future Stack AI was
                  created to give businesses a smarter, simpler way to integrate AI. Whether you&apos;re
                  building a chatbot, analyzing data, or automating workflows, we provide the stack that
                  makes it possible.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mission-visual">FSA</div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Why We Exist</span>
            <h2 className="section-title">Built for Impact</h2>
            <p className="section-desc">
              Every decision we make is guided by our core principles — simplicity, speed, and collaboration.
            </p>
          </FadeIn>
          <div className="values-grid">
            {values.map((v, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="value-card">
                  <div className="step-number">{v.number}</div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-container">
          <div className="stats-row">
            <FadeIn>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="stat-item">
                <span className="stat-number">12x</span>
                <span className="stat-label">Faster Time to Launch</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Launched</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">Repeat Client Rate</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="section-container">
          <FadeIn>
            <span className="section-label">/ Meet the Team</span>
            <h2 className="section-title">The People Behind the Stack</h2>
            <p className="section-desc">
              We&apos;re a small but passionate team of engineers, designers, and product thinkers
              who believe that great tools create great outcomes.
            </p>
          </FadeIn>
          <div className="team-grid">
            {team.map((member, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="team-card">
                  <div className="team-avatar">{member.initials}</div>
                  <h4>{member.name}</h4>
                  <p className="role">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container">
          <FadeIn>
            <div className="cta-card">
              <h2 className="cta-title">Take your workflow to the next level</h2>
              <p className="cta-desc">
                Supercharge your business with AI-powered systems and effortless collaboration.
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
