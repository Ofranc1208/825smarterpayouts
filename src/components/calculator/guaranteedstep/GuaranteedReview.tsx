"use client";

import React from 'react';
import styles from './GuaranteedReview.module.css';

interface GuaranteedReviewProps {
  paymentMode: string;
  paymentAmount: string;
  annualIncrease: number;
  startDate: string;
  endDate: string;
  payments?: Array<{ amount: string; lumpSumDate: string }>;
  onCalculate: () => void;
  onEdit?: (step: number) => void;
  error?: string;
  currentStep: number;
  totalSteps: number;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const GuaranteedReview: React.FC<GuaranteedReviewProps> = ({
  paymentMode,
  paymentAmount,
  annualIncrease,
  startDate,
  endDate,
  payments,
  onCalculate,
  onEdit,
  error,
  currentStep,
  totalSteps
}) => {
  return (
    <div className={styles.container}>
      {/* Review Header - Match LCP exactly */}
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Review & Calculate</h1>
        <p className={styles.subtitle}>
          Review your information before calculating your offer
        </p>
      </div>

      <div className={styles.card}>
        {/* Action Buttons - Edit Form (secondary) and Calculate (primary) */}
        <div className={styles.buttonGroup}>
          {onEdit && (
            <button
              className={styles.editButton}
              onClick={() => onEdit(1)}
              type="button"
            >
              ✏️ Edit Form
            </button>
          )}
          
          <button
            className={styles.calculateButton}
            onClick={onCalculate}
            type="button"
          >
            Calculate
          </button>
        </div>

        {/* Scrollable Review Sections Container */}
        <div className={styles.scrollContainer}>
          {/* Payment Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Payment</span>
            </div>
            <div className={styles.sectionContent}>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <span className={styles.label}>Payment Mode:</span>
                  <span className={styles.value}>{paymentMode}</span>
                </li>
                
                {paymentMode === 'Lump Sum' && payments ? (
                  <>
                    <li className={styles.listItem}>
                      <span className={styles.label}>Number of Payments:</span>
                      <span className={styles.value}>{payments.length}</span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.label}>Total Amount:</span>
                      <span className={styles.value}>
                        ${payments.reduce((sum, payment) => sum + Number(payment.amount), 0).toLocaleString()}
                      </span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.label}>Annual Increase:</span>
                      <span className={styles.value}>{annualIncrease}%</span>
                    </li>
                    
                    {/* Show individual payments */}
                    {payments.map((payment, index) => (
                      <li key={index} className={styles.lumpSumPayment}>
                        <div className={styles.paymentDetails}>
                          <div className={styles.paymentRow}>
                            <span className={styles.paymentLabel}>Payment {index + 1}:</span>
                            <span className={styles.paymentValue}>
                              ${Number(payment.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className={styles.paymentRow}>
                            <span className={styles.paymentLabel}>Date:</span>
                            <span className={styles.paymentValue}>
                              {formatDate(payment.lumpSumDate)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li className={styles.listItem}>
                      <span className={styles.label}>Amount:</span>
                      <span className={styles.value}>
                        ${Number(paymentAmount).toLocaleString()}
                      </span>
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.label}>Annual Increase:</span>
                      <span className={styles.value}>{annualIncrease}%</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Details Section - Only show for non-lump sum payments */}
          {paymentMode !== 'Lump Sum' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Details</span>
              </div>
              <div className={styles.sectionContent}>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span className={styles.label}>Start Date:</span>
                    <span className={styles.value}>{formatDate(startDate)}</span>
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.label}>End Date:</span>
                    <span className={styles.value}>{formatDate(endDate)}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuaranteedReview; 