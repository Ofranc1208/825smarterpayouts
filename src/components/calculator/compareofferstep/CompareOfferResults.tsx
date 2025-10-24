import React from 'react';
import styles from './CompareOfferResults.module.css';
import { CompareOfferData, PAYMENT_FREQUENCY_LABELS } from './utils/compareOfferTypes';
import { formatCurrency, formatPercentage } from './utils/compareOfferCalculations';

interface CompareOfferResultsProps {
  isInteractive: boolean;
  data: CompareOfferData;
  onStartOver: () => void;
}

const CompareOfferResults: React.FC<CompareOfferResultsProps> = ({ 
  isInteractive, 
  data,
  onStartOver
}) => {
  const existingOfferAmount = parseFloat(data.existingOfferAmount);
  const calculatedOfferAmount = data.calculatedOfferAmount || 0;
  const difference = data.difference || 0;
  const percentageDifference = data.percentageDifference || 0;
  const isBetterOffer = data.isBetterOffer || false;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Offer Comparison</h3>
        <p className={styles.description}>
          Here's how our offer compares to {data.companyName || 'the existing offer'}
        </p>

        {/* Comparison Cards */}
        <div className={styles.comparisonGrid}>
          {/* Their Offer */}
          <div className={styles.offerCard}>
            <div className={styles.offerHeader}>
              <span className={styles.offerLabel}>Their Offer</span>
              {data.companyName && (
                <span className={styles.companyBadge}>{data.companyName}</span>
              )}
            </div>
            <div className={styles.offerAmount}>
              {formatCurrency(existingOfferAmount)}
            </div>
            <div className={styles.offerDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Payment:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(parseFloat(data.paymentAmount))}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Frequency:</span>
                <span className={styles.detailValue}>
                  {PAYMENT_FREQUENCY_LABELS[data.paymentFrequency]}
                </span>
              </div>
            </div>
          </div>

          {/* Our Offer */}
          <div className={`${styles.offerCard} ${styles.ourOffer}`}>
            <div className={styles.offerHeader}>
              <span className={styles.offerLabel}>Our Offer</span>
              <span className={styles.smarterPayoutsBadge}>SmarterPayouts</span>
            </div>
            <div className={`${styles.offerAmount} ${styles.ourOfferAmount}`}>
              {formatCurrency(calculatedOfferAmount)}
            </div>
            <div className={styles.offerDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Same Payment:</span>
                <span className={styles.detailValue}>
                  {formatCurrency(parseFloat(data.paymentAmount))}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Same Frequency:</span>
                <span className={styles.detailValue}>
                  {PAYMENT_FREQUENCY_LABELS[data.paymentFrequency]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Difference Banner */}
        <div className={`${styles.differenceBanner} ${isBetterOffer ? styles.betterOffer : styles.worseOffer}`}>
          <div className={styles.differenceContent}>
            <span className={styles.differenceLabel}>
              {isBetterOffer ? 'You could save:' : 'Difference:'}
            </span>
            <span className={styles.differenceAmount}>
              {formatCurrency(Math.abs(difference))}
            </span>
            <span className={styles.differencePercentage}>
              ({formatPercentage(percentageDifference)})
            </span>
          </div>
          {isBetterOffer && (
            <p className={styles.differenceMessage}>
              Our offer is {formatPercentage(percentageDifference)} better than {data.companyName || 'their offer'}!
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            onClick={onStartOver}
            className={`${styles.startOverButton} ${!isInteractive ? styles.disabled : ''}`}
            disabled={!isInteractive}
          >
            Compare Another Offer
          </button>
          
          <button
            className={`${styles.proceedButton} ${!isInteractive ? styles.disabled : ''}`}
            disabled={!isInteractive}
          >
            Get Started with SmarterPayouts →
          </button>
        </div>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          * This is an estimated comparison based on the information provided. 
          Final offers may vary based on additional factors and verification of payment details.
        </p>
      </div>
    </div>
  );
};

export default CompareOfferResults;



