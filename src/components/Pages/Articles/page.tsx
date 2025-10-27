/**
 * Articles Page - Main Orchestrator with optimized spacing
 *
 * Coordinates and renders all Articles page sections using the Orchestra pattern.
 * Imports modular components from ./components for clean separation of concerns.
 * Reduced padding and margins throughout for cleaner, more compact layout.
 *
 * @component
 * @returns {JSX.Element} Complete Articles page
 *
 * @example
 * <ArticlesPage />
 */

import {
  HeroSection,
  ArticlesGrid,
  TestimonialSection,
  NewsletterSection,
  FAQSection,
  CTASection
} from './components';

export default function ArticlesPage() {
  return (
    <>
      <HeroSection />
      <ArticlesGrid />
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <TestimonialSection />
        <NewsletterSection />
        <FAQSection />
      </div>
      <CTASection />
    </>
  );
}

