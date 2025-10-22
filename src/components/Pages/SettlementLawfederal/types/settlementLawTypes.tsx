// Settlement Law Federal Types
// Following enterprise patterns from Home and CourtApproval pages

export interface SettlementLawSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string[];
  links?: SettlementLawLink[];
}

export interface SettlementLawLink {
  id: string;
  title: string;
  url: string;
  type: 'internal' | 'external';
  description?: string;
}

export interface FederalLawData {
  id: string;
  title: string;
  description: string;
  year: number;
  publicLaw?: string;
  sections: string[];
  keyProvisions: string[];
  impact: string;
  whyItMatters?: string;
  consumerTakeaway?: string;
}

export interface CourtApprovalProcess {
  step: number;
  title: string;
  description: string;
  requirements: string[];
  timeline: string;
  icon: string;
}

export interface TaxImplication {
  category: string;
  description: string;
  code: string;
  impact: 'positive' | 'neutral' | 'negative';
  details: string[];
}

export interface LegalResource {
  id: string;
  title: string;
  type: 'statute' | 'case-law' | 'regulation' | 'guidance';
  url: string;
  description: string;
  relevance: 'high' | 'medium' | 'low';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'taxation' | 'transfers' | 'legal' | 'general';
}

export interface GovernmentResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'statute' | 'guidance' | 'model-law' | 'regulation';
  relevance: 'critical' | 'high' | 'medium' | 'low';
}

export interface BestPractice {
  id: string;
  title: string;
  description: string;
  category: 'setup' | 'transfers' | 'records' | 'general';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface IntroductionData {
  title: string;
  description: string;
  keyPoints: string[];
}

export interface PracticalApplication {
  title: string;
  description: string;
  details: string[];
}

export interface SettlementLawPageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaButtons: {
      primary: { text: string; href: string; };
      secondary: { text: string; href: string; };
    };
  };
  introduction: IntroductionData;
  federalLaws: FederalLawData[];
  practicalApplications: {
    taxFreeTreatment: PracticalApplication;
    transfersAndSales: PracticalApplication;
    courtApproval: PracticalApplication;
  };
  faq: FAQItem[];
  governmentResources: GovernmentResource[];
  bestPractices: BestPractice[];
  courtProcess: CourtApprovalProcess[];
  taxImplications: TaxImplication[];
  resources: LegalResource[];
  disclaimer: {
    title: string;
    content: string;
    warning: string;
    isExpandable?: boolean;
    shortText?: string;
  };
}
