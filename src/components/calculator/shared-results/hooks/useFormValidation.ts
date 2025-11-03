/**
 * Form Validation Hook
 * 
 * Handles email/message validation and formatting logic
 */

import { useState, useCallback } from 'react';
import { validateEmail, filterEmailInput, validateMessageContainsPhone } from '../utils/validationHelpers';

export function useFormValidation() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = filterEmailInput(e.target.value);
    setEmail(filteredValue);
    setError('');
    
    // Real-time validation feedback
    if (filteredValue && filteredValue.length > 0) {
      // Only show error if user has typed something meaningful and it's invalid
      if (filteredValue.length > 3 && !validateEmail(filteredValue)) {
        // Don't show error while user is still typing (wait until they pause or have @ and .)
        if (filteredValue.includes('@') && filteredValue.includes('.')) {
          // Only validate if they have @ and . already
        }
      }
    }
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setError('');
  }, []);

  const validateForm = useCallback((activeTab: 'email' | 'sms'): boolean => {
    setError('');
    
    if (activeTab === 'email') {
      if (!email.trim()) {
        setError('Please enter your email address');
        return false;
      }
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      if (!message.trim()) {
        setError('Please enter your message');
        return false;
      }
      if (message.trim().length < 10) {
        setError('Please enter at least 10 characters in your message');
        return false;
      }
      if (message.length > 1000) {
        setError('Message must be 1000 characters or less');
        return false;
      }
      // Require phone number in message
      if (!validateMessageContainsPhone(message)) {
        setError('Please include your phone number in your message (e.g., (123) 456-7890 or 123-456-7890)');
        return false;
      }
    }
    
    return true;
  }, [email, message]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    email,
    message,
    error,
    setEmail,
    setMessage,
    setError,
    handleEmailChange,
    handleMessageChange,
    validateForm,
    clearError,
  };
}

