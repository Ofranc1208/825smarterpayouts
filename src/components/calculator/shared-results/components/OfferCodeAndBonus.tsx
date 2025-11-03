/**
 * Offer Code and Bonus Combined Component
 * 
 * Displays the offer code and $5,000 bonus message in a single unified card
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface OfferCodeAndBonusProps {
  offerCode: string;
}

export const OfferCodeAndBonus: React.FC<OfferCodeAndBonusProps> = ({ offerCode }) => {
  return (
    <div className={styles.offerCodeAndBonusCard}>
      <div className={styles.offerCodeAndBonusContent}>
        <div className={styles.offerCodeSection}>
          <span className={styles.offerCodeSectionLabel}>Offer Code:</span>
          <span className={styles.offerCodeSectionDisplay}>{offerCode}</span>
        </div>
        <div className={styles.bonusSection}>
          <p className={styles.bonusSectionText}>
            Get up to <strong>$5,000 bonus</strong> towards closing your structured settlement!
          </p>
        </div>
      </div>
    </div>
  );
};

