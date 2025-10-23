import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCalculator } from '../../contexts/CalculatorContext';
import { useConversationalForm } from '../../hooks/useConversationalForm';
import { 
  CompareOfferChoice,
  CompareOfferDetails,
  CompareOfferReview,
  CompareOfferResults,
  CompareOfferData,
  calculateOurQuote,
  calculateDifference
} from './compareofferstep';

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
  
  // 📊 Store compare offer data
  const [compareOfferData, setCompareOfferData] = useState<CompareOfferData>({
    existingOfferAmount: '',
    paymentAmount: '',
    paymentFrequency: 'monthly',
    companyName: ''
  });
  
  const [isCalculating, setIsCalculating] = useState(false);

  // 🔄 Reset tracking when calculator starts fresh
  useEffect(() => {
    if (!currentStep) {
      // Clear the tracking when there's no current step (calculator reset)
      addedComponents.current.clear();
      setCompareOfferData({
        existingOfferAmount: '',
        paymentAmount: '',
        paymentFrequency: 'monthly',
        companyName: ''
      });
    }
  }, [currentStep]);

  // 🎯 Handler for offer choice selection
  const handleOfferChoice = useCallback(async (choiceText: string) => {
    switch (choiceText) {
      case 'Help me compare my offer':
        // Log user choice and advance to details step
        await advanceConversation({
          userMessageText: choiceText,
          botConfirmationText: "Great! Let me collect some details about your existing offer."
        });
        goToNextStep('compare-offer-details');
        break;
      
      case 'Upload Offer Document':
        // Placeholder for upload functionality
        await advanceConversation({
          userMessageText: choiceText,
          botConfirmationText: 'This feature is coming soon! For now, please use the manual entry option.'
        });
        break;
      
      default:
        console.log('Unhandled offer choice:', choiceText);
    }
  }, [advanceConversation, goToNextStep]);

  // 🎯 Handler for details submission
  const handleDetailsSubmit = useCallback(async (data: CompareOfferData) => {
    setCompareOfferData(data);
    await advanceConversation({
      userMessageText: 'Submitted offer details',
      botConfirmationText: "Perfect! Let me show you a summary before we calculate our offer."
    });
    goToNextStep('compare-offer-review');
  }, [advanceConversation, goToNextStep]);

  // 🎯 Handler for edit (go back to details)
  const handleEdit = useCallback(() => {
    goToNextStep('compare-offer-details');
  }, [goToNextStep]);

  // 🎯 Handler for calculate
  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate our quote
    const ourQuote = calculateOurQuote(compareOfferData);
    const existingOffer = parseFloat(compareOfferData.existingOfferAmount);
    const { difference, percentageDifference, isBetterOffer } = calculateDifference(ourQuote, existingOffer);
    
    // Update data with calculation results
    const updatedData: CompareOfferData = {
      ...compareOfferData,
      calculatedOfferAmount: ourQuote,
      difference,
      percentageDifference,
      isBetterOffer
    };
    
    setCompareOfferData(updatedData);
    setIsCalculating(false);
    
    await advanceConversation({
      userMessageText: 'Calculate offer',
      botConfirmationText: "Here's how our offer compares!"
    });
    goToNextStep('compare-offer-results');
  }, [compareOfferData, advanceConversation, goToNextStep]);

  // 🎯 Handler for start over
  const handleStartOver = useCallback(() => {
    setCompareOfferData({
      existingOfferAmount: '',
      paymentAmount: '',
      paymentFrequency: 'monthly',
      companyName: ''
    });
    goToNextStep('compare-offer-choice');
  }, [goToNextStep]);

  // 🎬 DIRECTOR'S MAIN RENDER LOGIC
  // Listen for changes to currentStep and render appropriate components
  useEffect(() => {
    switch (currentStep) {
      case 'compare-offer-choice': {
        const componentKey = 'compare-offer-choice-selection';
        
        if (!addedComponents.current.has(componentKey)) {
          const choiceComponent = React.createElement(CompareOfferChoice, {
            isInteractive: true,
            onChoice: handleOfferChoice
          });
          
          setVisibleMessages(prev => [...prev, {
            id: `msg-${Date.now()}`,
            type: 'component',
            component: choiceComponent
          }]);
          
          addedComponents.current.add(componentKey);
        }
        break;
      }

      case 'compare-offer-details': {
        const componentKey = 'compare-offer-details-form';
        
        if (!addedComponents.current.has(componentKey)) {
          const detailsComponent = React.createElement(CompareOfferDetails, {
            isInteractive: true,
            onSubmit: handleDetailsSubmit,
            initialData: compareOfferData
          });
          
          setVisibleMessages(prev => [...prev, {
            id: `msg-${Date.now()}`,
            type: 'component',
            component: detailsComponent
          }]);
          
          addedComponents.current.add(componentKey);
        }
        break;
      }

      case 'compare-offer-review': {
        const componentKey = 'compare-offer-review-summary';
        
        if (!addedComponents.current.has(componentKey)) {
          const reviewComponent = React.createElement(CompareOfferReview, {
            isInteractive: true,
            data: compareOfferData,
            onEdit: handleEdit,
            onCalculate: handleCalculate,
            isCalculating
          });
          
          setVisibleMessages(prev => [...prev, {
            id: `msg-${Date.now()}`,
            type: 'component',
            component: reviewComponent
          }]);
          
          addedComponents.current.add(componentKey);
        }
        break;
      }

      case 'compare-offer-results': {
        const componentKey = 'compare-offer-results-comparison';
        
        if (!addedComponents.current.has(componentKey)) {
          const resultsComponent = React.createElement(CompareOfferResults, {
            isInteractive: true,
            data: compareOfferData,
            onStartOver: handleStartOver
          });
          
          setVisibleMessages(prev => [...prev, {
            id: `msg-${Date.now()}`,
            type: 'component',
            component: resultsComponent
          }]);
          
          addedComponents.current.add(componentKey);
        }
        break;
      }

      default:
        // No action needed for steps not handled by this Director
        break;
    }
  }, [currentStep, handleOfferChoice, handleDetailsSubmit, handleEdit, handleCalculate, handleStartOver, compareOfferData, isCalculating, setVisibleMessages]);

  // 🎬 The Director manages flow through conversation, not traditional rendering
  return null;
};

export default CompareOfferStepper; 