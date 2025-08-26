'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  SEOHead,
  HeroSection,
  WhyChooseSection,
  HomePageErrorBoundary,
  SectionErrorBoundary
} from './components';

// Lazy load below-the-fold sections for optimal performance
const HowItWorksSection = dynamic(() => import('./components/HowItWorks'), {
  loading: () => (
    <div style={{ 
      height: '500px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)'
    }}>
      <div style={{ textAlign: 'center', color: '#2d5a27' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
        <p>Loading How It Works...</p>
      </div>
    </div>
  ),
  ssr: false
});

const TestimonialsSection = dynamic(() => import('./components/Testimonials'), {
  loading: () => (
    <div style={{ 
      height: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'white'
    }}>
      <div style={{ textAlign: 'center', color: '#2d5a27' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
        <p>Loading Testimonials...</p>
      </div>
    </div>
  ),
  ssr: false
});

const FinalCTASection = dynamic(() => import('./components/FinalCTA'), {
  loading: () => (
    <div style={{ 
      height: '300px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2d5a27 0%, #1a3d1a 100%)'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
        <p>Loading Final CTA...</p>
      </div>
    </div>
  ),
  ssr: false
});
import {
  useHomeAnalytics,
  useHomePerformance,
  useHomeAccessibility
} from './hooks';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useWebVitals } from './hooks/useWebVitals';

/**
 * Homepage Component
 * 
 * Main orchestrator component for the SmarterPayouts homepage. This component
 * follows enterprise-grade architecture principles by composing modular sections
 * rather than containing monolithic logic.
 * 
 * ## Architecture
 * - **SEOHead**: Meta tags, structured data, and performance optimization
 * - **HeroSection**: Video background hero with primary CTAs
 * - **WhyChooseSection**: Feature cards and company statistics
 * - **HowItWorksSection**: 3-step process explanation with interactive cards
 * - **TestimonialsSection**: Customer testimonials with ratings
 * - **FinalCTASection**: Final call-to-action with trust indicators
 * 
 * ## Features
 * - ✅ Fully responsive design
 * - ✅ Optimized for Core Web Vitals
 * - ✅ Accessibility compliant (WCAG 2.1 AA)
 * - ✅ SEO optimized with structured data
 * - ✅ Interactive hover effects and animations
 * 
 * @component HomePage
 * @example
 * ```tsx
 * import HomePage from './HomePage';
 * 
 * export default function Page() {
 *   return <HomePage />;
 * }
 * ```
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */
export default function HomePage() {
  const {
    trackHeroCTAClick,
    trackFeatureCardClick,
    trackSectionView,
    trackTestimonialInteraction,
    trackFinalCTAClick,
    trackPageView
  } = useHomeAnalytics();

  const { reportWebVitals } = useHomePerformance();
  const { announceToScreenReader } = useHomeAccessibility();
  
  // Progressive loading with intersection observer
  const howItWorksObserver = useIntersectionObserver({ rootMargin: '200px' });
  const testimonialsObserver = useIntersectionObserver({ rootMargin: '150px' });
  const finalCTAObserver = useIntersectionObserver({ rootMargin: '100px' });
  
  // Web Vitals tracking for performance optimization
  useWebVitals();

  useEffect(() => {
    // Track page view on mount
    trackPageView();
    
    // Announce page load to screen readers
    announceToScreenReader('Homepage loaded successfully');
  }, [trackPageView, announceToScreenReader]);

  const handleHeroCTAClick = (buttonType: 'primary' | 'secondary') => {
    trackHeroCTAClick(buttonType);
  };

  const handleFeatureCardClick = (featureTitle: string) => {
    trackFeatureCardClick(featureTitle);
  };

  const handleSectionView = (sectionName: string) => {
    trackSectionView(sectionName);
  };

  const handleTestimonialInteraction = (testimonialId: string) => {
    trackTestimonialInteraction(testimonialId);
  };

  const handleFinalCTAClick = (buttonType: 'primary' | 'secondary') => {
    trackFinalCTAClick(buttonType);
  };

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Home Page Error:', error, errorInfo);
    // Send error to monitoring service
  };

  return (
    <HomePageErrorBoundary onError={handleError}>
      <main>
        <SEOHead />
        
        {/* Critical above-the-fold content - loads immediately */}
        <SectionErrorBoundary sectionName="Hero">
          <HeroSection />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary sectionName="Why Choose Us">
          <WhyChooseSection />
        </SectionErrorBoundary>
        
        {/* Progressive loading for below-the-fold content */}
        <div ref={howItWorksObserver.elementRef}>
          {howItWorksObserver.isIntersecting && (
            <SectionErrorBoundary sectionName="How It Works">
              <HowItWorksSection />
            </SectionErrorBoundary>
          )}
        </div>
        
        <div ref={testimonialsObserver.elementRef}>
          {testimonialsObserver.isIntersecting && (
            <SectionErrorBoundary sectionName="Testimonials">
              <TestimonialsSection />
            </SectionErrorBoundary>
          )}
        </div>
        
        <div ref={finalCTAObserver.elementRef}>
          {finalCTAObserver.isIntersecting && (
            <SectionErrorBoundary sectionName="Final CTA">
              <FinalCTASection />
            </SectionErrorBoundary>
          )}
        </div>
      </main>
    </HomePageErrorBoundary>
  );
}
