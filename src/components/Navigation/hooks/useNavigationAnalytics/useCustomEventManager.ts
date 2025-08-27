/**
 * Custom Event Manager
 * 
 * Manages custom event storage and queue management
 * 
 * @module useCustomEventManager
 * @author SmarterPayouts Team
 * @since 2024
 */

import { useCallback, useRef } from 'react';
import type { NavigationAnalyticsEvent } from '../../types';

interface CustomEventConfig {
  enableCustomEvents: boolean;
  debug: boolean;
}

/**
 * Hook for managing custom event functionality
 */
export function useCustomEventManager({ enableCustomEvents, debug }: CustomEventConfig) {
  const eventQueue = useRef<NavigationAnalyticsEvent[]>([]);
  const sessionId = useRef<string>(
    typeof window !== 'undefined' 
      ? `nav_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : 'ssr_session'
  );

  /**
   * Debug logging for custom events
   */
  const debugLog = useCallback((event: string, data: any) => {
    if (debug) {
      console.log(`[Navigation Analytics - Custom Events] ${event}:`, data);
    }
  }, [debug]);

  /**
   * Store custom event
   */
  const storeEvent = useCallback((event: NavigationAnalyticsEvent) => {
    if (!enableCustomEvents) return;

    eventQueue.current.push(event);
    
    // Keep only last 100 events to prevent memory leaks
    if (eventQueue.current.length > 100) {
      eventQueue.current = eventQueue.current.slice(-100);
    }

    debugLog('Custom Event Stored', event);
  }, [enableCustomEvents, debugLog]);

  /**
   * Get event queue
   */
  const getEventQueue = useCallback(() => {
    return eventQueue.current.slice(); // Return a copy
  }, []);

  /**
   * Clear event queue
   */
  const clearEventQueue = useCallback(() => {
    eventQueue.current = [];
    debugLog('Event Queue Cleared', {});
  }, [debugLog]);

  /**
   * Get session ID
   */
  const getSessionId = useCallback(() => {
    return sessionId.current;
  }, []);

  /**
   * Get events by type
   */
  const getEventsByType = useCallback((eventType: NavigationAnalyticsEvent['eventType']) => {
    return eventQueue.current.filter(event => event.eventType === eventType);
  }, []);

  /**
   * Get events by element type
   */
  const getEventsByElementType = useCallback((elementType: NavigationAnalyticsEvent['elementType']) => {
    return eventQueue.current.filter(event => event.elementType === elementType);
  }, []);

  /**
   * Get recent events (last N minutes)
   */
  const getRecentEvents = useCallback((minutes: number = 60) => {
    const cutoffTime = Date.now() - (minutes * 60 * 1000);
    return eventQueue.current.filter(event => event.timestamp > cutoffTime);
  }, []);

  /**
   * Get event statistics
   */
  const getEventStats = useCallback(() => {
    const events = eventQueue.current;
    const totalEvents = events.length;
    
    const eventTypeStats = events.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const elementTypeStats = events.reduce((acc, event) => {
      acc[event.elementType] = (acc[event.elementType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEvents,
      eventTypeStats,
      elementTypeStats,
      sessionId: sessionId.current,
      queueSize: events.length,
      oldestEvent: events.length > 0 ? events[0].timestamp : null,
      newestEvent: events.length > 0 ? events[events.length - 1].timestamp : null
    };
  }, []);

  return {
    storeEvent,
    getEventQueue,
    clearEventQueue,
    getSessionId,
    getEventsByType,
    getEventsByElementType,
    getRecentEvents,
    getEventStats
  };
}
