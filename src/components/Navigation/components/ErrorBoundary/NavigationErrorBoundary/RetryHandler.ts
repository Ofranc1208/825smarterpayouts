/**
 * Retry Handler
 * 
 * Manages retry logic for navigation error boundary with exponential backoff
 * 
 * @module RetryHandler
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  enableExponentialBackoff?: boolean;
}

export interface RetryState {
  retryCount: number;
  isRetrying: boolean;
  nextRetryDelay: number;
}

/**
 * Retry Handler Class
 */
export class RetryHandler {
  private timeouts: NodeJS.Timeout[] = [];
  private options: Required<RetryOptions>;

  constructor(options: RetryOptions = {}) {
    this.options = {
      maxRetries: 3,
      baseDelay: 1000,
      enableExponentialBackoff: true,
      ...options
    };
  }

  /**
   * Check if retry is possible
   */
  canRetry(retryCount: number): boolean {
    return retryCount < this.options.maxRetries;
  }

  /**
   * Calculate delay for next retry
   */
  calculateDelay(retryCount: number): number {
    if (!this.options.enableExponentialBackoff) {
      return this.options.baseDelay;
    }

    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.pow(2, retryCount) * this.options.baseDelay;
  }

  /**
   * Execute retry with delay
   */
  executeRetry(
    retryCount: number,
    onRetry: () => void,
    onRetryScheduled?: (delay: number) => void
  ): boolean {
    if (!this.canRetry(retryCount)) {
      console.warn(`Maximum retry attempts (${this.options.maxRetries}) reached`);
      return false;
    }

    // Clear previous timeouts
    this.clearTimeouts();

    const delay = this.calculateDelay(retryCount);

    // Notify that retry is scheduled
    if (onRetryScheduled) {
      onRetryScheduled(delay);
    }

    const timeout = setTimeout(() => {
      onRetry();
    }, delay);

    this.timeouts.push(timeout);
    return true;
  }

  /**
   * Clear all pending timeouts
   */
  clearTimeouts(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }

  /**
   * Get retry state information
   */
  getRetryState(retryCount: number): RetryState {
    return {
      retryCount,
      isRetrying: this.timeouts.length > 0,
      nextRetryDelay: this.calculateDelay(retryCount)
    };
  }

  /**
   * Get remaining retry attempts
   */
  getRemainingRetries(retryCount: number): number {
    return Math.max(0, this.options.maxRetries - retryCount);
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.clearTimeouts();
  }
}

export default RetryHandler;
