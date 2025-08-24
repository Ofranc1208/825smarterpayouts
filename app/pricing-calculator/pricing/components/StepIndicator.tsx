import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '1rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem'
      }}>
        {/* Step 1 Circle */}
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: currentStep >= 1 ? '#059669' : '#e5e7eb',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '0.75rem'
        }}>
          1
        </div>
        
        {/* Progress Line */}
        <div style={{
          height: '2px',
          width: '40px',
          background: currentStep >= 2 ? '#fbbf24' : '#e5e7eb',
          borderRadius: '1px'
        }}></div>
        
        {/* Step 2 Circle */}
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: currentStep >= 2 ? '#fbbf24' : '#e5e7eb',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '0.75rem'
        }}>
          2
        </div>
      </div>
      
      {/* Step Label */}
      <div style={{
        color: '#6b7280',
        fontSize: '0.75rem',
        fontWeight: 500
      }}>
        Step {currentStep} of 2: {currentStep === 1 ? 'Enter Payment Details' : 'Review Your Quote'}
      </div>
    </div>
  );
}
