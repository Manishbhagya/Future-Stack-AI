'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import NavBackdrop from './NavBackdrop'
import MobileMenuSection from './MobileMenuSection'
import MobileCTA from './MobileCTA'
import type { NavItem } from './MobileMenuSection'

const platformItems: NavItem[] = [
  { label: 'AI Development', href: '/services/ai-development', desc: 'Build production AI systems.' },
  { label: 'AI Agents', href: '/services/ai-agents', desc: 'Deploy autonomous agents.' },
  { label: 'Model Deployment', href: '/services/model-deployment', desc: 'Ship AI models instantly.' },
  { label: 'Knowledge Base', href: '/services/knowledge-base', desc: 'Enterprise RAG infrastructure.' },
  { label: 'API Platform', href: '/services/api-platform', desc: 'Connect your applications.' },
]

const companyItems: NavItem[] = [
  { label: 'About', href: '/about', desc: 'Our story and mission' },
  { label: 'Case Studies', href: '/case-studies', desc: 'See what we built' },
  { label: 'Blog', href: '/blog', desc: 'Latest insights' },
  { label: 'Pricing', href: '/pricing', desc: 'Plans for every team' },
  { label: 'Contact', href: '/contact', desc: 'Get in touch' },
]

type Props = {
  open: boolean
  onClose: () => void
  hamburgerRef: React.RefObject<HTMLButtonElement | null>
}

export default function MobileMenu({ open, onClose, hamburgerRef }: Props) {
  const menuRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    },
    [open, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Focus trap
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      closeRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [open])

  // Restore focus to hamburger on close
  useEffect(() => {
    if (!open) {
      hamburgerRef.current?.focus()
    }
  }, [open, hamburgerRef])

  return (
    <AnimatePresence>
      {open && (
        <>
          <NavBackdrop onClick={onClose} />
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              zIndex: 200,
              top: 12,
              left: 12,
              right: 12,
              bottom: 12,
              background: 'rgba(20,22,28,0.95)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 32,
              boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 14px 0',
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Future<span style={{ color: 'var(--accent)' }}>Stack</span>
              </Link>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.transform = 'rotate(90deg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'rotate(0deg)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable nav area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 0 8px',
              }}
            >
              <MobileMenuSection
                label="Platform"
                items={platformItems}
                indexOffset={0}
                onClose={onClose}
              />

              <div
                style={{
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                  margin: '20px 14px',
                }}
              />

              <MobileMenuSection
                label="Company"
                items={companyItems}
                indexOffset={platformItems.length}
                onClose={onClose}
              />
            </div>

            {/* Bottom CTA */}
            <MobileCTA onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
