/**
 * Navigation A/B Testing Types
 * 
 * Shared TypeScript interfaces and types for the modular
 * Navigation A/B Testing system.
 * 
 * @module NavigationABTestingTypes
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import React from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100
  component: React.ComponentType<any>;
  config?: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  targetMetric: string;
  minimumSampleSize: number;
  confidenceLevel: number; // 0.95 for 95%
  isActive: boolean;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  metric: string;
  value: number;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

export interface ABTestStats {
  variant: string;
  sampleSize: number;
  conversionRate: number;
  confidenceInterval: [number, number];
  isStatisticallySignificant: boolean;
  pValue: number;
}

export interface ABTestContextType {
  currentTests: ABTest[];
  getVariant: (testId: string) => ABTestVariant | null;
  trackConversion: (testId: string, metric: string, value: number) => void;
  getTestResults: (testId: string) => ABTestStats[];
  createTest: (test: Omit<ABTest, 'id'>) => string;
  stopTest: (testId: string) => void;
}

export interface UserAssignment {
  testId: string;
  userId: string;
  variantId: string;
  timestamp: number;
}

export interface ABTestConfig {
  enableAnalytics: boolean;
  storagePrefix: string;
  defaultConfidenceLevel: number;
  defaultMinimumSampleSize: number;
}

export interface StatisticalResult {
  sampleSize: number;
  mean: number;
  standardError: number;
  confidenceInterval: [number, number];
  pValue: number;
  isSignificant: boolean;
}

export interface VariantPerformance {
  variantId: string;
  metrics: Record<string, StatisticalResult>;
  overallScore: number;
  recommendation: 'winner' | 'loser' | 'inconclusive';
}
