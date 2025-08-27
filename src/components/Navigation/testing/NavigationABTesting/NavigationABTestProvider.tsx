/**
 * Navigation A/B Test Provider - Main React Component
 * 
 * React Provider component that orchestrates all A/B testing modules
 * and provides the main interface for A/B testing functionality.
 * 
 * @module NavigationABTestProvider
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ABTest, ABTestVariant, ABTestContextType, ABTestConfig } from './types';
import { ABTestManager } from './ABTestManager';
import { ABTestAnalytics } from './ABTestAnalytics';
import { UserAssignmentEngine } from './UserAssignmentEngine';
import { getUserId, getSessionId } from './ABTestUtils';

// A/B Testing Context
const ABTestContext = createContext<ABTestContextType | null>(null);

/**
 * Navigation A/B Testing Provider
 */
export const NavigationABTestProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<ABTestConfig>;
}> = ({ children, config = {} }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [manager, setManager] = useState<ABTestManager | null>(null);
  const [analytics, setAnalytics] = useState<ABTestAnalytics | null>(null);
  const [assignmentEngine, setAssignmentEngine] = useState<UserAssignmentEngine | null>(null);

  // Configuration with defaults
  const finalConfig: ABTestConfig = {
    enableAnalytics: true,
    storagePrefix: 'navigation-ab',
    defaultConfidenceLevel: 0.95,
    defaultMinimumSampleSize: 1000,
    ...config
  };

  /**
   * Initialize A/B testing system
   */
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // Initialize modules
        const testManager = new ABTestManager(finalConfig);
        const testAnalytics = new ABTestAnalytics(finalConfig.enableAnalytics);
        const userAssignment = new UserAssignmentEngine(finalConfig.storagePrefix);

        setManager(testManager);
        setAnalytics(testAnalytics);
        setAssignmentEngine(userAssignment);

        // Initialize default tests
        await initializeDefaultTests(testManager);

        setIsInitialized(true);
        console.log('Navigation A/B Testing system initialized');
      } catch (error) {
        console.error('Failed to initialize A/B testing system:', error);
      }
    };

    initializeSystem();
  }, []);

  /**
   * Initialize default navigation A/B tests
   */
  const initializeDefaultTests = async (testManager: ABTestManager) => {
    const defaultTests: Omit<ABTest, 'id'>[] = [
      {
        name: 'Navigation Layout Test',
        description: 'Test different navigation layouts for better user engagement',
        variants: [
          {
            id: 'control',
            name: 'Current Layout',
            weight: 50,
            component: React.Fragment // Current navigation
          },
          {
            id: 'variant-a',
            name: 'Compact Layout',
            weight: 50,
            component: React.Fragment, // Compact navigation variant
            config: { compact: true }
          }
        ],
        startDate: new Date(),
        targetMetric: 'navigation_clicks',
        minimumSampleSize: 1000,
        confidenceLevel: 0.95,
        isActive: true
      },
      {
        name: 'Mobile Menu Animation',
        description: 'Test different mobile menu animations for better UX',
        variants: [
          {
            id: 'slide',
            name: 'Slide Animation',
            weight: 33,
            component: React.Fragment,
            config: { animation: 'slide' }
          },
          {
            id: 'fade',
            name: 'Fade Animation',
            weight: 33,
            component: React.Fragment,
            config: { animation: 'fade' }
          },
          {
            id: 'scale',
            name: 'Scale Animation',
            weight: 34,
            component: React.Fragment,
            config: { animation: 'scale' }
          }
        ],
        startDate: new Date(),
        targetMetric: 'mobile_menu_engagement',
        minimumSampleSize: 500,
        confidenceLevel: 0.95,
        isActive: true
      }
    ];

    // Create tests if they don't exist
    for (const testData of defaultTests) {
      const existingTests = testManager.getAllTests();
      const exists = existingTests.some(t => t.name === testData.name);
      
      if (!exists) {
        const result = testManager.createTest(testData);
        if (result.success && analytics) {
          const test = testManager.getTest(result.testId!);
          if (test) {
            analytics.trackTestCreated(test);
          }
        }
      }
    }
  };

  /**
   * Get variant for a specific test
   */
  const getVariant = useCallback((testId: string): ABTestVariant | null => {
    if (!manager || !assignmentEngine || !analytics) return null;

    const test = manager.getTest(testId);
    if (!test || !test.isActive) return null;

    const userId = getUserId();
    const variant = assignmentEngine.getAssignment(test, userId);
    
    if (variant && analytics) {
      analytics.trackAssignment(test, variant, userId);
    }

    return variant;
  }, [manager, assignmentEngine, analytics]);

  /**
   * Track conversion for A/B test
   */
  const trackConversion = useCallback((testId: string, metric: string, value: number) => {
    if (!manager || !assignmentEngine || !analytics) return;

    const test = manager.getTest(testId);
    if (!test || !test.isActive) return;

    const userId = getUserId();
    const sessionId = getSessionId();
    const assignment = assignmentEngine.getAssignment(test, userId);
    
    if (!assignment) return;

    const result = {
      testId,
      variantId: assignment.id,
      metric,
      value,
      userId,
      sessionId
    };

    // Record in manager
    manager.recordResult(result);

    // Track in analytics
    analytics.trackConversion({ ...result, timestamp: Date.now() });
  }, [manager, assignmentEngine, analytics]);

  /**
   * Get test results with statistical analysis
   */
  const getTestResults = useCallback((testId: string) => {
    if (!manager) return [];

    const analysis = manager.getTestAnalysis(testId);
    return analysis ? analysis.stats : [];
  }, [manager]);

  /**
   * Create new A/B test
   */
  const createTest = useCallback((testData: Omit<ABTest, 'id'>): string => {
    if (!manager || !analytics) return '';

    const result = manager.createTest(testData);
    if (result.success && result.testId) {
      const test = manager.getTest(result.testId);
      if (test) {
        analytics.trackTestCreated(test);
      }
      return result.testId;
    }

    return '';
  }, [manager, analytics]);

  /**
   * Stop A/B test
   */
  const stopTest = useCallback((testId: string) => {
    if (!manager || !analytics) return;

    const test = manager.getTest(testId);
    if (test) {
      const result = manager.stopTest(testId);
      if (result.success) {
        analytics.trackTestStopped(test);
      }
    }
  }, [manager, analytics]);

  /**
   * Get current tests
   */
  const getCurrentTests = useCallback(() => {
    if (!manager) return [];
    return manager.getActiveTests();
  }, [manager]);

  // Context value
  const contextValue: ABTestContextType = {
    currentTests: getCurrentTests(),
    getVariant,
    trackConversion,
    getTestResults,
    createTest,
    stopTest
  };

  // Don't render children until system is initialized
  if (!isInitialized) {
    return <>{children}</>;
  }

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
};

/**
 * Hook to use A/B testing
 */
export const useNavigationABTest = (): ABTestContextType => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useNavigationABTest must be used within NavigationABTestProvider');
  }
  return context;
};

/**
 * A/B Test Component Wrapper
 */
export const ABTestComponent: React.FC<{
  testId: string;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ testId, fallback, children }) => {
  const { getVariant } = useNavigationABTest();
  const variant = getVariant(testId);

  if (!variant) {
    return <>{fallback || children}</>;
  }

  const VariantComponent = variant.component;
  return <VariantComponent {...variant.config} />;
};

/**
 * Hook for A/B test variant with automatic tracking
 */
export const useABTestVariant = (testId: string) => {
  const { getVariant, trackConversion } = useNavigationABTest();
  const [variant, setVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    const assignedVariant = getVariant(testId);
    setVariant(assignedVariant);
  }, [testId, getVariant]);

  const trackEvent = useCallback((metric: string, value: number = 1) => {
    trackConversion(testId, metric, value);
  }, [testId, trackConversion]);

  return {
    variant,
    isInTest: variant !== null,
    variantId: variant?.id,
    config: variant?.config,
    trackEvent
  };
};

/**
 * Higher-Order Component for A/B testing
 */
export const withABTest = <P extends object>(
  testId: string,
  fallbackComponent?: React.ComponentType<P>
) => {
  return (WrappedComponent: React.ComponentType<P>) => {
    const ABTestHOC: React.FC<P> = (props) => {
      const { getVariant } = useNavigationABTest();
      const variant = getVariant(testId);

      if (!variant) {
        return fallbackComponent ? <fallbackComponent {...props} /> : <WrappedComponent {...props} />;
      }

      const VariantComponent = variant.component as React.ComponentType<P>;
      return <VariantComponent {...props} {...variant.config} />;
    };

    ABTestHOC.displayName = `withABTest(${WrappedComponent.displayName || WrappedComponent.name})`;
    return ABTestHOC;
  };
};

export default NavigationABTestProvider;
