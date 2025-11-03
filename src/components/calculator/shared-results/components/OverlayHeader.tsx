/**
 * Overlay Header Component
 * 
 * Displays the "Congratulations" title and subtitle
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

export const OverlayHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>Congratulations</h3>
      <p className={styles.subtitle}>
        You qualify for an early payout option
      </p>
    </div>
  );
};

