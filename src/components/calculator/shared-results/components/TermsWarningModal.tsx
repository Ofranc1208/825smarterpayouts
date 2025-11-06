/**
 * Terms Warning Modal Component
 * 
 * Shows a warning message when user tries to access email without agreeing to terms
 */

import React from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface TermsWarningModalProps {
  onClose: () => void;
  onAgreeClick: () => void;
}

export const TermsWarningModal: React.FC<TermsWarningModalProps> = ({
  onClose,
  onAgreeClick,
}) => {
  const handleAgreeClick = () => {
    onAgreeClick();
    onClose();
  };

  return (
    <div className={styles.termsWarningModal} onClick={onClose}>
      <div 
        className={styles.termsWarningContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.termsWarningIcon}>⚠️</div>
        <h4 className={styles.termsWarningTitle}>Please Agree to Terms</h4>
        <p className={styles.termsWarningMessage}>
          You need to agree to the terms and conditions before you can send your offer via email.
        </p>
        <button
          type="button"
          className={styles.termsWarningButton}
          onClick={handleAgreeClick}
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

