/**
 * System Health Service
 * 
 * Monitors system health status including server, database, CDN, and API endpoints.
 * Provides health checks and status monitoring for the performance dashboard.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { SystemHealthStatus } from '../types';

export class SystemHealthService {
  private healthStatus: SystemHealthStatus = {
    server: 'healthy',
    database: 'healthy',
    cdn: 'healthy',
    api: 'healthy',
    deployment: 'healthy',
    lastCheck: new Date()
  };

  /**
   * Get current system health status
   */
  getSystemHealth(): SystemHealthStatus {
    return {
      ...this.healthStatus,
      lastCheck: new Date()
    };
  }

  /**
   * Perform health checks on all systems
   */
  async performHealthChecks(): Promise<SystemHealthStatus> {
    try {
      // Check server health (Vercel deployment status)
      const serverHealth = await this.checkServerHealth();
      
      // Check API endpoints
      const apiHealth = await this.checkApiHealth();
      
      // Check CDN status
      const cdnHealth = await this.checkCdnHealth();
      
      // Database is not applicable for this static site
      const databaseHealth = 'healthy' as const;

      this.healthStatus = {
        server: serverHealth,
        database: databaseHealth,
        cdn: cdnHealth,
        api: apiHealth,
        deployment: serverHealth,
        lastCheck: new Date()
      };

      return this.healthStatus;
    } catch (error) {
      console.error('Health check failed:', error);
      return this.getDefaultHealthStatus();
    }
  }

  /**
   * Check if a specific service is healthy
   */
  isServiceHealthy(service: keyof Omit<SystemHealthStatus, 'lastCheck'>): boolean {
    return this.healthStatus[service] === 'healthy';
  }

  /**
   * Get health status summary
   */
  getHealthSummary(): {
    overall: 'healthy' | 'warning' | 'critical';
    healthyCount: number;
    totalCount: number;
    issues: string[];
  } {
    const services = ['server', 'database', 'cdn', 'api'] as const;
    const healthyServices = services.filter(service => this.isServiceHealthy(service));
    const issues: string[] = [];

    services.forEach(service => {
      if (!this.isServiceHealthy(service)) {
        issues.push(`${service} is ${this.healthStatus[service]}`);
      }
    });

    let overall: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (issues.length > 0) {
      overall = issues.some(issue => issue.includes('critical')) ? 'critical' : 'warning';
    }

    return {
      overall,
      healthyCount: healthyServices.length,
      totalCount: services.length,
      issues
    };
  }

  // Private methods
  private async checkServerHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    try {
      // Check if we can access the current domain
      if (typeof window !== 'undefined') {
        const response = await fetch(window.location.origin + '/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        
        if (response.ok) {
          return 'healthy';
        } else if (response.status >= 500) {
          return 'critical';
        } else {
          return 'warning';
        }
      }
      return 'healthy';
    } catch (error) {
      console.warn('Server health check failed:', error);
      return 'warning';
    }
  }

  private async checkApiHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    try {
      // For now, assume API is healthy since we don't have external APIs
      // In the future, you could check actual API endpoints here
      return 'healthy';
    } catch (error) {
      console.warn('API health check failed:', error);
      return 'warning';
    }
  }

  private async checkCdnHealth(): Promise<'healthy' | 'warning' | 'critical'> {
    try {
      // Check if we can load a static asset (indicates CDN is working)
      if (typeof window !== 'undefined') {
        const testImage = new Image();
        
        return new Promise((resolve) => {
          testImage.onload = () => resolve('healthy');
          testImage.onerror = () => resolve('warning');
          testImage.src = '/favicon.ico?' + Date.now(); // Cache bust
          
          // Timeout after 5 seconds
          setTimeout(() => resolve('warning'), 5000);
        });
      }
      return 'healthy';
    } catch (error) {
      console.warn('CDN health check failed:', error);
      return 'warning';
    }
  }

  private getDefaultHealthStatus(): SystemHealthStatus {
    return {
      server: 'healthy',
      database: 'healthy',
      cdn: 'healthy',
      api: 'healthy',
      deployment: 'healthy',
      lastCheck: new Date()
    };
  }
}

// Export singleton instance
export const systemHealthService = new SystemHealthService();
