import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import ErrorBoundary from './components/ErrorBoundary'
import ConditionalNavbar from './components/NavigationBridge'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Structured Settlement Early Payout Calculator | Smarter Payouts',
  description: 'Instant, accurate, and private lump sum calculator. No calls, no salespeople, no personal data required. See the real value of your structured settlement — avoid flashy cash advance offers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/assets/images/favicon_without_text.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/assets/images/favicon_without_text.ico" type="image/x-icon" />
        <title>Structured Settlement Early Payout Calculator | Smarter Payouts</title>
        <meta name="description" content="Instant, accurate, and private lump sum calculator. No calls, no salespeople, no personal data required. See the real value of your structured settlement — avoid flashy cash advance offers." />
        <meta property="og:title" content="SmarterPayouts – The First Real-Time Structured Settlement Calculator" />
        <meta property="og:description" content="Instantly calculate your structured settlement lump sum payout with the industry's first real-time, logic-driven calculator. No sales calls, no personal info required." />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smarterpayouts.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <link
          rel="preload"
          as="fetch"
          href="/assets/videos/promos/counting-cash.mp4"
          type="video/mp4"
        />

        <style>{`
          /* Ensure navbar is always visible on calculator pages */
          .navbar {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 1001 !important;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {/* Navigation Bridge - conditionally shows navbar from src/Navigation system */}
          <ConditionalNavbar />
          {children}
          {/* Global Footer - appears on all pages */}
          <Footer />
        </ErrorBoundary>

      </body>
    </html>
  )
} 