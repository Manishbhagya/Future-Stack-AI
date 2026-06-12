import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Future Stack AI',
  description: 'All the services we will be providing to our clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <nav className="navbar">
              <div className="nav-container">
                <h1>Future Stack AI</h1>
                <ul className="nav-links">
                  <li><a href="/#services">Services</a></li>
                  <li><a href="/#contact">Contact</a></li>
                </ul>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2026 Future Stack AI. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}