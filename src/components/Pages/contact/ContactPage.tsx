'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import {
  HeroSection,
  ContactForm,
  ContactInfo,
  ContactPageSEOHead,
  FAQSection,
  ContactPageErrorBoundary
} from './components';
import {
  useContactAnalytics,
  useContactPerformance
} from './hooks';

interface ContactPageProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ContactPage({ className, style }: ContactPageProps) {
  const { 
    trackCTAClick, 
    trackContactMethodClick, 
    trackFAQInteraction, 
    trackPageView 
  } = useContactAnalytics();
  
  const { reportWebVitals } = useContactPerformance();

  useEffect(() => {
    // Track page view on mount
    trackPageView();
  }, [trackPageView]);

  const handleCTAClick = (buttonId: string) => {
    trackCTAClick(buttonId);
  };

  const handleContactMethodClick = (method: string) => {
    trackContactMethodClick(method);
  };

  const handleFAQClick = (questionId: string) => {
    trackFAQInteraction(questionId);
  };

  const handleFormSubmit = (formData: FormData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Contact Page Error:', error, errorInfo);
    // Send error to monitoring service
  };

  return (
    <ContactPageErrorBoundary onError={handleError}>
      <Head>
        <ContactPageSEOHead />
      </Head>
      
      <main 
        className={className}
        style={{
          minHeight: '100vh',
          background: '#ffffff',
          ...style
        }}
      >
        <HeroSection onCTAClick={handleCTAClick} />
        
        <section style={{
          padding: "1rem 0",
          background: "#f9fafb"
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0.75rem',
            alignItems: 'start',
            justifyContent: 'center'
          }}>
            <ContactForm onFormSubmit={handleFormSubmit} />
            <div style={{ width: '100%' }}>
              <ContactInfo onCardClick={handleContactMethodClick} />
            </div>
          </div>
        </section>

        <FAQSection onFAQClick={handleFAQClick} />
      </main>
    </ContactPageErrorBoundary>
  );
}