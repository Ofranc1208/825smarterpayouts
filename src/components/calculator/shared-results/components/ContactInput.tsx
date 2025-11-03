/**
 * Contact Input Component
 * 
 * Displays email input or message textarea based on active tab
 */

import React, { useState } from 'react';
import styles from '../OfferCaptureOverlay.module.css';

interface ContactInputProps {
  activeTab: 'email' | 'sms';
  email: string;
  message: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  agreeToTerms: boolean;
  isSubmitting: boolean;
}

export const ContactInput: React.FC<ContactInputProps> = ({
  activeTab,
  email,
  message,
  onEmailChange,
  onMessageChange,
  agreeToTerms,
  isSubmitting,
}) => {
  const [showTermsWarning, setShowTermsWarning] = useState(false);

  const handleInputFocus = () => {
    if (!agreeToTerms) {
      setShowTermsWarning(true);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    if (!agreeToTerms) {
      e.preventDefault();
      setShowTermsWarning(true);
    }
  };

  const handleInputGroupClick = (e: React.MouseEvent) => {
    if (!agreeToTerms) {
      e.preventDefault();
      e.stopPropagation();
      setShowTermsWarning(true);
      // Hide warning after 5 seconds
      setTimeout(() => {
        setShowTermsWarning(false);
      }, 5000);
    }
  };

  // Hide warning when terms are agreed
  React.useEffect(() => {
    if (agreeToTerms) {
      setShowTermsWarning(false);
    }
  }, [agreeToTerms]);

  return (
    <>
      <div 
        className={styles.inputGroup}
        onClick={handleInputGroupClick}
        style={{ cursor: !agreeToTerms ? 'not-allowed' : 'text' }}
      >
        {activeTab === 'email' ? (
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            onFocus={handleInputFocus}
            onClick={handleInputClick}
            placeholder={agreeToTerms ? "Enter your email address" : "Please agree to terms first"}
            className={styles.input}
            required
            disabled={isSubmitting || !agreeToTerms}
            inputMode="email"
            autoComplete="email"
          />
        ) : (
          <textarea
            value={message}
            onChange={onMessageChange}
            onFocus={handleInputFocus}
            onClick={handleInputClick}
            placeholder={agreeToTerms ? "Type your message here... (Please include your phone number)" : "Please agree to terms first"}
            className={styles.messageInput}
            required
            disabled={isSubmitting || !agreeToTerms}
            maxLength={1000}
          />
        )}
      </div>
      {showTermsWarning && !agreeToTerms && (
        <div className={styles.termsWarningMessage}>
          ⚠️ Please check the "I agree to the terms and conditions" box to continue
        </div>
      )}
    </>
  );
};

