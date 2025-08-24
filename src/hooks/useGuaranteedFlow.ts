"use client";
import { useState, useCallback } from 'react';
import { CalculationService } from '../services/calculationService';
import { GuaranteedStep, GuaranteedFormData, GuaranteedCalculationResult, CalculationError } from '../types';

export const useGuaranteedFlow = () => {
  const [currentStep, setCurrentStep] = useState<GuaranteedStep | null>(null);
  const [formData, setFormData] = useState<GuaranteedFormData>({});

  const startCalculator = useCallback(() => {
    setCurrentStep('select_type');
  }, []);

  const goToNextStep = useCallback((step: GuaranteedStep) => {
    setCurrentStep(step);
  }, []);

  const updateFormData = useCallback((data: Partial<GuaranteedFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleModeSelect = useCallback((mode: string) => {
    setFormData(prev => ({ ...prev, paymentMode: mode }));
    goToNextStep('increase');
  }, [goToNextStep]);

  const handleIncreaseSelect = useCallback((rate: number) => {
    setFormData(prev => ({ ...prev, annualIncrease: rate }));
    goToNextStep('amount');
  }, [goToNextStep]);

  const handleAmountNext = useCallback(() => {
    goToNextStep('dates');
  }, [goToNextStep]);

  const handleDatesNext = useCallback(() => {
    goToNextStep('review');
  }, [goToNextStep]);

  const handleReviewCalculate = useCallback(() => {
    const { paymentAmount, startDate, endDate, paymentMode, annualIncrease } = formData;
    
    if (!paymentAmount || !startDate || !endDate || !paymentMode) return;
    
    try {
      // Use CalculationService for all business logic
      const calculationResult = CalculationService.calculateGuaranteed(formData);
      
      setFormData(prev => ({ ...prev, calculationResult }));
      goToNextStep('offer');
    } catch (e: any) {
      console.error('[useGuaranteedFlow] Calculation failed:', e);
      // Handle error appropriately
    }
  }, [formData, goToNextStep]);

  return {
    currentStep,
    formData,
    startCalculator,
    goToNextStep,
    updateFormData,
    handleModeSelect,
    handleIncreaseSelect,
    handleAmountNext,
    handleDatesNext,
    handleReviewCalculate,
  };
}; 