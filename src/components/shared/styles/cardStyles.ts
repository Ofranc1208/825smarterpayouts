import { CSSProperties } from 'react';
import { SPACING } from '@/src/components/shared/styles/spacing';

/**
 * 🃏 GLOBAL CARD STYLE DESIGN SYSTEM
 * 
 * Reusable card style generators for the ENTIRE application.
 * This file is the single source of truth for ALL pages (Main, GetAQuote, etc.)
 * 
 * 📍 Originally established on Main page, now moved to global shared for consistency.
 * 
 * Usage:
 * import { BORDER_RADIUS, BOX_SHADOWS, getBaseCardStyles } from '@/src/components/shared/styles/cardStyles';
 * <div style={getBaseCardStyles()}>
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                          BORDER RADIUS DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Border Radius Scale
 * Consistent border radius values following a clear hierarchy
 */
export const BORDER_RADIUS = {
  sm: '7px',           // Category buttons (FAQ page)
  small: '8px',        // Badges, small buttons
  md: '8px',           // Medium radius (alias for small)
  medium: '12px',      // Stat ribbons, small cards, icons
  lg: '16px',          // Large radius (alias for large)
  large: '16px',       // Standard cards (most common)
  xlarge: '20px',      // Feature cards, emphasized cards
  xxlarge: '24px',     // Section containers, hero cards
  full: '50%',         // Circular icons, avatars (alias for circle)
  circle: '50%',       // Circular icons, avatars
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
//                          BOX SHADOW DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Box Shadow Scale
 * Standardized shadow depths for different elevations
 */
export const BOX_SHADOWS = {
  none: 'none',
  sm: '0 1px 4px rgba(0, 0, 0, 0.06)',          // Smallest shadow (FAQ category buttons inactive)
  small: '0 4px 12px rgba(0, 0, 0, 0.08)',      // Stat ribbons, small cards
  medium: '0 8px 24px rgba(0, 0, 0, 0.08)',     // Standard cards
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Medium shadow for cards
  large: '0 8px 32px rgba(0, 0, 0, 0.08)',      // Featured cards, CTA boxes
  xlarge: '0 12px 48px rgba(0, 0, 0, 0.12)',    // Hero sections, modals
  custom: {
    greenGlow: '0 4px 10px rgba(9, 180, 77, 0.18)',  // Green glow for active category buttons
  }
} as const;

/**
 * Base card styles used across all card components
 * Used by: ValuePropCard, StepCard, TestimonialCard, StatRibbon, etc.
 * 
 * @param customStyles - Optional styles to merge with base styles
 * @returns CSSProperties object
 */
export const getBaseCardStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.card.standard,
    boxShadow: BOX_SHADOWS.medium,
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
    cursor: "pointer",
    ...customStyles
  };
};

/**
 * Card styles with accent left border
 * Used by: ValuePropCard
 * 
 * @param borderColor - The accent color for the left border
 * @param customStyles - Optional styles to merge
 * @returns CSSProperties object
 */
export const getAccentBorderCardStyles = (
  borderColor: string,
  customStyles?: CSSProperties
): CSSProperties => {
  return {
    ...getBaseCardStyles(),
    borderLeft: `4px solid ${borderColor}`,
    ...customStyles
  };
};

/**
 * Icon container styles (circle or square with gradient)
 * Used by: StepCard (circle), ValuePropCard (square)
 * 
 * @param options - Configuration for icon container
 * @returns CSSProperties object
 */
export const getIconContainerStyles = ({
  size = "48px",
  borderRadius = "12px",
  background = "linear-gradient(135deg, #059669 0%, #047857 100%)",
  color = "#ffffff",
  fontSize = "1.5rem",
  customStyles
}: {
  size?: string;
  borderRadius?: string;
  background?: string;
  color?: string;
  fontSize?: string;
  customStyles?: CSSProperties;
} = {}): CSSProperties => {
  return {
    width: size,
    height: size,
    borderRadius,
    background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize,
    fontWeight: "800",
    color,
    ...customStyles
  };
};

/**
 * Common gradient backgrounds used across components
 */
export const CARD_GRADIENTS = {
  white: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  whiteAlt: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
  greenLight: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
  greenDark: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  purpleLight: "linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)",
  purpleDark: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
  blueLight: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  blueDark: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
} as const;

/**
 * Returns gradient background style
 * 
 * @param gradient - The gradient name from CARD_GRADIENTS
 * @returns CSSProperties object
 */
export const getGradientBackgroundStyles = (
  gradient: keyof typeof CARD_GRADIENTS = 'white'
): CSSProperties => {
  return {
    background: CARD_GRADIENTS[gradient]
  };
};

/**
 * Stat ribbon specific styles
 * Used by: StatRibbon
 * 
 * @param customStyles - Optional styles to merge
 * @returns CSSProperties object
 */
export const getStatRibbonStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 160,
    background: "white",
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.card.compact,
    boxShadow: BOX_SHADOWS.small,
    border: "1px solid #f3f4f6",
    transition: "all 0.2s ease",
    ...customStyles
  };
};

/**
 * Step card specific styles
 * Used by: StepCard
 * 
 * @param customStyles - Optional styles to merge
 * @returns CSSProperties object
 */
export const getStepCardStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    ...getBaseCardStyles({
      padding: SPACING.card.standard,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }),
    ...customStyles
  };
};

/**
 * Testimonial card specific styles
 * Used by: TestimonialCard
 * 
 * @param customStyles - Optional styles to merge
 * @returns CSSProperties object
 */
export const getTestimonialCardStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    ...getBaseCardStyles({
      padding: SPACING.card.comfortable,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }),
    ...customStyles
  };
};

/**
 * Resource/Internal link card styles
 * Used by: ResourceCards, MintAIFeaturedCard
 * 
 * @param customStyles - Optional styles to merge
 * @returns CSSProperties object
 */
export const getResourceCardStyles = (customStyles?: CSSProperties): CSSProperties => {
  return {
    background: CARD_GRADIENTS.whiteAlt,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.card.standard,
    border: "1px solid #f3f4f6",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: SPACING.inline.md,
    ...customStyles
  };
};

/**
 * Vertical accent bar (used in resource cards)
 * 
 * @param color - Gradient colors
 * @returns CSSProperties object
 */
export const getAccentBarStyles = (
  colorFrom: string = "#059669",
  colorTo: string = "#047857"
): CSSProperties => {
  return {
    width: "12px",
    height: "40px",
    background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`,
    borderRadius: BORDER_RADIUS.small,
    flexShrink: 0
  };
};

