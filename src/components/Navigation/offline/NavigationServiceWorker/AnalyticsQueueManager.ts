/**
 * Analytics Queue Manager - Offline Analytics Event Queuing
 * 
 * Manages queuing and storage of analytics events for background sync
 * when the application is offline or sync is delayed.
 * 
 * @module AnalyticsQueueManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { OfflineConfig, AnalyticsEvent } from './types';

export class AnalyticsQueueManager {
  private config: OfflineConfig;
  private queueKey = 'navigation-analytics-queue';

  constructor(config: OfflineConfig) {
    this.config = config;
  }

  /**
   * Queue analytics event for background sync
   */
  queueAnalyticsEvent(eventName: string, data: any): void {
    if (!this.config.enableBackgroundSync || !this.config.enableAnalytics) {
      return;
    }

    const event: AnalyticsEvent = {
      name: eventName,
      data,
      timestamp: Date.now(),
      synced: false
    };

    try {
      // In a production environment, this should use IndexedDB
      // For now, using localStorage as a fallback
      this.storeEventInLocalStorage(event);
      
      console.log('Analytics event queued:', eventName);
    } catch (error) {
      console.error('Failed to queue analytics event:', error);
    }
  }

  /**
   * Store event in localStorage (fallback for IndexedDB)
   */
  private storeEventInLocalStorage(event: AnalyticsEvent): void {
    const eventKey = `${this.queueKey}-${event.timestamp}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(eventKey, JSON.stringify(event));
  }

  /**
   * Get all queued analytics events
   */
  getQueuedEvents(): AnalyticsEvent[] {
    const events: AnalyticsEvent[] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.queueKey)) {
          const eventData = localStorage.getItem(key);
          if (eventData) {
            const event = JSON.parse(eventData) as AnalyticsEvent;
            events.push(event);
          }
        }
      }
    } catch (error) {
      console.error('Failed to retrieve queued events:', error);
    }

    return events.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Get unsynced events only
   */
  getUnsyncedEvents(): AnalyticsEvent[] {
    return this.getQueuedEvents().filter(event => !event.synced);
  }

  /**
   * Mark event as synced
   */
  markEventAsSynced(timestamp: number): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.queueKey) && key.includes(timestamp.toString())) {
          const eventData = localStorage.getItem(key);
          if (eventData) {
            const event = JSON.parse(eventData) as AnalyticsEvent;
            event.synced = true;
            localStorage.setItem(key, JSON.stringify(event));
            console.log('Event marked as synced:', event.name);
            break;
          }
        }
      }
    } catch (error) {
      console.error('Failed to mark event as synced:', error);
    }
  }

  /**
   * Clean up synced events (older than 24 hours)
   */
  cleanupSyncedEvents(): void {
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.queueKey)) {
          const eventData = localStorage.getItem(key);
          if (eventData) {
            const event = JSON.parse(eventData) as AnalyticsEvent;
            if (event.synced && event.timestamp < cutoffTime) {
              keysToRemove.push(key);
            }
          }
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      if (keysToRemove.length > 0) {
        console.log(`Cleaned up ${keysToRemove.length} synced analytics events`);
      }
    } catch (error) {
      console.error('Failed to cleanup synced events:', error);
    }
  }

  /**
   * Clear all queued events (for testing/debugging)
   */
  clearAllEvents(): void {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.queueKey)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log(`Cleared ${keysToRemove.length} analytics events from queue`);
    } catch (error) {
      console.error('Failed to clear analytics queue:', error);
    }
  }

  /**
   * Get queue statistics
   */
  getQueueStats(): {
    totalEvents: number;
    unsyncedEvents: number;
    syncedEvents: number;
    oldestEvent: number | null;
    newestEvent: number | null;
  } {
    const events = this.getQueuedEvents();
    const unsyncedEvents = events.filter(e => !e.synced);
    const syncedEvents = events.filter(e => e.synced);

    return {
      totalEvents: events.length,
      unsyncedEvents: unsyncedEvents.length,
      syncedEvents: syncedEvents.length,
      oldestEvent: events.length > 0 ? events[0].timestamp : null,
      newestEvent: events.length > 0 ? events[events.length - 1].timestamp : null
    };
  }

  /**
   * Handle offline fallback analytics
   */
  handleOfflineFallback(resource: string): void {
    this.queueAnalyticsEvent('navigation_offline_fallback', {
      resource,
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    });
  }
}

export default AnalyticsQueueManager;
