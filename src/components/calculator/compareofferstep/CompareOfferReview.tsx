import React from 'react';
import styles from './CompareOfferReview.module.css';
import { CompareOfferData, PAYMENT_FREQUENCY_LABELS } from './utils/compareOfferTypes';
import { formatCurrency } from './utils/compareOfferCalculations';

interface CompareOfferReviewProps {
  isInteractive: boolean;
  data: CompareOfferData;
  onEdit: () => void;
  onCalculate: () => void;
  isCalculating?: boolean;
}

const CompareOfferReview: React.FC<CompareOfferReviewProps> = ({ 
  isInteractive, 
  data,
  onEdit,
  onCalculate,
  isCalculating = false
}) => {
  const existingOfferAmount = parseFloat(data.existingOfferAmount);
  const paymentAmount = parseFloat(data.paymentAmount);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Review Your Information</h3>
        <p className={styles.description}>
          Please review the details below before we calculate our competitive offer.
        </p>

        <div className={styles.reviewCard}>
          <div className={styles.reviewSection}>
            <h4 className={styles.sectionTitle}>Existing Offer</h4>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Lump Sum Amount:</span>
              <span className={styles.reviewValue}>{formatCurrency(existingOfferAmount)}</span>
            </div>
            {data.companyName && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Company:</span>
                <span className={styles.reviewValue}>{data.companyName}</span>
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.reviewSection}>
            <h4 className={styles.sectionTitle}>Your Payments</h4>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Payment Amount:</span>
              <span className={styles.reviewValue}>{formatCurrency(paymentAmount)}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Frequency:</span>
              <span className={styles.reviewValue}>
                {PAYMENT_FREQUENCY_LABELS[data.paymentFrequency]}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            onClick={onEdit}
            className={`${styles.editButton} ${!isInteractive ? styles.disabled : ''}`}
            disabled={!isInteractive || isCalculating}
          >
            ← Edit Details
          </button>
          
          <button
            onClick={onCalculate}
            className={`${styles.calculateButton} ${!isInteractive || isCalculating ? styles.disabled : ''}`}
            disabled={!isInteractive || isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Our Offer →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareOfferReview;

