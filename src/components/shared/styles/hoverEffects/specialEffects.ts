/**
 * ✨ SPECIAL HOVER EFFECTS
 * 
 * Special-purpose hover effects for specific components.
 * These are lightweight effects for subtle interactions.
 * 
 * @module SpecialEffects
 */

import { MouseEvent } from 'react';

/**
 * Creates a simple hover effect for StatRibbon (minimal movement)
 * 
 * Used by: StatRibbon
 * 
 * @returns Object with onMouseEnter and onMouseLeave handlers
 * 
 * @example
 * <div {...createStatHover()}>
 *   Stat content
 * </div>
 */
export const createStatHover = () => {
  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    }
  };
};

/**
 * Creates hover for FAQ accordion items (background change only)
 * 
 * Used by: FAQAccordionItem
 * 
 * @returns Object with onMouseEnter and onMouseLeave handlers
 * 
 * @example
 * <div {...createFAQHover()}>
 *   FAQ content
 * </div>
 */
export const createFAQHover = () => {
  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = '#f8fafc';
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.background = 'transparent';
    }
  };
};

