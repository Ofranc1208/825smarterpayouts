/**
 * Offline UI Manager - User Interface for Offline States
 * 
 * Manages the user interface elements that indicate offline status
 * and provide feedback during offline navigation scenarios.
 * 
 * @module OfflineUIManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { OfflineConfig, OfflineIndicatorConfig } from './types';

export class OfflineUIManager {
  private config: OfflineConfig;
  private indicatorConfig: OfflineIndicatorConfig;
  private currentIndicator: HTMLElement | null = null;
  private isOnline: boolean = true;

  constructor(config: OfflineConfig, indicatorConfig: Partial<OfflineIndicatorConfig> = {}) {
    this.config = config;
    this.indicatorConfig = {
      position: 'top',
      autoHide: true,
      hideDelay: 5000,
      ...indicatorConfig
    };

    this.setupOnlineStatusListeners();
  }

  /**
   * Setup online/offline status listeners
   */
  private setupOnlineStatusListeners(): void {
    if (typeof window === 'undefined') return;

    this.isOnline = navigator.onLine;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.hideOfflineIndicator();
      console.log('Navigation: Back online');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showOfflineIndicator('📡 Navigation running in offline mode');
      console.log('Navigation: Gone offline');
    });
  }

  /**
   * Show offline indicator to user
   */
  showOfflineIndicator(message: string = '📡 Navigation running in offline mode'): void {
    if (typeof document === 'undefined') return;

    // Remove existing indicator if present
    this.hideOfflineIndicator();

    // Create new indicator
    this.currentIndicator = document.createElement('div');
    this.currentIndicator.id = 'navigation-offline-indicator';
    this.currentIndicator.setAttribute('role', 'alert');
    this.currentIndicator.setAttribute('aria-live', 'polite');
    
    // Apply styles
    this.applyIndicatorStyles(this.currentIndicator, message);
    
    // Add to DOM
    document.body.appendChild(this.currentIndicator);

    // Auto-hide if configured
    if (this.indicatorConfig.autoHide && this.isOnline) {
      setTimeout(() => {
        this.hideOfflineIndicator();
      }, this.indicatorConfig.hideDelay);
    }

    console.log('Offline indicator shown:', message);
  }

  /**
   * Apply styles to offline indicator
   */
  private applyIndicatorStyles(element: HTMLElement, message: string): void {
    const baseStyles = `
      position: fixed;
      ${this.indicatorConfig.position}: 0;
      left: 50%;
      transform: translateX(-50%);
      background: ${this.isOnline ? '#10b981' : '#f59e0b'};
      color: white;
      padding: 12px 24px;
      border-radius: ${this.indicatorConfig.position === 'top' ? '0 0 8px 8px' : '8px 8px 0 0'};
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease-in-out;
      max-width: 90vw;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    element.style.cssText = this.indicatorConfig.customStyles || baseStyles;
    element.textContent = message;

    // Add animation
    element.style.opacity = '0';
    element.style.transform = `translateX(-50%) translateY(${this.indicatorConfig.position === 'top' ? '-100%' : '100%'})`;
    
    // Animate in
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(-50%) translateY(0)';
    });
  }

  /**
   * Hide offline indicator
   */
  hideOfflineIndicator(): void {
    if (this.currentIndicator) {
      // Animate out
      this.currentIndicator.style.opacity = '0';
      this.currentIndicator.style.transform = `translateX(-50%) translateY(${this.indicatorConfig.position === 'top' ? '-100%' : '100%'})`;
      
      // Remove after animation
      setTimeout(() => {
        if (this.currentIndicator && this.currentIndicator.parentNode) {
          this.currentIndicator.parentNode.removeChild(this.currentIndicator);
        }
        this.currentIndicator = null;
      }, 300);

      console.log('Offline indicator hidden');
    }
  }

  /**
   * Show connection restored message
   */
  showConnectionRestored(): void {
    this.showOfflineIndicator('✅ Connection restored - Navigation back online');
  }

  /**
   * Show cache fallback message
   */
  showCacheFallback(resource: string): void {
    this.showOfflineIndicator(`📦 Loading ${resource} from cache`);
  }

  /**
   * Show sync in progress message
   */
  showSyncInProgress(): void {
    this.showOfflineIndicator('🔄 Syncing navigation data...');
  }

  /**
   * Show sync completed message
   */
  showSyncCompleted(): void {
    this.showOfflineIndicator('✅ Navigation data synced successfully');
  }

  /**
   * Handle offline fallback scenarios
   */
  handleOfflineFallback(data: any): void {
    console.log('Navigation offline fallback activated:', data);
    
    if (data.resource) {
      this.showCacheFallback(data.resource);
    } else {
      this.showOfflineIndicator();
    }
  }

  /**
   * Create offline status badge for navigation
   */
  createOfflineStatusBadge(): HTMLElement | null {
    if (typeof document === 'undefined') return null;

    const badge = document.createElement('div');
    badge.id = 'navigation-offline-badge';
    badge.setAttribute('role', 'status');
    badge.setAttribute('aria-label', this.isOnline ? 'Online' : 'Offline');
    
    badge.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${this.isOnline ? '#10b981' : '#ef4444'};
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 9999;
      transition: background-color 0.3s ease;
    `;

    // Update badge when online status changes
    const updateBadge = () => {
      badge.style.background = this.isOnline ? '#10b981' : '#ef4444';
      badge.setAttribute('aria-label', this.isOnline ? 'Online' : 'Offline');
    };

    window.addEventListener('online', updateBadge);
    window.addEventListener('offline', updateBadge);

    return badge;
  }

  /**
   * Get current online status
   */
  isCurrentlyOnline(): boolean {
    return this.isOnline;
  }

  /**
   * Update indicator configuration
   */
  updateConfig(newConfig: Partial<OfflineIndicatorConfig>): void {
    this.indicatorConfig = {
      ...this.indicatorConfig,
      ...newConfig
    };
  }

  /**
   * Show custom message
   */
  showCustomMessage(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    const colors = {
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };

    // Temporarily override styles for custom message
    const originalStyles = this.indicatorConfig.customStyles;
    this.indicatorConfig.customStyles = `
      position: fixed;
      ${this.indicatorConfig.position}: 0;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors[type]};
      color: white;
      padding: 12px 24px;
      border-radius: ${this.indicatorConfig.position === 'top' ? '0 0 8px 8px' : '8px 8px 0 0'};
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease-in-out;
      max-width: 90vw;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    this.showOfflineIndicator(`${icons[type]} ${message}`);

    // Restore original styles
    this.indicatorConfig.customStyles = originalStyles;
  }

  /**
   * Cleanup UI manager
   */
  cleanup(): void {
    this.hideOfflineIndicator();
    
    // Remove status badge if it exists
    const badge = document.getElementById('navigation-offline-badge');
    if (badge && badge.parentNode) {
      badge.parentNode.removeChild(badge);
    }
  }
}

export default OfflineUIManager;
