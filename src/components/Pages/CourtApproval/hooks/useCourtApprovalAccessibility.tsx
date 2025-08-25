'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useCourtApprovalAccessibility() {
  const announcementRef = useRef<HTMLDivElement>(null);

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
    
    console.log('📢 Screen Reader Announcement:', message);
  }, []);

  // Handle keyboard navigation
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    // Skip to main content (Alt + 1)
    if (event.altKey && event.key === '1') {
      event.preventDefault();
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.focus();
        announceToScreenReader('Skipped to main content');
      }
    }
    
    // Skip to navigation (Alt + 2)
    if (event.altKey && event.key === '2') {
      event.preventDefault();
      const navigation = document.querySelector('nav');
      if (navigation) {
        navigation.focus();
        announceToScreenReader('Skipped to navigation');
      }
    }
    
    // Escape key to close modals/dropdowns
    if (event.key === 'Escape') {
      const openDetails = document.querySelectorAll('details[open]');
      openDetails.forEach((detail) => {
        (detail as HTMLDetailsElement).open = false;
      });
      
      if (openDetails.length > 0) {
        announceToScreenReader('Closed open sections');
      }
    }
  }, [announceToScreenReader]);

  // Enhance focus management
  const enhanceFocusManagement = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Add focus indicators for keyboard users
    const addFocusIndicators = () => {
      const style = document.createElement('style');
      style.textContent = `
        .keyboard-focus-only:focus {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
        }
        
        .keyboard-focus-only:focus-visible {
          outline: 3px solid #0066cc !important;
          outline-offset: 2px !important;
        }
        
        .keyboard-focus-only:not(:focus-visible) {
          outline: none !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Track keyboard usage
    let isUsingKeyboard = false;
    
    const handleKeyDown = () => {
      isUsingKeyboard = true;
      document.body.classList.add('using-keyboard');
    };
    
    const handleMouseDown = () => {
      isUsingKeyboard = false;
      document.body.classList.remove('using-keyboard');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    addFocusIndicators();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Monitor color contrast
  const monitorColorContrast = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const checkContrast = () => {
      // This is a simplified contrast checker
      // In production, you'd use a more sophisticated library
      const elements = document.querySelectorAll('*');
      let contrastIssues = 0;
      
      elements.forEach((element) => {
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.backgroundColor;
        const color = styles.color;
        
        // Basic check for transparent backgrounds with text
        if (backgroundColor === 'rgba(0, 0, 0, 0)' && color !== 'rgba(0, 0, 0, 0)') {
          // Element has text but transparent background - potential issue
          const hasTextContent = element.textContent?.trim();
          if (hasTextContent && hasTextContent.length > 0) {
            contrastIssues++;
          }
        }
      });
      
      if (contrastIssues > 0) {
        console.warn(`⚠️ Potential contrast issues found: ${contrastIssues} elements`);
      }
    };
    
    // Check contrast after page load
    setTimeout(checkContrast, 2000);
  }, []);

  // Validate ARIA attributes
  const validateARIA = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const validateElements = () => {
      // Check for missing alt text on images
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        console.warn(`⚠️ ${images.length} images missing alt text`);
      }
      
      // Check for missing labels on form elements
      const formElements = document.querySelectorAll('input, select, textarea');
      let unlabeledElements = 0;
      
      formElements.forEach((element) => {
        const hasLabel = element.hasAttribute('aria-label') || 
                         element.hasAttribute('aria-labelledby') ||
                         document.querySelector(`label[for="${element.id}"]`);
        
        if (!hasLabel) {
          unlabeledElements++;
        }
      });
      
      if (unlabeledElements > 0) {
        console.warn(`⚠️ ${unlabeledElements} form elements missing labels`);
      }
      
      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      let hierarchyIssues = 0;
      
      headings.forEach((heading) => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        if (currentLevel > previousLevel + 1) {
          hierarchyIssues++;
        }
        previousLevel = currentLevel;
      });
      
      if (hierarchyIssues > 0) {
        console.warn(`⚠️ ${hierarchyIssues} heading hierarchy issues found`);
      }
    };
    
    // Validate after page load
    setTimeout(validateElements, 1000);
  }, []);

  // Initialize accessibility features
  useEffect(() => {
    const cleanupFocus = enhanceFocusManagement();
    monitorColorContrast();
    validateARIA();
    
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    return () => {
      cleanupFocus?.();
      document.removeEventListener('keydown', handleKeyboardNavigation);
      
      // Clean up live region
      const liveRegion = document.getElementById('court-approval-announcements');
      if (liveRegion) {
        liveRegion.remove();
      }
    };
  }, [handleKeyboardNavigation, enhanceFocusManagement, monitorColorContrast, validateARIA]);

  return {
    announceToScreenReader,
    enhanceFocusManagement,
    monitorColorContrast,
    validateARIA
  };
}
