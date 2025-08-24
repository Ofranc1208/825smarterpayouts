"use client";

import React, { useCallback } from 'react';
import { useAssistant } from '../../../contexts/AssistantContext';
import { useLCPFlow } from './hooks/useLCPFlow';
import LCPaymentReviewStep from './LCPaymentReviewStep';
import LCPaymentResultsPage from './LCPaymentResultsPage';
import LCPSettlementPaymentsOverview from './LCPSettlementPaymentsOverview';
import LCPPhysicalProfileOverview from './LCPPhysicalProfileOverview';
import LCPHealthOverview from './LCPHealthOverview';
import LCPDatesSelection from './LCPDatesSelection';
import LCPLumpSumAmountOverview from './LCPLumpSumAmountOverview';
import AssistantPanel from './AssistantPanel';

const LCPStepper: React.FC = () => {
  // ✅ Use self-contained LCP flow hook
  const {
    currentStep,
    formData,
    result: lcpResult,
    error: lcpError,
    showResults: lcpShowResults,
    startLCPFlow,
    goToNextStep,
    updateFormData,
    handlePaymentNext,
    handleDetailsNext,
    handleProfileNext,
    handleLifestyleNext,
    handleHealthNext,
    handleCalculate,
    handleBackToReview
  } = useLCPFlow();



  // 🎬 Connect to Assistant Context
  const { setCurrentStep: setAssistantStep, setFlowType } = useAssistant();

  // Initialize LCP flow on mount and set flow type
  React.useEffect(() => {
    if (!currentStep) {
      startLCPFlow();
    }
    setFlowType('lcp');
  }, [startLCPFlow, currentStep, setFlowType]);

  // Note: LCP system is now self-contained and doesn't need global sync

  // Map step names to step numbers
  const getStepNumber = (stepName: string | null): number => {
    const stepMap: Record<string, number> = {
      'lcp_payment': 1,
      'lcp_profile': 2,
      'lcp_health': 3,
      'lcp_lump_sum': 4, // New step for lump sum
      'lcp_details': 5,
      'lcp_review': 6, // Not counted as a step
      'lcp_results': 7  // Not counted as a step
    };
    return stepMap[stepName || 'lcp_payment'] || 1;
  };

  const currentStepNumber = getStepNumber(currentStep);
  const totalSteps = 5; // Only count actual data collection steps

  // 🎯 STEP 1: Settlement Payments Overview Handler
  const handleSettlementOverviewComplete = useCallback((data: { paymentMode: string; annualIncrease: number }) => {
    // Save payment mode and annual increase, then go to profile
    updateFormData({
      paymentData: { paymentMode: data.paymentMode, amount: '' },
      detailsData: { 
        startDate: formData.detailsData?.startDate || '', 
        endDate: formData.detailsData?.endDate || '', 
        annualIncrease: data.annualIncrease 
      }
    });
    
    // Update assistant step and go to profile
    setAssistantStep('lcp_profile');
    goToNextStep('lcp_profile');
  }, [updateFormData, formData.detailsData, setAssistantStep, goToNextStep]);

  // 🎯 STEP 3: Physical Profile Overview Handler  
  const handlePhysicalProfileComplete = useCallback((data: { ageRange: string; gender: string; bodyFrame: string; weight: string }) => {
    // Save profile and lifestyle data, then go to health
    updateFormData({
      profileData: { ageRange: data.ageRange, gender: data.gender, bodyFrame: data.bodyFrame },
      lifestyleData: { weight: data.weight }
    });
    
    // Update assistant step and go to health
    setAssistantStep('lcp_health');
    goToNextStep('lcp_health');
  }, [updateFormData, setAssistantStep, goToNextStep]);

  // 🎯 STEP 3: Health Overview Handler
  const handleHealthOverviewComplete = useCallback((data: { smoke: string; health: string; cardiac: string }) => {
    // Save health data
    updateFormData({
      healthData: data
    });
    
    // Check if payment mode is Lump Sum to determine next step
    const paymentMode = formData.paymentData?.paymentMode;
    if (paymentMode === 'Lump Sum') {
      setAssistantStep('lcp_lump_sum');
      goToNextStep('lcp_lump_sum');
    } else {
      setAssistantStep('lcp_details');
      goToNextStep('lcp_details');
    }
  }, [updateFormData, formData.paymentData?.paymentMode, setAssistantStep, goToNextStep]);

  // 🎯 STEP 4: LCP Lump Sum Handler (new step)
  const handleLCPLumpSumComplete = useCallback((data: { payments: Array<{ amount: string; lumpSumDate: string }> }) => {
    // Save lump sum payments
    updateFormData({
      lumpSumPayments: data.payments
    });
    
    // Update assistant step and go to review (skip dates for lump sum)
    setAssistantStep('lcp_review');
    goToNextStep('lcp_review');
  }, [updateFormData, setAssistantStep, goToNextStep]);

  // 🎯 STEP 4: Dates Selection Handler (final step before review)
  const handleDatesSelectionComplete = useCallback((data: { startDate: string; endDate: string; amount: string }) => {
    // Save dates and amount
    updateFormData({
      detailsData: { 
        startDate: data.startDate, 
        endDate: data.endDate, 
        annualIncrease: formData.detailsData?.annualIncrease || 0 
      },
      paymentData: { 
        paymentMode: formData.paymentData?.paymentMode || '', 
        amount: data.amount 
      }
    });
    
    // Update assistant step and go to review
    setAssistantStep('lcp_review');
    goToNextStep('lcp_review');
  }, [updateFormData, formData.detailsData?.annualIncrease, formData.paymentData, setAssistantStep, goToNextStep]);

  // 🎯 STEP 5: Review & Calculate Handler
  const handleLCPReviewComplete = useCallback(() => {
    try {
      // Update assistant step
      setAssistantStep('lcp_results');
      
      // Use the local calculation handler
      handleCalculate(formData);
    } catch (error) {
      console.error('[LCPStepper] Review calculation failed:', error);
    }
  }, [handleCalculate, formData, setAssistantStep]);

  // 🎯 Edit Handler - Navigate back to step 1 (payment) to edit entire form
  const handleEditStep = useCallback((stepNumber: number) => {
    // Always go back to step 1 (payment) so user can edit entire form
    goToNextStep('lcp_payment');
  }, [goToNextStep]);

  // 🎬 MAIN RENDER LOGIC - Complete switch statement for all LCP steps
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'lcp_payment':
        return (
          <LCPSettlementPaymentsOverview 
            initialData={{
              paymentMode: formData.paymentData?.paymentMode,
              annualIncrease: formData.detailsData?.annualIncrease
            }}
            onNext={handleSettlementOverviewComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_details':
        return (
          <LCPDatesSelection 
            initialData={{
              startDate: formData.detailsData?.startDate,
              endDate: formData.detailsData?.endDate,
              amount: formData.paymentData?.amount
            }}
            onNext={handleDatesSelectionComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_profile':
        return (
          <LCPPhysicalProfileOverview 
            initialData={{
              ageRange: formData.profileData?.ageRange,
              gender: formData.profileData?.gender,
              bodyFrame: formData.profileData?.bodyFrame,
              weight: formData.lifestyleData?.weight
            }}
            onNext={handlePhysicalProfileComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_lifestyle':
        // Note: lcp_lifestyle step is handled by Physical Profile component
        // The useLCPFlow separates profile and lifestyle, but UI combines them
        return (
          <LCPPhysicalProfileOverview 
            onNext={handlePhysicalProfileComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_health':
        return (
          <LCPHealthOverview 
            initialData={{
              smoke: formData.healthData?.smoke,
              health: formData.healthData?.health,
              cardiac: formData.healthData?.cardiac
            }}
            onNext={handleHealthOverviewComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_lump_sum':
        return (
          <LCPLumpSumAmountOverview 
            onNext={handleLCPLumpSumComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_review':
        return (
          <LCPaymentReviewStep
            paymentData={formData.paymentData || { paymentMode: '', amount: '' }}
            detailsData={formData.detailsData || { annualIncrease: 0, startDate: '', endDate: '' }}
            profileData={formData.profileData || { ageRange: '', gender: '', bodyFrame: '' }}
            lifestyleData={formData.lifestyleData || { weight: '' }}
            healthData={formData.healthData || { smoke: '', health: '', cardiac: '' }}
            lumpSumPayments={formData.lumpSumPayments}
            onEdit={handleEditStep}
            onCalculate={handleLCPReviewComplete}
            result={lcpResult || undefined}
            error={lcpError?.message || undefined}
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
      
      case 'lcp_results':
        return lcpResult ? (
          <LCPaymentResultsPage
            result={lcpResult}
            onBack={handleBackToReview}
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        ) : null;
      
      default:
        return (
          <LCPSettlementPaymentsOverview 
            onNext={handleSettlementOverviewComplete} 
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
          />
        );
    }
  };

  return (
    <>
      {renderCurrentStep()}
      {/* Assistant Panel */}
      <AssistantPanel />
    </>
  );
};

export default LCPStepper; 