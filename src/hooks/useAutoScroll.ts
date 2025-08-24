import { useEffect, useRef, useCallback } from 'react';

/**
 * Robust auto-scroll hook using MutationObserver to detect when new content
 * is actually added to the DOM before triggering scroll.
 * 
 * @param containerRef - Ref to the scrollable container
 * @param messages - Array of messages to determine scroll target
 * @param dependencies - Array of dependencies that trigger the scroll
 * @returns void - No return value, hook manages scroll internally
 */
export const useAutoScroll = (containerRef: React.RefObject<HTMLElement>, messages: any[], dependencies: any[]) => {
  const observerRef = useRef<MutationObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false); // NEW: Prevent multiple scrolls

  // Smart scroll targeting to preserve conversational context
  const scrollToLatest = useCallback(() => {
    if (!containerRef.current || isScrollingRef.current) return; // NEW: Check if already scrolling

    isScrollingRef.current = true; // NEW: Mark as scrolling
    
    const container = containerRef.current;
    const children = Array.from(container.children);
    
    if (children.length === 0) {
      isScrollingRef.current = false; // NEW: Reset flag
      return;
    }

    // NEW: Always scroll to the very last element for consistent behavior
    const targetElement = children[children.length - 1];
    
    if (targetElement) {
      // NEW: Use longer delay to ensure all DOM updates are complete
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // NEW: Reset flag after scroll completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500); // Wait for smooth scroll to complete
      }, 200); // Increased delay for DOM stability
    } else {
      isScrollingRef.current = false; // NEW: Reset flag
    }
  }, [containerRef, messages]);

  // Setup MutationObserver to watch for DOM changes
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create observer to watch for child additions
    observerRef.current = new MutationObserver((mutations) => {
      // Check if any new nodes were added
      const hasNewContent = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );

      if (hasNewContent) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Add small delay to ensure layout is complete
        scrollTimeoutRef.current = setTimeout(() => {
          scrollToLatest();
        }, 100);
      }
    });

    // Start observing
    observerRef.current.observe(container, {
      childList: true, // Watch for added/removed children
      subtree: true,   // Watch the entire subtree
    });

    // Initial scroll if there's content
    if (container.children.length > 0) {
      scrollToLatest();
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [containerRef, scrollToLatest]);

  // Trigger scroll when dependencies change (fallback for React state changes)
  useEffect(() => {
    if (containerRef.current && dependencies.length > 0) {
      // Small delay to allow React to update the DOM
      const timer = setTimeout(() => {
        scrollToLatest();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [dependencies, scrollToLatest]);
}; 