import { useContext } from 'react';
import { CalculatorContext } from '../contexts/CalculatorContext';
import { STEP_REGISTRY } from '../services/stepRegistry';

// Type for step metadata
interface StepMeta {
  question: string;
  inputType: 'number' | 'date' | 'string' | 'choice';
  choices?: string[];
}

export function useFormStepSnapshot() {
  try {
    const context = useContext(CalculatorContext);
    
    if (!context) {
      console.log('[useFormStepSnapshot] CalculatorContext not available');
      return null;
    }
    
    const currentStep = context.currentStep;

    if (!currentStep) {
      console.log('[useFormStepSnapshot] No current step available');
      return null;
    }

    // Determine flow name
    const flowName = currentStep.startsWith('lcp-') ? 'LCP' : 'Guaranteed';

    // Look up metadata in the registry
    const meta: StepMeta | undefined = (STEP_REGISTRY as Record<string, StepMeta>)[currentStep];

    return {
      flowName,
      stepId: currentStep,
      question: meta?.question || '',
      inputType: meta?.inputType || 'string',
      choices: meta?.choices,
    };
  } catch (error) {
    console.error('[useFormStepSnapshot] Error accessing CalculatorContext:', error);
    return null;
  }
} 