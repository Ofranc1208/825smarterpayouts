"use client";

import React from 'react';
import styles from './GuaranteedAssistantHeader.module.css';

export interface GuaranteedAssistantHeaderProps {
  title?: string;
  onClose: () => void;
  onTestError?: () => void;
  showTestButton?: boolean;
}

/**
 * GuaranteedAssistantHeader - Header component for guaranteed assistant panel
 * Contains title, optional test error button, and close button
 */
const GuaranteedAssistantHeader: React.FC<GuaranteedAssistantHeaderProps> = ({
  title = "Guaranteed Payment Assistant",
  onClose,
  onTestError,
  showTestButton = false
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <span className={styles.icon}>
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '20px',
              height: '20px',
              objectFit: 'contain'
            }}
          />
        </span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.headerButtons}>
        {showTestButton && onTestError && (
          <button
            className={styles.testErrorButton}
            onClick={onTestError}
            aria-label="Test error handling"
            title="Test error handling"
            type="button"
          >
            🧪
          </button>
        )}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close assistant"
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default GuaranteedAssistantHeader;
