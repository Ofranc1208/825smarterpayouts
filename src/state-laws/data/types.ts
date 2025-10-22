// Core state laws type definitions
// Following 120-line limit rule for enterprise modularity

export interface ResourceLink {
  label: string;
  url: string;
}

export interface StateLaw {
  slug: string;                // e.g., "new-york"
  canSell: string;
  statuteCitation: string;
  enactmentDate: string;
  keyProvisions: string[];
  courtApproval: string;
  prohibited: string[];
  resources: ResourceLink[];
}

export type StateLawMap = Record<string, StateLaw>; // key = State Name (Title Case)

export interface AlphabeticalGroups {
  [letter: string]: string[];
}

export interface SearchState {
  query: string;
  filteredStates: string[];
  openState: string | null;
}

export interface StateLawsPageProps {
  initialStates?: string[];
  initialSearch?: string;
  className?: string;
}

export interface StateCardProps {
  stateName: string;
  isOpen: boolean;
  onToggle: (stateName: string) => void;
  lawDetails?: StateLaw;
}

export interface StateGroupProps {
  letter: string;
  states: string[];
  openState: string | null;
  onStateToggle: (stateName: string) => void;
  stateLawDetails: StateLawMap;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface HeroSectionProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export interface DisclaimerSectionProps {
  className?: string;
}

export interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

// County-level types for Phase 2 expansion
export interface CountyCourt {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  clerkName?: string;
  jurisdiction?: string;
  established?: string;
}

export interface CountyLawDetails {
  slug: string;
  court: CountyCourt;
  venueNotes: string;
  filingFee?: string;
  processingTime?: string;
  specialRequirements?: string[];
  localRules?: string[];
  localProcedures?: string[];
  judges?: Array<{
    name: string;
    title?: string;
    division?: string;
    notes?: string;
    experience?: string;
  }>;
  links: ResourceLink[];
  population?: string;
  majorCities?: string[];
  transferVolume?: 'high' | 'medium' | 'low';
}

export interface CountyDataCollection {
  [countyName: string]: CountyLawDetails;
}

export interface StateCountyData {
  stateSlug: string;
  counties: CountyDataCollection;
}

export interface CountyPageProps {
  stateName: string;
  stateSlug: string;
  countyName: string;
  countyData: CountyLawDetails;
}
