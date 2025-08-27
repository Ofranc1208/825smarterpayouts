/**
 * RTL Wrapper Component
 * 
 * Component wrapper that handles RTL (Right-to-Left) layout and styling
 * 
 * @module RTLWrapper
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';
import { useNavigationI18n } from './NavigationI18nProvider';

interface RTLWrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  enableFlexReverse?: boolean;
  enableMarginFlip?: boolean;
}

/**
 * RTL-aware component wrapper
 */
export const RTLWrapper: React.FC<RTLWrapperProps> = ({ 
  children, 
  style,
  className,
  as: Component = 'div',
  enableFlexReverse = false,
  enableMarginFlip = false
}) => {
  const { isRTL, getDirection } = useNavigationI18n();

  const baseStyle: React.CSSProperties = {
    direction: getDirection(),
    textAlign: isRTL ? 'right' : 'left'
  };

  // Apply flex direction reversal for RTL
  if (enableFlexReverse && isRTL) {
    baseStyle.flexDirection = 'row-reverse';
  }

  // Apply margin flipping for RTL
  let adjustedStyle = { ...baseStyle, ...style };
  if (enableMarginFlip && isRTL && style) {
    adjustedStyle = flipMarginPadding(adjustedStyle);
  }

  return (
    <Component 
      className={className}
      style={adjustedStyle} 
      dir={getDirection()}
    >
      {children}
    </Component>
  );
};

/**
 * Hook for RTL-aware styling
 */
export const useRTLStyle = () => {
  const { isRTL, getDirection } = useNavigationI18n();

  const getRTLStyle = (ltrStyle: React.CSSProperties, rtlStyle?: React.CSSProperties): React.CSSProperties => {
    if (isRTL && rtlStyle) {
      return { ...ltrStyle, ...rtlStyle };
    }
    return ltrStyle;
  };

  const flipHorizontalValues = (style: React.CSSProperties): React.CSSProperties => {
    if (!isRTL) return style;
    return flipMarginPadding(style);
  };

  return {
    isRTL,
    getDirection,
    getRTLStyle,
    flipHorizontalValues
  };
};

/**
 * Utility function to flip margin and padding values for RTL
 */
function flipMarginPadding(style: React.CSSProperties): React.CSSProperties {
  const flipped = { ...style };

  // Flip margin values
  if (style.marginLeft !== undefined || style.marginRight !== undefined) {
    const left = style.marginLeft;
    const right = style.marginRight;
    flipped.marginLeft = right;
    flipped.marginRight = left;
  }

  // Flip padding values
  if (style.paddingLeft !== undefined || style.paddingRight !== undefined) {
    const left = style.paddingLeft;
    const right = style.paddingRight;
    flipped.paddingLeft = right;
    flipped.paddingRight = left;
  }

  // Flip border values
  if (style.borderLeft !== undefined || style.borderRight !== undefined) {
    const left = style.borderLeft;
    const right = style.borderRight;
    flipped.borderLeft = right;
    flipped.borderRight = left;
  }

  // Flip border radius values
  if (style.borderTopLeftRadius !== undefined || style.borderTopRightRadius !== undefined) {
    const topLeft = style.borderTopLeftRadius;
    const topRight = style.borderTopRightRadius;
    flipped.borderTopLeftRadius = topRight;
    flipped.borderTopRightRadius = topLeft;
  }

  if (style.borderBottomLeftRadius !== undefined || style.borderBottomRightRadius !== undefined) {
    const bottomLeft = style.borderBottomLeftRadius;
    const bottomRight = style.borderBottomRightRadius;
    flipped.borderBottomLeftRadius = bottomRight;
    flipped.borderBottomRightRadius = bottomLeft;
  }

  // Flip position values
  if (style.left !== undefined || style.right !== undefined) {
    const left = style.left;
    const right = style.right;
    flipped.left = right;
    flipped.right = left;
  }

  return flipped;
}

/**
 * RTL-aware text alignment utility
 */
export const useRTLTextAlign = () => {
  const { isRTL } = useNavigationI18n();

  const getTextAlign = (align: 'left' | 'right' | 'center' | 'justify' = 'left'): React.CSSProperties['textAlign'] => {
    if (align === 'center' || align === 'justify') return align;
    if (isRTL) {
      return align === 'left' ? 'right' : 'left';
    }
    return align;
  };

  return { getTextAlign, isRTL };
};

export default RTLWrapper;
