/**
 * Navigation SEO Orchestrator - Main Component
 * 
 * Main orchestrator that combines all SEO functionality
 * (Simplified version of the original NavigationSEO.tsx)
 * 
 * @module NavigationSEOOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbManager } from './BreadcrumbManager';
import { StructuredDataManager } from './StructuredDataManager';
import { MetaTagsManager } from './MetaTagsManager';

interface NavigationSEOProps {
  siteName?: string;
  baseUrl?: string;
  enableBreadcrumbs?: boolean;
  enableStructuredData?: boolean;
}

/**
 * Main SEO orchestrator component that coordinates all SEO functionality
 */
export const NavigationSEO: React.FC<NavigationSEOProps> = ({
  siteName = 'Smarter Payouts',
  baseUrl = 'https://smarterpayouts.com',
  enableBreadcrumbs = true,
  enableStructuredData = true
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Meta Tags Management */}
      <MetaTagsManager 
        siteName={siteName}
        baseUrl={baseUrl}
        pathname={pathname}
      />

      {/* Structured Data Management */}
      {enableStructuredData && (
        <StructuredDataManager 
          siteName={siteName}
          baseUrl={baseUrl}
          pathname={pathname}
          enableBreadcrumbs={enableBreadcrumbs}
        />
      )}

      {/* Breadcrumb Management */}
      {enableBreadcrumbs && (
        <BreadcrumbManager 
          baseUrl={baseUrl}
          pathname={pathname}
        />
      )}
    </>
  );
};

export default NavigationSEO;
