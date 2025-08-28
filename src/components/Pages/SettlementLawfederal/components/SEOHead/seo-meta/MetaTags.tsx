'use client';

import Head from 'next/head';
import { seoMetaData } from '../../../data';

/**
 * Basic Meta Tags Component
 * Following enterprise patterns from Home and CourtApproval pages
 * 
 * Handles core meta tags for Settlement Law Federal page
 */
export default function MetaTags() {
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{seoMetaData.title}</title>
      <meta name="title" content={seoMetaData.title} />
      <meta name="description" content={seoMetaData.description} />
      <meta name="keywords" content={seoMetaData.keywords.join(', ')} />
      <meta name="robots" content={seoMetaData.robots} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="SmarterPayouts Legal Team" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoMetaData.canonical} />

      {/* Legal-specific meta tags */}
      <meta name="jurisdiction" content={seoMetaData.legal.jurisdiction} />
      <meta name="legal-disclaimer" content={seoMetaData.legal.disclaimer} />
      <meta name="last-updated" content={seoMetaData.legal.lastUpdated} />

      {/* Content categorization */}
      <meta name="content-type" content="Legal Information" />
      <meta name="content-category" content="Structured Settlement Law" />
      <meta name="audience" content="Legal Professionals, Settlement Recipients" />
      <meta name="coverage" content="United States Federal Law" />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

      {/* Cache control for legal content */}
      <meta httpEquiv="Cache-Control" content="max-age=3600, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
    </>
  );
}
