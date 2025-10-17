/**
 * Structured Data Manager
 * 
 * Handles JSON-LD structured data generation for navigation and breadcrumbs
 * 
 * @module StructuredDataManager
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { useMemo } from 'react';
import { dropdownSections } from '../../../Desktop/data/navigationData';
import { useBreadcrumbs } from './BreadcrumbManager';

interface StructuredDataManagerProps {
  siteName: string;
  baseUrl: string;
  pathname: string;
  enableBreadcrumbs: boolean;
}

interface NavigationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
  mainEntity: {
    '@type': string;
    name: string;
    hasPart: Array<{
      '@type': string;
      name: string;
      url: string;
      description: string;
      potentialAction?: {
        '@type': string;
        target: string;
      };
    }>;
  };
}

interface BreadcrumbStructuredData {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Structured Data Manager Component
 * 
 * Features:
 * - Navigation structured data (JSON-LD)
 * - Breadcrumb structured data (JSON-LD)
 * - Search action schema
 * - Site navigation schema
 */
export const StructuredDataManager: React.FC<StructuredDataManagerProps> = ({
  siteName,
  baseUrl,
  pathname,
  enableBreadcrumbs
}) => {
  const breadcrumbs = useBreadcrumbs(baseUrl, pathname);

  /**
   * Generate structured data for navigation
   */
  const navigationStructuredData = useMemo((): NavigationStructuredData => {
    const navigationItems = Object.values(dropdownSections).flatMap((section: any) => 
      section.map((item: any) => ({
        '@type': 'SiteNavigationElement' as const,
        name: item.label,
        url: `${baseUrl}${item.href}`,
        description: item.description || `Navigate to ${item.label}`,
        ...(item.isExternal && { 
          potentialAction: {
            '@type': 'NavigateAction' as const,
            target: item.href
          }
        })
      }))
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'SiteNavigationElement',
        name: 'Main Navigation',
        hasPart: navigationItems
      }
    };
  }, [siteName, baseUrl]);

  /**
   * Generate breadcrumb structured data
   */
  const breadcrumbStructuredData = useMemo((): BreadcrumbStructuredData | null => {
    if (!enableBreadcrumbs || breadcrumbs.length <= 1) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(crumb => ({
        '@type': 'ListItem',
        position: crumb.position,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }, [breadcrumbs, enableBreadcrumbs]);

  /**
   * Generate organization structured data
   */
  const organizationStructuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/favicon_without_text.ico`,
      sameAs: [
        'https://twitter.com/smarterpayouts',
        'https://linkedin.com/company/smarterpayouts'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: `${baseUrl}/contact`
      }
    };
  }, [siteName, baseUrl]);

  return (
    <>
      {/* Navigation Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationStructuredData, null, 0)
        }}
      />

      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData, null, 0)
          }}
        />
      )}

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData, null, 0)
        }}
      />
    </>
  );
};

/**
 * Hook to get structured data for external use
 */
export const useStructuredData = (
  siteName: string, 
  baseUrl: string, 
  pathname: string
) => {
  const breadcrumbs = useBreadcrumbs(baseUrl, pathname);

  return useMemo(() => {
    const navigationItems = Object.values(dropdownSections).flatMap((section: any) => 
      section.map((item: any) => ({
        '@type': 'SiteNavigationElement',
        name: item.label,
        url: `${baseUrl}${item.href}`,
        description: item.description || `Navigate to ${item.label}`
      }))
    );

    return {
      navigation: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: baseUrl,
        mainEntity: {
          '@type': 'SiteNavigationElement',
          name: 'Main Navigation',
          hasPart: navigationItems
        }
      },
      breadcrumbs: breadcrumbs.length > 1 ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map(crumb => ({
          '@type': 'ListItem',
          position: crumb.position,
          name: crumb.name,
          item: crumb.url
        }))
      } : null
    };
  }, [siteName, baseUrl, breadcrumbs]);
};

export default StructuredDataManager;
