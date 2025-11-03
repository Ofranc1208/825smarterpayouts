"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './OfferCaptureOverlay.module.css';
import { useFormValidation } from './hooks/useFormValidation';
import { useOfferCapture } from './hooks/useOfferCapture';
import {
  OverlayHeader,
  ContactTabs,
  ContactInput,
  TermsCheckbox,
  OfferCodeDisplay,
  BonusMessage,
  CallToActionButton,
  SuccessState,
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
  delaySeconds = 7,
  onDismiss,
  onSuccess,
  quoteData
}) => {
  const router = useRouter();
  
  // Main state
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [offerCode, setOfferCode] = useState<string>('');

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formValidation.validateForm(activeTab)) {
      return;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      formValidation.setError('Please agree to the terms and conditions to continue');
      return;
    }

    // Submit offer capture
    console.log('🎯 [OfferCaptureOverlay] Calling submitOfferCapture...');
    console.log('🎯 [OfferCaptureOverlay] Data:', {
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: activeTab,
      email: formValidation.email,
      message: formValidation.message,
    });

    const result = await offerCapture.submitOfferCapture({
      quoteData,
      calculatorType,
      offerCode,
      deliveryMethod: activeTab,
      contactInfo: {
        email: formValidation.email,
        message: formValidation.message,
      },
    });

    console.log('🎯 [OfferCaptureOverlay] Result:', result);

    if (result.success) {
      console.log('✅ [OfferCaptureOverlay] Success! Setting showSuccess to true');
      setShowSuccess(true);
      onSuccess?.({
        email: activeTab === 'email' ? formValidation.email : undefined,
        message: activeTab === 'sms' ? formValidation.message : undefined,
        deliveryMethod: activeTab
      });
    } else {
      console.error('❌ [OfferCaptureOverlay] Failed:', result.error);
      formValidation.setError(result.error || 'Failed to save offer. Please try again.');
    }
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
            <ContactTabs activeTab={activeTab} onTabChange={handleTabChange} />
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <ContactInput
                activeTab={activeTab}
                email={formValidation.email}
                message={formValidation.message}
                onEmailChange={formValidation.handleEmailChange}
                onMessageChange={formValidation.handleMessageChange}
                agreeToTerms={agreeToTerms}
                isSubmitting={offerCapture.isSubmitting}
              />

              {/* Error Message */}
              {formValidation.error && (
                <div className={styles.errorMessage}>
                  {formValidation.error}
                </div>
              )}

              <TermsCheckbox
                agreeToTerms={agreeToTerms}
                activeTab={activeTab}
                onAgreeChange={setAgreeToTerms}
              />

              <OfferCodeDisplay offerCode={offerCode} />

              {/* Submit Button - Only show when input has value AND terms are agreed */}
              {/* Positioned immediately after offer code for clear action flow */}
              {(activeTab === 'email' ? formValidation.email.trim() : formValidation.message.trim()) && agreeToTerms && (
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={offerCapture.isSubmitting}
                >
                  {offerCapture.isSubmitting ? 'Sending...' : `Send My Offer ${activeTab === 'email' ? 'via Email' : 'via Message'}`}
                </button>
              )}

              <BonusMessage />

              <CallToActionButton />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OfferCaptureOverlay;
