'use client';

import Head from 'next/head';
import { seoMetaData } from '../../../data';

/**
 * Enhanced Meta Tags Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Handles Open Graph, Twitter Cards, and advanced meta tags
 */
export default function EnhancedMetaTags() {
  return (
    <>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoMetaData.openGraph.type} />
      <meta property="og:url" content={seoMetaData.openGraph.url} />
      <meta property="og:title" content={seoMetaData.openGraph.title} />
      <meta property="og:description" content={seoMetaData.openGraph.description} />
      <meta property="og:image" content={seoMetaData.openGraph.image} />
      <meta property="og:site_name" content={seoMetaData.openGraph.siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={seoMetaData.legal.lastUpdated} />

      {/* Article-specific Open Graph */}
      <meta property="article:author" content="SmarterPayouts Legal Team" />
      <meta property="article:section" content="Legal Information" />
      <meta property="article:tag" content="Structured Settlement" />
      <meta property="article:tag" content="Federal Law" />
      <meta property="article:tag" content="IRC 104" />
      <meta property="article:tag" content="IRC 130" />
      <meta property="article:tag" content="Court Approval" />
      <meta property="article:published_time" content="2024-01-01T00:00:00Z" />
      <meta property="article:modified_time" content={seoMetaData.legal.lastUpdated} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={seoMetaData.twitter.card} />
      <meta name="twitter:url" content={seoMetaData.openGraph.url} />
      <meta name="twitter:title" content={seoMetaData.twitter.title} />
      <meta name="twitter:description" content={seoMetaData.twitter.description} />
      <meta name="twitter:image" content={seoMetaData.twitter.image} />
      <meta name="twitter:creator" content={seoMetaData.twitter.creator} />
      <meta name="twitter:site" content="@SmarterPayouts" />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="SmarterPayouts" />

      {/* Legal-specific enhanced meta */}
      <meta name="legal-category" content="Federal Structured Settlement Law" />
      <meta name="legal-jurisdiction" content="United States Federal" />
      <meta name="legal-authority" content="Internal Revenue Code" />
      <meta name="legal-citations" content="IRC § 104, IRC § 130, IRC § 5891" />
      <meta name="legal-acts" content="Periodic Payment Settlement Act 1982, Structured Settlement Protection Act 2002" />

      {/* Business/Professional meta */}
      <meta name="industry" content="Financial Services, Legal Services" />
      <meta name="business-type" content="Structured Settlement Services" />
      <meta name="service-area" content="United States" />
      <meta name="professional-category" content="Legal Information Provider" />

      {/* Accessibility meta */}
      <meta name="accessibility-features" content="WCAG 2.1 AA, Screen Reader Compatible, Keyboard Navigation" />
      <meta name="accessibility-hazards" content="none" />
      <meta name="accessibility-api" content="ARIA" />

      {/* Performance hints */}
      <meta name="performance-optimized" content="true" />
      <meta name="core-web-vitals" content="optimized" />
      <meta name="loading-strategy" content="progressive" />

      {/* Content freshness */}
      <meta name="content-freshness" content="regularly-updated" />
      <meta name="review-cycle" content="quarterly" />
      <meta name="accuracy-verified" content={new Date().toISOString().split('T')[0]} />
    </>
  );
}
