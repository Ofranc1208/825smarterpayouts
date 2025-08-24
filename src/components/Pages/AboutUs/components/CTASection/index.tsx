/**
 * CTA Section Module
 * 
 * Ultra-modular CTA section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the CTA section display.
 * 
 * @module CTASection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main CTA section component
export { default as CTASection } from './CTASection';
export { default } from './CTASection';

// Individual sub-components for flexibility
export { default as CTABackground } from './CTABackground';
export { default as CTAHeader } from './CTAHeader';
export { default as CTAButtons } from './CTAButtons';

// Data and configuration
export { CTA_CONFIG, CTA_BUTTONS, CTA_ANIMATIONS } from './data';

// Types
export type * from './types';

// Named exports for direct import
export { default as CTASectionBackground } from './CTABackground';
export { default as CTASectionHeader } from './CTAHeader';
export { default as CTASectionButtons } from './CTAButtons';
