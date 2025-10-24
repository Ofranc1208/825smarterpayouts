/**
 * Compare Offer Flow Type Definitions
 */

export interface CompareOfferData {
  // Existing offer details
  existingOfferAmount: string;
  paymentAmount: string;
  paymentFrequency: 'monthly' | 'quarterly' | 'semiannually' | 'annually';
  companyName?: string;
  
  // Calculated quote (populated after calculation)
  calculatedOfferAmount?: number;
  difference?: number;
  percentageDifference?: number;
  isBetterOffer?: boolean;
}

export interface CompareOfferFormErrors {
  existingOfferAmount?: string;
  paymentAmount?: string;
  paymentFrequency?: string;
}

export interface CompareOfferStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export interface CompareOfferChoiceProps {
  isInteractive: boolean;
  onChoice: (choiceText: string) => void;
}

export interface CompareOfferDetailsProps {
  isInteractive: boolean;
  onSubmit: (data: CompareOfferData) => void;
  initialData?: Partial<CompareOfferData>;
}

export interface CompareOfferReviewProps {
  isInteractive: boolean;
  data: CompareOfferData;
  onEdit: () => void;
  onCalculate: () => void;
  isCalculating?: boolean;
}

export interface CompareOfferResultsProps {
  isInteractive: boolean;
  data: CompareOfferData;
  onStartOver: () => void;
}

// Payment frequency display names
export const PAYMENT_FREQUENCY_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  semiannually: 'Semi-Annually',
  annually: 'Annually'
};

// Payment frequency multipliers (payments per year)
export const PAYMENT_FREQUENCY_MULTIPLIERS: Record<string, number> = {
  monthly: 12,
  quarterly: 4,
  semiannually: 2,
  annually: 1
};



