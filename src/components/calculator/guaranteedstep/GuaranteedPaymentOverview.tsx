"use client";

import React, { useState } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedFormData } from './types/guaranteed.types';

interface GuaranteedPaymentOverviewProps {
  onNext: (data: { paymentMode: string; annualIncrease: number }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedPaymentOverview: React.FC<GuaranteedPaymentOverviewProps> = ({ onNext, currentStep, totalSteps, initialData }) => {
  const [paymentMode, setPaymentMode] = useState<'Monthly' | 'Quarterly' | 'Semiannually' | 'Annually' | 'Lump Sum'>(initialData?.paymentMode || 'Monthly');
  const [annualIncrease, setAnnualIncrease] = useState<number>(initialData?.annualIncrease ?? 0);

  const FREQUENCIES = ['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'];
  const INCREASES = [0, 1, 2, 3, 4, 5, 6];

  const isValid = paymentMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ paymentMode, annualIncrease });
    }
  };

  return (
    <GuaranteedStepContainer title="Payment Overview" currentStep={currentStep} totalSteps={totalSteps}>
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
          }}>How often do you receive your payments?</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {FREQUENCIES.map((freq) => (
              <button
                type="button"
                key={freq}
                style={{
                  border: paymentMode === freq ? '2px solid #22c55e' : '1.5px solid #d1d5db',
                  background: paymentMode === freq ? '#e0fce2' : '#f9fafb',
                  color: paymentMode === freq ? '#15803d' : '#222',
                  borderRadius: '20px',
                  padding: '0.45rem 1.6rem',
                  fontSize: '0.78rem',
                  minWidth: '110px',
                  minHeight: '2.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s, border 0.15s',
                  fontWeight: paymentMode === freq ? '600' : '500'
                }}
                onClick={() => setPaymentMode(freq as typeof paymentMode)}
              >
                {freq}
              </button>
            ))}
          </div>
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
          }}>Do your payments increase yearly?</label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '0.1rem'
            }}
          >
            {INCREASES.map((inc) => (
              <button
                type="button"
                key={inc}
                style={{
                  border: annualIncrease === inc ? '2px solid #22c55e' : '1.5px solid #d1d5db',
                  background: annualIncrease === inc ? '#e0fce2' : '#f9fafb',
                  color: annualIncrease === inc ? '#15803d' : '#222',
                  borderRadius: 20,
                  padding: '0.45rem 1.6rem',
                  fontSize: '0.78rem',
                  minWidth: 60,
                  minHeight: '2.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s, border 0.15s',
                  fontWeight: annualIncrease === inc ? 600 : 500
                }}
                onClick={() => setAnnualIncrease(inc)}
              >
                {inc}
              </button>
            ))}
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
              background: !isValid ? '#bbf7d0' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: !isValid ? 'not-allowed' : 'pointer',
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
            disabled={!isValid}
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

export default GuaranteedPaymentOverview; 