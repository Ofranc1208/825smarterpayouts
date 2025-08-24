/**
 * Why Choose Section Module
 * 
 * Ultra-modular why choose section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the feature benefits showcase.
 * 
 * @module WhyChooseSection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main why choose section component
export { default as WhyChooseSection } from './WhyChooseSection';
export { default } from './WhyChooseSection';

// Individual sub-components for flexibility
export { default as WhyChooseHeader } from './WhyChooseHeader';
export { default as FeatureBenefitCard } from './FeatureBenefitCard';
export { default as FeatureBenefitsGrid } from './FeatureBenefitsGrid';
export { default as StatisticsBar } from './StatisticsBar';

// Data and configuration
export { FEATURE_BENEFITS, STATISTICS_DATA } from './data';
