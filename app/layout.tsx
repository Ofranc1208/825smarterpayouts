import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import ErrorBoundary from './components/ErrorBoundary'
import ConditionalNavbar from './components/NavigationBridge'
import Footer from './components/Footer'
import PerformanceOptimizer from './components/PerformanceOptimizer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Remove unused preloads that are causing performance warnings */}
        {/* <link rel="preload" href="/assets/images/og-image.png" as="image" type="image/png" /> */}
        {/* <link rel="preload" href="/assets/images/mint-mascot.webp" as="image" type="image/webp" /> */}

        <link rel="icon" href="/favicon_without_text.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon_without_text.ico" type="image/x-icon" />
        <title>Structured Settlement Early Payout Calculator | Smarter Payouts</title>
        <meta name="description" content="Instant, accurate, and private lump sum calculator. No calls, no salespeople, no personal data required. See the real value of your structured settlement — avoid flashy cash advance offers." />
        <meta property="og:title" content="SmarterPayouts – The First Real-Time Structured Settlement Calculator" />
        <meta property="og:description" content="Instantly calculate your structured settlement lump sum payout with the industry's first real-time, logic-driven calculator. No sales calls, no personal info required." />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smarterpayouts.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        {/* Remove problematic video preload - will load on demand */}

        <style dangerouslySetInnerHTML={{
          __html: `
          /* Critical CSS for above-the-fold content */
          /* Navbar styles - only apply when navbar is present (not on homepage) */
          body:not([data-page="/"]) .navbar {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 1001 !important;
          }
          
          /* AGGRESSIVE: Ensure homepage has NO navigation elements */
          body[data-page="/"] .navbar,
          body[data-page="/"] nav,
          body[data-page="/"] header[role="navigation"],
          body[data-page="/"] [role="navigation"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            min-height: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            left: -9999px !important;
          }
          
          /* Prevent layout shift */
          img, video {
            max-width: 100%;
            height: auto;
          }
          
          /* Prevent layout shift for navigation */
          nav, header {
            min-height: 64px;
          }
          
          /* Ensure navigation doesn't interfere with page content */
          body:not([data-page="/"]) main {
            position: relative;
            z-index: 1;
          }
          
          /* Prevent flash of unstyled content */
          * {
            box-sizing: border-box;
          }
          
          /* Optimize initial render */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          
          /* Prevent content jump during loading */
          .loading-placeholder {
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          `
        }} />
      </head>
      <body className={inter.className} data-page="/">{/* data-page will be updated by ConditionalNavbar */}
        <PerformanceOptimizer 
          enableResourceHints={true}
          enableCriticalResourcePriority={true}
          enableServiceWorker={false}
        />
        <ErrorBoundary>
          {/* Navigation Bridge - conditionally shows navbar from src/Navigation system */}
          <ConditionalNavbar />
          {children}
          {/* Global Footer - appears on all pages */}
          <Footer />
        </ErrorBoundary>

        {/* Vercel Analytics - Real visitor tracking */}
        <Analytics />
        {/* Vercel Speed Insights - Real performance monitoring */}
        <SpeedInsights />
      </body>
    </html>
  )
} 