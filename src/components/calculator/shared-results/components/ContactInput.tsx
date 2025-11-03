/**
 * Contact Input Component
 * 
 * Displays email input or message textarea based on active tab
 */

import React from 'react';
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
  return (
    <div className={styles.inputGroup}>
      {activeTab === 'email' ? (
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder={agreeToTerms ? "Enter your email address" : "Please agree to terms first"}
          className={styles.input}
          required
          disabled={isSubmitting || !agreeToTerms}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          inputMode="email"
          autoComplete="email"
        />
      ) : (
        <textarea
          value={message}
          onChange={onMessageChange}
          placeholder={agreeToTerms ? "Type your message here... (Please include your phone number)" : "Please agree to terms first"}
          className={styles.messageInput}
          required
          disabled={isSubmitting || !agreeToTerms}
          maxLength={1000}
        />
      )}
    </div>
  );
};

