/**
 * Home Page Module
 * 
 * Complete homepage implementation moved from app/page.tsx
 * to maintain clean separation between routing (app/) and page logic (src/).
 * 
 * This module contains the full homepage with all sections:
 * - Hero section with video background and CTAs
 * - Why Choose SmarterPayouts section with feature cards
 * - How It Works 3-step process
 * - Testimonials preview section
 * - Final call-to-action section
 * - SEO optimization and structured data
 * 
 * @module Home
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main home page component (modular version)
export { default as HomePage } from './HomePage';
export { default } from './HomePage';

// Legacy page component (to be removed after migration)
export { default as HomePageLegacy } from './page';

// Individual section components
export {
  SEOHead as HomeSEOHead,
  HeroSection as HomeHeroSection,
  WhyChooseSection as HomeWhyChooseSection,
  HowItWorksSection as HomeHowItWorksSection,
  TestimonialsSection as HomeTestimonialsSection,
  FinalCTASection as HomeFinalCTASection
} from './components';
