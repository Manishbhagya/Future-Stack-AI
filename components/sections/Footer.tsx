'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AskAIWrapper from '../AskAIWrapper'

const socials = [
  {
    label: 'X',
    url: 'https://x.com',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/contactmanishbhagyasagar/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/Manishbhagya',
    path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
]

export default function Footer() {
  const pathname = usePathname()
  const isLanding = pathname === '/'

  const containerStyle: React.CSSProperties = isLanding
    ? { background: '#0b0d12', borderTop: '1px solid rgba(255,255,255,0.06)' }
    : {}

  return (
    <footer
      className={isLanding ? '' : 'site-footer'}
      style={{
        padding: '48px 24px 32px',
        color: 'rgba(255,255,255,0.55)',
        fontSize: 13,
        fontFamily: 'var(--font-body)',
        ...containerStyle,
      }}
    >
      <div style={{
        maxWidth: 1160,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 32,
        }}>
          <div>
            <Link href="/" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: isLanding ? '#fff' : 'var(--text-white)',
              textDecoration: 'none',
            }}>
              Future<span style={{ color: 'var(--accent)' }}>Stack</span>
            </Link>
            <p style={{
              marginTop: 8,
              maxWidth: 260,
              lineHeight: 1.6,
              color: isLanding ? 'rgba(255,255,255,0.35)' : 'var(--text-tertiary)',
              fontSize: 12,
            }}>
              AI-native infrastructure for production systems.
            </p>
          </div>

          <nav style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isLanding ? 'rgba(255,255,255,0.25)' : 'var(--text-tertiary)',
                marginBottom: 12,
              }}>Pages</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/services" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Services</Link>
                <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Blog</Link>
                <Link href="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link>
              </div>
            </div>
            <div>
              <p style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isLanding ? 'rgba(255,255,255,0.25)' : 'var(--text-tertiary)',
                marginBottom: 12,
              }}>Account</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/sign-in" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Sign In</Link>
                <Link href="/sign-up" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Get Started</Link>
              </div>
            </div>
          </nav>
        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '8px 0',
        }}>
          <AskAIWrapper />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          paddingTop: 24,
          borderTop: `1px solid ${isLanding ? 'rgba(255,255,255,0.06)' : 'var(--border-dark)'}`,
        }}>
          <p style={{
            fontSize: 11,
            color: isLanding ? 'rgba(255,255,255,0.25)' : 'var(--text-tertiary)',
          }}>
            &copy; {new Date().getFullYear()} Future Stack AI. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: isLanding ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLanding ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
