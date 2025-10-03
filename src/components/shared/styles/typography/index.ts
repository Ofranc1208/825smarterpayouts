/**
 * 🎨 TYPOGRAPHY SYSTEM - Orchestrator
 * 
 * Central export point for all typography utilities.
 * This orchestrator pattern allows you to:
 * 1. Import everything from here (convenience)
 * 2. Import specific modules for better tree-shaking
 * 
 * @module Typography
 * 
 * @example
 * // Import everything (convenience)
 * import { TYPOGRAPHY, TEXT_PRESETS, getHeadingStyles } from '@/src/components/shared/styles/typography';
 * 
 * @example
 * // Import specific modules (better tree-shaking)
 * import { TYPOGRAPHY } from '@/src/components/shared/styles/typography/fontScales';
 * import { getBodyStyles } from '@/src/components/shared/styles/typography/textHelpers';
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                              BARREL EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Font Scales (Core Constants)
export { TYPOGRAPHY } from './fontScales';
export type { default as TypographyType } from './fontScales';

// Text Helpers (Utility Functions)
export {
  getHeadingStyles,
  getBodyStyles,
  getBadgeStyles,
  getCardTitleStyles,
  getResponsiveHeadingStyles,
} from './textHelpers';

// Text Presets (Pre-configured Styles)
export { TEXT_PRESETS } from './textPresets';

// Icon Sizes
export { ICON_SIZES } from './iconSizes';

// ═══════════════════════════════════════════════════════════════════════════════
//                              DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

// Re-export TYPOGRAPHY as default for convenience
export { default } from './fontScales';

