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
  currentStep?: number;
  totalSteps?: number;
}

const StepRenderer: React.FC<StepRendererProps> = ({ stepId, currentStep = 1, totalSteps = 5 }) => {
  switch (stepId) {
    // Guaranteed flow steps
    case 'mode':
      return <GuaranteedPaymentOverview currentStep={currentStep} totalSteps={totalSteps} onNext={() => {}} />;
    case 'amount':
      return <GuaranteedPaymentAmountOverview currentStep={currentStep} totalSteps={totalSteps} onNext={() => {}} />;
    case 'review':
      return <GuaranteedReview currentStep={currentStep} totalSteps={totalSteps} paymentMode={''} paymentAmount={''} annualIncrease={0} startDate={''} endDate={''} onCalculate={() => {}} />;
    case 'offer':
      return <GuaranteedOffer currentStep={currentStep} totalSteps={totalSteps} calculationResult={{ minOffer: 0, maxOffer: 0 }} />;
    // LCP flow steps
    case 'lcp_payment':
      return <LCPSettlementPaymentsOverview currentStep={currentStep} totalSteps={totalSteps} onNext={() => {}} />;
    case 'lcp_profile':
      return <LCPPhysicalProfileOverview currentStep={currentStep} totalSteps={totalSteps} onNext={() => {}} />;
    case 'lcp_health':
      return <LCPHealthOverview currentStep={currentStep} totalSteps={totalSteps} onNext={() => {}} />;
    case 'lcp_review':
      return <LCPaymentReviewStep currentStep={currentStep} totalSteps={totalSteps} paymentData={{ paymentMode: '', amount: '' }} detailsData={{ annualIncrease: 0, startDate: '', endDate: '' }} profileData={{ ageRange: '', gender: '', bodyFrame: '' }} lifestyleData={{ weight: '' }} healthData={{ smoke: '', health: '', cardiac: '' }} onEdit={() => {}} onCalculate={() => {}} />;
    case 'lcp_results':
      return <LCPaymentResultsPage currentStep={currentStep} totalSteps={totalSteps} result={null as any} onBack={() => {}} />;
    default:
      return null;
  }
};

export default StepRenderer; 