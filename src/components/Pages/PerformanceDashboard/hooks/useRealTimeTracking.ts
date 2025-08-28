/**
 * Real-Time Tracking Hook
 * 
 * Manages initialization and subscription to real-time Web Vitals and analytics data
 */

import { useEffect, useState, useCallback } from 'react';
import { realWebVitalsService } from '../services/RealWebVitalsService';
import { analyticsService } from '../services';

interface UseRealTimeTrackingProps {
  onMetricsUpdate: () => void;
}

export function useRealTimeTracking({ onMetricsUpdate }: UseRealTimeTrackingProps) {
  const [isRealDataEnabled, setIsRealDataEnabled] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  const initializeTracking = useCallback(async () => {
    try {
      console.log('🚀 Initializing real-time tracking...');
      
      // Initialize real Web Vitals service
      await realWebVitalsService.initialize();
      console.log('✅ Real Web Vitals service initialized');
      
      // Subscribe to real-time metric updates
      const unsubscribe = realWebVitalsService.subscribe((newMetrics) => {
        console.log('📊 Real Web Vitals updated:', newMetrics);
        onMetricsUpdate(); // Trigger dashboard refresh
      });
      
      // Skip analytics service initialization for now to prevent infinite loops
      console.log('⏭️ Skipping analytics service initialization to prevent loops');
      
      setIsRealDataEnabled(true);
      setInitializationError(null);
      
      return unsubscribe;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn('⚠️ Real tracking initialization failed:', error);
      setInitializationError(errorMessage);
      setIsRealDataEnabled(true); // Still enable dashboard with fallback data
      return () => {}; // Return empty cleanup function
    }
  }, [onMetricsUpdate]);

  // Initialize tracking on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeTracking, 1000);
    
    return () => clearTimeout(timer);
  }, [initializeTracking]);

  return {
    isRealDataEnabled,
    initializationError,
    reinitialize: initializeTracking
  };
}
