/**
 * SessionManager - Handles session ID generation and URL synchronization
 * 
 * Separated from AppProviders for better organization and testability.
 * Uses the orchestra pattern for clean separation of concerns.
 */

export class SessionManager {
  private static instance: SessionManager | null = null;

  // Singleton pattern for consistent session management
  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  /**
   * Generate a unique session ID
   */
  generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get session ID from URL parameters
   */
  getSessionIdFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('sessionId');
  }

  /**
   * Update URL with session ID without causing a reload
   */
  updateUrlWithSessionId(sessionId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('sessionId', sessionId);
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      console.error('[SessionManager] Failed to update URL:', error);
    }
  }

  /**
   * Initialize session ID - either from URL or generate new one
   */
  initializeSessionId(): string {
    const existingSessionId = this.getSessionIdFromUrl();
    
    if (existingSessionId) {
      return existingSessionId;
    }
    
    const newSessionId = this.generateSessionId();
    this.updateUrlWithSessionId(newSessionId);
    
    return newSessionId;
  }
}

// Export singleton instance
export const sessionManager = SessionManager.getInstance();
