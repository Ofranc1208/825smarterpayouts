/**
 * Focus Manager
 * 
 * Manages focus state and focus history for navigation elements
 * 
 * @module useFocusManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef } from 'react';

interface FocusManagerConfig {
  enableFocusManagement: boolean;
  debug: boolean;
}

/**
 * Hook for managing focus functionality
 */
export function useFocusManager({ enableFocusManagement, debug }: FocusManagerConfig) {
  const focusHistory = useRef<HTMLElement[]>([]);

  /**
   * Debug logging for focus events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation A11y - Focus] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Manage focus for specific element
   */
  const manageFocus = useCallback((elementId: string) => {
    if (!enableFocusManagement) return;

    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      focusHistory.current.push(element);
      debugLog('Focus Managed', { elementId, element: element.tagName });
    } else {
      debugLog('Focus Management Failed', { elementId, reason: 'Element not found' });
    }
  }, [enableFocusManagement, debugLog]);

  /**
   * Get focus history
   */
  const getFocusHistory = useCallback(() => {
    return focusHistory.current.slice();
  }, []);

  /**
   * Clear focus history
   */
  const clearFocusHistory = useCallback(() => {
    focusHistory.current = [];
    debugLog('Focus History Cleared', {});
  }, [debugLog]);

  /**
   * Get currently focused element
   */
  const getCurrentFocus = useCallback(() => {
    return document.activeElement as HTMLElement;
  }, []);

  /**
   * Focus previous element in history
   */
  const focusPrevious = useCallback(() => {
    if (!enableFocusManagement || focusHistory.current.length < 2) return;

    // Remove current focus from history
    focusHistory.current.pop();
    
    // Focus on previous element
    const previousElement = focusHistory.current[focusHistory.current.length - 1];
    if (previousElement && document.contains(previousElement)) {
      previousElement.focus();
      debugLog('Focused Previous Element', { element: previousElement.tagName, id: previousElement.id });
    }
  }, [enableFocusManagement, debugLog]);

  return {
    manageFocus,
    getFocusHistory,
    clearFocusHistory,
    getCurrentFocus,
    focusPrevious
  };
}
