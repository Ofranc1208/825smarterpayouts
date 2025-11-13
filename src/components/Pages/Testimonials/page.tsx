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
import TestimonialCarousel from './components/TestimonialCarousel';
import QuickTestimonialsSection from './components/QuickTestimonialsSection';
import CTASection from './components/CTASection';
import { SPACING } from '@/src/components/shared/styles';

function TestimonialsPage() {
  return (
    <>
      {/* Main Testimonials Section with Background */}
      <section style={{
        position: 'relative',
        display: 'block',
        padding: '40px 0 100px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        overflow: 'hidden'
      }}>
        {/* Decorative Floating Shapes */}
        <div style={{
          position: 'absolute',
          bottom: '255px',
          left: '70px',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatBobY 3s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '155px',
          right: '260px',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'slideInRight 1s ease-in-out',
          pointerEvents: 'none'
        }} />

        <div style={{
          width: '100%',
          maxWidth: SPACING.container.maxWidth,
          margin: '0 auto',
          padding: `0 ${SPACING.container.padding}`
        }}>
          <HeroSection />
          <TestimonialCarousel />
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes floatBobY {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* Quick Testimonials Section */}
      <QuickTestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

// Named export for flexibility
export { TestimonialsPage };

// Default export
export default TestimonialsPage;
