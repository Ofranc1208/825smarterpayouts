/**
 * Hero Section Module
 * 
 * Ultra-modular hero section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the hero section functionality.
 * 
 * @module HeroSection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main hero section component
export { default as HeroSection } from './HeroSection';
export { default } from './HeroSection';

// Individual sub-components for flexibility
export { default as HeroBackground } from './HeroBackground';
export { default as HeroContent } from './HeroContent';
export { default as HeroCTAButtons } from './HeroCTAButtons';

// Data and configuration
export { HERO_CONFIG } from './data';
