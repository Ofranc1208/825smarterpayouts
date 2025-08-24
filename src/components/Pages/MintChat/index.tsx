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
export { default as HeroSection } from './components/HeroSection';
export { default as ChatSection } from './components/ChatSection';
export { default as IndustryProblemsSection } from './components/IndustryProblemsSection';
export { default as SolutionSection } from './components/SolutionSection';
export { default as BenefitsGrid } from './components/BenefitsGrid';
export { default as MintBadge } from './components/MintBadge';

// Note: Hooks are not exported to prevent server-side rendering issues
// They are available for internal use within the module
