/**
 * Bonus Message Component
 * 
 * Displays the $5,000 bonus message with expiration timer
 */

import React, { useState, useEffect } from 'react';
import styles from '../OfferCaptureOverlay.module.css';

export const BonusMessage: React.FC = () => {
  // Calculate total seconds for hours:minutes:seconds format
  // Generate random time between 48-72 hours (2-3 days) in seconds
  const [totalSeconds, setTotalSeconds] = useState(() => {
    const randomHours = Math.floor(Math.random() * 24) + 48; // 48-71 hours
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);
    return randomHours * 3600 + randomMinutes * 60 + randomSeconds;
  });

  // Update timer every second for visible movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 0) {
          // Reset to maintain urgency (never actually expires)
          return 48 * 3600 + Math.floor(Math.random() * 24 * 3600); // 48-72 hours
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Calculate hours, minutes, and seconds from total seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className={styles.bonusMessage}>
      <p className={styles.bonusText}>
        Get an additional <strong>up to $5,000 bonus</strong> towards closing by using the offer code!
      </p>
      <div className={styles.expirationTimer}>
        <span className={styles.expirationLabel}>Offer expires in:</span>
        <span className={styles.timerValue}>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

