'use client';

import {
  SEOHead,
  HeroSection,
  WhyChooseSection,
  HowItWorksSection,
  TestimonialsSection,
  FinalCTASection
} from './components';

/**
 * Homepage Component
 * 
 * Complete homepage composed of modular sections:
 * - SEOHead: Meta tags, structured data, and SEO optimization
 * - HeroSection: Video background hero with main CTAs
 * - WhyChooseSection: Feature cards and statistics
 * - HowItWorksSection: 3-step process explanation
 * - TestimonialsSection: Customer testimonials preview
 * - FinalCTASection: Final call-to-action with trust indicators
 * 
 * This component follows clean architecture principles by composing
 * smaller, focused section components rather than containing all logic
 * in a single monolithic component.
 * 
 * @component HomePage
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function HomePage() {
  return (
    <main className="home-main">
      <header>
        {/* Navbar is handled globally by ConditionalNavbar */}
      </header>
      
      <SEOHead />
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTASection />

      {/* Add shimmer animation CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
      `}</style>
    </main>
  );
}
