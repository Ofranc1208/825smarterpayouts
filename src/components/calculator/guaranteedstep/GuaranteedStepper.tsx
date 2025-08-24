"use client";
import React, { useCallback } from 'react';
import { useCalculator, CalculatorContext } from '../../../contexts/CalculatorContext';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import { CalculationService } from '../../../services/calculationService';
import { GuaranteedFormData, LumpSumPayment } from './types/guaranteed.types';
import { convertToSelfContainedFormData } from './utils/typeUtils';
import GuaranteedPaymentOverview from './GuaranteedPaymentOverview';
import GuaranteedPaymentAmountOverview from './GuaranteedPaymentAmountOverview';
import GuaranteedLumpSumAmountOverview from './GuaranteedLumpSumAmountOverview';
import GuaranteedReview from './GuaranteedReview';
import GuaranteedOffer from './GuaranteedOffer';
import GuaranteedAssistantPanel from './GuaranteedAssistantPanel';

const GuaranteedStepper: React.FC = () => {
  // 🎬 Connect to CalculatorContext for global state management (like LCPStepper)
  const { 
    currentStep, 
    formData,
    goToNextStep,
    updateFormData
  } = useCalculator();
  
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

  // 🎬 Connect to Guaranteed Assistant Context
  const { setCurrentStep: setGuaranteedAssistantStep } = useGuaranteedAssistant();

  // Initialize currentStep if needed (for direct navigation to page)
  React.useEffect(() => {
    // Initialize to 'mode' step if no currentStep is set (direct navigation to page)
    if (!currentStep) {
      console.log('🚀 [GuaranteedStepper] Initializing currentStep to mode');
      goToNextStep('mode');
    }
    
    // Always sync the assistant step with the current step
    if (currentStep) {
      console.log('🎯 [GuaranteedStepper] Syncing assistant step to:', currentStep);
      setGuaranteedAssistantStep(currentStep);
    }
  }, [currentStep, goToNextStep, setGuaranteedAssistantStep]);

  // 🏗️ CENTRALIZED DATA PERSISTENCE FUNCTION
  const saveGuaranteedStepData = useCallback((data: object) => {
    try {
      updateFormData({ 
        guaranteedData: data
      });
    } catch (error) {
      console.error(`[GuaranteedStepper] Error saving guaranteed data:`, error);
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
    
    console.log('🔄 Mapping payment mode:', data.paymentMode, '→', mappedPaymentMode);

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
      console.error('[GuaranteedStepper] Calculation error:', error);
      setCalcError(error?.message || 'Calculation failed. Please check your inputs.');
    }
  }, [formData, saveGuaranteedStepData, setGuaranteedAssistantStep, goToNextStep]);

  // 🎯 STEP 4: Offer Display
  // The offer step displays the calculation result and doesn't need a handler


           // 🎬 DIRECT STEP RENDERING LOGIC (using global currentStep)
         const renderCurrentStep = () => {
           console.log('🔄 Rendering step:', currentStep);
           
           // Get guaranteed data from global context (flat structure)
           const guaranteedData = formData?.guaranteedData || {};
           
           switch (currentStep) {
             case 'mode':
               console.log('📋 Rendering mode step');
                return (
                  <GuaranteedPaymentOverview 
                    onNext={handlePaymentOverviewComplete}
                    currentStep={currentStepIndex}
                    totalSteps={totalSteps}
                    initialData={convertToSelfContainedFormData(guaranteedData)}
                  />
                );

             case 'amount':
               console.log('📋 Rendering amount step');
               // Check if payment mode is Lump Sum from global data (flat structure)
               const paymentMode = guaranteedData.paymentMode;
                if (paymentMode === 'Lump Sum') {
                 return (
                    <GuaranteedLumpSumAmountOverview 
                      onNext={handleLumpSumAmountOverviewComplete}
                      currentStep={currentStepIndex}
                      totalSteps={totalSteps}
                      initialData={convertToSelfContainedFormData(guaranteedData)}
                    />
                 );
               } else {
                 return (
                    <GuaranteedPaymentAmountOverview 
                      onNext={handlePaymentAmountOverviewComplete}
                      currentStep={currentStepIndex}
                      totalSteps={totalSteps}
                      initialData={convertToSelfContainedFormData(guaranteedData)}
                    />
                 );
               }

             case 'review':
               console.log('📋 Rendering review step');
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
               console.log('📋 Rendering offer step');
               // Get calculation result from global context
               const globalCalculationResult = guaranteedData.calculationResult;
               
               console.log('🎯 Rendering offer step');
               console.log('📊 Global form data:', formData);
               console.log('🧮 Global calculation result:', globalCalculationResult);
               
               // Map the calculation result to the expected format
               const calculationResult = globalCalculationResult ? {
                 minOffer: globalCalculationResult.minPayout,
                 maxOffer: globalCalculationResult.maxPayout
               } : {
                 minOffer: 0,
                 maxOffer: 0
               };
               
               console.log('📋 Mapped calculation result for offer:', calculationResult);
               
                return (
                  <GuaranteedOffer
                    calculationResult={calculationResult}
                    currentStep={currentStepIndex}
                    totalSteps={totalSteps}
                    onBack={() => goToNextStep('review')}
                  />
                );

             default:
               console.log('❌ No step matched, currentStep:', currentStep);
               return (
                 <div style={{ padding: '2rem', textAlign: 'center' }}>
                   <h3>Loading...</h3>
                   <p>Current step: {currentStep}</p>
                 </div>
               );
           }
         };

           // 🎬 MAIN RENDER
         console.log('🎬 GuaranteedStepper rendering, currentStep:', currentStep);
         
         return (
           <>
             <div style={{ 
               maxWidth: '600px', 
               margin: '0 auto',
               padding: '0.5rem'
             }}>
               {renderCurrentStep()}
             </div>
                         {/* Guaranteed Assistant Panel */}
            <GuaranteedAssistantPanel />
           </>
         );
};

export default GuaranteedStepper; 