"use client";

import React from 'react';
import styles from './GuaranteedAssistantBackdrop.module.css';

export interface GuaranteedAssistantBackdropProps {
  onClose: () => void;
}

/**
 * GuaranteedAssistantBackdrop - Overlay backdrop for guaranteed assistant panel
 * Handles click-to-close functionality
 */
const GuaranteedAssistantBackdrop: React.FC<GuaranteedAssistantBackdropProps> = ({
  onClose
}) => {
  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      aria-label="Close assistant panel"
    />
  );
};

export default GuaranteedAssistantBackdrop;
