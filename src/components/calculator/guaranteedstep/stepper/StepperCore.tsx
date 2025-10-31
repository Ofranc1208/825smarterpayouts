import React, { useCallback } from 'react';
import { useCalculator } from '../../../../contexts/CalculatorContext';
import { useGuaranteedAssistant } from '../../../../contexts/GuaranteedAssistantContext';
import { CalculationService } from '../../../../services/calculationService';
import { GuaranteedFormData, LumpSumPayment } from '../utils/guaranteedTypes';
import { convertToSelfContainedFormData } from '../utils/typeUtils';
import GuaranteedPaymentOverview from '../GuaranteedPaymentOverview';
import GuaranteedPaymentAmountOverview from '../GuaranteedPaymentAmountOverview';
import GuaranteedLumpSumAmountOverview from '../GuaranteedLumpSumAmountOverview';
import GuaranteedReview from '../GuaranteedReview';
import GuaranteedOffer from '../GuaranteedOffer';
import GuaranteedAssistantPanel from '../GuaranteedAssistantPanel';

const StepperCore: React.FC = () => {
  // 🎬 Connect to CalculatorContext for global state management
  const { 
    currentStep, 
    formData,
    goToNextStep,
    updateFormData
  } = useCalculator();
  
  const { setCurrentStep: setGuaranteedAssistantStep } = useGuaranteedAssistant();

  // Map step names to step numbers
  const getStepNumber = (stepName: string | null): number => {
    const stepMap: Record<string, number> = {
      'mode': 1,
      'amount': 2,
      'review': 2, // Display review as step 2 of 2
      'offer': 2   // Offer is not counted beyond total steps
    };
    return stepMap[stepName || 'mode'] || 1;
  };
  
  const currentStepIndex = getStepNumber(currentStep);
  const totalSteps = 2; // Only count actual data collection steps (mode and amount)

  // Initialize currentStep if needed (for direct navigation to page)
  React.useEffect(() => {
    // Initialize to 'mode' step if no currentStep is set (direct navigation to page)
    if (!currentStep) {
      goToNextStep('mode');
    }
    
    // Always sync the assistant step with the current step
    // Map actual step names to assistant step names
    if (currentStep) {
      
      // Map calculator steps to assistant steps
      const assistantStepMap: Record<string, string> = {
        'mode': 'mode',
        'amount': 'amount',
        'review': 'review',
        'offer': 'offer'
      };
      
      const assistantStep = assistantStepMap[currentStep] || currentStep;
      setGuaranteedAssistantStep(assistantStep as any);
    }
  }, [currentStep, goToNextStep, setGuaranteedAssistantStep]);

  // 🏗️ CENTRALIZED DATA PERSISTENCE FUNCTION
  const saveGuaranteedStepData = useCallback((data: object) => {
    try {
      updateFormData({ 
        guaranteedData: data
      });
    } catch (error) {
      console.error(`[StepperCore] Error saving guaranteed data:`, error);
    }
  }, [updateFormData]);

  // 🎯 STEP 1: Payment Overview (Mode + Increase) Handler
  const handlePaymentOverviewComplete = useCallback((data: { paymentMode: string; annualIncrease: number }) => {
    // Map payment mode to correct format for calculation service
    const mapPaymentMode = (mode: string): string => {
      switch (mode) {
        case 'monthly': return 'Monthly';
        case 'quarterly': return 'Quarterly';
        case 'semiannually': return 'Semiannually';
        case 'annually': return 'Annually';
        case 'lump-sum': return 'Lump Sum';
        default: return mode;
      }
    };

    const mappedPaymentMode = mapPaymentMode(data.paymentMode);

    // Save step data using centralized function (merge with existing data)
    const currentData = formData?.guaranteedData || {};
    saveGuaranteedStepData({ 
      ...currentData,
      paymentMode: mappedPaymentMode,
      annualIncrease: data.annualIncrease 
    });

    // Update guaranteed assistant step
    setGuaranteedAssistantStep('amount');

    // Advance to next step using CalculatorContext method
    goToNextStep('amount');
  }, [saveGuaranteedStepData, setGuaranteedAssistantStep, goToNextStep]);

  // 🎯 STEP 2: Payment Amount Overview (Amount + Dates) Handler
  const handlePaymentAmountOverviewComplete = useCallback((data: { paymentAmount: string; startDate: string; endDate: string }) => {
    // Save step data using centralized function (merge with existing data)
    const currentData = formData?.guaranteedData || {};
    saveGuaranteedStepData({ 
      ...currentData,
      paymentAmount: data.paymentAmount,
      startDate: data.startDate,
      endDate: data.endDate
    });

    // Update assistant step
    setGuaranteedAssistantStep('review');

    // Advance to review step using CalculatorContext method
    goToNextStep('review');
  }, [formData, saveGuaranteedStepData, setGuaranteedAssistantStep, goToNextStep]);

  // 🎯 STEP 2: Lump Sum Payment Amount Overview Handler
  const handleLumpSumAmountOverviewComplete = useCallback((data: { payments: LumpSumPayment[] }) => {
    // Save step data using centralized function (merge with existing data)
    const currentData = formData?.guaranteedData || {};
    saveGuaranteedStepData({ 
      ...currentData,
      payments: data.payments
    });

    // Update assistant step
    setGuaranteedAssistantStep('review');

    // Advance to review step using CalculatorContext method
    goToNextStep('review');
  }, [formData, saveGuaranteedStepData, setGuaranteedAssistantStep, goToNextStep]);

  // 🎯 STEP 3: Review & Calculate Handler
  const [calcError, setCalcError] = React.useState<string | null>(null);

  const handleReviewComplete = useCallback(async () => {
    try {
      setCalcError(null);
      // Update assistant step
      setGuaranteedAssistantStep('offer');

      // Use CalculationService for all business logic - use global form data
      const guaranteedFormData = formData?.guaranteedData || {};
      const calculationResult = CalculationService.calculateGuaranteed(guaranteedFormData);
      
      // Save calculation result using centralized function (merge with existing data)
      const currentData = formData?.guaranteedData || {};
      saveGuaranteedStepData({ 
        ...currentData,
        calculationResult
      });

      // Advance to offer step using CalculatorContext method
      goToNextStep('offer');
    } catch (error: any) {
      console.error('[StepperCore] Calculation error:', error);
      setCalcError(error?.message || 'Calculation failed. Please check your inputs.');
    }
  }, [formData, saveGuaranteedStepData, setGuaranteedAssistantStep, goToNextStep]);

  // 🎬 DIRECT STEP RENDERING LOGIC (using global currentStep)
  const renderCurrentStep = () => {
    // Get guaranteed data from global context (flat structure)
    const guaranteedData = formData?.guaranteedData || {};
    
    switch (currentStep) {
      case 'mode':
         return (
           <GuaranteedPaymentOverview
             onNext={handlePaymentOverviewComplete}
             currentStep={currentStepIndex}
             totalSteps={totalSteps}
             initialData={convertToSelfContainedFormData(guaranteedData)}
           />
         );

      case 'amount':
        // Check if payment mode is Lump Sum from global data (flat structure)
        const paymentMode = guaranteedData.paymentMode;
         if (paymentMode === 'Lump Sum') {
          return (
             <GuaranteedLumpSumAmountOverview
               onNext={handleLumpSumAmountOverviewComplete}
               onBack={() => goToNextStep('mode')}
               currentStep={currentStepIndex}
               totalSteps={totalSteps}
               initialData={convertToSelfContainedFormData(guaranteedData)}
             />
          );
        } else {
          return (
             <GuaranteedPaymentAmountOverview
               onNext={handlePaymentAmountOverviewComplete}
               onBack={() => goToNextStep('mode')}
               currentStep={currentStepIndex}
               totalSteps={totalSteps}
               initialData={convertToSelfContainedFormData(guaranteedData)}
             />
          );
        }

      case 'review':
         return (
           <GuaranteedReview
            paymentMode={guaranteedData.paymentMode || ''}
            paymentAmount={guaranteedData.paymentAmount || ''}
            annualIncrease={guaranteedData.annualIncrease || 0}
            startDate={guaranteedData.startDate || ''}
            endDate={guaranteedData.endDate || ''}
            payments={guaranteedData.payments}
             onCalculate={handleReviewComplete}
             onEdit={() => goToNextStep('mode')}
             error={calcError || undefined}
            currentStep={currentStepIndex}
            totalSteps={totalSteps}
          />
         );

      case 'offer':
        // Get calculation result from global context
        const globalCalculationResult = guaranteedData.calculationResult;

        // Map the calculation result to the expected format
        const calculationResult = globalCalculationResult ? {
          minOffer: globalCalculationResult.minPayout,
          maxOffer: globalCalculationResult.maxPayout
        } : {
          minOffer: 0,
          maxOffer: 0
        };

         return (
           <GuaranteedOffer
             calculationResult={calculationResult}
             currentStep={currentStepIndex}
             totalSteps={totalSteps}
             onBack={() => goToNextStep('review')}
           />
         );

      default:
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>Loading...</h3>
            <p style={{ margin: '0', color: '#64748b' }}>Current step: {currentStep}</p>
          </div>
        );
    }
  };

  // 🎬 MAIN RENDER
  return (
    <>
      <div style={{ paddingBottom: '2rem' }}>
        {renderCurrentStep()}
      </div>
      {/* Guaranteed Assistant Panel */}
      <GuaranteedAssistantPanel />
    </>
  );
};

export default StepperCore;
