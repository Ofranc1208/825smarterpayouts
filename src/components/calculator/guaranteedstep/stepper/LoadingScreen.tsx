import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Logo/Brand Section */}
      <div className={styles.brandSection}>
        <h1 className={styles.title}>
          Smarter Payouts
        </h1>
        <p className={styles.subtitle}>
          100% No information required
        </p>
      </div>

      {/* Loading Animation */}
      <div className={styles.loadingSection}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>
          Loading calculator...
        </p>
        <p className={styles.stepText}>
          Current step: Initializing
        </p>
      </div>

      {/* Progress Info */}
      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <p className={styles.infoTitle}>
            💡 100% Upfront Pricing
          </p>
          <p className={styles.infoDescription}>
            Complete transparency • We never ask for personal information to get a quote
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
