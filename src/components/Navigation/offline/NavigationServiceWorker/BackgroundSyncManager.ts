/**
 * Background Sync Manager - Service Worker Background Sync
 * 
 * Handles background synchronization for navigation analytics
 * and offline data sync operations.
 * 
 * @module BackgroundSyncManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { OfflineConfig } from './types';

export class BackgroundSyncManager {
  private config: OfflineConfig;
  private registration: ServiceWorkerRegistration | null = null;

  constructor(config: OfflineConfig) {
    this.config = config;
  }

  /**
   * Set service worker registration
   */
  setRegistration(registration: ServiceWorkerRegistration): void {
    this.registration = registration;
  }

  /**
   * Setup background sync for analytics
   */
  async setupBackgroundSync(): Promise<void> {
    if (!this.registration) {
      console.warn('Service Worker registration not available');
      return;
    }

    if (!this.config.enableBackgroundSync) {
      console.log('Background sync disabled in configuration');
      return;
    }

    try {
      // Check if background sync is supported
      if ('sync' in this.registration) {
        await (this.registration as any).sync.register('navigation-analytics-sync');
        console.log('Background sync registered for navigation analytics');
      } else {
        console.warn('Background Sync not supported in this browser');
      }
    } catch (error) {
      console.error('Failed to register background sync:', error);
    }
  }

  /**
   * Generate background sync event handlers for service worker script
   */
  generateSyncHandlers(): string {
    return `
// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'navigation-analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    console.log('Navigation SW: Syncing analytics');
    
    // Get queued analytics events from IndexedDB
    const events = await getQueuedAnalyticsEvents();
    
    if (events.length === 0) {
      console.log('No analytics events to sync');
      return;
    }

    // Send events to analytics endpoint
    for (const event of events) {
      try {
        const response = await fetch('/api/analytics/navigation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event)
        });

        if (response.ok) {
          await markEventAsSynced(event.id);
          console.log('Analytics event synced:', event.name);
        } else {
          console.error('Failed to sync analytics event:', event.name);
        }
      } catch (syncError) {
        console.error('Error syncing individual event:', syncError);
      }
    }

    // Clean up synced events
    await cleanupSyncedEvents();
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getQueuedAnalyticsEvents() {
  // In a real implementation, this would use IndexedDB
  // For now, return empty array as placeholder
  return [];
}

async function markEventAsSynced(eventId) {
  // Mark event as synced in IndexedDB
  console.log('Marking event as synced:', eventId);
}

async function cleanupSyncedEvents() {
  // Remove synced events from IndexedDB
  console.log('Cleaning up synced events');
}`.trim();
  }

  /**
   * Check if background sync is supported
   */
  isBackgroundSyncSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      this.registration !== null &&
      'sync' in this.registration
    );
  }

  /**
   * Manually trigger sync (for testing)
   */
  async triggerSync(): Promise<boolean> {
    if (!this.isBackgroundSyncSupported()) {
      console.warn('Background sync not supported');
      return false;
    }

    try {
      await (this.registration as any).sync.register('navigation-analytics-sync');
      console.log('Manual sync triggered');
      return true;
    } catch (error) {
      console.error('Failed to trigger manual sync:', error);
      return false;
    }
  }

  /**
   * Get sync status
   */
  getSyncStatus(): {
    supported: boolean;
    enabled: boolean;
    registered: boolean;
  } {
    return {
      supported: this.isBackgroundSyncSupported(),
      enabled: this.config.enableBackgroundSync,
      registered: this.registration !== null
    };
  }
}

export default BackgroundSyncManager;
