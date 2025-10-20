"use client";
import React from 'react';
import { CalculatorProvider } from '../../../contexts/CalculatorContext';
import { GuaranteedAssistantProvider } from '../../../contexts/GuaranteedAssistantContext';
import { StepperContent } from './stepper';

/**
 * GuaranteedStepper - Orchestra Pattern Main Component
 * 
 * This is the main orchestrator that:
 * 1. Sets up the required providers (CalculatorProvider + GuaranteedAssistantProvider)
 * 2. Delegates all UI logic to StepperContent
 * 3. Maintains clean separation of concerns
 * 
 * Architecture:
 * - GuaranteedStepper (this file) - Provider setup & orchestration
 * - stepper/StepperContent - UI wrapper with loading & layout
 * - stepper/StepperCore - Core business logic & step rendering
 * - stepper/LoadingScreen - Branded loading experience
 */
const GuaranteedStepper: React.FC = () => {
  return (
    <CalculatorProvider logUserChoiceAsMessage={() => {}}>
      <GuaranteedAssistantProvider>
        <StepperContent />
      </GuaranteedAssistantProvider>
    </CalculatorProvider>
  );
};

export default GuaranteedStepper; 