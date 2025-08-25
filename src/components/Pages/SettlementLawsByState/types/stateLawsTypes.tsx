// Core state laws type definitions
// Following 120-line limit rule for enterprise modularity

export interface StateLawDetails {
  canSell: string;
  statuteCitation: string;
  enactmentDate: string;
  keyProvisions: string[];
  courtApproval: string;
  prohibited: string[];
  resources: ResourceLink[];
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface StateDataCollection {
  [stateName: string]: StateLawDetails;
}

export interface AlphabeticalGroups {
  [letter: string]: string[];
}

export interface SearchState {
  query: string;
  filteredStates: string[];
  openState: string | null;
}

export interface AccordionState {
  openState: string | null;
  isAnimating: boolean;
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
  lawDetails?: StateLawDetails;
}

export interface StateGroupProps {
  letter: string;
  states: string[];
  openState: string | null;
  onStateToggle: (stateName: string) => void;
  stateLawDetails: StateDataCollection;
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
