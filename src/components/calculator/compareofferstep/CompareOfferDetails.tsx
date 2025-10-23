import React, { useState } from 'react';
import styles from './CompareOfferDetails.module.css';
import { CompareOfferData, CompareOfferFormErrors, PAYMENT_FREQUENCY_LABELS } from './utils/compareOfferTypes';

interface CompareOfferDetailsProps {
  isInteractive: boolean;
  onSubmit: (data: CompareOfferData) => void;
  initialData?: Partial<CompareOfferData>;
}

const CompareOfferDetails: React.FC<CompareOfferDetailsProps> = ({ 
  isInteractive, 
  onSubmit,
  initialData 
}) => {
  const [formData, setFormData] = useState<CompareOfferData>({
    existingOfferAmount: initialData?.existingOfferAmount || '',
    paymentAmount: initialData?.paymentAmount || '',
    paymentFrequency: initialData?.paymentFrequency || 'monthly',
    companyName: initialData?.companyName || ''
  });

  const [errors, setErrors] = useState<CompareOfferFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: CompareOfferFormErrors = {};

    if (!formData.existingOfferAmount || parseFloat(formData.existingOfferAmount) <= 0) {
      newErrors.existingOfferAmount = 'Please enter a valid offer amount';
    }

    if (!formData.paymentAmount || parseFloat(formData.paymentAmount) <= 0) {
      newErrors.paymentAmount = 'Please enter a valid payment amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isInteractive) return;
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CompareOfferData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Tell us about your existing offer</h3>
        <p className={styles.description}>
          Enter the details of the offer you received so we can compare it with our quote.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Existing Offer Amount */}
          <div className={styles.formGroup}>
            <label htmlFor="existingOfferAmount" className={styles.label}>
              Lump Sum Offer Amount
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                id="existingOfferAmount"
                type="number"
                step="0.01"
                min="0"
                value={formData.existingOfferAmount}
                onChange={(e) => handleChange('existingOfferAmount', e.target.value)}
                className={`${styles.input} ${errors.existingOfferAmount ? styles.inputError : ''}`}
                placeholder="50,000"
                disabled={!isInteractive}
              />
            </div>
            {errors.existingOfferAmount && (
              <span className={styles.error}>{errors.existingOfferAmount}</span>
            )}
          </div>

          {/* Payment Amount */}
          <div className={styles.formGroup}>
            <label htmlFor="paymentAmount" className={styles.label}>
              Your Payment Amount
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                id="paymentAmount"
                type="number"
                step="0.01"
                min="0"
                value={formData.paymentAmount}
                onChange={(e) => handleChange('paymentAmount', e.target.value)}
                className={`${styles.input} ${errors.paymentAmount ? styles.inputError : ''}`}
                placeholder="1,000"
                disabled={!isInteractive}
              />
            </div>
            {errors.paymentAmount && (
              <span className={styles.error}>{errors.paymentAmount}</span>
            )}
          </div>

          {/* Payment Frequency */}
          <div className={styles.formGroup}>
            <label htmlFor="paymentFrequency" className={styles.label}>
              Payment Frequency
            </label>
            <select
              id="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={(e) => handleChange('paymentFrequency', e.target.value)}
              className={styles.select}
              disabled={!isInteractive}
            >
              {Object.entries(PAYMENT_FREQUENCY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Company Name (Optional) */}
          <div className={styles.formGroup}>
            <label htmlFor="companyName" className={styles.label}>
              Company Name <span className={styles.optional}>(Optional)</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className={styles.input}
              placeholder="e.g., JG Wentworth"
              disabled={!isInteractive}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`${styles.submitButton} ${!isInteractive ? styles.disabled : ''}`}
            disabled={!isInteractive}
          >
            Continue to Review →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompareOfferDetails;

