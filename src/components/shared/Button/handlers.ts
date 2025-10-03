/**
 * Button Event Handlers
 * 
 * Centralized event handler functions for the Button component.
 * Handles mouse events, focus events, and hover animations.
 * 
 * @module ButtonHandlers
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Create mouse enter handler for enhanced hover effects
 */
export const createMouseEnterHandler = (
  disabled: boolean,
  loading: boolean,
  enhancedHover: boolean,
  hoverScale: number
) => (e: React.MouseEvent<HTMLElement>) => {
  if (disabled || loading || !enhancedHover) return;
  
  e.currentTarget.style.transform = `translateY(-3px) scale(${hoverScale})`;
  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
  e.currentTarget.style.filter = 'brightness(1.05)';
};

/**
 * Create mouse leave handler to reset hover effects
 */
export const createMouseLeaveHandler = (
  disabled: boolean,
  loading: boolean,
  enhancedHover: boolean
) => (e: React.MouseEvent<HTMLElement>) => {
  if (disabled || loading || !enhancedHover) return;
  
  e.currentTarget.style.transform = 'translateY(0) scale(1)';
  e.currentTarget.style.boxShadow = enhancedHover ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none';
  e.currentTarget.style.filter = 'brightness(1)';
};

/**
 * Create focus handler for accessibility
 */
export const createFocusHandler = (enhancedHover: boolean) => (e: React.FocusEvent<HTMLElement>) => {
  if (enhancedHover) {
    e.currentTarget.style.outline = '2px solid rgba(59, 130, 246, 0.5)';
    e.currentTarget.style.outlineOffset = '2px';
  }
};

/**
 * Create blur handler to remove focus outline
 */
export const createBlurHandler = () => (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.outline = 'none';
};

