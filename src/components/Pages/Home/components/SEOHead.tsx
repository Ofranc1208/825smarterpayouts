'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

/**
 * SEO Head Component for Homepage
 * 
 * Handles all SEO optimization for the homepage including:
 * - Meta tags and descriptions
 * - Open Graph and Twitter Card data
 * - JSON-LD structured data for organization and navigation
 * - Video preloading optimization
 * - Dynamic URL setting
 * 
 * @component SEOHead
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function SEOHead() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <Head>
      <title>SmarterPayouts - Get the Highest Early Payout for Your Future Payments</title>
      <meta
        name="description"
        content="Industry's first AI-powered self-quoting platform for structured settlements. Get instant quotes in seconds, anonymously and autonomously. No pushy sales calls, no personal information required."
      />
      <meta
        name="keywords"
        content="AI-powered structured settlement calculator, instant quotes, anonymous settlement quotes, automated settlement platform, self-quoting platform, structured settlement AI"
      />
      <meta property="og:title" content="SmarterPayouts - AI-Powered Self-Quoting Platform" />
      <meta
        property="og:description"
        content="Industry's first AI-powered self-quoting platform. Get instant structured settlement quotes in seconds, anonymously and autonomously."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <link
        rel="preload"
        as="video"
        href="/assets/videos/promos/counting-cash.mp4"
        type="video/mp4"
      />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SmarterPayouts - Get the Highest Early Payout for Your Future Payments" />
      <meta name="twitter:description" content="Get the highest early payout for your future payments instantly. No pushy sales calls. No sensitive personal information required. Industry's first online self-quoting platform." />
      <meta name="twitter:site" content="@SmarterPayouts" />
      <meta name="twitter:image" content="https://smarterpayouts.com/assets/images/social-preview.jpg" />

      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SmarterPayouts",
            "url": "https://smarterpayouts.com",
            "logo": "https://smarterpayouts.com/assets/images/logo.png",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-954-764-9750",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              }
            ],
            "sameAs": [
              "https://www.bbb.org/",
              "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName"
            ]
          })
        }}
      />

      {/* JSON-LD SiteNavigationElement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": [
              "Calculator",
              "About",
              "Contact",
              "Testimonials",
              "Credentials",
              "Resources"
            ],
            "url": [
              "https://smarterpayouts.com/pricing-calculator",
              "https://smarterpayouts.com/about",
              "https://smarterpayouts.com/contact",
              "https://smarterpayouts.com/testimonials",
              "https://smarterpayouts.com/credentials",
              "https://smarterpayouts.com/resources"
            ]
          })
        }}
      />

      <meta property="og:image" content="https://smarterpayouts.com/assets/images/social-preview.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
}
