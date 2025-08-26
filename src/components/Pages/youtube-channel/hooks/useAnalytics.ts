'use client';

// Refactored analytics hook - now uses modular sub-hooks
// Original 339 lines split into focused modules for better maintainability

import { useVideoAnalytics } from './analytics/useVideoAnalytics';
import { useUserAnalytics } from './analytics/useUserAnalytics';
import { usePerformanceAnalytics } from './analytics/usePerformanceAnalytics';

/**
 * Main analytics hook for YouTube Channel page
 * Orchestrates all analytics features using modular sub-hooks
 */
export function useAnalytics() {
  // Video-specific analytics
  const videoAnalytics = useVideoAnalytics();
  
  // User behavior analytics
  const userAnalytics = useUserAnalytics();
  
  // Performance analytics (auto-initializes monitoring)
  const performanceAnalytics = usePerformanceAnalytics();

  // Combined interface for backward compatibility
  return {
    // Video analytics
    trackVideoPlay: videoAnalytics.trackVideoPlay,
    trackVideoPause: videoAnalytics.trackVideoPause,
    trackVideoComplete: videoAnalytics.trackVideoComplete,
    trackVideoMilestone: videoAnalytics.trackVideoMilestone,
    trackVideoQuality: videoAnalytics.trackVideoQuality,
    
    // User analytics
    trackPageView: userAnalytics.trackPageView,
    trackEngagement: userAnalytics.trackEngagement,
    trackCTAClick: userAnalytics.trackCTAClick,
    trackSubscription: userAnalytics.trackSubscription,
    trackSocialShare: userAnalytics.trackSocialShare,
    trackFormSubmission: userAnalytics.trackFormSubmission,
    
    // Performance analytics
    trackWebVitals: performanceAnalytics.trackWebVitals,
    trackPageLoad: performanceAnalytics.trackPageLoad,
    trackResourceLoad: performanceAnalytics.trackResourceLoad,
    trackJSError: performanceAnalytics.trackJSError
  };
}