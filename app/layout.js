import './globals.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Future Stack AI',
  description: 'All the services we will be providing to our clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer>
            <p>&copy; 2026 Future Stack AI. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}