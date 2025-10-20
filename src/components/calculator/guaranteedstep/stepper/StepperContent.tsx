import React, { useState, useEffect } from 'react';
import { useGuaranteedAssistant } from '../../../../contexts/GuaranteedAssistantContext';
import LoadingScreen from './LoadingScreen';
import StepperCore from './StepperCore';
import styles from './StepperContent.module.css';

const StepperContent: React.FC = () => {
  const { openAssistant } = useGuaranteedAssistant();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Hide loading screen after a brief delay to ensure smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800); // Brief delay for smooth loading experience

    return () => clearTimeout(timer);
  }, []);

  // Show branded loading screen while initializing
  if (isPageLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <StepperCore />
    </div>
  );
};

export default StepperContent;
