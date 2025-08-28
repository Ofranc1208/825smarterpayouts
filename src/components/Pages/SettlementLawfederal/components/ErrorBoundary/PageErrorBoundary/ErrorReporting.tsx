'use client';

/**
 * Error Reporting Module
 * Following enterprise patterns - focused on error reporting functionality only
 */
export class ErrorReporting {
  static async reportError(error: Error): Promise<void> {
    if (!error) return;

    // Create comprehensive error report
    const errorReport = {
      // Error details
      message: error.message,
      name: error.name,
      stack: error.stack,
      
      // Page context
      page: 'settlement-law-federal',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      timestamp: new Date().toISOString(),
      
      // Browser context
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      language: typeof window !== 'undefined' ? navigator.language : 'unknown',
      platform: typeof window !== 'undefined' ? navigator.platform : 'unknown',
      
      // Viewport information
      viewport: typeof window !== 'undefined' ? {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      } : null,
      
      // Performance context
      performance: typeof window !== 'undefined' && window.performance ? {
        navigation: window.performance.getEntriesByType('navigation')[0],
        memory: (window.performance as any).memory ? {
          usedJSHeapSize: (window.performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (window.performance as any).memory.totalJSHeapSize
        } : null
      } : null,
      
      // Local storage (non-sensitive data only)
      hasLocalStorage: typeof window !== 'undefined' && window.localStorage ? true : false,
      
      // Connection information
      connection: typeof window !== 'undefined' && (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink
      } : null
    };

    try {
      // Try to copy to clipboard first (most user-friendly)
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2));
        ErrorReporting.showSuccessMessage('Error details copied to clipboard. Please contact support with this information.');
        return;
      }
    } catch (clipboardError) {
      console.warn('Clipboard access failed:', clipboardError);
    }

    // Fallback: Log to console and show alert
    console.log('Settlement Law Federal Error Report:', errorReport);
    ErrorReporting.showSuccessMessage('Error details logged to browser console. Please contact support and mention this error.');
  }

  static async sendErrorToSupport(error: Error): Promise<void> {
    // This would integrate with your support system
    // For now, we'll prepare the data for manual reporting
    
    const errorReport = await ErrorReporting.createDetailedReport(error);
    
    // Create mailto link for easy error reporting
    const subject = encodeURIComponent('Settlement Law Federal Page Error Report');
    const body = encodeURIComponent(`
Error Report for Settlement Law Federal Page

Error: ${error.message}
Time: ${new Date().toISOString()}
Page: ${window.location.href}

Technical Details:
${JSON.stringify(errorReport, null, 2)}

Please describe what you were doing when this error occurred:
[Please add your description here]
    `);
    
    const mailtoLink = `mailto:support@smarterpayouts.com?subject=${subject}&body=${body}`;
    
    // Open email client
    if (typeof window !== 'undefined') {
      window.location.href = mailtoLink;
    }
  }

  private static async createDetailedReport(error: Error) {
    const report = {
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack
      },
      context: {
        page: 'settlement-law-federal',
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : 'unknown'
      },
      browser: typeof window !== 'undefined' ? {
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      } : null,
      screen: typeof window !== 'undefined' ? {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      } : null
    };

    return report;
  }

  private static showSuccessMessage(message: string): void {
    if (typeof window !== 'undefined') {
      // Create a temporary success notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
      `;
      
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Add animation styles
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      // Remove after 5 seconds
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      }, 5000);
    } else {
      // Fallback for non-browser environments
      console.log(message);
    }
  }
}
