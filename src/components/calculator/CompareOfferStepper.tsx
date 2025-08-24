import React, { useCallback, useEffect, useRef } from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { useConversationalForm } from '../../hooks/useConversationalForm';
import StepCompareOfferChoice from './steps/StepCompareOfferChoice';

interface CompareOfferStepperProps {
  visibleMessages: any[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const CompareOfferStepper: React.FC<CompareOfferStepperProps> = ({ 
  visibleMessages, 
  setVisibleMessages 
}) => {
  // 🎭 Connect to Stage Manager
  const { advanceConversation, startConversationalForm } = useConversationalForm({ setVisibleMessages });

  // 🎬 Connect to Calculator Context for state management
  const {
    currentStep,
    updateFormData,
    goToNextStep
  } = useCalculator();

  // 🛡️ Track which components we've already added to prevent duplicates
  const addedComponents = useRef<Set<string>>(new Set());

  // 🔄 Reset tracking when calculator starts fresh
  useEffect(() => {
    if (!currentStep) {
      // Clear the tracking when there's no current step (calculator reset)
      addedComponents.current.clear();
    }
  }, [currentStep]);

  // 🎯 Handler for offer choice selection
  const handleOfferChoice = useCallback(async (choiceText: string) => {
    switch (choiceText) {
      case 'Help me compare my offer':
        // Start the existing "New Quote" conversational flow
        await startConversationalForm();
        break;
      
      case 'Upload Offer Document':
        // Placeholder for upload functionality
        await advanceConversation({
          userMessageText: choiceText,
          botConfirmationText: 'This feature is coming soon!'
        });
        break;
      
      default:
        console.log('Unhandled offer choice:', choiceText);
    }
  }, [startConversationalForm, advanceConversation]);

  // 🎬 DIRECTOR'S MAIN RENDER LOGIC
  // Listen for changes to currentStep and render appropriate components
  useEffect(() => {
    switch (currentStep) {
      case 'compare-offer-choice': {
        const componentKey = 'compare-offer-choice-selection';
        
        // Check if we've already added this component
        if (!addedComponents.current.has(componentKey)) {
          // Render the choice step when the flow starts
          const choiceComponent = React.createElement(StepCompareOfferChoice, {
            isInteractive: true,
            onChoice: handleOfferChoice
          });
          
          setVisibleMessages(prev => [...prev, {
            id: `msg-${Date.now()}`,
            type: 'component',
            component: choiceComponent
          }]);
          
          // Mark this component as added
          addedComponents.current.add(componentKey);
        }
        break;
      }
      // Add more cases for additional compare offer steps as they are created
      default:
        // No action needed for steps not handled by this Director
        break;
    }
  }, [currentStep, handleOfferChoice, setVisibleMessages]);

  // 🎬 The Director manages flow through conversation, not traditional rendering
  return null;
};

export default CompareOfferStepper; 