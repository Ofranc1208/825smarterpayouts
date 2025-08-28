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
  sections: string[];
  keyProvisions: string[];
  impact: string;
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
  federalLaws: FederalLawData[];
  courtProcess: CourtApprovalProcess[];
  taxImplications: TaxImplication[];
  resources: LegalResource[];
  disclaimer: {
    title: string;
    content: string;
    warning: string;
  };
}
