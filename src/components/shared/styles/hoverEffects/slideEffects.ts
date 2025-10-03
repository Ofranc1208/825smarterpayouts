/**
 * ✨ SLIDE HOVER EFFECTS
 * 
 * Creates "slide" hover effects with translateX animations.
 * Perfect for horizontal movement on hover.
 * 
 * Used by: ValuePropCard, ResourceCards
 * 
 * @module SlideEffects
 */

import { MouseEvent } from 'react';
import type { SlideHoverOptions } from './types';

/**
 * Creates a "slide" hover effect (translateX)
 * 
 * @param options - Hover effect configuration
 * @returns Object with onMouseEnter and onMouseLeave handlers
 * 
 * @example
 * <div {...createSlideHover({ translateX: 8 })}>
 *   Card content
 * </div>
 */
export const createSlideHover = ({
  translateX = 8,
  shadowColor = 'rgba(0, 0, 0, 0.08)',
  shadowSize = '0 8px 24px',
  borderColor
}: SlideHoverOptions = {}) => {
  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = `translateX(${translateX}px)`;
      e.currentTarget.style.boxShadow = `${shadowSize} ${shadowColor}`;
      if (borderColor) e.currentTarget.style.borderColor = borderColor;
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.boxShadow = 'none';
      if (borderColor) e.currentTarget.style.borderColor = '#f3f4f6';
    }
  };
};

