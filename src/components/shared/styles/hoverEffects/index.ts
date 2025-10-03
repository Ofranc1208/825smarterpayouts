/**
 * ✨ HOVER EFFECTS SYSTEM - Orchestrator
 * 
 * Central export point for all hover effect utilities.
 * This orchestrator pattern allows you to:
 * 1. Import everything from here (convenience)
 * 2. Import specific modules for better tree-shaking
 * 
 * @module HoverEffects
 * 
 * @example
 * // Import everything (convenience)
 * import { createFloatHover, createSlideHover } from '@/src/components/shared/styles/hoverEffects';
 * 
 * @example
 * // Import specific modules (better tree-shaking)
 * import { createFloatHover } from '@/src/components/shared/styles/hoverEffects/floatEffects';
 * import { createFAQHover } from '@/src/components/shared/styles/hoverEffects/specialEffects';
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                              BARREL EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Type Definitions
export type {
  FloatHoverOptions,
  SlideHoverOptions,
  ScaleHoverOptions,
} from './types';

// Float Effects
export { createFloatHover } from './floatEffects';

// Slide Effects
export { createSlideHover } from './slideEffects';

// Scale Effects
export { createScaleHover } from './scaleEffects';

// Special Effects
export { createStatHover, createFAQHover } from './specialEffects';

