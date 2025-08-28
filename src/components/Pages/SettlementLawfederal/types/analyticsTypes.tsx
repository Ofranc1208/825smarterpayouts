// Settlement Law Federal Analytics Types
// Following enterprise patterns from Home and CourtApproval pages

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  page?: string;
}

export interface SettlementLawAnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  ctaClicks: {
    getQuote: number;
    chatMint: number;
  };
  sectionViews: {
    hero: number;
    disclaimer: number;
    federalLaws: number;
    courtApproval: number;
    taxImplications: number;
    references: number;
    resources: number;
    finalCTA: number;
  };
  linkClicks: {
    external: number;
    internal: number;
    legal: number;
  };
  scrollDepth: {
    '25%': number;
    '50%': number;
    '75%': number;
    '100%': number;
  };
}

export interface UseSettlementLawAnalyticsReturn {
  trackPageView: () => void;
  trackHeroCTAClick: (buttonType: 'primary' | 'secondary') => void;
  trackSectionView: (sectionName: string) => void;
  trackLegalLinkClick: (linkTitle: string, linkUrl: string, linkType: 'internal' | 'external') => void;
  trackResourceDownload: (resourceTitle: string, resourceType: string) => void;
  trackScrollDepth: (depth: number) => void;
  trackFinalCTAClick: (buttonType: 'primary' | 'secondary') => void;
  trackDisclaimerView: () => void;
  trackFederalLawExpand: (lawTitle: string) => void;
  trackCourtProcessStep: (stepNumber: number, stepTitle: string) => void;
  trackTaxImplicationView: (category: string) => void;
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
}

export interface UseSettlementLawPerformanceReturn {
  trackPageLoad: () => void;
  trackSectionLoad: (sectionName: string) => void;
  trackResourceLoad: (resourceType: string) => void;
  getPerformanceMetrics: () => PerformanceMetrics | null;
  trackCoreWebVitals: () => void;
}
