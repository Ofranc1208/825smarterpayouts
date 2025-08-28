// Settlement Law Federal - Intersection Observer Hook
// Following enterprise patterns - performance optimization hook

import { useEffect, useRef, useState, useCallback } from 'react';
import { FEATURE_FLAGS } from '../utils/constants';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
}

interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  ref: React.RefObject<Element>;
}

/**
 * useIntersectionObserver Hook
 * 
 * Enterprise-grade intersection observer hook for lazy loading and performance optimization.
 * Provides efficient visibility detection for Settlement Law Federal page sections.
 * 
 * @param options - Intersection observer configuration options
 * @returns Object containing intersection state, entry, and ref
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '50px',
    freezeOnceVisible = false,
    initialIsIntersecting = false
  } = options;

  const elementRef = useRef<Element>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);

  const frozen = freezeOnceVisible && isIntersecting;

  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry) {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        // Track intersection for analytics
        if (entry.isIntersecting && FEATURE_FLAGS.enableAnalytics) {
          const target = entry.target as HTMLElement;
          const sectionName = target.getAttribute('data-section') || 
                             target.getAttribute('aria-label') || 
                             target.id || 
                             'unknown-section';

          // Report to Performance Dashboard
          if (typeof window !== 'undefined' && window.sessionStorage) {
            try {
              const events = JSON.parse(
                window.sessionStorage.getItem('performance-dashboard-events') || '[]'
              );
              
              events.push({
                type: 'sectionVisible',
                page: 'settlement-law-federal',
                data: {
                  section: sectionName,
                  intersectionRatio: entry.intersectionRatio,
                  boundingClientRect: {
                    top: entry.boundingClientRect.top,
                    height: entry.boundingClientRect.height
                  }
                },
                timestamp: new Date().toISOString()
              });

              // Keep only last 100 events
              if (events.length > 100) {
                events.splice(0, events.length - 100);
              }

              window.sessionStorage.setItem(
                'performance-dashboard-events',
                JSON.stringify(events)
              );
            } catch (error) {
              console.warn('Failed to track section visibility:', error);
            }
          }

          if (FEATURE_FLAGS.enableVerboseLogging) {
            console.log(`👁️ Section visible: ${sectionName} (${(entry.intersectionRatio * 100).toFixed(1)}%)`);
          }
        }
      }
    },
    [frozen]
  );

  useEffect(() => {
    const element = elementRef.current;
    
    // Skip if no element, frozen, or IntersectionObserver not supported
    if (!element || frozen || typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    const observerParams: IntersectionObserverInit = {
      threshold,
      root,
      rootMargin
    };

    const observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(element);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [elementRef.current, threshold, root, rootMargin, frozen, updateEntry]);

  return {
    isIntersecting,
    entry,
    ref: elementRef
  };
}

/**
 * useIntersectionObserverArray Hook
 * 
 * Observe multiple elements with a single observer instance for better performance.
 * Useful for tracking multiple sections simultaneously.
 */
export function useIntersectionObserverArray(
  options: UseIntersectionObserverOptions = {}
): {
  observeElement: (element: Element | null, id: string) => void;
  unobserveElement: (element: Element | null) => void;
  intersectingElements: Set<string>;
  entries: Map<string, IntersectionObserverEntry>;
} {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '50px'
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<Element, string>>(new Map());
  const [intersectingElements, setIntersectingElements] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<Map<string, IntersectionObserverEntry>>(new Map());

  const updateEntries = useCallback((observerEntries: IntersectionObserverEntry[]) => {
    setIntersectingElements(prev => {
      const newSet = new Set(prev);
      
      observerEntries.forEach(entry => {
        const elementId = elementsRef.current.get(entry.target);
        if (elementId) {
          if (entry.isIntersecting) {
            newSet.add(elementId);
          } else {
            newSet.delete(elementId);
          }
        }
      });
      
      return newSet;
    });

    setEntries(prev => {
      const newMap = new Map(prev);
      
      observerEntries.forEach(entry => {
        const elementId = elementsRef.current.get(entry.target);
        if (elementId) {
          newMap.set(elementId, entry);
        }
      });
      
      return newMap;
    });
  }, []);

  // Initialize observer
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    observerRef.current = new IntersectionObserver(updateEntries, {
      threshold,
      root,
      rootMargin
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, updateEntries]);

  const observeElement = useCallback((element: Element | null, id: string) => {
    if (!element || !observerRef.current) return;

    elementsRef.current.set(element, id);
    observerRef.current.observe(element);
  }, []);

  const unobserveElement = useCallback((element: Element | null) => {
    if (!element || !observerRef.current) return;

    elementsRef.current.delete(element);
    observerRef.current.unobserve(element);
  }, []);

  return {
    observeElement,
    unobserveElement,
    intersectingElements,
    entries
  };
}

/**
 * useLazyLoad Hook
 * 
 * Simplified hook for lazy loading components when they become visible.
 * Perfect for Settlement Law Federal page sections.
 */
export function useLazyLoad(
  options: UseIntersectionObserverOptions = {}
): {
  shouldLoad: boolean;
  ref: React.RefObject<Element>;
} {
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
    ...options
  });

  return {
    shouldLoad: isIntersecting,
    ref
  };
}

/**
 * useViewportVisibility Hook
 * 
 * Track when sections enter/exit the viewport for analytics and performance monitoring.
 */
export function useViewportVisibility(
  sectionName: string,
  options: UseIntersectionObserverOptions = {}
): {
  isVisible: boolean;
  visibilityRatio: number;
  ref: React.RefObject<Element>;
} {
  const { isIntersecting, entry, ref } = useIntersectionObserver(options);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Track first time visibility for analytics
  useEffect(() => {
    if (isIntersecting && !hasBeenVisible) {
      setHasBeenVisible(true);
      
      // Track section view
      if (FEATURE_FLAGS.enableAnalytics && typeof window !== 'undefined') {
        // Report to analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'section_view', {
            event_category: 'Settlement Law Federal',
            event_label: sectionName,
            section_name: sectionName
          });
        }

        if (FEATURE_FLAGS.enableVerboseLogging) {
          console.log(`📊 Section first viewed: ${sectionName}`);
        }
      }
    }
  }, [isIntersecting, hasBeenVisible, sectionName]);

  return {
    isVisible: isIntersecting,
    visibilityRatio: entry?.intersectionRatio || 0,
    ref
  };
}
