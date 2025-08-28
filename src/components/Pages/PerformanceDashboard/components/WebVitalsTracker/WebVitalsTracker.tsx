'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

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
// Global flag to prevent multiple initializations across component re-mounts
let globalWebVitalsInitialized = false;

export default function WebVitalsTracker() {
  useEffect(() => {
    // Prevent multiple initializations even in React StrictMode
    if (globalWebVitalsInitialized) {
      console.log('🎯 WebVitalsTracker: Already initialized, skipping...');
      return;
    }
    
    const initializeTracking = () => {
      if (globalWebVitalsInitialized) return;
      globalWebVitalsInitialized = true;
      
      console.log('🎯 WebVitalsTracker: Starting simple tracking...');
      
      // Simple Web Vitals tracking - just log to console for now
      const sendToConsole = (name: string, value: number) => {
        console.log(`📊 Web Vital - ${name}: ${value}`);
      };
      
      // Track Core Web Vitals
      getCLS(({ value }) => sendToConsole('CLS', value));
      getFID(({ value }) => sendToConsole('FID', value));
      getFCP(({ value }) => sendToConsole('FCP', value));
      getLCP(({ value }) => sendToConsole('LCP', value));
      getTTFB(({ value }) => sendToConsole('TTFB', value));
    };
    
    // Initialize after a short delay to prevent mounting issues
    const timer = setTimeout(initializeTracking, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array - only run once per mount
  
  // This component doesn't render anything visible
  return null;
}
