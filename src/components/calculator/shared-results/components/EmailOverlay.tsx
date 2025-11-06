/**
 * Email Overlay Component
 * 
 * Separate modal for email entry with terms agreement
 */

import React, { useState } from 'react';
import styles from '../OfferCaptureOverlay.module.css';
import { TermsCheckbox } from './TermsCheckbox';

interface EmailOverlayProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isSubmitting: boolean;
  offerCode: string;
}

export const EmailOverlay: React.FC<EmailOverlayProps> = ({
  email,
  onEmailChange,
  onSubmit,
  onClose,
  isSubmitting,
  offerCode,
}) => {
  const [showError, setShowError] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setShowError(true);
      return;
    }
    if (!agreeToTerms) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit(e);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    onEmailChange(e);
  };

  return (
    <div className={styles.emailOverlayBackdrop} onClick={onClose}>
      <div 
        className={styles.emailOverlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.emailOverlayCloseButton}
          onClick={onClose}
          aria-label="Close email overlay"
          type="button"
        >
          ×
        </button>

        <div className={styles.emailOverlayHeader}>
          <h4 className={styles.emailOverlayTitle}>Enter Your Email</h4>
          <p className={styles.emailOverlaySubtitle}>
            To get a free copy of your offer emailed to you with the offer code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.emailOverlayForm}>
          <div className={styles.emailInputWrapper}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className={styles.emailOverlayInput}
              required
              disabled={isSubmitting}
              inputMode="email"
              autoComplete="email"
              autoFocus
            />
            {showError && !email.trim() && (
              <div className={styles.emailOverlayError}>
                Please enter a valid email address
              </div>
            )}
            {showError && email.trim() && !agreeToTerms && (
              <div className={styles.emailOverlayError}>
                Please agree to the terms and conditions
              </div>
            )}
          </div>

          <TermsCheckbox
            agreeToTerms={agreeToTerms}
            activeTab="email"
            onAgreeChange={(checked) => {
              setAgreeToTerms(checked);
              if (checked) {
                setShowError(false);
              }
            }}
            highlightRed={false}
          />

          <button
            type="submit"
            className={styles.emailOverlaySubmitButton}
            disabled={isSubmitting || !email.trim() || !agreeToTerms}
          >
            {isSubmitting ? 'Sending...' : 'Send My Offer via Email'}
          </button>
        </form>

        <p className={styles.emailOverlayValidity}>
          Offer is valid for 10 days from receipt.
        </p>
      </div>
    </div>
  );
};

