'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import {
  HeroSection,
  ContactForm,
  ContactInfo,
  ContactPageSEOHead,
  MintAISection,
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
          padding: "4rem 0",
          background: "#f9fafb"
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            <ContactForm onFormSubmit={handleFormSubmit} />
            <div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                textAlign: "center"
              }}>
                Other Ways to Reach Us
              </h3>
              <ContactInfo onCardClick={handleContactMethodClick} />
            </div>
          </div>
        </section>

        <MintAISection onCTAClick={handleCTAClick} />
        <FAQSection onFAQClick={handleFAQClick} />
      </main>
    </ContactPageErrorBoundary>
  );
}