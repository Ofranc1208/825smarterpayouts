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
      <div className={styles.card}>
        <h2 className={styles.title}>Review & Calculate</h2>
        {onEdit && (
          <div className={styles.editButtonSection}>
            <button
              className={styles.editButton}
              onClick={() => onEdit(1)}
              type="button"
            >
              ✏️ Edit Form
            </button>
          </div>
        )}
        <div className={styles.summarySection}>
          <div className={styles.row}>
            <span className={styles.label}>Payment Mode:</span>
            <span className={styles.value}>{paymentMode}</span>
          </div>
          {paymentMode === 'Lump Sum' && payments ? (
            <>
              <div className={styles.row}>
                <span className={styles.label}>Number of Payments:</span>
                <span className={styles.value}>{payments.length}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Total Amount:</span>
                <span className={styles.value}>
                  ${payments.reduce((sum, payment) => sum + Number(payment.amount), 0).toLocaleString()}
                </span>
              </div>
              {payments.map((payment, index) => (
                <div key={index} className={styles.paymentRow}>
                  <div className={styles.row}>
                    <span className={styles.label}>Payment {index + 1}:</span>
                    <span className={styles.value}>${Number(payment.amount).toLocaleString()}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Date:</span>
                    <span className={styles.value}>{formatDate(payment.lumpSumDate)}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.row}>
                <span className={styles.label}>Payment Amount:</span>
                <span className={styles.value}>${Number(paymentAmount).toLocaleString()}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Start Date:</span>
                <span className={styles.value}>{formatDate(startDate)}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>End Date:</span>
                <span className={styles.value}>{formatDate(endDate)}</span>
              </div>
            </>
          )}
          <div className={styles.row}>
            <span className={styles.label}>Annual Increase:</span>
            <span className={styles.value}>{annualIncrease}%</span>
          </div>
        </div>
        <div className={styles.calculateButtonSection}>
          <button
            className={styles.calculateButton}
            onClick={onCalculate}
            type="button"
          >
            Start Calculation
          </button>
        </div>
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