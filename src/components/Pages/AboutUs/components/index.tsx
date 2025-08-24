/**
 * About Us Components Module
 * 
 * Enterprise-grade exports for all About Us page components.
 * Each component is self-contained, performance-optimized, and follows
 * clean architecture principles with comprehensive error handling.
 * 
 * @module AboutUsComponents
 * @author SmarterPayouts Team
 * @since 2024
 */

// Section components (all ultra-modular with enterprise features)
export { default as HeroSection } from './HeroSection/index'; // ✅ Ultra-modular + Performance
export { default as TechnologySection } from './TechnologySection/index'; // ✅ Ultra-modular + Analytics
export { default as CompanyStorySection } from './CompanyStorySection/index'; // ✅ Ultra-modular + SEO
export { default as RecognitionSection } from './RecognitionSection/index'; // ✅ Ultra-modular + Accessibility
export { default as ValuesSection } from './ValuesSection/index'; // ✅ Ultra-modular + Monitoring
export { default as CTASection } from './CTASection/index'; // ✅ Ultra-modular + Conversion Tracking

// Enterprise utilities and components
export { default as ErrorBoundary } from './ErrorBoundary'; // ✅ Enterprise error handling

// Sub-components available for advanced usage:
// import { TechnologyHeader, TechnologyGrid } from './TechnologySection';
// import { HeroBackground, HeroHeader, HeroCTA } from './HeroSection';
// import { StoryHeader, StoryContent, StoryTimeline } from './CompanyStorySection';
