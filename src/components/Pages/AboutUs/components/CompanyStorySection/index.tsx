/**
 * Company Story Section Module
 * 
 * Ultra-modular company story section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the company story display.
 * 
 * @module CompanyStorySection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main company story section component
export { default as CompanyStorySection } from './CompanyStorySection';
export { default } from './CompanyStorySection';

// Individual sub-components for flexibility
export { default as StoryHeader } from './StoryHeader';
export { default as StoryContent } from './StoryContent';
export { default as StoryTimeline } from './StoryTimeline';

// Data and configuration
export { COMPANY_STORY_CONFIG, STORY_PARAGRAPHS, COMPANY_MILESTONES } from './data';

// Types
export type * from './types';

// Named exports for direct import
export { default as CompanyStorySectionHeader } from './StoryHeader';
export { default as CompanyStorySectionContent } from './StoryContent';
export { default as CompanyStorySectionTimeline } from './StoryTimeline';
