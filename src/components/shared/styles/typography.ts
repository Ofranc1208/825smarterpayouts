/**
 * 🎨 TYPOGRAPHY SYSTEM - Backwards Compatibility Layer
 * 
 * This file maintains backwards compatibility by re-exporting from the modular
 * typography system. All new code should import from the modular structure.
 * 
 * @deprecated Prefer importing from specific modules:
 * - '@/src/components/shared/styles/typography/fontScales'
 * - '@/src/components/shared/styles/typography/textHelpers'
 * - '@/src/components/shared/styles/typography/textPresets'
 * - '@/src/components/shared/styles/typography/iconSizes'
 * 
 * Or use the orchestrator:
 * - '@/src/components/shared/styles/typography' (barrel export)
 * 
 * @module Typography (Legacy)
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                      RE-EXPORTS FOR BACKWARDS COMPATIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

export { TYPOGRAPHY, default } from './typography/fontScales';
export {
  getHeadingStyles,
  getBodyStyles,
  getBadgeStyles,
  getCardTitleStyles,
  getResponsiveHeadingStyles,
} from './typography/textHelpers';
export { TEXT_PRESETS } from './typography/textPresets';
export { ICON_SIZES } from './typography/iconSizes';

// This file now acts as a simple re-export layer.
// The actual implementation is in the modular typography/ folder.
