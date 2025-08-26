/**
 * Service Coordinator
 * 
 * Coordinates initialization and communication between all analytics services.
 * Manages service lifecycle, health monitoring, and error handling.
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */

import { webVitalsService } from '../../webVitals';
import { visitorTrackingService } from '../../visitor';
import { performanceService } from '../../performance';
import { systemHealthService } from '../../system';
import { AnalyticsConfig } from '../../types';

export class ServiceCoordinator {
  private isInitialized = false;
  private services = {
    webVitals: webVitalsService,
    visitor: visitorTrackingService,
    performance: performanceService,
    systemHealth: systemHealthService
  };

  /**
   * Initialize all services in the correct order
   */
  async initialize(config: AnalyticsConfig): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (config.enableConsoleLogging) {
        console.log('🚀 Initializing analytics services...');
      }

      // Initialize services in parallel where possible
      const initPromises = [
        this.services.webVitals.initialize(),
        this.services.performance.initialize()
      ];

      await Promise.all(initPromises);

      // Initialize visitor tracking (synchronous)
      this.services.visitor.initialize();

      this.isInitialized = true;

      if (config.enableConsoleLogging) {
        console.log('✅ All analytics services initialized successfully');
      }
    } catch (error) {
      console.error('❌ Failed to initialize analytics services:', error);
      throw error;
    }
  }

  /**
   * Get service health status
   */
  getServiceStatus(): Record<string, boolean> {
    return {
      webVitals: this.services.webVitals !== undefined,
      visitor: this.services.visitor !== undefined,
      performance: this.services.performance !== undefined,
      systemHealth: this.services.systemHealth !== undefined,
      coordinator: this.isInitialized
    };
  }

  /**
   * Check if all services are ready
   */
  areServicesReady(): boolean {
    const status = this.getServiceStatus();
    return Object.values(status).every(ready => ready);
  }

  /**
   * Get service initialization status
   */
  getInitializationStatus(): {
    isInitialized: boolean;
    services: Record<string, boolean>;
    readyCount: number;
    totalCount: number;
  } {
    const services = this.getServiceStatus();
    const readyServices = Object.values(services).filter(ready => ready);
    
    return {
      isInitialized: this.isInitialized,
      services,
      readyCount: readyServices.length,
      totalCount: Object.keys(services).length
    };
  }

  /**
   * Restart all services
   */
  async restart(config: AnalyticsConfig): Promise<void> {
    this.isInitialized = false;
    await this.initialize(config);
  }

  /**
   * Clear all service data
   */
  clearAllData(): void {
    try {
      this.services.webVitals.clearData();
      this.services.visitor.clearData();
      
      console.log('🧹 All service data cleared');
    } catch (error) {
      console.error('Error clearing service data:', error);
    }
  }

  /**
   * Get service instances for direct access
   */
  getServices() {
    return { ...this.services };
  }

  /**
   * Track web vital across services
   */
  trackWebVital(metric: any): void {
    try {
      this.services.webVitals.trackWebVital(metric);
    } catch (error) {
      console.error('Error tracking web vital:', error);
    }
  }

  /**
   * Track page view across services
   */
  trackPageView(data: any): void {
    try {
      this.services.visitor.trackPageView(data);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  /**
   * Perform health check on all services
   */
  async performHealthCheck(): Promise<{
    overall: 'healthy' | 'degraded' | 'critical';
    services: Record<string, 'healthy' | 'error'>;
    errors: string[];
  }> {
    const serviceHealth: Record<string, 'healthy' | 'error'> = {};
    const errors: string[] = [];

    // Check each service
    try {
      // Web Vitals service check
      serviceHealth.webVitals = this.services.webVitals ? 'healthy' : 'error';
      
      // Visitor service check  
      serviceHealth.visitor = this.services.visitor ? 'healthy' : 'error';
      
      // Performance service check
      serviceHealth.performance = this.services.performance ? 'healthy' : 'error';
      
      // System health service check
      const systemHealth = await this.services.systemHealth.performHealthChecks();
      serviceHealth.systemHealth = systemHealth ? 'healthy' : 'error';
      
    } catch (error) {
      errors.push(`Health check failed: ${error}`);
    }

    // Determine overall health
    const healthyServices = Object.values(serviceHealth).filter(status => status === 'healthy');
    const totalServices = Object.keys(serviceHealth).length;
    
    let overall: 'healthy' | 'degraded' | 'critical';
    if (healthyServices.length === totalServices) {
      overall = 'healthy';
    } else if (healthyServices.length >= totalServices / 2) {
      overall = 'degraded';
    } else {
      overall = 'critical';
    }

    return { overall, services: serviceHealth, errors };
  }
}

// Export singleton instance
export const serviceCoordinator = new ServiceCoordinator();
