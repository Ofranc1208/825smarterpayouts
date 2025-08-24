import React from 'react';
import GuaranteedPaymentOverview from './guaranteedstep/GuaranteedPaymentOverview';
import GuaranteedPaymentAmountOverview from './guaranteedstep/GuaranteedPaymentAmountOverview';
import GuaranteedReview from './guaranteedstep/GuaranteedReview';
import GuaranteedOffer from './guaranteedstep/GuaranteedOffer';
import LCPSettlementPaymentsOverview from './lcpstep/LCPSettlementPaymentsOverview';
import LCPPhysicalProfileOverview from './lcpstep/LCPPhysicalProfileOverview';
import LCPHealthOverview from './lcpstep/LCPHealthOverview';
import LCPDatesSelection from './lcpstep/LCPDatesSelection';
import LCPaymentReviewStep from './lcpstep/LCPaymentReviewStep';
import LCPaymentResultsPage from './lcpstep/LCPaymentResultsPage';

interface StepRendererProps {
  stepId: string;
}

const StepRenderer: React.FC<StepRendererProps> = ({ stepId }) => {
  switch (stepId) {
    // Guaranteed flow steps
    case 'mode':
      return <GuaranteedPaymentOverview onNext={() => {}} />;
    case 'amount':
      return <GuaranteedPaymentAmountOverview onNext={() => {}} />;
    case 'review':
      return <GuaranteedReview paymentMode={''} paymentAmount={''} annualIncrease={0} startDate={''} endDate={''} onCalculate={() => {}} />;
    case 'offer':
      return <GuaranteedOffer calculationResult={{ minOffer: 0, maxOffer: 0 }} />;
    // LCP flow steps
    case 'lcp_payment':
      return <LCPSettlementPaymentsOverview onNext={() => {}} />;
    case 'lcp_profile':
      return <LCPPhysicalProfileOverview onNext={() => {}} />;
    case 'lcp_health':
      return <LCPHealthOverview onNext={() => {}} />;
    case 'lcp_review':
      return <LCPaymentReviewStep paymentData={{ paymentMode: '', amount: '' }} detailsData={{ annualIncrease: 0, startDate: '', endDate: '' }} profileData={{ ageRange: '', gender: '', bodyFrame: '' }} lifestyleData={{ weight: '' }} healthData={{ smoke: '', health: '', cardiac: '' }} onEdit={() => {}} onCalculate={() => {}} />;
    case 'lcp_results':
      return <LCPaymentResultsPage result={null as any} onBack={() => {}} />;
    default:
      return null;
  }
};

export default StepRenderer; 