"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';

const FREQUENCIES = ['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'];
const INCREASES = [0, 1, 2, 3, 4, 5, 6];

interface Props {
  initialData?: {
    paymentMode?: string;
    annualIncrease?: number;
  };
  onNext: (data: { paymentMode: string; annualIncrease: number }) => void;
  currentStep: number;
  totalSteps: number;
}

const LCPSettlementPaymentsOverview: React.FC<Props> = ({ initialData, onNext, currentStep, totalSteps }) => {
  const [paymentMode, setPaymentMode] = useState(initialData?.paymentMode || 'Monthly');
  const [annualIncrease, setAnnualIncrease] = useState<number>(
    initialData?.annualIncrease ?? 0
  );

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.paymentMode) setPaymentMode(initialData.paymentMode);
    if (initialData?.annualIncrease !== undefined) setAnnualIncrease(initialData.annualIncrease);
  }, [initialData]);

  const isValid = paymentMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ paymentMode, annualIncrease });
    }
  };

  return (
    <LCPStepContainer title="Settlement Payments Overview" currentStep={currentStep} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '0.5rem',
          position: 'relative'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '1rem 0 0.5rem 0'
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
                style={paymentMode === freq ? {
                  border: '2px solid #22c55e',
                  background: '#e0fce2',
                  color: '#15803d',
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
                  fontWeight: '600'
                } : {
                  border: '1.5px solid #d1d5db',
                  background: '#f9fafb',
                  color: '#222',
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
                  fontWeight: '500'
                }}
                onClick={() => setPaymentMode(freq)}
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
          marginBottom: '0.5rem',
          position: 'relative'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '1rem 0 0.5rem 0'
          }}>Do your payments increase yearly?</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            maxWidth: '260px',
            margin: '0 auto'
          }}>
            {INCREASES.map((inc) => (
              <button
                type="button"
                key={inc}
                style={annualIncrease === inc ? {
                  border: '2px solid #22c55e',
                  background: '#e0fce2',
                  color: '#15803d',
                  borderRadius: '12px',
                  padding: '0.32rem 0.85rem',
                  fontSize: '0.78rem',
                  minWidth: '38px',
                  minHeight: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s, border 0.15s',
                  fontWeight: '600'
                } : {
                  border: '1px solid #d1d5db',
                  background: '#f9fafb',
                  color: '#222',
                  borderRadius: '12px',
                  padding: '0.32rem 0.85rem',
                  fontSize: '0.78rem',
                  minWidth: '38px',
                  minHeight: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s, border 0.15s'
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
          marginTop: '1rem',
          padding: '0.5rem 0'
        }}>
          <button
            style={!isValid ? {
              background: '#bbf7d0',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              fontWeight: '600'
            } : {
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              fontWeight: '600'
            }}
            type="submit"
            disabled={!isValid}
            aria-label="Next"
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
            onMouseDown={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
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
    </LCPStepContainer>
  );
};

export default LCPSettlementPaymentsOverview; 