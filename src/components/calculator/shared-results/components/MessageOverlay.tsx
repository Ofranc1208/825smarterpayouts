/**
 * Message Overlay Component
 * 
 * Separate modal for message entry with terms agreement
 */

import React, { useState } from 'react';
import styles from '../OfferCaptureOverlay.module.css';
import { TermsCheckbox } from './TermsCheckbox';

interface MessageOverlayProps {
  message: string;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isSubmitting: boolean;
  offerCode: string;
}

export const MessageOverlay: React.FC<MessageOverlayProps> = ({
  message,
  onMessageChange,
  onSubmit,
  onClose,
  isSubmitting,
  offerCode,
}) => {
  const [showError, setShowError] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowError(false);
    onMessageChange(e);
  };

  return (
    <div className={styles.messageOverlayBackdrop} onClick={onClose}>
      <div 
        className={styles.messageOverlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.messageOverlayCloseButton}
          onClick={onClose}
          aria-label="Close message overlay"
          type="button"
        >
          ×
        </button>

        <div className={styles.messageOverlayHeader}>
          <h4 className={styles.messageOverlayTitle}>Enter Your Message</h4>
          <p className={styles.messageOverlaySubtitle}>
            We'll send your offer code {offerCode} via text message. Please include your phone number in your message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.messageOverlayForm}>
          <div className={styles.messageInputWrapper}>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message here... (Please include your phone number)"
              className={styles.messageOverlayInput}
              required
              disabled={isSubmitting}
              maxLength={1000}
              rows={5}
              autoFocus
            />
            {showError && !message.trim() && (
              <div className={styles.messageOverlayError}>
                Please enter a message with your phone number
              </div>
            )}
            {showError && message.trim() && !agreeToTerms && (
              <div className={styles.messageOverlayError}>
                Please agree to the terms and conditions
              </div>
            )}
          </div>

          <TermsCheckbox
            agreeToTerms={agreeToTerms}
            activeTab="sms"
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
            className={styles.messageOverlaySubmitButton}
            disabled={isSubmitting || !message.trim() || !agreeToTerms}
          >
            {isSubmitting ? 'Sending...' : 'Send My Offer via Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

