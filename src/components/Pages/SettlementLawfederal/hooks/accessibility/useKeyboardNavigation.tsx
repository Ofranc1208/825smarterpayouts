'use client';

import { useCallback, useEffect } from 'react';

/**
 * Keyboard Navigation Hook
 * Following enterprise patterns - focused on keyboard shortcuts and navigation only
 */
export default function useKeyboardNavigation(announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void) {
  const setupKeyboardNavigation = useCallback(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + 1: Jump to main content
      if (event.altKey && event.key === '1') {
        event.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          (mainContent as HTMLElement).focus();
          announceToScreenReader('Jumped to main content', 'assertive');
        }
      }

      // Alt + 2: Jump to navigation
      if (event.altKey && event.key === '2') {
        event.preventDefault();
        const navigation = document.querySelector('nav');
        if (navigation) {
          (navigation as HTMLElement).focus();
          announceToScreenReader('Jumped to navigation', 'assertive');
        }
      }

      // Alt + 3: Jump to footer
      if (event.altKey && event.key === '3') {
        event.preventDefault();
        const footer = document.querySelector('footer');
        if (footer) {
          (footer as HTMLElement).focus();
          announceToScreenReader('Jumped to footer', 'assertive');
        }
      }

      // Escape: Close any open modals or expanded content
      if (event.key === 'Escape') {
        const expandedElements = document.querySelectorAll('[aria-expanded="true"]');
        expandedElements.forEach(element => {
          element.setAttribute('aria-expanded', 'false');
        });
        
        if (expandedElements.length > 0) {
          announceToScreenReader('Closed expanded content', 'assertive');
        }
      }

      // Tab: Enhanced tab navigation for legal content
      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        // Add visual indicator for current focus
        const currentFocus = document.activeElement;
        if (currentFocus && focusableElements.length > 0) {
          currentFocus.classList.add('settlement-law-focus');
          
          // Remove focus class from other elements
          focusableElements.forEach(el => {
            if (el !== currentFocus) {
              el.classList.remove('settlement-law-focus');
            }
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [announceToScreenReader]);

  const initializeKeyboardShortcuts = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Add keyboard shortcuts help
    const addKeyboardShortcutsHelp = () => {
      if (document.querySelector('#keyboard-shortcuts-help')) return;

      const helpDiv = document.createElement('div');
      helpDiv.id = 'keyboard-shortcuts-help';
      helpDiv.setAttribute('aria-live', 'polite');
      helpDiv.style.position = 'absolute';
      helpDiv.style.left = '-10000px';
      helpDiv.innerHTML = `
        <p>Keyboard shortcuts available:</p>
        <ul>
          <li>Alt + 1: Jump to main content</li>
          <li>Alt + 2: Jump to navigation</li>
          <li>Alt + 3: Jump to footer</li>
          <li>Escape: Close expanded content</li>
          <li>Tab: Navigate through interactive elements</li>
        </ul>
      `;
      
      document.body.appendChild(helpDiv);
    };

    // Show help on first focus
    let helpShown = false;
    const showHelpOnFirstFocus = () => {
      if (!helpShown) {
        addKeyboardShortcutsHelp();
        announceToScreenReader('Keyboard navigation available. Press Alt + 1 for main content, Alt + 2 for navigation, Alt + 3 for footer.', 'polite');
        helpShown = true;
      }
    };

    document.addEventListener('focusin', showHelpOnFirstFocus, { once: true });

    return () => {
      document.removeEventListener('focusin', showHelpOnFirstFocus);
    };
  }, [announceToScreenReader]);

  // Initialize keyboard navigation
  useEffect(() => {
    const keyboardCleanup = setupKeyboardNavigation();
    const shortcutsCleanup = initializeKeyboardShortcuts();

    return () => {
      keyboardCleanup?.();
      shortcutsCleanup?.();
    };
  }, [setupKeyboardNavigation, initializeKeyboardShortcuts]);

  return {
    setupKeyboardNavigation,
    initializeKeyboardShortcuts
  };
}
