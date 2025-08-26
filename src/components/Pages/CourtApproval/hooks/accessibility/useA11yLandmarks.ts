'use client';

import { useCallback } from 'react';

/**
 * ARIA landmarks and navigation utilities
 * Manages landmark navigation and announcements
 */
export function useA11yLandmarks() {
  // Announce to screen readers
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;
    
    // Create or update live region
    let liveRegion = document.getElementById('court-approval-announcements');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'court-approval-announcements';
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }
    
    // Clear and set new message
    liveRegion.textContent = '';
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }, 100);
  }, []);

  // Navigate to landmark
  const navigateToLandmark = useCallback((landmark: string) => {
    const element = document.querySelector(`[role="${landmark}"], ${landmark}`);
    if (element) {
      (element as HTMLElement).focus();
      announceToScreenReader(`Navigated to ${landmark}`);
    }
  }, [announceToScreenReader]);

  // Skip to main content
  const skipToMain = useCallback(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      announceToScreenReader('Skipped to main content');
    }
  }, [announceToScreenReader]);

  // Skip to navigation
  const skipToNavigation = useCallback(() => {
    const navigation = document.querySelector('nav, [role="navigation"]');
    if (navigation) {
      (navigation as HTMLElement).focus();
      announceToScreenReader('Skipped to navigation');
    }
  }, [announceToScreenReader]);

  return {
    announceToScreenReader,
    navigateToLandmark,
    skipToMain,
    skipToNavigation
  };
}
