import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            Future<span>Stack</span>
          </Link>
          <p className="footer-tagline">
            Building intelligence, layer by layer. AI-native systems engineered for scale.
          </p>
        </div>
        <div>
          <h4 className="footer-heading">Pages</h4>
          <nav className="footer-nav">
            <Link href="/services">Services</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="footer-heading">Account</h4>
          <nav className="footer-nav">
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Get Started</Link>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2026 Future Stack AI. All rights reserved.</p>
        <div className="footer-social">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
