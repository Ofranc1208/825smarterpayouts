/**
 * Performance Monitor Tests
 * 
 * Basic tests to verify the performance monitoring system works correctly.
 * 
 * @file performanceMonitor.test.ts
 * @author SmarterPayouts Team
 * @since 2024
 */

import { performanceMonitor, PerformanceMonitor } from '../performanceMonitor';

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    // Reset the monitor before each test
    performanceMonitor.reset();
  });

  test('should initialize with default configuration', () => {
    expect(performanceMonitor).toBeDefined();
    expect(performanceMonitor.getMetrics()).toEqual([]);
    expect(performanceMonitor.getCustomMetrics()).toEqual([]);
  });

  test('should track custom metrics', () => {
    performanceMonitor.trackCustomMetric('TestMetric', 100, 'ms');
    
    const metrics = performanceMonitor.getCustomMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('TestMetric');
    expect(metrics[0].value).toBe(100);
    expect(metrics[0].unit).toBe('ms');
  });

  test('should get performance summary', () => {
    const summary = performanceMonitor.getPerformanceSummary();
    
    expect(summary).toBeDefined();
    expect(summary.coreWebVitals).toBeDefined();
    expect(summary.customMetrics).toBeDefined();
    expect(summary.overallScore).toBeDefined();
  });

  test('should add and remove observers', () => {
    const mockCallback = jest.fn();
    const removeObserver = performanceMonitor.addObserver(mockCallback);
    
    // Simulate a metric
    performanceMonitor.trackCustomMetric('TestMetric', 100, 'ms');
    
    // Remove observer
    removeObserver();
    
    // Should not call the callback after removal
    performanceMonitor.trackCustomMetric('AnotherMetric', 200, 'ms');
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('should reset all metrics', () => {
    performanceMonitor.trackCustomMetric('TestMetric', 100, 'ms');
    expect(performanceMonitor.getCustomMetrics()).toHaveLength(1);
    
    performanceMonitor.reset();
    expect(performanceMonitor.getCustomMetrics()).toHaveLength(0);
    expect(performanceMonitor.getMetrics()).toHaveLength(0);
  });
});
