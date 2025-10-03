/**
 * Structured Settlement Info Hub - Main Export
 * 
 * Central export point for all Info Hub pages and components
 */

// Main landing page
export { default as StructuredSettlementInfoHubPage } from './StructuredSettlementInfoHubPage';

// Subpages
export * from './pages';

// Components
export * from './components';

// Data (excluding schema generators to avoid conflicts)
export { 
  featuredCards, 
  resourceCards, 
  sidebarRelatedArticles,
  generalFAQs,
  sellingFAQs,
  legalFAQs,
  financialFAQs,
  allFAQs,
  glossaryTerms,
  relatedArticlesMap,
  statesData,
  getStateData,
  getAllStates
} from './data';

// Utils (schema generators)
export { 
  generateArticleSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema,
  generatePageMetadata
} from './utils';

// Types
export * from './types';

