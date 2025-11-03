/**
 * Offer Code Display Component
 * 
 * Displays the unique offer code in a compact blue box
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface OfferCodeDisplayProps {
  offerCode: string;
}

export const OfferCodeDisplay: React.FC<OfferCodeDisplayProps> = ({ offerCode }) => {
  return (
    <div className={styles.offerCodeContainer} style={{ maxWidth: '100%', width: 'fit-content' }}>
      <span className={styles.offerCodeLabel}>Offer Code:</span>
      <span className={styles.offerCodeDisplay}>{offerCode}</span>
    </div>
  );
};

