/**
 * Technology Section Module
 * 
 * Ultra-modular technology section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the technology showcase.
 * 
 * @module TechnologySection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main technology section component
export { default as TechnologySection } from './TechnologySection';
export { default } from './TechnologySection';

// Individual sub-components for flexibility
export { default as TechnologyHeader } from './TechnologyHeader';
export { default as TechnologyFeatureCard } from './TechnologyFeatureCard';
export { default as TechnologyGrid } from './TechnologyGrid';
export { default as TechnologyCTA } from './TechnologyCTA';

// Data and configuration
export { TECHNOLOGY_FEATURES } from './data';

// Named exports for direct import
export { default as TechnologySectionHeader } from './TechnologyHeader';
export { default as TechnologySectionFeatureCard } from './TechnologyFeatureCard';
export { default as TechnologySectionGrid } from './TechnologyGrid';
export { default as TechnologySectionCTA } from './TechnologyCTA';
