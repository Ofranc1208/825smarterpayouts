/**
 * Navigation Lazy Orchestrator - Main Component
 * 
 * Main orchestrator that coordinates all lazy loading functionality
 * (Simplified version of the original NavigationLazyLoader.tsx)
 * 
 * @module NavigationLazyOrchestrator
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React, { Suspense } from 'react';
import { track } from '@vercel/analytics';
import { LazyComponentLoader } from './LazyComponentLoader';
import { NavigationSkeleton } from './NavigationSkeleton';
import { LazyLoadErrorBoundary } from './LazyLoadErrorBoundary';

interface LazyNavigationProps {
  isMobile: boolean;
  enableAnalytics?: boolean;
}

/**
 * Main lazy loading orchestrator component
 */
export const NavigationLazyLoader: React.FC<LazyNavigationProps> = ({ 
  isMobile, 
  enableAnalytics = true 
}) => {
  
  React.useEffect(() => {
    // Track navigation load start
    track('navigation_lazy_load_start', { 
      type: isMobile ? 'mobile' : 'desktop',
      timestamp: Date.now()
    });
  }, [isMobile]);

  const { DesktopNav, MobileNav, NavigationAnalytics } = LazyComponentLoader;

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <LazyLoadErrorBoundary 
          componentName="DesktopNav"
          fallback={<NavigationSkeleton type="desktop" />}
        >
          <Suspense fallback={<NavigationSkeleton type="desktop" />}>
            <DesktopNav isMobile={isMobile} />
          </Suspense>
        </LazyLoadErrorBoundary>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <LazyLoadErrorBoundary 
          componentName="MobileNav"
          fallback={<NavigationSkeleton type="mobile" />}
        >
          <Suspense fallback={<NavigationSkeleton type="mobile" />}>
            <MobileNav isMobile={isMobile} />
          </Suspense>
        </LazyLoadErrorBoundary>
      )}

      {/* Analytics (Optional) */}
      {enableAnalytics && (
        <LazyLoadErrorBoundary 
          componentName="NavigationAnalytics"
          fallback={null}
        >
          <Suspense fallback={<NavigationSkeleton type="analytics" height="2px" />}>
            <NavigationAnalytics />
          </Suspense>
        </LazyLoadErrorBoundary>
      )}
    </>
  );
};

export default NavigationLazyLoader;
