/**
 * Shared Button Component - Enterprise Grade
 * 
 * Main orchestrator for the Button component.
 * Composes styles, handlers, and sub-components into a unified button.
 * 
 * This file acts as the "conductor" - importing and coordinating
 * all the smaller, specialized modules.
 * 
 * @component Button
 * @author SmarterPayouts Team
 * @since 2024
 * @version 3.0.0 - Refactored into modular architecture
 */

'use client';
import React, { CSSProperties } from 'react';

// Import types
import type { ButtonProps } from './types';

// Import style functions
import { getBaseStyles, getVariantStyles, getSizeStyles } from './styles';

// Import event handlers
import { 
  createMouseEnterHandler, 
  createMouseLeaveHandler, 
  createFocusHandler, 
  createBlurHandler 
} from './handlers';

// Import sub-components
import { LoadingSpinner, ShimmerEffect, AnimationStyles } from './components';

/**
 * Button Component - Main Orchestrator
 * 
 * Coordinates all button functionality by composing imported modules.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  children,
  className = '',
  gradient,
  enhancedHover = false,
  hoverScale = 1.02,
  darkText = false,
  creamText = false,
  borderColor,
  shimmer = false,
  shimmerDelay = 0,
  as = 'button',
  href,
  ...props
}) => {
  // ============================================================================
  // STYLE COMPOSITION
  // ============================================================================
  
  const buttonStyles: CSSProperties = {
    ...getBaseStyles(enhancedHover, disabled, loading, fullWidth, borderColor, variant, as),
    ...getVariantStyles(variant, gradient, darkText, creamText),
    ...getSizeStyles(size, enhancedHover),
  };

  // ============================================================================
  // EVENT HANDLER CREATION
  // ============================================================================
  
  const handleMouseEnter = createMouseEnterHandler(disabled, loading, enhancedHover, hoverScale);
  const handleMouseLeave = createMouseLeaveHandler(disabled, loading, enhancedHover);
  const handleFocus = createFocusHandler(enhancedHover);
  const handleBlur = createBlurHandler();

  // ============================================================================
  // CONTENT COMPOSITION
  // ============================================================================
  
  const content = (
    <>
      {shimmer && <ShimmerEffect delay={shimmerDelay} />}
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && leftIcon}
      {children}
      {!loading && rightIcon && rightIcon}
    </>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {as === 'a' ? (
        <a
          href={href}
          style={buttonStyles}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled || loading}
          style={buttonStyles}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {content}
        </button>
      )}
      
      <AnimationStyles />
    </>
  );
};

export default Button;
