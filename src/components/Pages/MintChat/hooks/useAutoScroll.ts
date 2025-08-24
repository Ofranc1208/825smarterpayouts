'use client';

import { useEffect, useRef } from 'react';

/**
 * Self-contained auto-scroll hook for Mint Chat
 * 
 * Provides smooth auto-scrolling functionality for chat messages.
 * Automatically scrolls to the bottom when new messages are added.
 * 
 * @component MintChat
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Custom hook for auto-scrolling to the bottom of a scrollable element
 * when new items are added to a list
 * 
 * @param dependencies - Array of dependencies that trigger the scroll (e.g., messages array)
 * @returns ref - Ref to attach to the scrollable element
 */
export const useAutoScroll = (dependencies: any[]) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencies);

  return scrollEndRef;
};
