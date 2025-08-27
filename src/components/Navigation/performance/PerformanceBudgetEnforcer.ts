/**
 * Performance Budget Enforcer
 * 
 * Automated performance budget monitoring and enforcement system
 * with real-time alerts and optimization recommendations.
 * 
 * @module PerformanceBudgetEnforcer
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import { track } from '@vercel/analytics';

export interface PerformanceBudget {
  metric: string;
  budget: number;
  unit: 'ms' | 'kb' | 'score' | 'count';
  severity: 'error' | 'warning' | 'info';
  description: string;
}

export interface BudgetViolation {
  metric: string;
  actual: number;
  budget: number;
  severity: 'error' | 'warning' | 'info';
  timestamp: number;
  recommendation: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface PerformanceReport {
  violations: BudgetViolation[];
  score: number;
  recommendations: string[];
  trends: Array<{ metric: string; trend: 'improving' | 'degrading' | 'stable' }>;
  lastCheck: number;
}

export interface BudgetConfig {
  enableRealTimeMonitoring: boolean;
  enableAlerts: boolean;
  enableAutoOptimization: boolean;
  checkInterval: number; // milliseconds
  enableAnalytics: boolean;
  alertThreshold: 'error' | 'warning' | 'info';
}

/**
 * Performance Budget Enforcer
 */
export class PerformanceBudgetEnforcer {
  private config: BudgetConfig;
  private budgets: PerformanceBudget[] = [];
  private violations: BudgetViolation[] = [];
  private metrics: Map<string, number[]> = new Map();
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<BudgetConfig> = {}) {
    this.config = {
      enableRealTimeMonitoring: true,
      enableAlerts: true,
      enableAutoOptimization: false,
      checkInterval: 30000, // 30 seconds
      enableAnalytics: true,
      alertThreshold: 'warning',
      ...config
    };

    this.initializeDefaultBudgets();
    this.initialize();
  }

  /**
   * Initialize performance budget enforcer
   */
  private initialize(): void {
    if (typeof window === 'undefined') return;

    // Start monitoring if enabled
    if (this.config.enableRealTimeMonitoring) {
      this.startMonitoring();
    }

    // Setup performance observer
    this.setupPerformanceObserver();

    console.log('Performance Budget Enforcer initialized');
  }

  /**
   * Initialize default performance budgets for navigation
   */
  private initializeDefaultBudgets(): void {
    this.budgets = [
      // Core Web Vitals
      {
        metric: 'LCP',
        budget: 2500,
        unit: 'ms',
        severity: 'error',
        description: 'Largest Contentful Paint should be under 2.5s'
      },
      {
        metric: 'FID',
        budget: 100,
        unit: 'ms',
        severity: 'error',
        description: 'First Input Delay should be under 100ms'
      },
      {
        metric: 'CLS',
        budget: 0.1,
        unit: 'score',
        severity: 'error',
        description: 'Cumulative Layout Shift should be under 0.1'
      },
      {
        metric: 'FCP',
        budget: 1800,
        unit: 'ms',
        severity: 'warning',
        description: 'First Contentful Paint should be under 1.8s'
      },
      {
        metric: 'TTFB',
        budget: 800,
        unit: 'ms',
        severity: 'warning',
        description: 'Time to First Byte should be under 800ms'
      },
      
      // Navigation-specific budgets
      {
        metric: 'navigation_render_time',
        budget: 100,
        unit: 'ms',
        severity: 'error',
        description: 'Navigation should render within 100ms'
      },
      {
        metric: 'dropdown_open_time',
        budget: 50,
        unit: 'ms',
        severity: 'warning',
        description: 'Dropdown should open within 50ms'
      },
      {
        metric: 'mobile_menu_toggle_time',
        budget: 50,
        unit: 'ms',
        severity: 'warning',
        description: 'Mobile menu should toggle within 50ms'
      },
      {
        metric: 'navigation_bundle_size',
        budget: 50,
        unit: 'kb',
        severity: 'error',
        description: 'Navigation bundle should be under 50KB'
      },
      {
        metric: 'navigation_memory_usage',
        budget: 25,
        unit: 'kb',
        severity: 'warning',
        description: 'Navigation memory usage should be under 25KB'
      },
      
      // Accessibility budgets
      {
        metric: 'accessibility_score',
        budget: 95,
        unit: 'score',
        severity: 'error',
        description: 'Accessibility score should be above 95'
      },
      
      // Error budgets
      {
        metric: 'error_rate',
        budget: 1,
        unit: 'count',
        severity: 'error',
        description: 'Error rate should be under 1%'
      }
    ];
  }

  /**
   * Setup performance observer for real-time metrics
   */
  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    // Observe Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric(entry.name, entry.value || entry.duration);
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    } catch (error) {
      console.warn('Failed to setup performance observer:', error);
    }
  }

  /**
   * Start real-time monitoring
   */
  private startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.checkBudgets();
    }, this.config.checkInterval);

    console.log('Performance budget monitoring started');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
  }

  /**
   * Record a performance metric
   */
  recordMetric(metric: string, value: number): void {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }

    const values = this.metrics.get(metric)!;
    values.push(value);

    // Keep only last 100 values
    if (values.length > 100) {
      values.splice(0, values.length - 100);
    }

    // Check budget immediately for critical metrics
    const budget = this.budgets.find(b => b.metric === metric);
    if (budget && budget.severity === 'error') {
      this.checkSingleBudget(budget);
    }
  }

  /**
   * Check all performance budgets
   */
  checkBudgets(): PerformanceReport {
    const violations: BudgetViolation[] = [];
    const recommendations: string[] = [];

    this.budgets.forEach(budget => {
      const violation = this.checkSingleBudget(budget);
      if (violation) {
        violations.push(violation);
      }
    });

    // Generate recommendations
    if (violations.length > 0) {
      recommendations.push(...this.generateRecommendations(violations));
    }

    // Calculate overall score
    const score = this.calculatePerformanceScore(violations);

    // Generate trends
    const trends = this.calculateTrends();

    const report: PerformanceReport = {
      violations,
      score,
      recommendations,
      trends,
      lastCheck: Date.now()
    };

    // Handle violations
    if (violations.length > 0) {
      this.handleViolations(violations);
    }

    // Track to analytics
    if (this.config.enableAnalytics) {
      track('navigation_performance_budget_check', {
        violations_count: violations.length,
        score,
        critical_violations: violations.filter(v => v.severity === 'error').length,
        timestamp: Date.now()
      });
    }

    return report;
  }

  /**
   * Check single budget
   */
  private checkSingleBudget(budget: PerformanceBudget): BudgetViolation | null {
    const values = this.metrics.get(budget.metric);
    if (!values || values.length === 0) return null;

    // Use latest value or average based on metric type
    const currentValue = budget.metric.includes('_time') || budget.metric.includes('_rate') ?
      values[values.length - 1] : // Latest for timing metrics
      values.reduce((sum, val) => sum + val, 0) / values.length; // Average for others

    const isViolation = currentValue > budget.budget;
    if (!isViolation) return null;

    const violation: BudgetViolation = {
      metric: budget.metric,
      actual: currentValue,
      budget: budget.budget,
      severity: budget.severity,
      timestamp: Date.now(),
      recommendation: this.getRecommendation(budget.metric, currentValue, budget.budget),
      impact: this.calculateImpact(budget.metric, currentValue, budget.budget)
    };

    // Store violation
    this.violations.push(violation);

    // Limit violations history
    if (this.violations.length > 1000) {
      this.violations = this.violations.slice(-500);
    }

    return violation;
  }

  /**
   * Get recommendation for specific metric violation
   */
  private getRecommendation(metric: string, actual: number, budget: number): string {
    const excess = actual - budget;
    const percentage = Math.round((excess / budget) * 100);

    const recommendations: Record<string, string> = {
      'LCP': `LCP is ${percentage}% over budget. Consider optimizing images, reducing server response time, or implementing preloading.`,
      'FID': `FID is ${percentage}% over budget. Consider reducing JavaScript execution time or using web workers.`,
      'CLS': `CLS is ${percentage}% over budget. Ensure images have dimensions and avoid inserting content above existing content.`,
      'navigation_render_time': `Navigation render time is ${percentage}% over budget. Consider code splitting or reducing component complexity.`,
      'dropdown_open_time': `Dropdown animation is ${percentage}% over budget. Consider optimizing CSS animations or reducing DOM complexity.`,
      'navigation_bundle_size': `Navigation bundle is ${percentage}% over budget. Consider tree-shaking, code splitting, or removing unused dependencies.`,
      'navigation_memory_usage': `Navigation memory usage is ${percentage}% over budget. Consider optimizing data structures or implementing cleanup.`,
      'accessibility_score': `Accessibility score is below target. Review ARIA labels, keyboard navigation, and color contrast.`,
      'error_rate': `Error rate is ${percentage}% over budget. Review error logs and implement better error handling.`
    };

    return recommendations[metric] || `${metric} is ${percentage}% over budget. Consider optimization.`;
  }

  /**
   * Calculate impact of violation
   */
  private calculateImpact(metric: string, actual: number, budget: number): BudgetViolation['impact'] {
    const ratio = actual / budget;

    if (ratio > 3) return 'critical';
    if (ratio > 2) return 'high';
    if (ratio > 1.5) return 'medium';
    return 'low';
  }

  /**
   * Generate comprehensive recommendations
   */
  private generateRecommendations(violations: BudgetViolation[]): string[] {
    const recommendations: string[] = [];

    // Group violations by type
    const criticalViolations = violations.filter(v => v.severity === 'error');
    const warningViolations = violations.filter(v => v.severity === 'warning');

    if (criticalViolations.length > 0) {
      recommendations.push('🚨 Critical performance issues detected. Immediate action required.');
      recommendations.push(...criticalViolations.map(v => `• ${v.recommendation}`));
    }

    if (warningViolations.length > 0) {
      recommendations.push('⚠️ Performance warnings detected. Consider optimization.');
      recommendations.push(...warningViolations.map(v => `• ${v.recommendation}`));
    }

    // Add general recommendations
    if (violations.some(v => v.metric.includes('bundle_size'))) {
      recommendations.push('💡 Consider implementing dynamic imports for better code splitting.');
    }

    if (violations.some(v => v.metric.includes('_time'))) {
      recommendations.push('💡 Consider using React.memo() and useMemo() for expensive computations.');
    }

    return recommendations;
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(violations: BudgetViolation[]): number {
    let score = 100;

    violations.forEach(violation => {
      const penalty = violation.severity === 'error' ? 20 : 
                     violation.severity === 'warning' ? 10 : 5;
      
      const impactMultiplier = violation.impact === 'critical' ? 2 :
                              violation.impact === 'high' ? 1.5 :
                              violation.impact === 'medium' ? 1.2 : 1;

      score -= penalty * impactMultiplier;
    });

    return Math.max(0, Math.round(score));
  }

  /**
   * Calculate performance trends
   */
  private calculateTrends(): Array<{ metric: string; trend: 'improving' | 'degrading' | 'stable' }> {
    const trends: Array<{ metric: string; trend: 'improving' | 'degrading' | 'stable' }> = [];

    this.metrics.forEach((values, metric) => {
      if (values.length < 10) return; // Need enough data

      const recent = values.slice(-5);
      const older = values.slice(-10, -5);

      const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
      const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;

      const change = (recentAvg - olderAvg) / olderAvg;

      let trend: 'improving' | 'degrading' | 'stable';
      if (change > 0.1) trend = 'degrading';
      else if (change < -0.1) trend = 'improving';
      else trend = 'stable';

      trends.push({ metric, trend });
    });

    return trends;
  }

  /**
   * Handle budget violations
   */
  private handleViolations(violations: BudgetViolation[]): void {
    const criticalViolations = violations.filter(v => v.severity === 'error');
    
    // Show alerts if enabled
    if (this.config.enableAlerts) {
      this.showPerformanceAlert(violations);
    }

    // Auto-optimization if enabled
    if (this.config.enableAutoOptimization && criticalViolations.length > 0) {
      this.attemptAutoOptimization(criticalViolations);
    }

    // Log violations
    console.warn('Performance budget violations detected:', violations);
  }

  /**
   * Show performance alert
   */
  private showPerformanceAlert(violations: BudgetViolation[]): void {
    const criticalCount = violations.filter(v => v.severity === 'error').length;
    const warningCount = violations.filter(v => v.severity === 'warning').length;

    if (criticalCount > 0 || (warningCount > 0 && this.config.alertThreshold !== 'error')) {
      // Create alert element
      const alert = document.createElement('div');
      alert.id = 'performance-budget-alert';
      alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${criticalCount > 0 ? '#dc2626' : '#f59e0b'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
      `;

      alert.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px;">
          ⚡ Performance Budget Alert
        </div>
        <div style="font-size: 12px;">
          ${criticalCount > 0 ? `${criticalCount} critical` : ''}
          ${criticalCount > 0 && warningCount > 0 ? ', ' : ''}
          ${warningCount > 0 ? `${warningCount} warning` : ''} violations
        </div>
      `;

      // Remove existing alert
      const existing = document.getElementById('performance-budget-alert');
      if (existing) existing.remove();

      document.body.appendChild(alert);

      // Auto-remove after 5 seconds
      setTimeout(() => alert.remove(), 5000);
    }
  }

  /**
   * Attempt automatic optimization
   */
  private attemptAutoOptimization(violations: BudgetViolation[]): void {
    violations.forEach(violation => {
      switch (violation.metric) {
        case 'navigation_memory_usage':
          // Clear old analytics data
          if (window.navigationAnalytics?.clearOldData) {
            window.navigationAnalytics.clearOldData();
          }
          break;
        
        case 'navigation_bundle_size':
          // Suggest lazy loading
          console.log('Auto-optimization: Consider implementing lazy loading for navigation components');
          break;
      }
    });
  }

  /**
   * Add custom budget
   */
  addBudget(budget: PerformanceBudget): void {
    this.budgets.push(budget);
  }

  /**
   * Remove budget
   */
  removeBudget(metric: string): void {
    this.budgets = this.budgets.filter(b => b.metric !== metric);
  }

  /**
   * Get current violations
   */
  getViolations(): BudgetViolation[] {
    return [...this.violations];
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Map<string, number[]> {
    return new Map(this.metrics);
  }

  /**
   * Clear all data
   */
  clearData(): void {
    this.violations = [];
    this.metrics.clear();
  }
}

// Extend window interface for global access
declare global {
  interface Window {
    navigationAnalytics?: any;
  }
}

// Export singleton instance
export const performanceBudgetEnforcer = new PerformanceBudgetEnforcer();

export default PerformanceBudgetEnforcer;
