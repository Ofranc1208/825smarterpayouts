// Search and media interaction tracking utilities
import { trackEvent } from './eventTracking';

// Track search interactions
export const trackSearch = (
  query: string, 
  resultsCount: number, 
  searchType: string = 'site_search'
): void => {
  trackEvent(
    'search',
    'search',
    'query',
    query,
    resultsCount,
    {
      search_term: query,
      search_results: resultsCount,
      search_type: searchType
    }
  );
};

// Track video interactions
export const trackVideoInteraction = (
  videoId: string,
  action: 'play' | 'pause' | 'complete' | 'progress',
  progress?: number
): void => {
  trackEvent(
    'video_interaction',
    'media',
    action,
    videoId,
    progress,
    {
      video_id: videoId,
      video_action: action,
      video_progress: progress
    }
  );
};

// Track FAQ interactions
export const trackFAQInteraction = (
  faqId: string,
  question: string,
  action: 'open' | 'close' | 'view'
): void => {
  trackEvent(
    'faq_interaction',
    'engagement',
    action,
    faqId,
    undefined,
    {
      faq_id: faqId,
      faq_question: question.substring(0, 100),
      interaction_type: action
    }
  );
};

// Track accordion/collapsible interactions
export const trackAccordionInteraction = (
  sectionId: string,
  sectionTitle: string,
  action: 'expand' | 'collapse'
): void => {
  trackEvent(
    'accordion_interaction',
    'engagement',
    action,
    sectionId,
    undefined,
    {
      section_id: sectionId,
      section_title: sectionTitle.substring(0, 50),
      action: action
    }
  );
};
