import { Outfit, Geist, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from '../components/Navbar'

import ChatWidget from '../components/ChatWidget'
import AccessibilityProWrapper from '../components/AccessibilityProWrapper'
import CookieConsentBannerWrapper from '../components/CookieConsentBannerWrapper'
import PageTransition from '../components/PageTransition'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata = {
  title: 'Future Stack AI',
  description: 'All the services we will be providing to our clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main><PageTransition>{children}</PageTransition></main>
          <ChatWidget />
          <AccessibilityProWrapper />
          <CookieConsentBannerWrapper />
        </Providers>
      </body>
    </html>
  )
}
