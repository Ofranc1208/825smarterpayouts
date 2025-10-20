"use client";

import React from 'react';
import styles from './GuaranteedAssistantHeader.module.css';

export interface GuaranteedAssistantHeaderProps {
  title?: string;
  onClose: () => void;
}

/**
 * GuaranteedAssistantHeader - Header component for guaranteed assistant panel
 * Contains title and close button
 */
const GuaranteedAssistantHeader: React.FC<GuaranteedAssistantHeaderProps> = ({
  title = "Guaranteed Payment Assistant",
  onClose
}) => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close assistant"
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export default GuaranteedAssistantHeader;
