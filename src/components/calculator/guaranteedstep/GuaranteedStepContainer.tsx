"use client";

import React, { Suspense } from 'react';
import styles from './GuaranteedStepContainer.module.css';

interface GuaranteedStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const GuaranteedStepContainerContent: React.FC<GuaranteedStepContainerProps> = ({ title, children, currentStep, totalSteps }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.stepIndicator}>
          Step {currentStep} of {totalSteps}
        </span>
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