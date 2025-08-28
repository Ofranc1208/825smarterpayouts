'use client';

import { useCallback, useEffect } from 'react';

/**
 * Accessibility Validation Hook
 * Following enterprise patterns - focused on A11y validation and testing only
 */
export default function useAccessibilityValidation() {
  const validateAccessibility = useCallback(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    // Check for common accessibility issues
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      issues.push(`${images.length} images missing alt text`);
    }

    // Check for empty alt text on decorative images
    const decorativeImages = document.querySelectorAll('img[alt=""]');
    if (decorativeImages.length > 0) {
      suggestions.push(`${decorativeImages.length} images with empty alt text (ensure they are decorative)`);
    }

    // Check for buttons without accessible names
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    const buttonsWithoutText = Array.from(buttons).filter(btn => !btn.textContent?.trim());
    if (buttonsWithoutText.length > 0) {
      issues.push(`${buttonsWithoutText.length} buttons without accessible names`);
    }

    // Check for links without accessible names
    const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
    const linksWithoutText = Array.from(links).filter(link => !link.textContent?.trim());
    if (linksWithoutText.length > 0) {
      issues.push(`${linksWithoutText.length} links without accessible names`);
    }

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    let hierarchyIssues = 0;
    
    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      if (currentLevel > previousLevel + 1) {
        hierarchyIssues++;
      }
      previousLevel = currentLevel;
    });

    if (hierarchyIssues > 0) {
      issues.push(`${hierarchyIssues} heading hierarchy issues`);
    }

    // Check for form labels
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])');
    const inputsWithoutLabels = Array.from(inputs).filter(input => {
      const id = input.getAttribute('id');
      return !id || !document.querySelector(`label[for="${id}"]`);
    });
    if (inputsWithoutLabels.length > 0) {
      issues.push(`${inputsWithoutLabels.length} form inputs without proper labels`);
    }

    // Check for color contrast (basic check)
    const checkColorContrast = () => {
      const elements = document.querySelectorAll('*');
      let contrastIssues = 0;
      
      elements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // Basic check for very light text on light backgrounds
        if (color && backgroundColor && 
            color.includes('rgb(') && backgroundColor.includes('rgb(')) {
          const colorValues = color.match(/\d+/g);
          const bgValues = backgroundColor.match(/\d+/g);
          
          if (colorValues && bgValues) {
            const colorBrightness = (parseInt(colorValues[0]) + parseInt(colorValues[1]) + parseInt(colorValues[2])) / 3;
            const bgBrightness = (parseInt(bgValues[0]) + parseInt(bgValues[1]) + parseInt(bgValues[2])) / 3;
            
            if (Math.abs(colorBrightness - bgBrightness) < 50) {
              contrastIssues++;
            }
          }
        }
      });
      
      if (contrastIssues > 0) {
        warnings.push(`${contrastIssues} potential color contrast issues detected`);
      }
    };

    checkColorContrast();

    // Check for ARIA attributes
    const elementsWithAriaExpanded = document.querySelectorAll('[aria-expanded]');
    const elementsWithAriaControls = document.querySelectorAll('[aria-controls]');
    
    elementsWithAriaExpanded.forEach(element => {
      const controls = element.getAttribute('aria-controls');
      if (controls && !document.getElementById(controls)) {
        issues.push(`Element with aria-expanded references non-existent element: ${controls}`);
      }
    });

    elementsWithAriaControls.forEach(element => {
      const controls = element.getAttribute('aria-controls');
      if (controls && !document.getElementById(controls)) {
        issues.push(`Element with aria-controls references non-existent element: ${controls}`);
      }
    });

    // Check for landmark roles
    const main = document.querySelectorAll('main, [role="main"]');
    const nav = document.querySelectorAll('nav, [role="navigation"]');
    const banner = document.querySelectorAll('header, [role="banner"]');
    const contentinfo = document.querySelectorAll('footer, [role="contentinfo"]');

    if (main.length === 0) {
      warnings.push('No main landmark found');
    } else if (main.length > 1) {
      warnings.push('Multiple main landmarks found');
    }

    if (nav.length === 0) {
      suggestions.push('Consider adding navigation landmarks');
    }

    // Check for focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    let elementsWithoutFocusIndicator = 0;
    
    focusableElements.forEach(element => {
      const styles = window.getComputedStyle(element, ':focus');
      if (styles.outline === 'none' || styles.outline === '0px') {
        elementsWithoutFocusIndicator++;
      }
    });

    if (elementsWithoutFocusIndicator > 0) {
      warnings.push(`${elementsWithoutFocusIndicator} focusable elements may lack proper focus indicators`);
    }

    // Report results
    if (issues.length > 0) {
      console.error('♿ Settlement Law Accessibility ISSUES:', issues);
    }
    
    if (warnings.length > 0) {
      console.warn('♿ Settlement Law Accessibility WARNINGS:', warnings);
    }
    
    if (suggestions.length > 0) {
      console.info('♿ Settlement Law Accessibility SUGGESTIONS:', suggestions);
    }
    
    if (issues.length === 0 && warnings.length === 0) {
      console.log('♿ Settlement Law Accessibility: No critical issues detected');
    }

    return {
      issues,
      warnings,
      suggestions,
      score: Math.max(0, 100 - (issues.length * 20) - (warnings.length * 5))
    };
  }, []);

  const runAccessibilityAudit = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Run validation after DOM is fully loaded
    setTimeout(() => {
      const results = validateAccessibility();
      
      if (results && process.env.NODE_ENV === 'development') {
        console.log(`♿ Settlement Law Accessibility Score: ${results.score}/100`);
        
        if (results.score < 80) {
          console.warn('♿ Accessibility score below 80. Consider addressing the issues above.');
        } else if (results.score >= 95) {
          console.log('♿ Excellent accessibility score!');
        }
      }
    }, 2000);
  }, [validateAccessibility]);

  const validateLegalContentAccessibility = useCallback(() => {
    if (typeof window === 'undefined') return;

    const legalIssues: string[] = [];

    // Check for legal disclaimers accessibility
    const disclaimers = document.querySelectorAll('[class*="disclaimer"], [id*="disclaimer"]');
    disclaimers.forEach(disclaimer => {
      if (!disclaimer.getAttribute('role') && !disclaimer.getAttribute('aria-label')) {
        legalIssues.push('Legal disclaimer missing accessibility attributes');
      }
    });

    // Check for legal links accessibility
    const legalLinks = document.querySelectorAll('a[href*="law."], a[href*="legal"], a[href*="irs.gov"], a[href*="congress.gov"]');
    legalLinks.forEach(link => {
      if (!link.getAttribute('aria-label') && !link.getAttribute('title')) {
        legalIssues.push('Legal resource link missing descriptive label');
      }
      
      if (link.getAttribute('target') === '_blank' && !link.textContent?.includes('opens in new')) {
        legalIssues.push('External legal link missing "opens in new window" indication');
      }
    });

    // Check for legal sections structure
    const legalSections = document.querySelectorAll('[class*="law"], [class*="legal"], [id*="law"], [id*="legal"]');
    legalSections.forEach(section => {
      const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length === 0) {
        legalIssues.push('Legal section missing proper heading structure');
      }
    });

    if (legalIssues.length > 0) {
      console.warn('♿ Legal Content Accessibility Issues:', legalIssues);
    } else {
      console.log('♿ Legal Content Accessibility: No issues detected');
    }

    return legalIssues;
  }, []);

  // Initialize accessibility validation
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      runAccessibilityAudit();
      validateLegalContentAccessibility();
    }
  }, [runAccessibilityAudit, validateLegalContentAccessibility]);

  return {
    validateAccessibility,
    runAccessibilityAudit,
    validateLegalContentAccessibility
  };
}
