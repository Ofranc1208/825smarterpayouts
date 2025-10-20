"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// Guaranteed flow is self-contained and uses its own assistant panel/provider
// Assistant functionality now handled by top-level "Need help?" button
import styles from './GuaranteedStepContainer.module.css';

interface GuaranteedStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const GuaranteedStepContainerContent: React.FC<GuaranteedStepContainerProps> = ({ title, children, currentStep, totalSteps }) => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  // Assistant actions are handled by top-level "Need help?" button and `GuaranteedAssistantPanel`
  
  // Build the back URL with session ID and chat=open
  const backUrl = sessionId 
    ? `/mint-intelligent-chat?sessionId=${sessionId}&chat=open`
    : '/mint-intelligent-chat?chat=open';




  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={backUrl} className={styles.backLink}>
          ‹ Back to Chat
        </Link>
        <div className={styles.headerRight}>
          <span className={styles.stepIndicator}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </header>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

const GuaranteedStepContainer: React.FC<GuaranteedStepContainerProps> = (props) => {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    }>
      <GuaranteedStepContainerContent {...props} />
    </Suspense>
  );
};

export default GuaranteedStepContainer; 