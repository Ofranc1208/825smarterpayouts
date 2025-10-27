/**
 * Testimonials Page - Clean Modern Design
 *
 * Main page component featuring clean, authentic testimonial design:
 * - HeroSection: Clean hero with direct title and transparent messaging
 * - FeaturedTestimonialsGrid: Modern cards with glassmorphism effects
 * - QuickTestimonialsSection: Compact testimonials with smooth animations
 * - CTASection: Optimized call-to-action section
 *
 * Features:
 * - Clean design without distracting badges
 * - Authentic testimonials emphasizing transparency
 * - Modern glassmorphism effects throughout
 * - Professional typography with gradient accents
 * - Smooth animations and enhanced hover effects
 * - Real client stories with detailed experiences
 * - Professional profile images from Unsplash
 * - Responsive layouts optimized for all devices
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
