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
      {/* Professional branding section */}
      <div className={styles.branding}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>💰</div>
          <h1 className={styles.title}>
            SmarterPayouts
          </h1>
        </div>
        <p className={styles.tagline}>
          Know your upfront price
        </p>
      </div>

      {/* Enhanced benefits section */}
      <div className={styles.benefits}>
        <div className={styles.benefitsCard}>
          <h2 className={styles.benefitsTitle}>
            100% Upfront Pricing
          </h2>
          <p className={styles.benefitsText}>
            Complete transparency • We never ask for personal information to get a quote
          </p>
        </div>
      </div>

      {/* Professional loading section */}
      <div className={styles.loadingSection}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
        </div>
        <div className={styles.loadingText}>
          <p className={styles.primaryText}>{message}</p>
          <p className={styles.secondaryText}>Please wait while we prepare your experience</p>
        </div>
      </div>

    </div>
  );
};

export default LoadingScreen;
