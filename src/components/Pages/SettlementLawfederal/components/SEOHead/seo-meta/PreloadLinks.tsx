'use client';

import Head from 'next/head';

/**
 * Preload Links Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Optimizes performance with strategic resource preloading
 */
export default function PreloadLinks() {
  return (
    <>
      {/* Critical CSS preload */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* DNS prefetch for external legal resources */}
      <link rel="dns-prefetch" href="//www.law.cornell.edu" />
      <link rel="dns-prefetch" href="//www.congress.gov" />
      <link rel="dns-prefetch" href="//www.irs.gov" />
      <link rel="dns-prefetch" href="//www.justice.gov" />

      {/* Preconnect to critical external domains */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Prefetch likely navigation targets */}
      <link rel="prefetch" href="/structured-settlement-laws-by-state" />
      <link rel="prefetch" href="/pricing-calculator" />
      <link rel="prefetch" href="/mint-intelligent-chat" />
      <link rel="prefetch" href="/court-approval" />

      {/* Preload critical images */}
      <link
        rel="preload"
        href="/images/legal-hero-bg.webp"
        as="image"
        type="image/webp"
      />

      {/* Module preload for critical JavaScript */}
      <link
        rel="modulepreload"
        href="/_next/static/chunks/pages/structured-settlement-laws.js"
      />

      {/* Prefetch analytics and performance scripts */}
      <link rel="prefetch" href="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />

      {/* Legal document prefetch (commonly accessed) */}
      <link rel="prefetch" href="https://www.law.cornell.edu/uscode/text/26/104" />
      <link rel="prefetch" href="https://www.law.cornell.edu/uscode/text/26/130" />
      <link rel="prefetch" href="https://www.law.cornell.edu/uscode/text/26/5891" />

      {/* Performance optimization hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Resource hints for better loading */}
      <meta name="resource-type" content="document" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </>
  );
}
