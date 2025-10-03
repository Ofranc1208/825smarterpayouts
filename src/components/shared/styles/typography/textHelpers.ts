/**
 * 📐 TEXT HELPERS - Typography Utility Functions
 * 
 * Helper functions for generating consistent text styles.
 * Use these to apply typography quickly and consistently.
 * 
 * @module TextHelpers
 */

import { CSSProperties } from 'react';
import { TYPOGRAPHY } from './fontScales';

// ═══════════════════════════════════════════════════════════════════════════════
//                              HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get complete heading styles
 * 
 * @param level - Heading level (h1, h2, h3, h4, h5, h6)
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with heading styles
 * 
 * @example
 * <h1 style={getHeadingStyles('h1')}>Title</h1>
 * <h2 style={getHeadingStyles('h2', { marginBottom: '2rem' })}>Subtitle</h2>
 */
export const getHeadingStyles = (
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  customStyles?: CSSProperties
): CSSProperties => {
  const baseStyles: Record<string, CSSProperties> = {
    h1: {
      fontSize: TYPOGRAPHY.fontSize.heading.h1,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.tight,
    },
    h2: {
      fontSize: TYPOGRAPHY.fontSize.heading.h2,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.tight,
    },
    h3: {
      fontSize: TYPOGRAPHY.fontSize.heading.h3,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.snug,
    },
    h4: {
      fontSize: TYPOGRAPHY.fontSize.heading.h4,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      lineHeight: TYPOGRAPHY.lineHeight.snug,
    },
    h5: {
      fontSize: TYPOGRAPHY.fontSize.heading.h5,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.snug,
    },
    h6: {
      fontSize: TYPOGRAPHY.fontSize.heading.h6,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      lineHeight: TYPOGRAPHY.lineHeight.normal,
    },
  };

  return {
    ...baseStyles[level],
    ...customStyles,
  };
};

/**
 * Get body text styles
 * 
 * @param size - Text size (xlarge, large, medium, small, xsmall)
 * @param weight - Font weight (optional, defaults to 'regular')
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with body text styles
 * 
 * @example
 * <p style={getBodyStyles('large')}>Large body text</p>
 * <p style={getBodyStyles('medium', 'medium')}>Medium weight text</p>
 */
export const getBodyStyles = (
  size: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall',
  weight: keyof typeof TYPOGRAPHY.fontWeight = 'regular',
  customStyles?: CSSProperties
): CSSProperties => {
  const lineHeightMap: Record<string, string> = {
    xlarge: TYPOGRAPHY.lineHeight.relaxed,
    large: TYPOGRAPHY.lineHeight.relaxed,
    medium: TYPOGRAPHY.lineHeight.normal,
    small: TYPOGRAPHY.lineHeight.normal,
    xsmall: TYPOGRAPHY.lineHeight.normal,
  };

  return {
    fontSize: TYPOGRAPHY.fontSize.body[size],
    fontWeight: TYPOGRAPHY.fontWeight[weight],
    lineHeight: lineHeightMap[size],
    ...customStyles,
  };
};

/**
 * Get badge/label styles
 * 
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object with badge styles
 * 
 * @example
 * <span style={getBadgeStyles()}>NEW</span>
 */
export const getBadgeStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    fontSize: TYPOGRAPHY.fontSize.body.xsmall,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    textTransform: 'uppercase',
    ...customStyles,
  };
};

/**
 * Get card title styles (commonly used in cards)
 * 
 * @param size - Size variant (large, medium, small)
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object
 * 
 * @example
 * <h3 style={getCardTitleStyles('medium')}>Card Title</h3>
 */
export const getCardTitleStyles = (
  size: 'large' | 'medium' | 'small' = 'medium',
  customStyles?: CSSProperties
): CSSProperties => {
  const sizeMap = {
    large: getHeadingStyles('h3'),
    medium: getHeadingStyles('h4'),
    small: getHeadingStyles('h5'),
  };

  return {
    ...sizeMap[size],
    ...customStyles,
  };
};

/**
 * Get responsive heading styles (uses clamp for fluid typography)
 * 
 * @param minSize - Minimum size in rem
 * @param preferredSize - Preferred size in vw
 * @param maxSize - Maximum size in rem
 * @param customStyles - Optional additional styles
 * @returns CSSProperties object
 * 
 * @example
 * <h2 style={getResponsiveHeadingStyles(1.5, 4, 2.5)}>Responsive Title</h2>
 */
export const getResponsiveHeadingStyles = (
  minSize: number,
  preferredSize: number,
  maxSize: number,
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    fontSize: `clamp(${minSize}rem, ${preferredSize}vw, ${maxSize}rem)`,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
    ...customStyles,
  };
};

