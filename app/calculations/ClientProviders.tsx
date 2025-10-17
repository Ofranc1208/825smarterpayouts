"use client";

import React, { ReactNode, useState, useCallback } from 'react';
import { AssistantProvider } from '../../src/contexts/AssistantContext';
import { CalculatorProvider } from '../../src/contexts/CalculatorContext';
import AssistantPanel from '../../src/components/calculator/lcpstep/AssistantPanel';


// Unique ID generator
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [visibleMessages, setVisibleMessages] = useState<any[]>([]);

  // Function to log user choices as messages in chat
  const logUserChoiceAsMessage = useCallback((text: string) => {
    const userChoiceMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: text,
      sender: 'user',
    };
    setVisibleMessages(prev => [...prev, userChoiceMessage]);
  }, []);

  return (
    <AssistantProvider>
      <CalculatorProvider logUserChoiceAsMessage={logUserChoiceAsMessage}>
        {children}
        <AssistantPanel />
      </CalculatorProvider>
    </AssistantProvider>
  );
} 