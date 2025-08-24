/**
 * Hero Section Module
 * 
 * Ultra-modular hero section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the hero section display.
 * 
 * @module HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main hero section component
export { default as HeroSection } from './AboutHeroSection';
export { default } from './AboutHeroSection';

// Individual sub-components for flexibility
export { default as HeroBackground } from './HeroBackground';
export { default as HeroHeader } from './HeroHeader';
export { default as HeroCTA } from './HeroCTA';

// Data and configuration
export { HERO_CONFIG, HERO_CTA_BUTTONS, HERO_ANIMATIONS } from './data';

// Types
export type * from './types';

// Named exports for direct import
export { default as HeroSectionBackground } from './HeroBackground';
export { default as HeroSectionHeader } from './HeroHeader';
export { default as HeroSectionCTA } from './HeroCTA';
