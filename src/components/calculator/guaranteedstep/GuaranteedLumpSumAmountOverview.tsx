"use client";

import React, { useState, useRef } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { RATE_SPREADS, AMOUNT_ADJUSTMENTS, BASE_DISCOUNT_RATE } from '../../../../app/utils/npvConfig';
import { GuaranteedFormData, LumpSumPayment } from './types/guaranteed.types';
import { safeStringify } from './utils/typeUtils';

interface GuaranteedLumpSumAmountOverviewProps {
  onNext: (data: { payments: LumpSumPayment[] }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedLumpSumAmountOverview: React.FC<GuaranteedLumpSumAmountOverviewProps> = ({ 
  onNext, 
  currentStep, 
  totalSteps,
  initialData
}) => {
  const [numberOfPayments, setNumberOfPayments] = useState<number | ''>('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [payments, setPayments] = useState<LumpSumPayment[]>(initialData?.payments && initialData.payments.length > 0 ? initialData.payments : [{ amount: '', lumpSumDate: '' }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize numberOfPayments from existing data when editing
  React.useEffect(() => {
    if (initialData?.payments && initialData.payments.length > 0) {
      setNumberOfPayments(initialData.payments.length);
    }
  }, [initialData]);

  // Update payments array when numberOfPayments changes
  React.useEffect(() => {
    if (typeof numberOfPayments === 'number' && numberOfPayments > 0) {
      const currentPayments = payments;
      const newPayments: LumpSumPayment[] = [];
      for (let i = 0; i < numberOfPayments; i++) {
        newPayments.push(currentPayments[i] || { amount: '', lumpSumDate: '' });
      }
      setPayments(newPayments);
    }
  }, [numberOfPayments]);

  const handlePaymentChange = (index: number, field: 'amount' | 'lumpSumDate', value: string) => {
    const updatedPayments = [...payments];
    
    if (field === 'amount') {
      // Filter and format amount input
      const filteredValue = value
        .replace(/[^\d.]/g, '')
        .replace(/^(\d*\.\d{0,2}).*$/, '$1');
      updatedPayments[index].amount = filteredValue;
    } else {
      updatedPayments[index].lumpSumDate = value;
    }
    
    setPayments(updatedPayments);
  };

  const validateForm = (): boolean => {
    const currentErrors: { [key: string]: string } = {};

    // Check if number of payments is entered
    if (numberOfPayments === '' || !numberOfPayments) {
      currentErrors['numberOfPayments'] = 'Please enter the number of payments (1-10).';
    } else if (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10)) {
      currentErrors['numberOfPayments'] = 'Please enter a number between 1 and 10.';
    }

    // Only validate payment details if we have a valid number of payments
    if (typeof numberOfPayments === 'number' && numberOfPayments > 0) {
      payments.forEach((payment, index) => {
        const amountValue = safeStringify(payment.amount);
        const parsedAmount = parseFloat(amountValue);

        if (!amountValue || isNaN(parsedAmount) || parsedAmount <= 0) {
          currentErrors[`payment-${index}-amount`] = 'Please enter a valid positive amount.';
        } else {
          const amountString = String(amountValue);
          const decimalIndex = amountString.indexOf('.');
          const wholePart = decimalIndex === -1 ? amountString : amountString.substring(0, decimalIndex);
          if (wholePart.length > 7) {
            currentErrors[`payment-${index}-amount`] = 'Amount cannot exceed 7 digits.';
          }
        }

        if (!payment.lumpSumDate) {
          currentErrors[`payment-${index}-date`] = 'Please enter a payment date.';
        }
      });
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext({ payments });
    }
  };

  return (
    <GuaranteedStepContainer title="Lump Sum Payment Details" currentStep={currentStep} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit}>
                <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '0.3rem'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '0.75rem 0 0.4rem 0'
          }}>Number of Lump Sum Payments (1–10)</label>
          <input
            type="number"
            value={numberOfPayments}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= 10) {
                setNumberOfPayments(value);
                setShowGuidance(false);
              } else if (e.target.value === '') {
                setNumberOfPayments('');
              }
            }}
            style={{
              border: errors['numberOfPayments'] ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
              background: '#f9fafb',
              color: '#222',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              fontSize: '0.78rem',
              minHeight: '2.1rem',
              width: '100%',
              textAlign: 'center',
              transition: 'border 0.15s ease',
              cursor: 'pointer',
              boxShadow: errors['numberOfPayments'] ? '0 0 0 2px rgba(239, 68, 68, 0.1)' : 'none'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLInputElement;
              if (!errors['numberOfPayments']) {
                target.style.borderColor = '#9ca3af';
              }
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLInputElement;
              if (!errors['numberOfPayments']) {
                target.style.borderColor = '#d1d5db';
              }
            }}
            onFocus={(e) => {
              setShowGuidance(true);
              const target = e.target as HTMLInputElement;
              if (!errors['numberOfPayments']) {
                target.style.outline = 'none';
                target.style.borderColor = '#22c55e';
                target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
              }
            }}
            onBlur={(e) => {
              setTimeout(() => setShowGuidance(false), 200);
              const target = e.target as HTMLInputElement;
              if (!errors['numberOfPayments']) {
                target.style.borderColor = '#d1d5db';
                target.style.boxShadow = 'none';
              }
            }}
            min={1}
            max={10}
            placeholder="Click to enter number (1-10)"
          />
          {showGuidance && (
            <div style={{
              marginTop: '0.3rem',
              textAlign: 'center',
              padding: '0.5rem',
              background: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '6px',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <span style={{
                fontSize: '0.7rem',
                color: '#6b7280',
                fontStyle: 'italic'
              }}>💡 You can add up to 10 lump sum payments</span>
            </div>
          )}
          {errors['numberOfPayments'] && (
            <span style={{
              color: '#ef4444',
              fontSize: '0.7rem',
              marginTop: '0.2rem',
              display: 'block'
            }}>{errors['numberOfPayments']}</span>
          )}
        </div>

        {typeof numberOfPayments === 'number' && numberOfPayments > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            {payments.map((payment, index) => (
              <div key={index} style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '12px',
                padding: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <h6 style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#495057',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>Payment {index + 1}</h6>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  marginBottom: '0.3rem'
                }}>
                  <label style={{
                    fontSize: '0.83rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    margin: '0.75rem 0 0.4rem 0'
                  }}>Payment Amount ($)</label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0.75rem',
                      color: '#6b7280',
                      fontSize: '0.78rem',
                      fontWeight: '500',
                      zIndex: '1'
                    }}>$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={{
                        border: errors[`payment-${index}-amount`] ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                        background: '#f9fafb',
                        color: '#222',
                        borderRadius: '8px',
                        padding: '0.45rem 0.75rem 0.45rem 1.5rem',
                        fontSize: '0.78rem',
                        minHeight: '2.1rem',
                        width: '100%',
                        transition: 'border 0.15s ease',
                        boxShadow: errors[`payment-${index}-amount`] ? '0 0 0 2px rgba(239, 68, 68, 0.1)' : 'none'
                      }}
                      onFocus={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (!errors[`payment-${index}-amount`]) {
                          target.style.outline = 'none';
                          target.style.borderColor = '#22c55e';
                          target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (!errors[`payment-${index}-amount`]) {
                          target.style.borderColor = '#d1d5db';
                          target.style.boxShadow = 'none';
                        }
                      }}
                      value={payment.amount}
                      onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  {errors[`payment-${index}-amount`] && (
                    <span style={{
                      color: '#ef4444',
                      fontSize: '0.7rem',
                      marginTop: '0.2rem',
                      display: 'block'
                    }}>{errors[`payment-${index}-amount`]}</span>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  marginBottom: '0.3rem'
                }}>
                  <label style={{
                    fontSize: '0.83rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    margin: '0.75rem 0 0.4rem 0'
                  }}>Payment Date</label>
                  <input
                    type="date"
                    style={{
                      border: errors[`payment-${index}-date`] ? '1.5px solid #ef4444' : '1.5px solid #d1d5db',
                      background: '#f9fafb',
                      color: '#222',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.78rem',
                      minHeight: '2.1rem',
                      width: '100%',
                      transition: 'border 0.15s ease',
                      boxShadow: errors[`payment-${index}-date`] ? '0 0 0 2px rgba(239, 68, 68, 0.1)' : 'none'
                    }}
                    onFocus={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (!errors[`payment-${index}-date`]) {
                        target.style.outline = 'none';
                        target.style.borderColor = '#22c55e';
                        target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (!errors[`payment-${index}-date`]) {
                        target.style.borderColor = '#d1d5db';
                        target.style.boxShadow = 'none';
                      }
                    }}
                    value={payment.lumpSumDate}
                    onChange={(e) => handlePaymentChange(index, 'lumpSumDate', e.target.value)}
                  />
                  {errors[`payment-${index}-date`] && (
                    <span style={{
                      color: '#ef4444',
                      fontSize: '0.7rem',
                      marginTop: '0.2rem',
                      display: 'block'
                    }}>{errors[`payment-${index}-date`]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '0.75rem',
          padding: '0.4rem 0'
        }}>
          <button
            style={{
              background: (numberOfPayments === '' || !numberOfPayments || (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10))) 
                ? '#bbf7d0' 
                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: (numberOfPayments === '' || !numberOfPayments || (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10))) 
                ? 'not-allowed' 
                : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              if (!target.disabled) {
                target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              if (!target.disabled) {
                target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
            onMouseDown={(e) => {
              const target = e.target as HTMLButtonElement;
              if (!target.disabled) {
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
            type="submit"
            disabled={numberOfPayments === '' || !numberOfPayments || (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10))}
            aria-label="Next"
          >
            <span style={{
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>&#8594;</span>
          </button>
        </div>
      </form>

      {/* CSS Animation for fadeIn guidance message */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-5px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedLumpSumAmountOverview; 