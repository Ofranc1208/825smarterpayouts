/**
 * 🎨 GLOBAL DESIGN SYSTEM - Barrel Export
 * 
 * Central import location for all design tokens and utilities.
 * Import everything you need from this single location.
 * 
 * @example
 * import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
 * 
 * @example
 * import { 
 *   COLORS, 
 *   TYPOGRAPHY, 
 *   SPACING,
 *   getBaseCardStyles,
 *   createFloatHover 
 * } from '@/src/components/shared/styles';
 */

// Design Tokens
export * from './typography';
export * from './colorThemes';
export * from './spacing';
export * from './cardStyles';
export * from './hoverEffects';

