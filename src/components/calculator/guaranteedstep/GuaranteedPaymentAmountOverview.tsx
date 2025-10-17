"use client";

import React, { useState, useRef } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from './utils/validationHelpers';
import { GuaranteedFormData } from './types/guaranteed.types';

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
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        {/* Payment Amount Section */}
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
          }}>What's the amount of payments you're going to exchange for a lump sum?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem', position: 'relative' }}>
            <input
              ref={amountInputRef}
              id="paymentAmount"
              style={{
                padding: '0.45rem 1.1rem',
                border: `1.5px solid ${errors.paymentAmount ? '#dc3545' : '#d1d5db'}`,
                borderRadius: 10,
                fontSize: '0.98rem',
                background: '#f9fafb',
                width: '100%',
                maxWidth: 220,
                margin: '0 auto',
                textAlign: 'center',
                color: '#333',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                boxShadow: errors.paymentAmount ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : undefined
              }}
              type="text"
              placeholder="Enter amount (min $100)"
              value={paymentAmount}
              onChange={handleAmountChange}
            />
            {errors.paymentAmount && (
              <span style={{ display: 'block', color: '#dc3545', fontSize: '0.85rem', marginTop: 6, textAlign: 'center' }}>{errors.paymentAmount}</span>
            )}
          </div>
        </div>

        {/* Payment Dates Section */}
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
          }}>Select Payment Period</label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem', position: 'relative' }}>
              <label style={{ fontSize: '0.83rem', fontWeight: 700, textAlign: 'center', margin: '1rem 0 0.5rem 0', color: '#333' }} htmlFor="startDate">
                Start Date
                <span 
                  style={{ display: 'inline-block', width: 18, height: 18, background: '#22c55e', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', fontSize: 12, fontWeight: 'bold', marginLeft: 8, cursor: 'pointer', transition: 'all 0.2s ease', userSelect: 'none' }}
                  onClick={() => setShowStartTooltip(!showStartTooltip)}
                >
                  ?
                </span>
              </label>
              {showStartTooltip && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'white', color: '#333', padding: 0, borderRadius: 12, fontSize: '0.85rem', lineHeight: 1.4, maxWidth: 300, zIndex: 1000, marginBottom: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', animation: 'tooltipFadeIn 0.2s ease-out', cursor: 'pointer' }} onClick={() => setShowStartTooltip(false)}>
                  <div style={{ padding: '16px 20px', position: 'relative' }}>
                    First payment date you want to trade for a lump sum.
                  </div>
                </div>
              )}
              <input
                ref={startDateRef}
                id="startDate"
                style={{
                  padding: '0.45rem 1.1rem',
                  border: `1.5px solid ${(errors.startDate || errors.dates) ? '#dc3545' : '#d1d5db'}`,
                  borderRadius: 10,
                  fontSize: '0.98rem',
                  background: '#f9fafb',
                  width: '100%',
                  maxWidth: 220,
                  margin: '0 auto',
                  textAlign: 'center',
                  color: '#333',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  boxShadow: (errors.startDate || errors.dates) ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : undefined
                }}
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              {(errors.startDate || errors.dates) && (
                <span style={{ display: 'block', color: '#dc3545', fontSize: '0.85rem', marginTop: 6, textAlign: 'center' }}>{errors.startDate || errors.dates}</span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem', position: 'relative' }}>
              <label style={{ fontSize: '0.83rem', fontWeight: 700, textAlign: 'center', margin: '1rem 0 0.5rem 0', color: '#333' }} htmlFor="endDate">
                End Date
                <span 
                  style={{ display: 'inline-block', width: 18, height: 18, background: '#22c55e', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', fontSize: 12, fontWeight: 'bold', marginLeft: 8, cursor: 'pointer', transition: 'all 0.2s ease', userSelect: 'none' }}
                  onClick={() => setShowEndTooltip(!showEndTooltip)}
                >
                  ?
                </span>
              </label>
              {showEndTooltip && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'white', color: '#333', padding: 0, borderRadius: 12, fontSize: '0.85rem', lineHeight: 1.4, maxWidth: 300, zIndex: 1000, marginBottom: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', animation: 'tooltipFadeIn 0.2s ease-out', cursor: 'pointer' }} onClick={() => setShowEndTooltip(false)}>
                  <div style={{ padding: '16px 20px', position: 'relative' }}>
                    The last payment you want to exchange for a lump sum. After this date, your regular payments will resume back to you.
                  </div>
                </div>
              )}
              <input
                ref={endDateRef}
                id="endDate"
                style={{
                  padding: '0.45rem 1.1rem',
                  border: `1.5px solid ${(errors.endDate || errors.dates) ? '#dc3545' : '#d1d5db'}`,
                  borderRadius: 10,
                  fontSize: '0.98rem',
                  background: '#f9fafb',
                  width: '100%',
                  maxWidth: 220,
                  margin: '0 auto',
                  textAlign: 'center',
                  color: '#333',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  boxShadow: (errors.endDate || errors.dates) ? '0 0 0 3px rgba(220, 53, 69, 0.1)' : undefined
                }}
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
              {(errors.endDate || errors.dates) && (
                <span style={{ display: 'block', color: '#dc3545', fontSize: '0.85rem', marginTop: 6, textAlign: 'center' }}>{errors.endDate || errors.dates}</span>
              )}
            </div>
          </div>


        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '0.75rem',
          padding: '0.4rem 0'
        }}>
          <button
            style={{
              background: !checkFormValidity() ? '#bbf7d0' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: !checkFormValidity() ? 'not-allowed' : 'pointer',
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
            disabled={!checkFormValidity()}
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
    </GuaranteedStepContainer>
  );
};

export default GuaranteedPaymentAmountOverview; 