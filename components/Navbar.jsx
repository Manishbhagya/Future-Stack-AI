'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const products = [
  { label: 'AI Chatbots', href: '/services/ai-chatbots', desc: 'Intelligent conversational agents' },
  { label: 'ML Solutions', href: '/services/machine-learning', desc: 'Custom machine learning models' },
  { label: 'Web Development', href: '/services/web-development', desc: 'Full-stack web applications' },
  { label: 'Data Analytics', href: '/services/data-analytics', desc: 'Insights from your data' },
  { label: 'Cloud Solutions', href: '/services/cloud-solutions', desc: 'Scalable cloud infrastructure' },
  { label: 'AI Automation', href: '/services/ai-automation', desc: 'Automate your workflows' },
]

const resources = [
  { label: 'All Services', href: '/services', desc: 'Explore everything we offer' },
  { label: 'How We Work', href: '/about', desc: 'Our process and approach' },
  { label: 'Pricing', href: '/pricing', desc: 'Plans for every team' },
  { label: 'FAQs', href: '/faqs', desc: 'Common questions answered' },
]

const company = [
  { label: 'About Us', href: '/about', desc: 'Our story and mission' },
  { label: 'Blog', href: '/blog', desc: 'Latest insights' },
  { label: 'Changelog', href: '/changelog', desc: 'What\'s new' },
  { label: 'Power-Ups', href: '/power-ups', desc: 'Boost your workflow' },
]

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler])
}

function Dropdown({ label, items, columns = 3 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  return (
    <div ref={ref} className="nav-dropdown-wrapper">
      <button className="nav-dropdown-trigger" onClick={() => setOpen(!open)}>
        {label}
        <svg className={`nav-chevron ${open ? 'nav-chevron-open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-dropdown"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="nav-dropdown-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {items.map((item) => (
                <Link key={item.label} href={item.href} className="nav-dropdown-item" onClick={() => setOpen(false)}>
                  <span className="nav-dropdown-label">{item.label}</span>
                  {item.desc && <span className="nav-dropdown-desc">{item.desc}</span>}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => pathname === path

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="site-nav">
        <Link href="/" className="nav-logo">
          Future<span>Stack</span>
        </Link>
        <div className="nav-center">
          <Dropdown label="Products" items={products} columns={3} />
          <Dropdown label="Resources" items={resources} columns={2} />
          <Dropdown label="Company" items={company} columns={2} />
        </div>
        <div className="nav-right">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
              <SignOutButton>
                <button className="nav-btn-outline">Sign Out</button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-link">Sign In</Link>
              <Link href="/sign-up" className="nav-btn nav-btn-dark">Request a Demo</Link>
            </>
          )}
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span className={`nav-mobile-bar ${mobileOpen ? 'open' : ''}`} />
            <span className={`nav-mobile-bar ${mobileOpen ? 'open' : ''}`} />
            <span className={`nav-mobile-bar ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/services" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Services</Link>
            <Link href="/about" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/blog" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/pricing" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/faqs" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>FAQs</Link>
            <Link href="/#contact" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Contact</Link>
            {!isSignedIn && (
              <Link href="/sign-up" className="nav-btn nav-btn-dark" style={{ textAlign: 'center', marginTop: 12 }} onClick={() => setMobileOpen(false)}>
                Request a Demo
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
