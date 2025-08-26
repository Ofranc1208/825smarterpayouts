/**
 * Resource Timing Tracker
 * 
 * Handles resource performance monitoring using the Resource Timing API.
 * Tracks loading times for scripts, stylesheets, images, and other assets.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface ResourceTiming {
  name: string;
  type: string;
  duration: number;
  size: number;
  startTime: number;
  status: 'fast' | 'slow' | 'very-slow';
}

export class ResourceTimingTracker {
  private isInitialized = false;
  private slowResourceThreshold = 1000; // 1 second
  private verySlowResourceThreshold = 3000; // 3 seconds

  /**
   * Initialize resource timing tracking
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.observeResourceEntries();
    this.isInitialized = true;
    console.log('✅ Resource timing tracking initialized');
  }

  /**
   * Get all resource performance data
   */
  getResourcePerformance(): PerformanceResourceTiming[] {
    if (typeof window === 'undefined' || !window.performance) return [];
    
    return window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  }

  /**
   * Get analyzed resource timings with categorization
   */
  getAnalyzedResources(): ResourceTiming[] {
    const resources = this.getResourcePerformance();
    
    return resources.map(resource => ({
      name: this.getResourceName(resource.name),
      type: this.getResourceType(resource.name),
      duration: Math.round(resource.duration),
      size: resource.transferSize || 0,
      startTime: Math.round(resource.startTime),
      status: this.getResourceStatus(resource.duration)
    }));
  }

  /**
   * Get slow resources (above threshold)
   */
  getSlowResources(): ResourceTiming[] {
    return this.getAnalyzedResources().filter(resource => 
      resource.status === 'slow' || resource.status === 'very-slow'
    );
  }

  /**
   * Get resource performance summary
   */
  getResourceSummary(): {
    totalResources: number;
    totalSize: number;
    totalDuration: number;
    slowResources: number;
    averageDuration: number;
    largestResource: ResourceTiming | null;
    slowestResource: ResourceTiming | null;
  } {
    const resources = this.getAnalyzedResources();
    
    if (resources.length === 0) {
      return {
        totalResources: 0,
        totalSize: 0,
        totalDuration: 0,
        slowResources: 0,
        averageDuration: 0,
        largestResource: null,
        slowestResource: null
      };
    }

    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const totalDuration = resources.reduce((sum, r) => sum + r.duration, 0);
    const slowResources = resources.filter(r => r.status !== 'fast').length;
    
    const largestResource = resources.reduce((largest, current) => 
      current.size > largest.size ? current : largest
    );
    
    const slowestResource = resources.reduce((slowest, current) => 
      current.duration > slowest.duration ? current : slowest
    );

    return {
      totalResources: resources.length,
      totalSize,
      totalDuration,
      slowResources,
      averageDuration: Math.round(totalDuration / resources.length),
      largestResource,
      slowestResource
    };
  }

  /**
   * Get resources by type
   */
  getResourcesByType(): Record<string, ResourceTiming[]> {
    const resources = this.getAnalyzedResources();
    
    return resources.reduce((acc, resource) => {
      if (!acc[resource.type]) acc[resource.type] = [];
      acc[resource.type].push(resource);
      return acc;
    }, {} as Record<string, ResourceTiming[]>);
  }

  /**
   * Clear resource timing data
   */
  clearResourceTimings(): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearResourceTimings();
    }
  }

  // Private methods
  private observeResourceEntries(): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.duration > this.slowResourceThreshold) {
            console.warn('Slow resource detected:', {
              name: this.getResourceName(entry.name),
              duration: Math.round(entry.duration) + 'ms',
              type: this.getResourceType(entry.name)
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource Performance Observer not supported:', error);
    }
  }

  private getResourceName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.split('/').pop() || pathname;
    } catch {
      return url;
    }
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    const typeMap: Record<string, string> = {
      'js': 'script',
      'css': 'stylesheet',
      'png': 'image',
      'jpg': 'image',
      'jpeg': 'image',
      'gif': 'image',
      'svg': 'image',
      'webp': 'image',
      'woff': 'font',
      'woff2': 'font',
      'ttf': 'font',
      'eot': 'font',
      'json': 'xhr',
      'xml': 'xhr'
    };

    return typeMap[extension || ''] || 'other';
  }

  private getResourceStatus(duration: number): 'fast' | 'slow' | 'very-slow' {
    if (duration >= this.verySlowResourceThreshold) return 'very-slow';
    if (duration >= this.slowResourceThreshold) return 'slow';
    return 'fast';
  }
}

// Export singleton instance
export const resourceTimingTracker = new ResourceTimingTracker();
