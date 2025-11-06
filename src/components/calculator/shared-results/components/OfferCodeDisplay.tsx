/**
 * Offer Code Display Component
 * 
 * Displays the unique offer code with instructional text
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface OfferCodeDisplayProps {
  offerCode: string;
}

export const OfferCodeDisplay: React.FC<OfferCodeDisplayProps> = ({ offerCode }) => {
  return (
    <div className={styles.offerCodeCard}>
      <p className={styles.offerCodeInstruction}>
        Use this code to receive up to <span className={styles.offerCodeAmount}>$5,000</span> bonus:
      </p>
      <div className={styles.offerCodeContainer}>
        <span className={styles.offerCodeDisplay}>{offerCode}</span>
      </div>
    </div>
  );
};

