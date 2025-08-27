/**
 * Vercel Analytics Manager
 * 
 * Manages Vercel Analytics integration and event tracking
 * 
 * @module useVercelAnalyticsManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef } from 'react';
import { track } from '@vercel/analytics';
import type { VercelAnalyticsEvent } from '../../types';

interface VercelAnalyticsConfig {
  enableVercelAnalytics: boolean;
  trackingPrefix: string;
  debug: boolean;
}

/**
 * Hook for managing Vercel Analytics functionality
 */
export function useVercelAnalyticsManager({ 
  enableVercelAnalytics, 
  trackingPrefix, 
  debug 
}: VercelAnalyticsConfig) {
  const sessionId = useRef<string>(
    typeof window !== 'undefined' 
      ? `nav_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : 'ssr_session'
  );

  /**
   * Debug logging for Vercel Analytics events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Analytics - Vercel] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Send event to Vercel Analytics
   */
  const sendToVercel = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    if (!enableVercelAnalytics || typeof window === 'undefined') return;

    try {
      const vercelEvent: VercelAnalyticsEvent = {
        name: `${trackingPrefix}_${eventName}`,
        properties: {
          ...properties,
          sessionId: sessionId.current,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          referrer: document.referrer
        }
      };

      track(vercelEvent.name, vercelEvent.properties);
      debugLog('Vercel Analytics Event', vercelEvent);
    } catch (error) {
      console.error('Failed to send Vercel Analytics event:', error);
    }
  }, [enableVercelAnalytics, trackingPrefix, debugLog]);

  /**
   * Get current session ID
   */
  const getSessionId = useCallback(() => {
    return sessionId.current;
  }, []);

  /**
   * Track custom Vercel event
   */
  const trackCustomVercelEvent = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    sendToVercel(eventName, properties);
  }, [sendToVercel]);

  /**
   * Get Vercel Analytics configuration
   */
  const getVercelConfig = useCallback(() => {
    return {
      enabled: enableVercelAnalytics,
      trackingPrefix,
      sessionId: sessionId.current,
      debug
    };
  }, [enableVercelAnalytics, trackingPrefix, debug]);

  return {
    sendToVercel,
    getSessionId,
    trackCustomVercelEvent,
    getVercelConfig
  };
}
