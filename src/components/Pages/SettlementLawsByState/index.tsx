// Settlement Laws by State - Lean Router/Orchestrator
// Enterprise-grade modular architecture - under 150 lines per complexity rule

'use client';

import { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import the complete state data and types
import { stateLawDetails } from './data/content';
import type { StateDataCollection } from './types';

// Import enterprise components - Critical above-the-fold
import SEOHead from './components/SEOHead/seo-section/SEOHead';
import PageErrorBoundary from './components/ErrorBoundary/PageErrorBoundary';
import SectionErrorBoundary from './components/ErrorBoundary/SectionErrorBoundary';
import HeroSection from './components/HeroSection';
import DisclaimerSection from './components/DisclaimerSection';
import SearchSection from './components/SearchSection';

// Dynamic imports for performance optimization
const StatesAccordion = dynamic(() => import('./components/StatesAccordion'), {
  loading: () => (
    <div style={{
      padding: '3rem 0',
      textAlign: 'center',
      background: '#f8fafc'
    }}>
      <div style={{
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #059669',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading state laws...</p>
      <style dangerouslySetInnerHTML={{
        __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`
      }} />
    </div>
  ),
  ssr: false
});

const FinalCTASection = dynamic(() => import('./components/FinalCTASection'), {
  loading: () => (
    <div style={{
      padding: '2rem 0',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: 'white'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
      <p>Loading call-to-action...</p>
    </div>
  ),
  ssr: false
});

// Import enterprise hooks
import { useStateLawsAnalytics, useStateLawsPerformance, useStateLawsAccessibility } from './hooks';

// Import utilities
import { searchStates } from './utils';

// All states list
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Grouping function
function groupStatesAlpha(states: string[]) {
  const groups: { [letter: string]: string[] } = {};
  states.forEach(state => {
    const letter = state[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  });
  return groups;
}

export default function SettlementLawsByStatePage() {
  const [search, setSearch] = useState<string>('');
  const [openState, setOpenState] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    mountTime?: number;
    searchTime?: number;
    accordionTime?: number;
  }>({});

  // Type the state data properly
  const typedStateLawDetails = stateLawDetails as StateDataCollection;

  // Initialize enterprise hooks
  const analytics = useStateLawsAnalytics();
  const performance = useStateLawsPerformance();
  const accessibility = useStateLawsAccessibility();

  // Track page performance and Web Vitals
  useEffect(() => {
    const startTime = window.performance.now();
    
    // Track page mount time
    const mountTime = window.performance.now() - startTime;
    setPerformanceMetrics(prev => ({ ...prev, mountTime }));
    
    // Track page view - using available method
    // analytics.trackPageView('/structured-settlement-laws-by-state');
    
    // Announce page load to screen readers - using available method
    // accessibility.announcePageLoad('Settlement Laws by State page loaded with search and accordion interface');
    
    // Web Vitals tracking
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      // Track Core Web Vitals if available
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }, [analytics, accessibility]);

  // Enhanced search with analytics and performance tracking
  const filteredStates = search.trim() ? searchStates(states, search) : states;
  const grouped = groupStatesAlpha(filteredStates);

  // Enhanced accordion handler with analytics, accessibility, and performance tracking
  const handleAccordionClick = (state: string): void => {
    const startTime = window.performance.now();
    const isOpening = openState !== state;
    setOpenState(prev => (prev === state ? null : state));
    
    // Track performance
    const accordionTime = window.performance.now() - startTime;
    setPerformanceMetrics(prev => ({ ...prev, accordionTime }));
    
    // Track analytics
    analytics.trackStateClick(state, isOpening ? 'open' : 'close');
    
    // Announce to screen readers
    accessibility.announceAccordionChange(state, isOpening);
  };

  // Enhanced search handler with performance tracking
  const handleSearchChange = (value: string): void => {
    const startTime = window.performance.now();
    setSearch(value);
    
    if (value.trim()) {
      const results = searchStates(states, value);
      const searchTime = window.performance.now() - startTime;
      setPerformanceMetrics(prev => ({ ...prev, searchTime }));
      
      analytics.trackSearch(value, results.length);
      accessibility.announceSearchResults(results.length, value);
    }
  };

  // CTA handlers
  const handlePhoneClick = () => analytics.trackPhoneClick('Hero Section');
  const handleChatClick = () => analytics.trackChatClick('Hero Section');

  return (
    <PageErrorBoundary>
      <SEOHead />
      <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        
        <HeroSection 
          onPhoneClick={handlePhoneClick}
          onChatClick={handleChatClick}
        />

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <DisclaimerSection />
          
          <SearchSection 
            searchValue={search}
            onSearchChange={handleSearchChange}
          />

          <SectionErrorBoundary sectionName="States Accordion">
            <StatesAccordion
              grouped={grouped}
              openState={openState}
              onAccordionClick={handleAccordionClick}
              stateLawDetails={typedStateLawDetails}
              filteredStates={filteredStates}
              search={search}
            />
          </SectionErrorBoundary>
        </main>

        <FinalCTASection />
      </div>
    </PageErrorBoundary>
  );
}