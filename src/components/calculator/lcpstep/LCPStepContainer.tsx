"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAssistant } from '../../../contexts/AssistantContext';
import styles from './LCPStepContainer.module.css';

interface LCPStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const LCPStepContainerContent: React.FC<LCPStepContainerProps> = ({ title, children, currentStep, totalSteps }) => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { openAssistant } = useAssistant();

  // Build the back URL with session ID and chat=open
  const backUrl = sessionId
    ? `/mint-intelligent-chat?sessionId=${sessionId}&chat=open`
    : '/mint-intelligent-chat?chat=open';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.stepIndicator}>
          Step {currentStep} of {totalSteps}
        </div>
      </header>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

const LCPStepContainer: React.FC<LCPStepContainerProps> = (props) => {
  return (
    <Suspense fallback={
      <div className={`${styles.container} ${styles.loading}`}>
        <div>Loading...</div>
      </div>
    }>
      <LCPStepContainerContent {...props} />
    </Suspense>
  );
};

export default LCPStepContainer; 