/**
 * Meta Tags Manager
 * 
 * Handles meta tag generation and management for navigation SEO
 * 
 * @module MetaTagsManager
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { useMemo } from 'react';
import Head from 'next/head';
import { useBreadcrumbs } from './BreadcrumbManager';

interface MetaTagsManagerProps {
  siteName: string;
  baseUrl: string;
  pathname: string;
}

/**
 * Meta Tags Manager Component
 * 
 * Features:
 * - Dynamic title generation with navigation context
 * - Open Graph meta tags
 * - Twitter Card meta tags
 * - Canonical URL management
 * - Navigation context meta tags
 */
export const MetaTagsManager: React.FC<MetaTagsManagerProps> = ({
  siteName,
  baseUrl,
  pathname
}) => {
  const breadcrumbs = useBreadcrumbs(baseUrl, pathname);

  /**
   * Generate page title from breadcrumbs
   */
  const pageTitle = useMemo(() => {
    const currentPageTitle = breadcrumbs[breadcrumbs.length - 1]?.name || 'Page';
    return `${currentPageTitle} | ${siteName}`;
  }, [breadcrumbs, siteName]);

  /**
   * Generate breadcrumb path string
   */
  const breadcrumbPath = useMemo(() => {
    return breadcrumbs.map(b => b.name).join(' > ');
  }, [breadcrumbs]);

  /**
   * Generate page description based on navigation context
   */
  const pageDescription = useMemo(() => {
    const currentPage = breadcrumbs[breadcrumbs.length - 1]?.name || 'Page';
    
    // Custom descriptions for common pages
    const descriptions: Record<string, string> = {
      'Home': `${siteName} - Professional settlement and payout management solutions`,
      'About Us': `Learn about ${siteName} and our mission to revolutionize settlement management`,
      'Contact': `Get in touch with ${siteName} for professional settlement solutions`,
      'Legal': `Legal information and compliance details for ${siteName}`,
      'Resources': `Helpful resources and tools from ${siteName}`,
      'Performance Dashboard': `Real-time performance monitoring and analytics dashboard`
    };

    return descriptions[currentPage] || 
           `${currentPage} - ${siteName} professional settlement solutions`;
  }, [breadcrumbs, siteName]);

  /**
   * Generate keywords based on navigation context
   */
  const pageKeywords = useMemo(() => {
    const baseKeywords = ['settlement', 'payouts', 'legal', 'financial', 'management'];
    const currentPage = breadcrumbs[breadcrumbs.length - 1]?.name?.toLowerCase() || '';
    
    const contextKeywords: Record<string, string[]> = {
      'home': ['homepage', 'main', 'landing'],
      'about': ['company', 'team', 'mission', 'vision'],
      'contact': ['support', 'help', 'communication'],
      'legal': ['compliance', 'terms', 'privacy', 'regulations'],
      'resources': ['tools', 'guides', 'documentation', 'help'],
      'performance': ['analytics', 'monitoring', 'dashboard', 'metrics']
    };

    const additionalKeywords = contextKeywords[currentPage] || [];
    return [...baseKeywords, ...additionalKeywords].join(', ');
  }, [breadcrumbs]);

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Navigation Context Meta Tags */}
      <meta name="navigation-context" content={breadcrumbs[breadcrumbs.length - 1]?.name || 'Page'} />
      <meta name="breadcrumb-path" content={breadcrumbPath} />
      <meta name="site-section" content={breadcrumbs[1]?.name || 'Main'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}${pathname}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`${baseUrl}${pathname}`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - ${breadcrumbs[breadcrumbs.length - 1]?.name}`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@smarterpayouts" />
      <meta name="twitter:creator" content="@smarterpayouts" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
      <meta name="twitter:image:alt" content={`${siteName} - ${breadcrumbs[breadcrumbs.length - 1]?.name}`} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="https://vercel.live" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </Head>
  );
};

/**
 * Hook to get meta tag data for external use
 */
export const useMetaTags = (siteName: string, baseUrl: string, pathname: string) => {
  const breadcrumbs = useBreadcrumbs(baseUrl, pathname);

  return useMemo(() => {
    const currentPageTitle = breadcrumbs[breadcrumbs.length - 1]?.name || 'Page';
    const pageTitle = `${currentPageTitle} | ${siteName}`;
    const breadcrumbPath = breadcrumbs.map(b => b.name).join(' > ');
    
    return {
      title: pageTitle,
      description: `${currentPageTitle} - ${siteName} professional settlement solutions`,
      keywords: 'settlement, payouts, legal, financial, management',
      breadcrumbPath,
      canonicalUrl: `${baseUrl}${pathname}`,
      ogImage: `${baseUrl}/og-image.jpg`,
      twitterImage: `${baseUrl}/twitter-image.jpg`
    };
  }, [siteName, baseUrl, pathname, breadcrumbs]);
};

export default MetaTagsManager;
