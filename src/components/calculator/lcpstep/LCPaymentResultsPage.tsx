"use client";

import React, { useState, useEffect } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPCalculationResult } from '../../../types';
import { validateOfferThreshold, formatCurrency } from '../../../../app/utils/validationHelpers';

interface Props {
  result: LCPCalculationResult;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const LCPaymentResultsPage: React.FC<Props> = ({ result, onBack, currentStep, totalSteps }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Scroll to top and trigger confetti animation when component mounts
  useEffect(() => {
    // Scroll to top of page smoothly to show the results
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Slight delay before showing confetti to allow scroll to complete
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    
    // Hide confetti after 3 seconds
    const hideTimer = setTimeout(() => setShowConfetti(false), 3300);
    
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <LCPStepContainer title="Congratulations! Here's Your Early Payout Offer" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #ff6b9d, #a8e6cf, #ffd93d, #6c5ce7)',
                borderRadius: '50%',
                animation: 'confettiFall linear infinite',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                opacity: 0.9,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div style={{
        width: '100%',
        marginBottom: '1.5rem',
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {result.minPayout !== undefined && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0.5rem 0'
          }}>
            <span style={{
              color: '#666',
              fontWeight: 600,
              fontSize: '0.98rem',
              marginBottom: '0.3rem'
            }}>Minimum Payout</span>
            <span style={{
              color: '#15803d',
              fontSize: '1.365rem',
              fontWeight: 800,
              letterSpacing: '0.01em',
              textAlign: 'center'
            }}>${result.minPayout?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        )}
        {result.maxPayout !== undefined && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0.5rem 0'
          }}>
            <span style={{
              color: '#666',
              fontWeight: 600,
              fontSize: '0.98rem',
              marginBottom: '0.3rem'
            }}>Maximum Payout</span>
            <span style={{
              color: '#15803d',
              fontSize: '1.89rem',
              fontWeight: 800,
              letterSpacing: '0.01em',
              textAlign: 'center'
            }}>${result.maxPayout?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        )}
        {result.familyProtectionNPV !== undefined && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0.5rem 0'
          }}>
            <span style={{
              color: '#666',
              fontWeight: 600,
              fontSize: '0.98rem',
              marginBottom: '0.3rem'
            }}>Family Protection Value</span>
            <span style={{
              color: '#15803d',
              fontSize: '1.365rem',
              fontWeight: 800,
              letterSpacing: '0.01em',
              textAlign: 'center'
            }}>${result.familyProtectionNPV?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        )}
      </div>

      {/* CSS Animation Keyframes - needs to be added to global styles */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </LCPStepContainer>
  );
};

export default React.memo(LCPaymentResultsPage); 