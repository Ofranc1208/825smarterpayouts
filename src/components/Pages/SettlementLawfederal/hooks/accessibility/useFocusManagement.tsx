'use client';

import { useCallback, useEffect } from 'react';

/**
 * Focus Management Hook
 * Following enterprise patterns - focused on focus indicators and skip links only
 */
export default function useFocusManagement(announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void) {
  const enhanceFocusManagement = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Add focus indicators for keyboard navigation
    const addFocusStyles = () => {
      if (document.head.querySelector('#settlement-law-accessibility-styles')) return;

      const style = document.createElement('style');
      style.id = 'settlement-law-accessibility-styles';
      style.textContent = `
        .settlement-law-focus:focus {
          outline: 2px solid #059669 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.2) !important;
        }
        
        .settlement-law-skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #059669;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
          transition: top 0.3s;
          font-weight: 600;
        }
        
        .settlement-law-skip-link:focus {
          top: 6px;
        }

        .settlement-law-focus-trap {
          outline: 1px dashed #059669;
          outline-offset: 1px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .settlement-law-focus:focus {
            outline: 3px solid #000000 !important;
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .settlement-law-skip-link {
            transition: none;
          }
        }
      `;
      
      document.head.appendChild(style);
    };

    addFocusStyles();
  }, []);

  const createSkipLinks = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Add skip links if they don't exist
    if (document.querySelector('.settlement-law-skip-link')) return;

    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.setAttribute('role', 'navigation');
    skipLinksContainer.setAttribute('aria-label', 'Skip links');

    // Main content skip link
    const skipToMain = document.createElement('a');
    skipToMain.href = '#main-content';
    skipToMain.className = 'settlement-law-skip-link';
    skipToMain.textContent = 'Skip to main content';
    skipToMain.addEventListener('click', (e) => {
      e.preventDefault();
      const mainContent = document.querySelector('#main-content') || document.querySelector('main');
      if (mainContent) {
        (mainContent as HTMLElement).focus();
        (mainContent as HTMLElement).setAttribute('tabindex', '-1');
        announceToScreenReader('Skipped to main content', 'assertive');
      }
    });

    // Navigation skip link
    const skipToNav = document.createElement('a');
    skipToNav.href = '#navigation';
    skipToNav.className = 'settlement-law-skip-link';
    skipToNav.style.left = '120px';
    skipToNav.textContent = 'Skip to navigation';
    skipToNav.addEventListener('click', (e) => {
      e.preventDefault();
      const navigation = document.querySelector('#navigation') || document.querySelector('nav');
      if (navigation) {
        (navigation as HTMLElement).focus();
        (navigation as HTMLElement).setAttribute('tabindex', '-1');
        announceToScreenReader('Skipped to navigation', 'assertive');
      }
    });

    // Footer skip link
    const skipToFooter = document.createElement('a');
    skipToFooter.href = '#footer';
    skipToFooter.className = 'settlement-law-skip-link';
    skipToFooter.style.left = '240px';
    skipToFooter.textContent = 'Skip to footer';
    skipToFooter.addEventListener('click', (e) => {
      e.preventDefault();
      const footer = document.querySelector('#footer') || document.querySelector('footer');
      if (footer) {
        (footer as HTMLElement).focus();
        (footer as HTMLElement).setAttribute('tabindex', '-1');
        announceToScreenReader('Skipped to footer', 'assertive');
      }
    });

    skipLinksContainer.appendChild(skipToMain);
    skipLinksContainer.appendChild(skipToNav);
    skipLinksContainer.appendChild(skipToFooter);
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }, [announceToScreenReader]);

  const manageFocusTrap = useCallback((containerSelector: string, isActive: boolean) => {
    if (typeof window === 'undefined') return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (isActive) {
      // Create focus trap
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);
      container.classList.add('settlement-law-focus-trap');
      firstElement.focus();

      // Store cleanup function
      (container as any)._focusTrapCleanup = () => {
        container.removeEventListener('keydown', handleTabKey);
        container.classList.remove('settlement-law-focus-trap');
      };
    } else {
      // Remove focus trap
      if ((container as any)._focusTrapCleanup) {
        (container as any)._focusTrapCleanup();
        delete (container as any)._focusTrapCleanup;
      }
    }
  }, []);

  // Initialize focus management
  useEffect(() => {
    enhanceFocusManagement();
    createSkipLinks();
  }, [enhanceFocusManagement, createSkipLinks]);

  return {
    enhanceFocusManagement,
    createSkipLinks,
    manageFocusTrap
  };
}
