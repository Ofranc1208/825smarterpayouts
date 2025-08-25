/**
 * Mint Chat Module Export
 * 
 * Clean export for the self-contained Mint chat system.
 * This module includes all necessary components for the complete chat experience.
 * 
 * @module MintChat
 * @author SmarterPayouts Team
 * @since 2024
 */

export { default } from './MintChatPage';
export { default as MintChatPage } from './MintChatPage';

// Export individual components for potential reuse
export { HeroSection, ChatSection, IndustryProblemsSection, SolutionSection, BenefitsGrid } from './components';

// Export modular Hero components for advanced usage
export { MintBadgeComponent } from './components/Hero';

// Note: Hooks are not exported to prevent server-side rendering issues
// They are available for internal use within the module
