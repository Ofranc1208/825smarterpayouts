/**
 * Breadcrumb Manager
 * 
 * Handles breadcrumb generation, navigation item lookup, and visual rendering
 * 
 * @module BreadcrumbManager
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { useMemo } from 'react';
import { dropdownSections } from '../../../Shared/navigationData';

interface BreadcrumbManagerProps {
  baseUrl: string;
  pathname: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

/**
 * Breadcrumb Manager Component
 * 
 * Features:
 * - Automatic breadcrumb generation from URL path
 * - Navigation item lookup and matching
 * - Visual breadcrumb rendering with accessibility
 * - Schema.org markup for SEO
 */
export const BreadcrumbManager: React.FC<BreadcrumbManagerProps> = ({
  baseUrl,
  pathname
}) => {

  /**
   * Find navigation item by path segment
   */
  const findNavigationItem = (segment: string) => {
    for (const section of Object.values(dropdownSections)) {
      for (const item of section) {
        if (item.href.includes(segment)) {
          return item;
        }
      }
    }
    return null;
  };

  /**
   * Format path segment into readable name
   */
  const formatSegmentName = (segment: string): string => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Generate breadcrumb items from current path
   */
  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: baseUrl, position: 1 }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Find matching navigation item
      const navItem = findNavigationItem(segment);
      const name = navItem?.label || formatSegmentName(segment);
      
      breadcrumbs.push({
        name,
        url: `${baseUrl}${currentPath}`,
        position: index + 2
      });
    });

    return breadcrumbs;
  }, [pathname, baseUrl]);

  // Don't render if only home breadcrumb
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '0.875rem'
      }}
    >
      <ol 
        style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          flexWrap: 'wrap'
        }}
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => (
          <li 
            key={crumb.url}
            style={{ display: 'flex', alignItems: 'center' }}
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {index === breadcrumbs.length - 1 ? (
              <span 
                style={{ color: '#6b7280', fontWeight: '500' }}
                itemProp="name"
                aria-current="page"
              >
                {crumb.name}
              </span>
            ) : (
              <a 
                href={crumb.url}
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
                itemProp="item"
              >
                <span itemProp="name">{crumb.name}</span>
              </a>
            )}
            <meta itemProp="position" content={crumb.position.toString()} />
            
            {index < breadcrumbs.length - 1 && (
              <span 
                style={{ 
                  margin: '0 0.5rem', 
                  color: '#9ca3af',
                  userSelect: 'none'
                }}
                aria-hidden="true"
              >
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

/**
 * Hook to get breadcrumb data for other components
 */
export const useBreadcrumbs = (baseUrl: string, pathname: string): BreadcrumbItem[] => {
  return useMemo(() => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: baseUrl, position: 1 }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Find matching navigation item
      const findNavigationItem = (segment: string) => {
        for (const section of Object.values(dropdownSections)) {
          for (const item of section) {
            if (item.href.includes(segment)) {
              return item;
            }
          }
        }
        return null;
      };

      const formatSegmentName = (segment: string): string => {
        return segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      const navItem = findNavigationItem(segment);
      const name = navItem?.label || formatSegmentName(segment);
      
      breadcrumbs.push({
        name,
        url: `${baseUrl}${currentPath}`,
        position: index + 2
      });
    });

    return breadcrumbs;
  }, [baseUrl, pathname]);
};

export default BreadcrumbManager;
