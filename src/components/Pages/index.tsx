/**
 * Pages Module Export
 * 
 * Central export for all page-level components organized under
 * the Pages directory. This provides a clean import structure
 * for page components used throughout the application.
 * 
 * @module Pages
 * @author SmarterPayouts Team
 * @since 2024
 */

// Export page components
export { default as HomePage } from './Home';
export { HomePage as Home } from './Home';
export { default as MintChatPage } from './MintChat';
export { MintChatPage as MintChat } from './MintChat';
export { default as AboutPage } from './AboutUs';
export { AboutPage as AboutUs } from './AboutUs';
export { default as YouTubeChannelPage } from './youtube-channel';
export { YouTubeChannelPage as YouTubeChannel } from './youtube-channel';
export { default as ContactPage } from './contact';
export { ContactPage as Contact } from './contact';
export { default as TestimonialsPage } from './Testimonials/page';
export { TestimonialsPage as Testimonials } from './Testimonials/page';
export { default as StructuredSettlementInfoHubPage } from './StructuredSettlementInfoHub';
export { StructuredSettlementInfoHubPage as StructuredSettlementInfoHub } from './StructuredSettlementInfoHub';

// Re-export individual components for flexibility
export {
  HeroSection as MintChatHeroSection,
  ChatSection as MintChatSection,
  IndustryProblemsSection as MintChatIndustryProblems,
  SolutionSection as MintChatSolution,
  BenefitsGrid as MintChatBenefits,
  MintBadgeComponent as MintChatBadge
} from './MintChat';
