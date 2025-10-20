"use client";

import React, { useState, useRef } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { QuickHelpBadge, GuaranteedInstructionButton, GuaranteedInstructionModal, GuaranteedNavigationButton } from './shared';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from './utils/validationHelpers';
import { GuaranteedFormData } from './utils/guaranteedTypes';
import styles from './GuaranteedPaymentAmountOverview.module.css';

interface GuaranteedPaymentAmountOverviewProps {
  onNext: (data: { paymentAmount: string; startDate: string; endDate: string }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedPaymentAmountOverview: React.FC<GuaranteedPaymentAmountOverviewProps> = ({ onNext, currentStep, totalSteps, initialData }) => {
  const [paymentAmount, setPaymentAmount] = useState<string>(initialData?.paymentAmount?.toString() || '');
  const [startDate, setStartDate] = useState<string>(initialData?.startDate || '');
  const [endDate, setEndDate] = useState<string>(initialData?.endDate || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const checkFormValidity = () => {
    // Enhanced payment amount validation
    const amountValidation = validatePaymentAmount(paymentAmount);
    if (!amountValidation.isValid) {
      return false;
    }

    // Enhanced date range validation
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      return false;
    }

    return true;
  };

  const validateAndSetErrors = () => {
    const newErrors: { [key: string]: string } = {};

    // Enhanced payment amount validation
    const amountValidation = validatePaymentAmount(paymentAmount);
    if (!amountValidation.isValid) {
      newErrors.paymentAmount = amountValidation.error || 'Invalid payment amount';
    }

    // Enhanced date range validation
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      newErrors.dates = dateValidation.error || 'Invalid date range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumericInput(e.target.value);
    setPaymentAmount(sanitized);
    if (errors.paymentAmount) {
      setErrors(prev => ({ ...prev, paymentAmount: '' }));
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    if (errors.startDate || errors.dates) {
      setErrors(prev => ({ ...prev, startDate: '', dates: '' }));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);
    if (errors.endDate || errors.dates) {
      setErrors(prev => ({ ...prev, endDate: '', dates: '' }));
    }
  };

  const handleNext = () => {
    if (!validateAndSetErrors()) {
      return;
    }

    onNext({
      paymentAmount: paymentAmount.trim(),
      startDate,
      endDate
    });
  };

  return (
    <GuaranteedStepContainer title="Payment Amount Overview" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Help and Instructions */}
      <div className={styles.helpSection}>
        <QuickHelpBadge />
        <GuaranteedInstructionButton onClick={() => setShowInstructions(true)} />
      </div>

      {/* Instructions Modal */}
      <GuaranteedInstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      >
        <p className={styles.instructionsDescription}>What you need to do:</p>
        <ul className={styles.instructionsList}>
          <li className={styles.instructionsListItem}>Enter the <strong>payment amount</strong> - This is the amount of each guaranteed payment you want to exchange for a lump sum</li>
          <li className={styles.instructionsListItem}>Select the <strong>start date</strong> - When do you want your guaranteed payments to begin?</li>
          <li className={styles.instructionsListItem}>Select the <strong>end date</strong> - When do you want your guaranteed payments to end?</li>
          <li className={styles.instructionsListItem}>Click "Continue" to proceed to the next step</li>
        </ul>
        <p className={styles.instructionsTip}>
          💡 <em>These dates define the specific guaranteed payment period you want to exchange for an immediate lump sum payout. All guaranteed payments between these dates will be included in your calculation.</em>
        </p>
      </GuaranteedInstructionModal>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        {/* Payment Amount Section */}
        <div className={styles.paymentAmountSection}>
          <label className={styles.paymentAmountLabel}>What's the amount of payments you're going to exchange for a lump sum?</label>
          <div className={styles.paymentAmountInputContainer}>
            <input
              ref={amountInputRef}
              id="paymentAmount"
              className={`${styles.paymentAmountInput} ${errors.paymentAmount ? 'error' : ''}`}
              type="text"
              placeholder="Enter amount (min $100)"
              value={paymentAmount}
              onChange={handleAmountChange}
            />
            {errors.paymentAmount && (
              <span className={styles.paymentAmountError}>{errors.paymentAmount}</span>
            )}
          </div>
        </div>

        {/* Payment Dates Section */}
        <div className={styles.paymentDatesSection}>
          <label className={styles.paymentDatesLabel}>Select Payment Period</label>

          <div className={styles.dateInputsContainer}>
            <div className={styles.dateInputGroup}>
              <label className={styles.dateLabel} htmlFor="startDate">
                Start Date
                <span
                  className={styles.tooltipButton}
                  onClick={() => setShowStartTooltip(!showStartTooltip)}
                >
                  ?
                </span>
              </label>
              {showStartTooltip && (
                <div className={styles.tooltip} onClick={() => setShowStartTooltip(false)}>
                  <div className={styles.tooltipContent}>
                    First payment date you want to trade for a lump sum.
                  </div>
                </div>
              )}
              <input
                ref={startDateRef}
                id="startDate"
                className={`${styles.dateInput} ${(errors.startDate || errors.dates) ? 'error' : ''}`}
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              {(errors.startDate || errors.dates) && (
                <span className={styles.dateError}>{errors.startDate || errors.dates}</span>
              )}
            </div>

            <div className={styles.dateInputGroup}>
              <label className={styles.dateLabel} htmlFor="endDate">
                End Date
                <span
                  className={styles.tooltipButton}
                  onClick={() => setShowEndTooltip(!showEndTooltip)}
                >
                  ?
                </span>
              </label>
              {showEndTooltip && (
                <div className={styles.tooltip} onClick={() => setShowEndTooltip(false)}>
                  <div className={styles.tooltipContent}>
                    The last payment you want to exchange for a lump sum. After this date, your regular payments will resume back to you.
                  </div>
                </div>
              )}
              <input
                ref={endDateRef}
                id="endDate"
                className={`${styles.dateInput} ${(errors.endDate || errors.dates) ? 'error' : ''}`}
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
              {(errors.endDate || errors.dates) && (
                <span className={styles.dateError}>{errors.endDate || errors.dates}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.navigationSection}>
          <GuaranteedNavigationButton
            direction="next"
            disabled={!checkFormValidity()}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>
      </form>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedPaymentAmountOverview; 