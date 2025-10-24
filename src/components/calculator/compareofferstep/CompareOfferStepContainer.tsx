"use client";

import React, { Suspense } from 'react';
import styles from './CompareOfferStepContainer.module.css';

interface CompareOfferStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const CompareOfferStepContainerContent: React.FC<CompareOfferStepContainerProps> = ({ 
  title, 
  children, 
  currentStep, 
  totalSteps 
}) => {
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

const CompareOfferStepContainer: React.FC<CompareOfferStepContainerProps> = (props) => {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    }>
      <CompareOfferStepContainerContent {...props} />
    </Suspense>
  );
};

export default CompareOfferStepContainer;



