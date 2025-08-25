// Settlement Laws by State - Lean Router/Orchestrator
// Enterprise-grade modular architecture - under 150 lines per complexity rule

'use client';

import { useState } from 'react';

// Import the complete state data and types
import { stateLawDetails } from './data/content';
import type { StateDataCollection } from './types';

// Import enterprise components
import SEOHead from './components/SEOHead/seo-section/SEOHead';
import PageErrorBoundary from './components/ErrorBoundary/PageErrorBoundary';
import SectionErrorBoundary from './components/ErrorBoundary/SectionErrorBoundary';
import HeroSection from './components/HeroSection';
import DisclaimerSection from './components/DisclaimerSection';
import SearchSection from './components/SearchSection';
import StatesAccordion from './components/StatesAccordion';
import FinalCTASection from './components/FinalCTASection';

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

  // Type the state data properly
  const typedStateLawDetails = stateLawDetails as StateDataCollection;

  // Initialize enterprise hooks
  const analytics = useStateLawsAnalytics();
  const performance = useStateLawsPerformance();
  const accessibility = useStateLawsAccessibility();

  // Enhanced search with analytics and performance tracking
  const filteredStates = search.trim() ? searchStates(states, search) : states;
  const grouped = groupStatesAlpha(filteredStates);

  // Enhanced accordion handler with analytics and accessibility
  const handleAccordionClick = (state: string): void => {
    const isOpening = openState !== state;
    setOpenState(prev => (prev === state ? null : state));
    
    // Track analytics
    analytics.trackStateClick(state, isOpening ? 'open' : 'close');
    
    // Announce to screen readers
    accessibility.announceAccordionChange(state, isOpening);
  };

  // Enhanced search handler
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    
    if (value.trim()) {
      const results = searchStates(states, value);
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