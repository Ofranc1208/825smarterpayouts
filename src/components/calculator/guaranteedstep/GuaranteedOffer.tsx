"use client";

import React, { useState, useEffect } from 'react';
import { GuaranteedOfferLoadingAnimation } from './results-components';
import { formatCurrency, validateOfferThreshold } from './utils/validationHelpers';
import { OfferCaptureOverlay } from '../shared-results';
import styles from './GuaranteedOffer.module.css';

interface GuaranteedOfferProps {
  calculationResult: {
    minOffer: number;
    maxOffer: number;
  };
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

/**
 * ============================================================================
 * GUARANTEED OFFER - PROFESSIONAL CONTRACT STYLE
 * ============================================================================
 * Shows loading animation first, then reveals the professional offer display
 * Matches LCP design exactly
 */
const GuaranteedOffer: React.FC<GuaranteedOfferProps> = ({ 
  calculationResult, 
  onBack 
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowResults(true);
  };

  // Validate offer threshold - check if MAXIMUM payout is below $10,000
  const offerValidation = validateOfferThreshold(calculationResult.maxOffer);

  // Show loading animation first
  if (showLoading) {
    return <GuaranteedOfferLoadingAnimation onComplete={handleLoadingComplete} />;
  }

  // If maximum offer is below $10,000 threshold, show "No Offers Available" message
  if (!offerValidation.isValid) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.noOffersCard}>
          <h3 className={styles.noOffersTitle}>No Offers Available</h3>
          <p className={styles.noOffersMessage}>{offerValidation.error}</p>
          <div className={styles.suggestionsContainer}>
            <h4 className={styles.suggestionsTitle}>Suggestions to get an offer:</h4>
            <ul className={styles.suggestionsList}>
              <li className={styles.suggestionItem}>Increase your payment amount</li>
              <li className={styles.suggestionItem}>Extend your date range</li>
              <li className={styles.suggestionItem}>Consider including more payments</li>
              <li className={styles.suggestionItem}>Contact our specialists for assistance</li>
            </ul>
          </div>
          {onBack && (
            <button onClick={onBack} className={styles.contactButton}>
              Go Back to Edit
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show the professional contract-style results
  return (
    <>
      <div className={styles.pageContainer}>
        {/* Contract-Inspired Document */}
        <div className={styles.documentCard}>
          {/* Decorative Border Corners */}
          <div className={styles.cornerTopLeft} />
          <div className={styles.cornerTopRight} />
          <div className={styles.cornerBottomLeft} />
          <div className={styles.cornerBottomRight} />

          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Early Payout Offer</h1>
            <p className={styles.subtitle}>STRUCTURED SETTLEMENT VALUATION</p>
          </div>

          {/* Minimum Payout - Top, Smaller, Center-Aligned */}
          <div className={styles.minimumPayoutContainer}>
            <p className={styles.minimumLabel}>Minimum Payout</p>
            <p className={styles.minimumAmount}>{formatCurrency(calculationResult.minOffer)}</p>
          </div>

          {/* Maximum Payout - Center & Largest with Shimmer */}
          <div className={styles.maximumPayoutContainer}>
            <p className={styles.maximumLabel}>Maximum Payout</p>
            <p className={styles.maximumAmount}>{formatCurrency(calculationResult.maxOffer)}</p>
          </div>

          {/* Footer Note */}
          <div className={styles.footer}>
            <p className={styles.disclaimer}>
              This offer is based on the information you provided and represents an estimated range.<br />
              Final terms subject to verification and approval.
            </p>
          </div>
        </div>
      </div>

      {/* Offer Capture Overlay - Only show when results are displayed */}
      {showResults && offerValidation.isValid && (
        <OfferCaptureOverlay
          calculatorType="guaranteed"
          delaySeconds={7}
          quoteData={{
            minOffer: calculationResult.minOffer,
            maxOffer: calculationResult.maxOffer,
          }}
          onSuccess={(data) => {
            console.log('Offer captured:', data);
          }}
        />
      )}
    </>
  );
};

export default GuaranteedOffer;
