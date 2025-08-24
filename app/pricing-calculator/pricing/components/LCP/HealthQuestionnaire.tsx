'use client';

import React, { useState } from 'react';
import PhysicalProfileStep from './PhysicalProfileStep';
import HealthProfileStep from './HealthProfileStep';
import ReviewStep from './ReviewStep';

interface HealthProfile {
  ageRange: string;
  gender: string;
  bodyFrame: string;
  weight: string;
  smoke: string;
  health: string;
  cardiac: string;
}

interface Props {
  initialData?: Partial<HealthProfile>;
  paymentData?: {
    amount: string;
    startDate: string;
    endDate: string;
    paymentMode: string;
    increaseRate: number;
  };
  onComplete: (profile: HealthProfile) => void;
  onBack: () => void;
}

export default function HealthQuestionnaire({ initialData, paymentData, onComplete, onBack }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<HealthProfile>({
    ageRange: initialData?.ageRange || '',
    gender: initialData?.gender || '',
    bodyFrame: initialData?.bodyFrame || '',
    weight: initialData?.weight || '',
    smoke: initialData?.smoke || '',
    health: initialData?.health || '',
    cardiac: initialData?.cardiac || ''
  });

  const totalSteps = 3;

  const updateProfile = (updates: Partial<HealthProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (profile.ageRange && profile.gender && profile.bodyFrame && 
        profile.weight && profile.smoke && profile.health && profile.cardiac) {
      onComplete(profile);
    }
  };

  const handleEdit = () => {
    setCurrentStep(1); // Go back to step 1 to edit
  };

  const isStep1Valid = profile.ageRange && profile.gender && profile.bodyFrame && profile.weight;
  const isStep2Valid = profile.smoke && profile.health && profile.cardiac;
  const isStep3Valid = isStep1Valid && isStep2Valid;



  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PhysicalProfileStep profile={profile} updateProfile={updateProfile} />;
      case 2:
        return <HealthProfileStep profile={profile} updateProfile={updateProfile} />;
      case 3:
        return <ReviewStep profile={profile} paymentData={paymentData} onEdit={handleEdit} />;
      default:
        return <PhysicalProfileStep profile={profile} updateProfile={updateProfile} />;
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: '#8b5cf6',
        color: '#ffffff',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          margin: '0'
        }}>
          Life Contingent Health Profile
        </h2>
        <div style={{
          fontSize: '0.875rem',
          marginTop: '0.25rem',
          opacity: 0.9
        }}>
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: '#f1f5f9',
        height: '4px',
        position: 'relative'
      }}>
        <div style={{
          background: '#8b5cf6',
          height: '100%',
          width: `${(currentStep / totalSteps) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Content */}
      {renderCurrentStep()}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderTop: '1px solid #e2e8f0',
        background: '#f8fafc'
      }}>
        <button
          type="button"
          onClick={currentStep === 1 ? onBack : goToPreviousStep}
          style={{
            border: '1px solid #d1d5db',
            background: '#ffffff',
            color: '#374151',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {currentStep === 1 ? 'Back to Calculator' : 'Previous'}
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={goToNextStep}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid)
              }
              style={{
                border: 'none',
                background: 
                  (currentStep === 1 && isStep1Valid) ||
                  (currentStep === 2 && isStep2Valid)
                    ? '#8b5cf6' 
                    : '#d1d5db',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 
                  (currentStep === 1 && isStep1Valid) ||
                  (currentStep === 2 && isStep2Valid)
                    ? 'pointer' 
                    : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Next
            </button>
          )}
          
          {currentStep === totalSteps && (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!isStep3Valid}
              style={{
                border: 'none',
                background: isStep3Valid ? '#10b981' : '#d1d5db',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: isStep3Valid ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
