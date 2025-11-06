/**
 * Call To Action Button Component
 * 
 * Displays the phone call button
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

export const CallToActionButton: React.FC = () => {
  return (
    <div className={styles.phoneCallContainer}>
      <a 
        href="tel:+15615831280" 
        className={styles.phoneLink}
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = 'tel:+15615831280';
        }}
      >
        📞 Call Now to Claim Your Offer
      </a>
    </div>
  );
};

