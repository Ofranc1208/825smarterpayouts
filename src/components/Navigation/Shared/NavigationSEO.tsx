'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { updateMetaTags, generateNavigationStructuredData, injectStructuredData } from '../utils';
import { PAGE_META_CONFIGS, NAVIGATION_SEO_CONFIG, DEFAULT_STRUCTURED_DATA } from '../data';

/**
 * Navigation SEO Component
 * 
 * Handles dynamic SEO updates based on current route and provides
 * structured data for search engines.
 * 
 * @component NavigationSEO
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function NavigationSEO() {
  const pathname = usePathname();

  useEffect(() => {
    // Get page-specific meta configuration
    const pageConfig = PAGE_META_CONFIGS[pathname] || {
      title: NAVIGATION_SEO_CONFIG.defaultTitle,
      description: NAVIGATION_SEO_CONFIG.defaultDescription,
      keywords: NAVIGATION_SEO_CONFIG.keywords.join(', '),
      canonical: `${NAVIGATION_SEO_CONFIG.baseUrl}${pathname}`
    };

    // Update meta tags
    updateMetaTags(pageConfig);

    // Inject structured data
    const navigationStructuredData = generateNavigationStructuredData(
      NAVIGATION_SEO_CONFIG.siteName,
      NAVIGATION_SEO_CONFIG.baseUrl
    );

    injectStructuredData(DEFAULT_STRUCTURED_DATA.organization);
    injectStructuredData(DEFAULT_STRUCTURED_DATA.website);
    injectStructuredData(navigationStructuredData);

  }, [pathname]);

  return null; // This component doesn't render anything
}
