/**
 * Intersection Observer Hook
 * 
 * Enterprise-grade custom hook for implementing lazy loading and
 * performance optimizations using the Intersection Observer API.
 * 
 * @module useIntersectionObserver
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Intersection observer options interface
 */
interface UseIntersectionObserverOptions {
  /** Root element for intersection (default: viewport) */
  root?: Element | null;
  /** Root margin for intersection detection */
  rootMargin?: string;
  /** Threshold for intersection detection */
  threshold?: number | number[];
  /** Whether to freeze the observer after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for intersection observer functionality
 * 
 * Provides enterprise-grade lazy loading and visibility detection
 * with performance optimizations and memory leak prevention.
 * 
 * @param {UseIntersectionObserverOptions} options - Observer configuration
 * @returns {Object} Observer state and ref
 */
export function useIntersectionObserver({
  root = null,
  rootMargin = '50px',
  threshold = 0.1,
  freezeOnceVisible = false
}: UseIntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<Element>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return {
    ref: elementRef,
    entry,
    isVisible,
    isIntersecting: !!entry?.isIntersecting
  };
}

/**
 * Custom hook for lazy loading components
 * 
 * Simplified interface for lazy loading with sensible defaults
 * for enterprise applications.
 * 
 * @param {number} threshold - Intersection threshold (default: 0.1)
 * @returns {Object} Lazy loading state and ref
 */
export function useLazyLoad(threshold: number = 0.1) {
  return useIntersectionObserver({
    rootMargin: '100px',
    threshold,
    freezeOnceVisible: true
  });
}
