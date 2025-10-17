"use client";

import React, { useEffect, useState } from 'react';
import { LCPCalculationResult } from '../../../types';
import styles from './LCPaymentResultsPage.module.css';
import { OfferLoadingAnimation } from './results-components';

interface Props {
  result: LCPCalculationResult;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

/**
 * ============================================================================
 * LCP PAYMENT RESULTS PAGE
 * ============================================================================
 * The most exciting page in the calculator - shows loading animation first,
 * then reveals the professional contract-style offer display
 */
const LCPaymentResultsPage: React.FC<Props> = ({ result, onBack, currentStep, totalSteps }) => {
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Show loading animation first
  if (showLoading) {
    return <OfferLoadingAnimation onComplete={handleLoadingComplete} />;
  }

  // Then show the results
  return (
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
        {result.minPayout !== undefined && (
          <div className={styles.minimumPayoutContainer}>
            <p className={styles.minimumLabel}>Minimum Payout</p>
            <p className={styles.minimumAmount}>{formatCurrency(result.minPayout)}</p>
          </div>
        )}

        {/* Maximum Payout - Center & Largest with Shimmer */}
        {result.maxPayout !== undefined && (
          <div className={styles.maximumPayoutContainer}>
            <p className={styles.maximumLabel}>Maximum Payout</p>
            <p className={styles.maximumAmount}>{formatCurrency(result.maxPayout)}</p>
          </div>
        )}

        {/* Family Protection Value - Bottom, Center-Aligned */}
        {result.familyProtectionNPV !== undefined && (
          <div className={styles.familyProtectionContainer}>
            <p className={styles.familyLabel}>Family Protection Value</p>
            <p className={styles.familyAmount}>{formatCurrency(result.familyProtectionNPV)}</p>
          </div>
        )}

        {/* Footer Note */}
        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            This offer is based on the information you provided and represents an estimated range.<br />
            Final terms subject to verification and approval.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LCPaymentResultsPage); 