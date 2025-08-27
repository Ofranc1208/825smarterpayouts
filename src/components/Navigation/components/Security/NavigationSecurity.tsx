/**
 * Navigation Security Component - Enterprise Edition
 * 
 * Provides comprehensive security features for navigation including
 * CSP compliance, XSS protection, and secure link handling.
 * 
 * @module NavigationSecurity
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

'use client';

import React, { useCallback, useEffect } from 'react';
import { track } from '@vercel/analytics';

interface NavigationSecurityProps {
  enableCSPReporting?: boolean;
  enableXSSProtection?: boolean;
  enableSecureLinks?: boolean;
  trustedDomains?: string[];
  onSecurityViolation?: (violation: SecurityViolation) => void;
}

interface SecurityViolation {
  type: 'csp' | 'xss' | 'untrusted-link' | 'injection-attempt';
  message: string;
  timestamp: number;
  url?: string;
  userAgent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Navigation Security Component
 * 
 * Features:
 * - Content Security Policy monitoring
 * - XSS attack detection and prevention
 * - Secure external link handling
 * - Input sanitization for navigation
 * - Security violation reporting
 */
export const NavigationSecurity: React.FC<NavigationSecurityProps> = ({
  enableCSPReporting = true,
  enableXSSProtection = true,
  enableSecureLinks = true,
  trustedDomains = ['smarterpayouts.com', 'vercel.app'],
  onSecurityViolation
}) => {

  /**
   * Report security violation
   */
  const reportViolation = useCallback((violation: SecurityViolation) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('🔒 Navigation Security Violation:', violation);
    }

    // Track in analytics
    track('navigation_security_violation', {
      type: violation.type,
      severity: violation.severity,
      timestamp: violation.timestamp,
      url: violation.url
    });

    // Call custom handler
    if (onSecurityViolation) {
      onSecurityViolation(violation);
    }

    // Report to security monitoring service
    if (typeof window !== 'undefined' && (window as any).securityMonitor) {
      (window as any).securityMonitor.report(violation);
    }
  }, [onSecurityViolation]);

  /**
   * CSP Violation Handler
   */
  useEffect(() => {
    if (!enableCSPReporting || typeof window === 'undefined') return;

    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      // Only report navigation-related violations
      if (event.blockedURI?.includes('navigation') || 
          event.sourceFile?.includes('Navigation')) {
        
        reportViolation({
          type: 'csp',
          message: `CSP violation: ${event.violatedDirective} - ${event.blockedURI}`,
          timestamp: Date.now(),
          url: event.sourceFile,
          userAgent: navigator.userAgent,
          severity: 'high'
        });
      }
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);
    
    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, [enableCSPReporting, reportViolation]);

  /**
   * XSS Detection Patterns
   */
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /eval\s*\(/gi,
    /document\.write/gi,
    /innerHTML\s*=/gi
  ];

  /**
   * Sanitize navigation input
   */
  const sanitizeInput = useCallback((input: string): string => {
    if (!enableXSSProtection) return input;

    let sanitized = input;

    // Check for XSS patterns
    for (const pattern of xssPatterns) {
      if (pattern.test(sanitized)) {
        reportViolation({
          type: 'xss',
          message: `XSS attempt detected in navigation input: ${input.substring(0, 100)}`,
          timestamp: Date.now(),
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
          severity: 'critical'
        });

        // Remove malicious content
        sanitized = sanitized.replace(pattern, '');
      }
    }

    // HTML encode remaining content
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    return sanitized;
  }, [enableXSSProtection, reportViolation]);

  /**
   * Validate external links
   */
  const validateExternalLink = useCallback((url: string): boolean => {
    if (!enableSecureLinks) return true;

    try {
      const urlObj = new URL(url);
      
      // Check protocol
      if (!['https:', 'http:', 'mailto:', 'tel:'].includes(urlObj.protocol)) {
        reportViolation({
          type: 'untrusted-link',
          message: `Untrusted protocol in navigation link: ${urlObj.protocol}`,
          timestamp: Date.now(),
          url,
          severity: 'medium'
        });
        return false;
      }

      // Check domain for external links
      if (urlObj.protocol.startsWith('http')) {
        const isInternal = trustedDomains.some(domain => 
          urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
        );

        if (!isInternal) {
          // Log external link access (not necessarily a violation)
          track('navigation_external_link', {
            domain: urlObj.hostname,
            url: url,
            timestamp: Date.now()
          });
        }
      }

      return true;
    } catch (error) {
      reportViolation({
        type: 'untrusted-link',
        message: `Invalid URL in navigation: ${url}`,
        timestamp: Date.now(),
        url,
        severity: 'medium'
      });
      return false;
    }
  }, [enableSecureLinks, trustedDomains, reportViolation]);

  /**
   * Secure click handler for navigation links
   */
  const handleSecureClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const href = target.href;

    if (!href) return;

    // Validate the link
    if (!validateExternalLink(href)) {
      event.preventDefault();
      return;
    }

    // Add security attributes for external links
    if (href.startsWith('http') && !trustedDomains.some(domain => href.includes(domain))) {
      target.rel = 'noopener noreferrer';
      target.target = '_blank';
    }
  }, [validateExternalLink, trustedDomains]);

  /**
   * Monitor for injection attempts in navigation
   */
  useEffect(() => {
    if (!enableXSSProtection || typeof window === 'undefined') return;

    const monitorInputs = () => {
      const inputs = document.querySelectorAll('input[type="search"], input[type="text"]');
      
      inputs.forEach(input => {
        const handleInput = (event: Event) => {
          const target = event.target as HTMLInputElement;
          const value = target.value;

          // Check for injection attempts
          for (const pattern of xssPatterns) {
            if (pattern.test(value)) {
              reportViolation({
                type: 'injection-attempt',
                message: `Injection attempt in navigation search: ${value.substring(0, 50)}`,
                timestamp: Date.now(),
                severity: 'high'
              });

              // Clear malicious input
              target.value = sanitizeInput(value);
              break;
            }
          }
        };

        input.addEventListener('input', handleInput);
      });
    };

    // Monitor existing inputs
    monitorInputs();

    // Monitor for dynamically added inputs
    const observer = new MutationObserver(monitorInputs);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [enableXSSProtection, sanitizeInput, reportViolation]);

  /**
   * Generate security headers for navigation
   */
  const getSecurityHeaders = useCallback(() => {
    return {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://vercel.live",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' https:",
        "connect-src 'self' https://vitals.vercel-insights.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };
  }, []);

  /**
   * Security context provider for navigation components
   */
  const securityContext = {
    sanitizeInput,
    validateExternalLink,
    handleSecureClick,
    getSecurityHeaders,
    reportViolation
  };

  // Expose security utilities globally for navigation components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).navigationSecurity = securityContext;
    }
  }, [securityContext]);

  return (
    <>
      {/* Security Meta Tags */}
      <meta httpEquiv="Content-Security-Policy" content={getSecurityHeaders()['Content-Security-Policy']} />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Security Monitoring Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Security monitoring for navigation
            (function() {
              // Monitor for suspicious navigation activities
              const originalPushState = history.pushState;
              history.pushState = function() {
                // Log navigation changes for security audit
                if (window.navigationSecurity) {
                  console.log('Navigation change detected:', arguments[2]);
                }
                return originalPushState.apply(history, arguments);
              };
              
              // Monitor for hash changes
              window.addEventListener('hashchange', function(event) {
                if (window.navigationSecurity && event.newURL.includes('javascript:')) {
                  window.navigationSecurity.reportViolation({
                    type: 'xss',
                    message: 'JavaScript protocol in hash change',
                    timestamp: Date.now(),
                    severity: 'critical'
                  });
                  event.preventDefault();
                }
              });
            })();
          `
        }}
      />
    </>
  );
};

export default NavigationSecurity;
