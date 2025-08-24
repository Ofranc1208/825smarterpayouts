import { useState, useEffect, useCallback } from 'react';

/**
 * Navigation A/B Testing Hook
 * 
 * Provides A/B testing functionality for navigation components including:
 * - Experiment management
 * - Variant assignment
 * - Event tracking
 * - Statistical significance tracking
 * 
 * @hook useNavigationABTest
 * @author SmarterPayouts Team
 * @since 2024
 */

export interface ABTestExperiment {
  /** Unique experiment identifier */
  id: string;
  /** Experiment name */
  name: string;
  /** Available variants */
  variants: ABTestVariant[];
  /** Traffic allocation percentage (0-100) */
  trafficAllocation: number;
  /** Whether experiment is active */
  isActive: boolean;
  /** Experiment start date */
  startDate: Date;
  /** Experiment end date */
  endDate?: Date;
}

export interface ABTestVariant {
  /** Variant identifier */
  id: string;
  /** Variant name */
  name: string;
  /** Traffic percentage for this variant (0-100) */
  traffic: number;
  /** Variant configuration */
  config: Record<string, any>;
}

export interface ABTestEvent {
  /** Event name */
  event: string;
  /** Experiment ID */
  experimentId: string;
  /** Variant ID */
  variantId: string;
  /** Event properties */
  properties?: Record<string, any>;
  /** Timestamp */
  timestamp: Date;
}

interface UseNavigationABTestReturn {
  /** Get variant for an experiment */
  getVariant: (experimentId: string) => ABTestVariant | null;
  /** Check if user is in experiment */
  isInExperiment: (experimentId: string) => boolean;
  /** Track A/B test event */
  trackEvent: (event: string, experimentId: string, properties?: Record<string, any>) => void;
  /** Get all active experiments */
  getActiveExperiments: () => ABTestExperiment[];
  /** Force variant assignment (for testing) */
  forceVariant: (experimentId: string, variantId: string) => void;
}

/**
 * Default navigation experiments
 */
const DEFAULT_EXPERIMENTS: ABTestExperiment[] = [
  {
    id: 'nav-layout-test',
    name: 'Navigation Layout Test',
    variants: [
      {
        id: 'control',
        name: 'Current Layout',
        traffic: 50,
        config: {
          layout: 'horizontal',
          dropdownStyle: 'hover',
          mobileMenuStyle: 'slide'
        }
      },
      {
        id: 'variant-a',
        name: 'Vertical Layout',
        traffic: 50,
        config: {
          layout: 'vertical',
          dropdownStyle: 'click',
          mobileMenuStyle: 'overlay'
        }
      }
    ],
    trafficAllocation: 100,
    isActive: true,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  },
  
  {
    id: 'search-placement-test',
    name: 'Search Bar Placement Test',
    variants: [
      {
        id: 'control',
        name: 'Search in Mobile Menu',
        traffic: 50,
        config: {
          searchPlacement: 'mobile-menu',
          searchVisible: false
        }
      },
      {
        id: 'variant-a',
        name: 'Search in Header',
        traffic: 50,
        config: {
          searchPlacement: 'header',
          searchVisible: true
        }
      }
    ],
    trafficAllocation: 50,
    isActive: true,
    startDate: new Date('2024-01-01')
  }
];

/**
 * Navigation A/B Testing Hook
 * 
 * Manages A/B testing for navigation components with automatic
 * variant assignment and event tracking
 */
export const useNavigationABTest = (
  experiments: ABTestExperiment[] = DEFAULT_EXPERIMENTS
): UseNavigationABTestReturn => {
  const [userVariants, setUserVariants] = useState<Record<string, string>>({});
  const [forcedVariants, setForcedVariants] = useState<Record<string, string>>({});

  // Initialize user variants
  useEffect(() => {
    const initializeVariants = () => {
      const savedVariants = localStorage.getItem('navigation-ab-variants');
      const parsed = savedVariants ? JSON.parse(savedVariants) : {};
      
      const newVariants: Record<string, string> = {};
      
      experiments.forEach(experiment => {
        if (!experiment.isActive) return;
        
        // Check if user already has a variant assigned
        if (parsed[experiment.id]) {
          newVariants[experiment.id] = parsed[experiment.id];
          return;
        }
        
        // Check traffic allocation
        const random = Math.random() * 100;
        if (random > experiment.trafficAllocation) {
          return; // User not in experiment
        }
        
        // Assign variant based on traffic distribution
        let cumulativeTraffic = 0;
        const variantRandom = Math.random() * 100;
        
        for (const variant of experiment.variants) {
          cumulativeTraffic += variant.traffic;
          if (variantRandom <= cumulativeTraffic) {
            newVariants[experiment.id] = variant.id;
            break;
          }
        }
      });
      
      setUserVariants(newVariants);
      localStorage.setItem('navigation-ab-variants', JSON.stringify(newVariants));
    };

    initializeVariants();
  }, [experiments]);

  // Get variant for an experiment
  const getVariant = useCallback((experimentId: string): ABTestVariant | null => {
    const experiment = experiments.find(exp => exp.id === experimentId);
    if (!experiment || !experiment.isActive) return null;
    
    // Check for forced variant first
    const forcedVariantId = forcedVariants[experimentId];
    if (forcedVariantId) {
      return experiment.variants.find(v => v.id === forcedVariantId) || null;
    }
    
    // Get assigned variant
    const variantId = userVariants[experimentId];
    if (!variantId) return null;
    
    return experiment.variants.find(v => v.id === variantId) || null;
  }, [experiments, userVariants, forcedVariants]);

  // Check if user is in experiment
  const isInExperiment = useCallback((experimentId: string): boolean => {
    return !!getVariant(experimentId);
  }, [getVariant]);

  // Track A/B test event
  const trackEvent = useCallback((
    event: string, 
    experimentId: string, 
    properties?: Record<string, any>
  ) => {
    const variant = getVariant(experimentId);
    if (!variant) return;

    const abTestEvent: ABTestEvent = {
      event,
      experimentId,
      variantId: variant.id,
      properties,
      timestamp: new Date()
    };

    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        experiment_id: experimentId,
        variant_id: variant.id,
        ...properties
      });
    }

    // Store locally for debugging
    const events = JSON.parse(localStorage.getItem('navigation-ab-events') || '[]');
    events.push(abTestEvent);
    localStorage.setItem('navigation-ab-events', JSON.stringify(events.slice(-100))); // Keep last 100 events

    console.log('A/B Test Event:', abTestEvent);
  }, [getVariant]);

  // Get all active experiments
  const getActiveExperiments = useCallback((): ABTestExperiment[] => {
    return experiments.filter(exp => exp.isActive);
  }, [experiments]);

  // Force variant assignment (for testing)
  const forceVariant = useCallback((experimentId: string, variantId: string) => {
    setForcedVariants(prev => ({
      ...prev,
      [experimentId]: variantId
    }));
  }, []);

  return {
    getVariant,
    isInExperiment,
    trackEvent,
    getActiveExperiments,
    forceVariant
  };
};
