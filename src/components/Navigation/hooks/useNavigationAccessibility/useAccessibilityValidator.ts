/**
 * Accessibility Validator
 * 
 * Validates accessibility compliance and provides scoring
 * 
 * @module useAccessibilityValidator
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useEffect } from 'react';
import type { AccessibilityIssue } from '../../types';

interface AccessibilityValidatorConfig {
  skipToContentEnabled: boolean;
  setAccessibilityScore: (score: number) => void;
  setLastAudit: (date: Date) => void;
  debug: boolean;
}

/**
 * Hook for validating accessibility compliance
 */
export function useAccessibilityValidator({ 
  skipToContentEnabled, 
  setAccessibilityScore, 
  setLastAudit, 
  debug 
}: AccessibilityValidatorConfig) {

  /**
   * Debug logging for validation events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation A11y - Validator] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Validate accessibility compliance
   */
  const validateAccessibility = useCallback(async (): Promise<number> => {
    const issues: AccessibilityIssue[] = [];
    let score = 100;

    // Check for navigation landmarks
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    if (navElements.length === 0) {
      issues.push({
        type: 'error',
        element: 'navigation',
        description: 'No navigation landmarks found',
        recommendation: 'Add <nav> element or role="navigation"',
        wcagReference: 'WCAG 2.1 - 2.4.1'
      });
      score -= 20;
    }

    // Check for skip links
    const skipLinks = document.querySelectorAll('a[href^="#"], a[href*="skip"]');
    if (skipLinks.length === 0 && skipToContentEnabled) {
      issues.push({
        type: 'warning',
        element: 'skip-links',
        description: 'No skip to content links found',
        recommendation: 'Add skip to main content link',
        wcagReference: 'WCAG 2.1 - 2.4.1'
      });
      score -= 10;
    }

    // Check for ARIA labels on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], [role="link"]');
    let missingLabels = 0;
    
    interactiveElements.forEach(element => {
      const hasLabel = element.hasAttribute('aria-label') || 
                      element.hasAttribute('aria-labelledby') || 
                      element.textContent?.trim();
      
      if (!hasLabel) {
        missingLabels++;
      }
    });

    if (missingLabels > 0) {
      issues.push({
        type: 'error',
        element: 'interactive-elements',
        description: `${missingLabels} interactive elements missing accessible labels`,
        recommendation: 'Add aria-label or visible text to all interactive elements',
        wcagReference: 'WCAG 2.1 - 4.1.2'
      });
      score -= Math.min(30, missingLabels * 5);
    }

    // Check for keyboard accessibility
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    let nonKeyboardAccessible = 0;
    focusableElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) < 0) {
        nonKeyboardAccessible++;
      }
    });

    if (nonKeyboardAccessible > 0) {
      issues.push({
        type: 'warning',
        element: 'keyboard-navigation',
        description: `${nonKeyboardAccessible} elements not keyboard accessible`,
        recommendation: 'Ensure all interactive elements are keyboard accessible',
        wcagReference: 'WCAG 2.1 - 2.1.1'
      });
      score -= Math.min(20, nonKeyboardAccessible * 3);
    }

    // Check color contrast (basic check)
    const navElement = document.querySelector('nav');
    if (navElement) {
      const computedStyle = window.getComputedStyle(navElement);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      
      // Basic contrast check (would need more sophisticated implementation for real use)
      if (backgroundColor === color) {
        issues.push({
          type: 'error',
          element: 'color-contrast',
          description: 'Poor color contrast detected',
          recommendation: 'Ensure sufficient color contrast (4.5:1 for normal text)',
          wcagReference: 'WCAG 2.1 - 1.4.3'
        });
        score -= 15;
      }
    }

    const finalScore = Math.max(0, score);
    setAccessibilityScore(finalScore);
    setLastAudit(new Date());
    
    debugLog('Accessibility Validation Complete', { 
      score: finalScore, 
      issues: issues.length,
      details: issues 
    });

    return finalScore;
  }, [skipToContentEnabled, setAccessibilityScore, setLastAudit, debugLog]);

  /**
   * Initialize accessibility validation
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Run initial accessibility validation
    const timer = setTimeout(() => {
      validateAccessibility();
    }, 1000);

    return () => clearTimeout(timer);
  }, [validateAccessibility]);

  /**
   * Get accessibility issues (detailed audit)
   */
  const getAccessibilityIssues = useCallback(async (): Promise<AccessibilityIssue[]> => {
    // This would run the same validation but return the issues array
    // For now, return empty array - could be expanded for detailed reporting
    return [];
  }, []);

  return {
    validateAccessibility,
    getAccessibilityIssues
  };
}
