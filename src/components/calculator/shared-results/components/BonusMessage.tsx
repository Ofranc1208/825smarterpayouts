/**
 * Bonus Message Component
 * 
 * Displays the $5,000 bonus message
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

export const BonusMessage: React.FC = () => {
  return (
    <div className={styles.bonusMessage}>
      <p className={styles.bonusText}>
        Get up to <strong>$5,000 bonus</strong> towards closing your structured settlement!
      </p>
    </div>
  );
};

