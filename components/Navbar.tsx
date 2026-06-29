'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import HamburgerButton from './navigation/HamburgerButton'
import MobileMenu from './navigation/MobileMenu'
import DesktopPopover from './navigation/DesktopPopover'
import type { PopoverItem } from './navigation/DesktopPopover'

type NavConfig = {
  id: string
  label: string
  items: PopoverItem[]
}

const navConfig: NavConfig[] = [
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { label: 'AI Development', href: '/services/ai-development', desc: 'Build production-ready AI systems.' },
      { label: 'AI Agents', href: '/services/ai-agents', desc: 'Deploy autonomous AI workers.' },
      { label: 'Knowledge Graph', href: '/services/knowledge-graph', desc: 'Connect enterprise knowledge.' },
      { label: 'Model Deployment', href: '/services/model-deployment', desc: 'Deploy models globally.' },
      { label: 'Enterprise Integrations', href: '/services/integrations', desc: 'Connect Slack, Notion, GitHub, Salesforce and more.' },
      { label: 'Prompt Studio', href: '/services/prompt-studio', desc: 'Prototype AI workflows visually.' },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      { label: 'AI Agents', href: '/solutions/ai-agents', desc: 'Deploy autonomous agents for any workflow.' },
      { label: 'Enterprise Search', href: '/solutions/enterprise-search', desc: 'Semantic search across all your data.' },
      { label: 'Customer Support AI', href: '/solutions/customer-support', desc: 'Intelligent support automation.' },
      { label: 'Workflow Automation', href: '/solutions/workflow-automation', desc: 'Automate complex business processes.' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    items: [
      { label: 'Knowledge Graph', href: '/products/knowledge-graph', desc: 'Enterprise RAG infrastructure.' },
      { label: 'Prompt Studio', href: '/products/prompt-studio', desc: 'Prototype and test AI prompts.' },
      { label: 'Model Deployment', href: '/products/model-deployment', desc: 'Deploy and monitor AI models.' },
      { label: 'API Platform', href: '/products/api-platform', desc: 'Connect your applications to AI.' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { label: 'Documentation', href: '/docs', desc: 'Guides, API references, and tutorials.' },
      { label: 'Blog', href: '/blog', desc: 'Latest insights and engineering deep dives.' },
      { label: 'Changelog', href: '/changelog', desc: 'What\'s new and what\'s shipping.' },
      { label: 'Case Studies', href: '/case-studies', desc: 'See how teams are building with Future Stack.' },
    ],
  },
  {
    id: 'stories',
    label: 'Stories',
    items: [
      { label: 'Customers', href: '/stories/customers', desc: 'Customer success stories and use cases.' },
      { label: 'Engineering', href: '/stories/engineering', desc: 'Engineering deep dives and architecture.' },
      { label: 'Open Source', href: '/stories/open-source', desc: 'Our open source contributions and tools.' },
    ],
  },
]

export default function Navbar() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 120)
  }, [clearCloseTimeout])

  const openMenu = useCallback(
    (id: string) => {
      clearCloseTimeout()
      setActiveMenu(id)
    },
    [clearCloseTimeout]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const isDesktopNavVisible = pathname !== '/' && pathname !== '/services'

  return (
    <header
      style={{
        position: 'fixed',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={navRef}
        onMouseEnter={clearCloseTimeout}
        onMouseLeave={scheduleClose}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 44,
          padding: '0 4px',
          background: 'rgba(18,22,30,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 9999,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          maxWidth: 900,
          width: 'calc(100% - 32px)',
          transition: 'transform 0.3s, background 0.3s',
          transform: scrolled ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary-dark)',
            textDecoration: 'none',
            padding: '0 12px',
            flexShrink: 0,
          }}
        >
          Future<span style={{ color: pathname === '/' ? 'hsl(214, 82%, 50%)' : 'var(--accent)' }}>Stack</span>
        </Link>

        {/* Desktop nav items */}
        <div
          className="nav-center-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
          }}
        >
          {navConfig.map((nav) => {
            const isActive = activeMenu === nav.id
            return (
              <div
                key={nav.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => openMenu(nav.id)}
              >
                <button
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 12px',
                    background: isActive
                      ? 'rgba(90,140,255,0.20)'
                      : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                    transition: 'all 0.25s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {nav.label}
                </button>

                {/* Desktop popover */}
                <AnimatePresence>
                  {isActive && (
                    <DesktopPopover items={nav.items} onClose={() => setActiveMenu(null)} />
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Right side */}
        <div
          className="nav-right-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            paddingRight: 2,
          }}
        >
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  padding: '8px 12px',
                  transition: 'color 0.2s',
                }}
              >
                Dashboard
              </Link>
              <SignOutButton>
                <button
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  padding: '6px 10px',
                  transition: 'color 0.2s',
                }}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                style={{
                  background: '#fff',
                  color: '#111',
                  padding: '5px 16px',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                Request a Demo
              </Link>
            </>
          )}
          <HamburgerButton
            ref={hamburgerRef}
            open={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          />
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        hamburgerRef={hamburgerRef}
      />
    </header>
  )
}
