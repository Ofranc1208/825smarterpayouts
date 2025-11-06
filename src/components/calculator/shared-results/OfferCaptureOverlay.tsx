"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './OfferCaptureOverlay.module.css';
import { useFormValidation } from './hooks/useFormValidation';
import { useOfferCapture } from './hooks/useOfferCapture';
import {
  OverlayHeader,
  ContactTabs,
  OfferCodeDisplay,
  CallToActionButton,
  SuccessState,
  EmailOverlay,
  MessageOverlay,
} from './components';

interface OfferCaptureOverlayProps {
  calculatorType?: 'guaranteed' | 'lcp';
  delaySeconds?: number;
  onDismiss?: () => void;
  onSuccess?: (data: { email?: string; message?: string; deliveryMethod: 'email' | 'sms' }) => void;
  quoteData?: {
    minOffer: number;
    maxOffer: number;
    familyProtectionValue?: number; // Only for LCP
  };
}

/**
 * ============================================================================
 * OFFER CAPTURE OVERLAY - ORCHESTRATOR
 * ============================================================================
 * Main orchestrator component that coordinates sub-components and state
 * 
 * Features:
 * - Auto-appears after delay (default 7 seconds)
 * - Email/SMS tab switching
 * - Form validation
 * - API submission
 * - Success feedback
 * - Dismissible
 */
const OfferCaptureOverlay: React.FC<OfferCaptureOverlayProps> = ({
  calculatorType = 'guaranteed',
  delaySeconds = 5,
  onDismiss,
  onSuccess,
  quoteData
}) => {
  const router = useRouter();
  
  // Main state
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [showSuccess, setShowSuccess] = useState(false);
  const [offerCode, setOfferCode] = useState<string>('');
  const [showEmailOverlay, setShowEmailOverlay] = useState(false);
  const [showMessageOverlay, setShowMessageOverlay] = useState(false);

  // Custom hooks for form validation and API submission
  const formValidation = useFormValidation();
  const offerCapture = useOfferCapture();

  // Generate offer code when component mounts (6 digits only)
  useEffect(() => {
    const generateOfferCode = () => {
      const digits = Math.floor(100000 + Math.random() * 900000).toString();
      return digits;
    };
    setOfferCode(generateOfferCode());
  }, [calculatorType]);

  // Auto-show after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  // Prevent body scroll when overlay is visible - COMPLETE LOCK
  useEffect(() => {
    if (isVisible && !showSuccess) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [isVisible, showSuccess]);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Handle tab change
  const handleTabChange = (tab: 'email' | 'sms') => {
    setActiveTab(tab);
    formValidation.clearError();
  };

  // Handle email tab click - always opens email overlay
  const handleEmailTabClick = () => {
    setShowEmailOverlay(true);
    setActiveTab('email');
  };

  // Handle email overlay close
  const handleEmailOverlayClose = () => {
    setShowEmailOverlay(false);
    // Keep email tab active since it's the default
    setActiveTab('email');
  };

  // Handle message tab click - always opens message overlay
  const handleMessageTabClick = () => {
    setShowMessageOverlay(true);
    setActiveTab('sms');
  };

  // Handle message overlay close
  const handleMessageOverlayClose = () => {
    setShowMessageOverlay(false);
    // Keep message tab active
    setActiveTab('sms');
  };

  // Handle message form submission from overlay
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate message
    if (!formValidation.message.trim()) {
      formValidation.setError('Please enter a message with your phone number');
      return;
    }

    // Submit offer capture
    console.log('🎯 [OfferCaptureOverlay] Calling submitOfferCapture for SMS...');
    console.log('🎯 [OfferCaptureOverlay] Data:', {
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: 'sms',
      message: formValidation.message,
    });

    const result = await offerCapture.submitOfferCapture({
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: 'sms',
      contactInfo: {
        email: '',
        message: formValidation.message,
      },
    });

    console.log('🎯 [OfferCaptureOverlay] Result:', result);

    if (result.success) {
      console.log('✅ [OfferCaptureOverlay] Success! Setting showSuccess to true');
      setShowMessageOverlay(false);
      setShowSuccess(true);
      onSuccess?.({
        email: undefined,
        message: formValidation.message,
        deliveryMethod: 'sms'
      });
    } else {
      console.error('❌ [OfferCaptureOverlay] Failed:', result.error);
      formValidation.setError(result.error || 'Failed to save offer. Please try again.');
    }
  };

  // Handle email form submission from overlay
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!formValidation.email.trim()) {
      formValidation.setError('Please enter a valid email address');
      return;
    }

    // Submit offer capture
    console.log('🎯 [OfferCaptureOverlay] Calling submitOfferCapture for email...');
    console.log('🎯 [OfferCaptureOverlay] Data:', {
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: 'email',
      email: formValidation.email,
    });

    const result = await offerCapture.submitOfferCapture({
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: 'email',
      contactInfo: {
        email: formValidation.email,
        message: '',
      },
    });

    console.log('🎯 [OfferCaptureOverlay] Result:', result);

    if (result.success) {
      console.log('✅ [OfferCaptureOverlay] Success! Setting showSuccess to true');
      setShowEmailOverlay(false);
      setShowSuccess(true);
      onSuccess?.({
        email: formValidation.email,
        message: undefined,
        deliveryMethod: 'email'
      });
    } else {
      console.error('❌ [OfferCaptureOverlay] Failed:', result.error);
      formValidation.setError(result.error || 'Failed to save offer. Please try again.');
    }
  };


  // Handle form submission - no longer needed since both email and message use overlays
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is now handled in respective overlays
    return;
  };

  // Handle dismiss - works from both main form and success state
  // Redirects to /main page instead of just dismissing
  const handleDismiss = () => {
    // Use window.location for instant redirect (faster than router.push)
    window.location.href = '/main';
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div 
        className={`${styles.overlayContent} ${showSuccess ? styles.successState : ''}`}
      >
        {/* Close Button - Always visible */}
        <button 
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Close overlay"
          type="button"
        >
          ×
        </button>

        {showSuccess ? (
          <SuccessState activeTab={activeTab} />
        ) : (
          <>
            <OverlayHeader />
            <ContactTabs 
              activeTab={activeTab} 
              agreeToTerms={true}
              onTabChange={handleTabChange}
              onEmailTabClick={handleEmailTabClick}
              onMessageTabClick={handleMessageTabClick}
            />
            
            <div className={styles.form}>
              {/* Error Message */}
              {formValidation.error && (
                <div className={styles.errorMessage}>
                  {formValidation.error}
                </div>
              )}

              <OfferCodeDisplay offerCode={offerCode} />

              <CallToActionButton />
            </div>
          </>
        )}
      </div>

      {/* Email Overlay - Separate modal for email entry */}
      {showEmailOverlay && (
        <EmailOverlay
          email={formValidation.email}
          onEmailChange={formValidation.handleEmailChange}
          onSubmit={handleEmailSubmit}
          onClose={handleEmailOverlayClose}
          isSubmitting={offerCapture.isSubmitting}
          offerCode={offerCode}
        />
      )}

      {/* Message Overlay - Hidden for now, will be used with Twilio later */}
      {/* {showMessageOverlay && (
        <MessageOverlay
          message={formValidation.message}
          onMessageChange={formValidation.handleMessageChange}
          onSubmit={handleMessageSubmit}
          onClose={handleMessageOverlayClose}
          isSubmitting={offerCapture.isSubmitting}
          offerCode={offerCode}
        />
      )} */}

    </div>
  );
};

export default OfferCaptureOverlay;
