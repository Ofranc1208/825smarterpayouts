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
        {/* Calculator Content */}
        <main className="main-content" style={{ minHeight: 'calc(100vh - 200px)', padding: '1rem 0' }}>
          <div className="container">
            {children}
          </div>
        </main>
        

        
        {/* Assistant Panel - Lower z-index to not cover navbar */}
        <AssistantPanel />
      </CalculatorProvider>
    </AssistantProvider>
  );
} 