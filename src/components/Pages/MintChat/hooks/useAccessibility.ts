'use client';

import { useEffect, useCallback } from 'react';

/**
 * Accessibility Hook for MintChat
 * 
 * Provides WCAG 2.1 AA compliance features including keyboard navigation,
 * screen reader announcements, and focus management for the chat interface.
 * 
 * @hook useAccessibility
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface UseAccessibilityOptions {
  /** Enable keyboard navigation shortcuts */
  enableKeyboardShortcuts?: boolean;
  /** Enable screen reader announcements */
  enableScreenReader?: boolean;
  /** Enable focus management */
  enableFocusManagement?: boolean;
}

/**
 * Accessibility Hook
 * 
 * ## Features
 * - ✅ WCAG 2.1 AA compliance
 * - ✅ Keyboard navigation support
 * - ✅ Screen reader announcements
 * - ✅ Focus management
 * - ✅ High contrast mode detection
 * - ✅ Reduced motion preferences
 * 
 * @param options - Accessibility configuration options
 * @returns Accessibility utilities and state
 * 
 * @example
 * ```tsx
 * import { useAccessibility } from '../hooks/useAccessibility';
 * 
 * export default function MintChatPage() {
 *   const { announceToScreenReader, isHighContrast } = useAccessibility({
 *     enableKeyboardShortcuts: true,
 *     enableScreenReader: true
 *   });
 * 
 *   return <div>...</div>;
 * }
 * ```
 */
export function useAccessibility(options: UseAccessibilityOptions = {}) {
  const {
    enableKeyboardShortcuts = true,
    enableScreenReader = true,
    enableFocusManagement = true
  } = options;

  // Screen reader announcement function
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableScreenReader) return;

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
    announcement.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [enableScreenReader]);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case '/':
          // Focus chat input
          event.preventDefault();
          const chatInput = document.querySelector('[data-testid="chat-input"]') as HTMLElement;
          if (chatInput) {
            chatInput.focus();
            announceToScreenReader('Chat input focused');
          }
          break;
        case 'Escape':
          // Close modals or blur current element
          event.preventDefault();
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement) {
            activeElement.blur();
            announceToScreenReader('Focus cleared');
          }
          break;
        case '?':
          // Show keyboard shortcuts help
          if (event.shiftKey) {
            event.preventDefault();
            announceToScreenReader('Keyboard shortcuts: Press slash to focus chat, Escape to clear focus');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, announceToScreenReader]);

  // Focus management
  useEffect(() => {
    if (!enableFocusManagement) return;

    // Ensure focus is visible for keyboard users
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.matches(':focus-visible')) {
        target.style.outline = '2px solid #059669';
        target.style.outlineOffset = '2px';
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target) {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [enableFocusManagement]);

  // Detect user preferences
  const isHighContrast = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-contrast: high)').matches;
  
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    announceToScreenReader,
    isHighContrast,
    prefersReducedMotion,
    enableKeyboardShortcuts,
    enableScreenReader,
    enableFocusManagement
  };
}
