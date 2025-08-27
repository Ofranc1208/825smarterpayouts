/**
 * Keyboard Navigation Manager
 * 
 * Manages keyboard shortcuts and navigation functionality
 * 
 * @module useKeyboardNavigationManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef, useEffect } from 'react';

interface KeyboardNavigationConfig {
  enableKeyboardNavigation: boolean;
  skipToContentEnabled: boolean;
  announceToScreenReader: (message: string) => void;
  debug: boolean;
}

/**
 * Hook for managing keyboard navigation
 */
export function useKeyboardNavigationManager({ 
  enableKeyboardNavigation, 
  skipToContentEnabled, 
  announceToScreenReader,
  debug 
}: KeyboardNavigationConfig) {
  const focusHistory = useRef<HTMLElement[]>([]);
  const keyboardListeners = useRef<(() => void)[]>([]);

  /**
   * Debug logging for keyboard events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation A11y - Keyboard] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Initialize keyboard navigation shortcuts
   */
  useEffect(() => {
    if (!enableKeyboardNavigation || typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + 1: Skip to main content
      if (event.altKey && event.key === '1' && skipToContentEnabled) {
        event.preventDefault();
        const mainContent = document.querySelector('main, [role="main"], #main-content');
        if (mainContent) {
          (mainContent as HTMLElement).focus();
          announceToScreenReader('Skipped to main content');
        }
        debugLog('Skip to Content', { target: mainContent });
      }

      // Alt + 2: Skip to navigation
      if (event.altKey && event.key === '2') {
        event.preventDefault();
        const navigation = document.querySelector('nav, [role="navigation"]');
        if (navigation) {
          const firstLink = navigation.querySelector('a, button');
          if (firstLink) {
            (firstLink as HTMLElement).focus();
            announceToScreenReader('Focused on navigation');
          }
        }
        debugLog('Skip to Navigation', { target: navigation });
      }

      // Escape: Close open dropdowns/menus
      if (event.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');
        openDropdowns.forEach(dropdown => {
          dropdown.setAttribute('aria-expanded', 'false');
          // Trigger close event
          const closeEvent = new CustomEvent('nav:close-dropdown');
          dropdown.dispatchEvent(closeEvent);
        });
        
        if (openDropdowns.length > 0) {
          announceToScreenReader('Closed navigation menus');
          debugLog('Escape Key - Closed Dropdowns', { count: openDropdowns.length });
        }
      }

      // Tab navigation enhancement
      if (event.key === 'Tab') {
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement) {
          focusHistory.current.push(focusedElement);
          // Keep only last 10 focus history items
          if (focusHistory.current.length > 10) {
            focusHistory.current = focusHistory.current.slice(-10);
          }
          debugLog('Tab Navigation', { focused: focusedElement.tagName, id: focusedElement.id });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    keyboardListeners.current.push(() => {
      document.removeEventListener('keydown', handleKeyDown);
    });

    debugLog('Keyboard Navigation Initialized', { shortcuts: ['Alt+1', 'Alt+2', 'Escape', 'Tab'] });

    return () => {
      keyboardListeners.current.forEach(cleanup => cleanup());
      keyboardListeners.current = [];
    };
  }, [enableKeyboardNavigation, skipToContentEnabled, announceToScreenReader, debugLog]);

  /**
   * Enable keyboard shortcuts for navigation
   */
  const enableKeyboardShortcuts = useCallback((): (() => void) => {
    if (!enableKeyboardNavigation) return () => {};

    // Additional keyboard shortcuts can be added here
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Ctrl + / or Cmd + /: Focus search (if available)
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
        if (searchInput) {
          (searchInput as HTMLElement).focus();
          announceToScreenReader('Focused on search');
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [enableKeyboardNavigation, announceToScreenReader]);

  return {
    enableKeyboardShortcuts
  };
}
