/**
 * YouTube Channel SEO Head Component
 * 
 * Handles all SEO-related meta tags, structured data, and page optimization
 * for the YouTube channel page. Includes Open Graph, Twitter Cards, and
 * JSON-LD structured data for better search engine visibility.
 * 
 * @component SEOHead
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import Head from 'next/head';

/**
 * SEO Head component for YouTube channel page
 * 
 * @returns {JSX.Element} Head element with comprehensive SEO meta tags
 */
export default function SEOHead(): JSX.Element {
  const pageTitle = "SmarterPayouts YouTube Channel - Educational Videos & Insights";
  const pageDescription = "Explore our comprehensive video library covering structured settlements, early payouts, and financial strategies. Learn from experts and make informed decisions about your settlement.";
  const pageUrl = "https://smarterpayouts.com/youtube-channel";
  const imageUrl = "https://smarterpayouts.com/assets/images/youtube-channel-og.jpg";

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="structured settlement videos, payout education, financial planning, settlement advice, YouTube channel, SmarterPayouts" />
      <meta name="author" content="SmarterPayouts" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="SmarterPayouts YouTube Channel" />
      <meta property="og:site_name" content="SmarterPayouts" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content="SmarterPayouts YouTube Channel" />
      <meta property="twitter:site" content="@smarterpayouts" />
      <meta property="twitter:creator" content="@smarterpayouts" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://i.ytimg.com" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "mainEntity": {
              "@type": "VideoGallery",
              "name": "SmarterPayouts Educational Videos",
              "description": "Educational video content about structured settlements and financial planning",
              "publisher": {
                "@type": "Organization",
                "name": "SmarterPayouts",
                "url": "https://smarterpayouts.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://smarterpayouts.com/assets/images/logo.png"
                }
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://smarterpayouts.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "YouTube Channel",
                  "item": pageUrl
                }
              ]
            }
          })
        }}
      />
    </Head>
  );
}
