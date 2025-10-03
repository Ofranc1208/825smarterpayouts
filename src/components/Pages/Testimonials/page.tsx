/**
 * Testimonials Page - Orchestrator Pattern
 * 
 * Main page component that orchestrates all testimonial sections.
 * All page logic is broken down into focused, modular components.
 * 
 * Sections:
 * - HeroSection: Hero with title, subtitle, and rating overview
 * - FeaturedTestimonialsGrid: Main testimonial cards with images
 * - QuickTestimonialsSection: Compact testimonials grid
 * - CTASection: Call-to-action with buttons
 */

'use client';

import HeroSection from './components/HeroSection';
import FeaturedTestimonialsGrid from './components/FeaturedTestimonialsGrid';
import QuickTestimonialsSection from './components/QuickTestimonialsSection';
import CTASection from './components/CTASection';

function TestimonialsPage() {
  return (
    <>
      <HeroSection />
      <FeaturedTestimonialsGrid />
      <QuickTestimonialsSection />
      <CTASection />
    </>
  );
}

// Named export for flexibility
export { TestimonialsPage };

// Default export
export default TestimonialsPage;
