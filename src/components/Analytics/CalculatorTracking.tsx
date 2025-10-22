/**
 * Calculator Tracking Utilities
 * Helper hooks and components for tracking calculator interactions
 * 
 * @module CalculatorTracking
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import { useEffect, useCallback } from 'react';
import {
  trackCalculatorStart,
  trackCalculatorComplete,
  trackCalculatorStep,
} from '@/src/lib/analytics/gtag';

/**
 * Hook to track calculator lifecycle
 */
export function useCalculatorTracking(
  calculatorType: 'pricing' | 'lump-sum' | 'guaranteed' | 'lcp'
) {
  // Track calculator start on mount
  useEffect(() => {
    trackCalculatorStart(calculatorType);
  }, [calculatorType]);

  // Return tracking functions for use in calculator
  const trackStep = useCallback(
    (step: number) => {
      trackCalculatorStep(calculatorType, step);
    },
    [calculatorType]
  );

  const trackComplete = useCallback(
    (estimatedValue?: number) => {
      trackCalculatorComplete(calculatorType, estimatedValue);
    },
    [calculatorType]
  );

  return {
    trackStep,
    trackComplete,
  };
}

/**
 * Example usage in a calculator component:
 * 
 * ```tsx
 * 'use client';
 * import { useCalculatorTracking } from '@/src/components/Analytics/CalculatorTracking';
 * 
 * export default function PricingCalculator() {
 *   const { trackStep, trackComplete } = useCalculatorTracking('pricing');
 *   
 *   const handleStepChange = (newStep: number) => {
 *     setStep(newStep);
 *     trackStep(newStep);
 *   };
 *   
 *   const handleCalculationComplete = (result: number) => {
 *     setResult(result);
 *     trackComplete(result);
 *   };
 *   
 *   return <div>...</div>;
 * }
 * ```
 */

