/**
 * ✨ FLOAT HOVER EFFECTS
 * 
 * Creates "float" hover effects with translateY and scale animations.
 * Perfect for cards that should lift up on hover.
 * 
 * Used by: TestimonialCard, MintAIFeaturedCard, ValuePropCard
 * 
 * @module FloatEffects
 */

import { MouseEvent } from 'react';
import type { FloatHoverOptions } from './types';

/**
 * Creates a "float" hover effect (translateY + scale)
 * 
 * @param options - Hover effect configuration
 * @returns Object with onMouseEnter and onMouseLeave handlers
 * 
 * @example
 * <div {...createFloatHover({ translateY: -8, scale: 1.02 })}>
 *   Card content
 * </div>
 */
export const createFloatHover = ({
  translateY = -8,
  scale = 1.02,
  shadowColor = 'rgba(5, 150, 105, 0.15)',
  shadowSize = '0 20px 40px',
  borderColor,
  backgroundColor
}: FloatHoverOptions = {}) => {
  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = `translateY(${translateY}px) scale(${scale})`;
      e.currentTarget.style.boxShadow = `${shadowSize} ${shadowColor}`;
      if (borderColor) e.currentTarget.style.borderColor = borderColor;
      if (backgroundColor) e.currentTarget.style.background = backgroundColor;
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
      if (borderColor) e.currentTarget.style.borderColor = '#e5e7eb';
      if (backgroundColor) e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
    }
  };
};

