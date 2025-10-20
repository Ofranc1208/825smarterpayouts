/**
 * LoadingScreen - Branded loading experience for SmarterPayouts
 * 
 * Extracted from AppProviders for better organization and reusability.
 * Shows professional loading screen with company branding and messaging.
 */

import React from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Connecting..." 
}) => {
  return (
    <div className={styles.container}>
      {/* Simple branding */}
      <div className={styles.branding}>
        <h1 className={styles.title}>
          SmarterPayouts
        </h1>
        <p className={styles.tagline}>
          Know your upfront price
        </p>
      </div>

      {/* Key benefits */}
      <div className={styles.benefits}>
        <h2 className={styles.benefitsTitle}>
          100% Upfront Pricing
        </h2>
        <p className={styles.benefitsText}>
          Complete transparency • We never ask for personal information to get a quote
        </p>
      </div>

      {/* Loading spinner */}
      <div className={styles.spinner}>
        <div className={styles.spinnerIcon} />
        <p className={styles.spinnerText}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
