'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import StepIndicator from './components/StepIndicator';
import Step1Form from './components/Step1Form';
import QuoteDisplay from './components/QuoteDisplay';

const PricingCalculator = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    paymentType: 'Guaranteed',
    paymentMode: 'Monthly',
    amount: '',
    increaseRate: 0,
    startDate: '',
    endDate: '',
    discountRate: 8.5,
  });
  
  console.log('🔍 DEBUG: Initial formData:', formData);

  const goToStep = (newStep: number) => {
    console.log('🔍 DEBUG: goToStep called with step:', newStep);
    if (newStep === 1) {
      setCalculationResult(null);
    }
    setStep(newStep);
    console.log('🔍 DEBUG: Step changed to:', newStep);
  };

  useEffect(() => {
    const encodedResult = searchParams.get('result');
    if (encodedResult) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encodedResult));
        setCalculationResult(parsed);
        setStep(2);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to parse calculation result from query params:', err);
        }
      }
    }
  }, [searchParams]);

  return (
    <section style={{ 
      padding: '0.5rem 0 1rem 0', 
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        {/* SEO-Optimized Content (visually hidden, crawlable) */}
        <div style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}>
          <strong>SmarterPayouts</strong> is proud to offer the industry's only real-time <strong>structured settlement calculator</strong>. Unlike competitors, our calculator provides instant, personalized <strong>structured settlement lump sum estimates</strong> based on real data — no guessing, no gimmicks. Whether you're comparing with <strong>JG Wentworth</strong>, <strong>DRB Financial</strong>, or any other buyer, see your true lump-sum payout value today — fast, accurate, and free. Try the only <strong>real structured settlement payout calculator</strong> and <strong>compare JG Wentworth calculator</strong> results instantly.
        </div>

        <StepIndicator currentStep={step} />

        {step === 1 && (
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid #e2e8f0'
          }}>
            <Step1Form
              formData={formData}
              setFormData={setFormData}
              onNext={() => goToStep(2)}
              setCalculationResult={setCalculationResult}
            />
          </div>
        )}

        {step === 2 && (
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>

            <QuoteDisplay calculationResult={calculationResult} />

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => goToStep(1)}
                style={{
                  background: '#ffffff',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              
              <Link href="/review-offer" style={{
                background: '#10b981',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Continue →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingCalculator;
