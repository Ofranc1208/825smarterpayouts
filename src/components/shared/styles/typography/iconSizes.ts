/**
 * 🎨 ICON SIZES - Standardized Icon Dimensions
 * 
 * Consistent icon size scale for visual hierarchy.
 * Use these constants for all icon sizing needs.
 * 
 * @module IconSizes
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                          ICON SIZE DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Icon Size Scale
 * Standardized icon sizes for consistent visual hierarchy
 */
export const ICON_SIZES = {
  xsmall: '16px',      // Small icons, badges
  small: '32px',       // Small buttons, inline icons
  medium: '48px',      // Standard card icons (most common)
  large: '64px',       // Featured/emphasized icons
  xlarge: '80px',      // Hero icons, large features
} as const;

export default ICON_SIZES;

