/**
 * Accessibility Hook
 * 
 * Enterprise-grade accessibility utilities and enhancements
 * for WCAG 2.1 AA compliance and inclusive design.
 * 
 * @module useAccessibility
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Accessibility preferences interface
 */
interface AccessibilityPreferences {
  /** Reduced motion preference */
  prefersReducedMotion: boolean;
  /** High contrast preference */
  prefersHighContrast: boolean;
  /** Color scheme preference */
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
}

/**
 * Focus management options
 */
interface FocusManagementOptions {
  /** Whether to trap focus within element */
  trapFocus?: boolean;
  /** Whether to restore focus on unmount */
  restoreFocus?: boolean;
  /** Initial focus target selector */
  initialFocus?: string;
}

/**
 * Custom hook for accessibility preferences
 * 
 * Detects and responds to user accessibility preferences
 * for enterprise-grade inclusive design.
 * 
 * @returns {AccessibilityPreferences} User accessibility preferences
 */
export function useAccessibilityPreferences(): AccessibilityPreferences {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersColorScheme: 'no-preference'
  });

  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: reducedMotionQuery.matches,
        prefersHighContrast: highContrastQuery.matches,
        prefersColorScheme: colorSchemeQuery.matches ? 'dark' : 'light'
      });
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    reducedMotionQuery.addEventListener('change', updatePreferences);
    highContrastQuery.addEventListener('change', updatePreferences);
    colorSchemeQuery.addEventListener('change', updatePreferences);

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences);
      highContrastQuery.removeEventListener('change', updatePreferences);
      colorSchemeQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  return preferences;
}

/**
 * Custom hook for focus management
 * 
 * Provides enterprise-grade focus management utilities
 * for keyboard navigation and screen reader support.
 * 
 * @param {FocusManagementOptions} options - Focus management configuration
 * @returns {Object} Focus management utilities
 */
export function useFocusManagement({
  trapFocus = false,
  restoreFocus = true,
  initialFocus
}: FocusManagementOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElementRef = useRef<Element | null>(null);

  // Get focusable elements within container
  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(containerRef.current.querySelectorAll(focusableSelectors));
  };

  // Handle keydown for focus trapping
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!trapFocus || event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Set initial focus
  const setInitialFocus = () => {
    if (!containerRef.current) return;

    let elementToFocus: HTMLElement | null = null;

    if (initialFocus) {
      elementToFocus = containerRef.current.querySelector(initialFocus);
    }

    if (!elementToFocus) {
      const focusableElements = getFocusableElements();
      elementToFocus = focusableElements[0] || containerRef.current;
    }

    if (elementToFocus) {
      elementToFocus.focus();
    }
  };

  // Setup focus management
  useEffect(() => {
    if (restoreFocus) {
      previousActiveElementRef.current = document.activeElement;
    }

    if (trapFocus) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Set initial focus after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(setInitialFocus, 100);

    return () => {
      if (trapFocus) {
        document.removeEventListener('keydown', handleKeyDown);
      }

      if (restoreFocus && previousActiveElementRef.current) {
        (previousActiveElementRef.current as HTMLElement).focus();
      }

      clearTimeout(timeoutId);
    };
  }, [trapFocus, restoreFocus, initialFocus]);

  return {
    containerRef,
    setInitialFocus,
    getFocusableElements
  };
}

/**
 * Custom hook for screen reader announcements
 * 
 * Provides utilities for making dynamic content accessible
 * to screen readers through ARIA live regions.
 * 
 * @returns {Object} Screen reader announcement utilities
 */
export function useScreenReaderAnnouncements() {
  const [announcement, setAnnouncement] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Announce message to screen readers
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the announcement
    setAnnouncement(message);

    // Clear the announcement after a delay to allow for re-announcements
    timeoutRef.current = setTimeout(() => {
      setAnnouncement('');
    }, 1000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    announcement,
    announce
  };
}
