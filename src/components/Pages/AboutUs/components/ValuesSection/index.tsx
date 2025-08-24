/**
 * Values Section Module
 * 
 * Ultra-modular values section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the company values showcase.
 * 
 * @module ValuesSection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main values section component
export { default as ValuesSection } from './ValuesSection';
export { default } from './ValuesSection';

// Individual sub-components for flexibility
export { default as ValuesHeader } from './ValuesHeader';
export { default as ValueCard } from './ValueCard';
export { default as ValuesGrid } from './ValuesGrid';

// Data and configuration
export { COMPANY_VALUES } from './data';
