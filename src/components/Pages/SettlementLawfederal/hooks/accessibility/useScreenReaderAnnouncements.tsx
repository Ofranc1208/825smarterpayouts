'use client';

import { useCallback } from 'react';

/**
 * Screen Reader Announcements Hook
 * Following enterprise patterns - focused on screen reader functionality only
 */
export default function useScreenReaderAnnouncements() {
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    
    // Small delay to ensure screen readers pick up the change
    setTimeout(() => {
      announcement.textContent = message;
      
      // Remove after announcement
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }, 100);
  }, []);

  const announceSectionChange = useCallback((sectionName: string) => {
    announceToScreenReader(`Navigated to ${sectionName} section`, 'polite');
  }, [announceToScreenReader]);

  const announceLegalLinkClick = useCallback((linkTitle: string, isExternal: boolean) => {
    const message = isExternal 
      ? `Opening external legal resource: ${linkTitle}. This will open in a new window.`
      : `Navigating to: ${linkTitle}`;
    announceToScreenReader(message, 'polite');
  }, [announceToScreenReader]);

  const announceDisclaimerView = useCallback(() => {
    announceToScreenReader('Legal disclaimer information displayed. This information is for educational purposes only and should not be considered legal advice.', 'polite');
  }, [announceToScreenReader]);

  const announceFederalLawExpansion = useCallback((lawTitle: string, isExpanded: boolean) => {
    const message = isExpanded 
      ? `Expanded details for ${lawTitle}. Additional information is now visible.`
      : `Collapsed details for ${lawTitle}.`;
    announceToScreenReader(message, 'polite');
  }, [announceToScreenReader]);

  const announceCourtProcessStep = useCallback((stepNumber: number, stepTitle: string) => {
    announceToScreenReader(`Viewing court approval process step ${stepNumber}: ${stepTitle}`, 'polite');
  }, [announceToScreenReader]);

  return {
    announceToScreenReader,
    announceSectionChange,
    announceLegalLinkClick,
    announceDisclaimerView,
    announceFederalLawExpansion,
    announceCourtProcessStep
  };
}
