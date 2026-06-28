import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="not-found-section">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="btn-primary btn-large" style={{ display: 'inline-flex' }}>
          Back to Home
          <span className="btn-arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
