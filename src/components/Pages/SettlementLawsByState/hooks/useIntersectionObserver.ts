// Settlement Laws by State - Intersection Observer Hook
// Following enterprise patterns - performance optimization hook

import { useEffect, useRef, useState, useCallback } from 'react';

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
 * Provides efficient visibility detection for Settlement Laws by State page sections.
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
        
        if (!frozen) {
          setIsIntersecting(entry.isIntersecting);
        }

        // Report to Performance Dashboard
        try {
          const existingEvents = JSON.parse(
            window.sessionStorage.getItem('performance-dashboard-events') || '[]'
          );
          
          existingEvents.push({
            type: 'intersectionObserver',
            component: 'SettlementLawsByState',
            data: {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              target: entry.target.tagName || 'unknown',
              boundingClientRect: {
                width: entry.boundingClientRect.width,
                height: entry.boundingClientRect.height
              }
            },
            timestamp: Date.now()
          });

          // Keep only last 50 intersection events
          if (existingEvents.length > 50) {
            existingEvents.splice(0, existingEvents.length - 50);
          }

          window.sessionStorage.setItem(
            'performance-dashboard-events',
            JSON.stringify(existingEvents)
          );
        } catch (error) {
          // Silently fail if sessionStorage is not available
        }
      }
    },
    [frozen]
  );

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element || frozen) {
      return;
    }

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      // Fallback for unsupported browsers
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [updateEntry, threshold, root, rootMargin, frozen]);

  return {
    isIntersecting,
    entry,
    ref: elementRef
  };
}
