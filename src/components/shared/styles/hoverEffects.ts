/**
 * ✨ HOVER EFFECTS SYSTEM - Backwards Compatibility Layer
 * 
 * This file maintains backwards compatibility by re-exporting from the modular
 * hover effects system. All new code should import from the modular structure.
 * 
 * @deprecated Prefer importing from specific modules:
 * - '@/src/components/shared/styles/hoverEffects/floatEffects'
 * - '@/src/components/shared/styles/hoverEffects/slideEffects'
 * - '@/src/components/shared/styles/hoverEffects/scaleEffects'
 * - '@/src/components/shared/styles/hoverEffects/specialEffects'
 * 
 * Or use the orchestrator:
 * - '@/src/components/shared/styles/hoverEffects' (barrel export)
 * 
 * @module HoverEffects (Legacy)
 */

// ═══════════════════════════════════════════════════════════════════════════════
//                      RE-EXPORTS FOR BACKWARDS COMPATIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

export type {
  FloatHoverOptions,
  SlideHoverOptions,
  ScaleHoverOptions,
} from './hoverEffects/types';

export { createFloatHover } from './hoverEffects/floatEffects';
export { createSlideHover } from './hoverEffects/slideEffects';
export { createScaleHover } from './hoverEffects/scaleEffects';
export { createStatHover, createFAQHover } from './hoverEffects/specialEffects';

// This file now acts as a simple re-export layer.
// The actual implementation is in the modular hoverEffects/ folder.
