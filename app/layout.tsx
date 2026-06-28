import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import AccessibilityProWrapper from '../components/AccessibilityProWrapper'
import CookieConsentBannerWrapper from '../components/CookieConsentBannerWrapper'
import PageTransition from '../components/PageTransition'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Future Stack AI',
  description: 'All the services we will be providing to our clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main><PageTransition>{children}</PageTransition></main>
          <Footer />
          <ChatWidget />
          <AccessibilityProWrapper />
          <CookieConsentBannerWrapper />
        </Providers>
      </body>
    </html>
  )
}
