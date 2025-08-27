/**
 * Screen Reader Manager
 * 
 * Manages screen reader announcements and ARIA live regions
 * 
 * @module useScreenReaderManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef, useEffect } from 'react';

interface ScreenReaderConfig {
  enableScreenReader: boolean;
  debug: boolean;
}

/**
 * Hook for managing screen reader functionality
 */
export function useScreenReaderManager({ enableScreenReader, debug }: ScreenReaderConfig) {
  const announceRegion = useRef<HTMLDivElement | null>(null);

  /**
   * Debug logging for screen reader events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation A11y - Screen Reader] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Initialize screen reader announcement region
   */
  useEffect(() => {
    if (!enableScreenReader || typeof window === 'undefined') return;

    // Create or find the announcement region
    let region = document.getElementById('nav-announcements');
    if (!region) {
      region = document.createElement('div');
      region.id = 'nav-announcements';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.left = '-10000px';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.overflow = 'hidden';
      document.body.appendChild(region);
    }

    announceRegion.current = region as HTMLDivElement;
    debugLog('Screen Reader Region Initialized', { region });

    return () => {
      if (region && region.parentNode) {
        region.parentNode.removeChild(region);
      }
    };
  }, [enableScreenReader, debugLog]);

  /**
   * Announce message to screen readers
   */
  const announceToScreenReader = useCallback((message: string) => {
    if (!enableScreenReader || !announceRegion.current) return;

    // Clear previous announcement
    announceRegion.current.textContent = '';
    
    // Add new announcement after a brief delay to ensure it's read
    setTimeout(() => {
      if (announceRegion.current) {
        announceRegion.current.textContent = message;
        debugLog('Screen Reader Announcement', { message });
      }
    }, 100);
  }, [enableScreenReader, debugLog]);

  return {
    announceToScreenReader
  };
}
