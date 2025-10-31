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
import GoogleAnalytics from '@/src/components/Analytics/GoogleAnalytics'
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/src/components/Analytics/GoogleTagManager'

// Optimize font loading with display: swap and preload
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text during font load
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
})

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
        {/* Enhanced viewport for mobile optimization - prevents double-tap zoom but allows pinch zoom */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, minimum-scale=1, user-scalable=yes, viewport-fit=cover, interactive-widget=resizes-visual" />
        <meta name="disable-double-tap-zoom" content="true" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SmarterPayouts" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#059669" />
        <meta name="color-scheme" content="light" />
        
        {/* Touch and interaction optimization */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Critical resource hints - only for resources we actually use */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {/* Removed unused font preconnects - they're not being used */}
        
        {/* Google Tag Manager - Deferred to not block rendering */}
        <GoogleTagManager />
        
        {/* Remove unused preloads that are causing performance warnings */}
        {/* <link rel="preload" href="/assets/images/og-image.png" as="image" type="image/png" /> */}
        {/* <link rel="preload" href="/assets/images/mint-mascot.webp" as="image" type="image/webp" /> */}

        <link rel="icon" href="/favicon_without_text.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon_without_text.ico" type="image/x-icon" />

        {/* Canonical URLs are handled individually by each page's metadata */}
        {/* Individual pages handle their own hreflang if needed */}

        {/* Global meta tags - fallback for pages without specific metadata */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="SmarterPayouts Team" />
        <meta name="publisher" content="SmarterPayouts" />
        {/* Remove problematic video preload - will load on demand */}

        {/* Optimized critical CSS - reduced DOM size */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Critical above-the-fold styles - optimized for performance */
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            box-sizing: border-box;
          }

          /* Homepage navigation hiding - critical for layout */
          body[data-page="/"] nav,
          body[data-page="/"] .navbar {
            display: none !important;
          }

          /* Non-homepage navbar spacing */
          body:not([data-page="/"]) {
            padding-top: var(--navbar-height, 48px);
          }

          /* Responsive navbar heights */
          @media (min-width: 768px) {
            body:not([data-page="/"]) {
              padding-top: 56px;
            }
          }

          /* Chat page optimization */
          body[data-page="/mint-chat-active"] {
            overflow: hidden;
            height: 100vh;
            padding: 0 !important;
          }

          /* Prevent layout shift */
          img { max-width: 100%; height: auto; }

          /* Loading states */
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
        {/* Google Tag Manager (noscript) - Must be immediately after <body> */}
        <GoogleTagManagerNoScript />
        
        {/* Google Analytics 4 */}
        <GoogleAnalytics />
        
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