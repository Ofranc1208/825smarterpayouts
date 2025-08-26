'use client';

import { useEffect } from 'react';
import { analyticsService } from '../../services';
import { vercelService } from '../../services/vercel';

/**
 * Web Vitals Tracker Component
 * 
 * Automatically tracks real Core Web Vitals and user interactions
 * for the performance dashboard. This component runs silently in the
 * background and collects real performance data from actual users.
 * 
 * @component WebVitalsTracker
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function WebVitalsTracker() {
  useEffect(() => {
    let isInitialized = false;

    const initializeTracking = async () => {
      if (isInitialized) return;
      
      try {
        // Initialize both analytics services
        await analyticsService.initialize();
        await vercelService.initialize();
        isInitialized = true;
        
        console.log('📊 Performance tracking initialized');
      } catch (error) {
        console.error('Failed to initialize performance tracking:', error);
      }
    };

    // Initialize tracking
    initializeTracking();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        analyticsService.trackPageView({
          type: 'visibility_change',
          visible: true,
          url: window.location.href,
          pathname: window.location.pathname
        });
      }
    };

    // Track user interactions
    const handleUserInteraction = (event: Event) => {
      analyticsService.trackPageView({
        type: 'user_interaction',
        eventType: event.type,
        url: window.location.href,
        pathname: window.location.pathname
      });
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
