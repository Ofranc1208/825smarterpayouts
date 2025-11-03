/**
 * Success State Component
 * 
 * Displays success message after offer capture submission
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface SuccessStateProps {
  activeTab: 'email' | 'sms';
}

export const SuccessState: React.FC<SuccessStateProps> = ({ activeTab }) => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>✓</div>
      <h3 className={styles.successTitle}>Message Sent!</h3>
      <p className={styles.successMessage}>
        {activeTab === 'email' 
          ? "We've emailed your offer details to you."
          : "We've received your message and will contact you soon about your offer."}
      </p>
    </div>
  );
};

