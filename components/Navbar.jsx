'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

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
        <div className="nav-right">
          <Link
            href="/services"
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
          >
            Services
          </Link>
          <Link
            href="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
          >
            Pricing
          </Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <SignOutButton>
                <button className="nav-btn-outline" style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '10px 22px',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}>
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="nav-link">Sign In</Link>
              <Link href="/sign-up" className="nav-btn">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
