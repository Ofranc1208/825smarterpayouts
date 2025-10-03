/**
 * ✨ SCALE HOVER EFFECTS
 * 
 * Creates "scale" hover effects with scale and lift animations.
 * Perfect for prominent cards that need strong hover feedback.
 * 
 * Used by: StepCard
 * 
 * @module ScaleEffects
 */

import { MouseEvent } from 'react';
import type { ScaleHoverOptions } from './types';

/**
 * Creates a "scale" hover effect (scale + translateY, for StepCard)
 * 
 * @param options - Hover effect configuration
 * @returns Object with onMouseEnter and onMouseLeave handlers
 * 
 * @example
 * <div {...createScaleHover({ scale: 1.03 })}>
 *   Card content
 * </div>
 */
export const createScaleHover = ({
  scale = 1.03,
  shadowColor = 'rgba(5, 150, 105, 0.2)',
  shadowSize = '0 20px 60px'
}: ScaleHoverOptions = {}) => {
  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = `translateY(-12px) scale(${scale})`;
      e.currentTarget.style.boxShadow = `${shadowSize} ${shadowColor}`;
      e.currentTarget.style.borderColor = '#059669';
      e.currentTarget.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)';
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
      e.currentTarget.style.borderColor = '#e5e7eb';
      e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
    }
  };
};

