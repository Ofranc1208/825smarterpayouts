"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';

const AGES = ['18–25', '26–35', '36–45', '46–50', '51–56', '57–65'];
const GENDERS = ['Male', 'Female', 'Other'];
const BODY_FRAMES = ['Small', 'Medium', 'Large'];
const WEIGHTS = [
  { short: 'Under', full: 'Underweight' },
  { short: 'Normal', full: 'Normal Weight' },
  { short: 'Over', full: 'Overweight' },
  { short: 'Obese', full: 'Obesity' },
  { short: 'Severe', full: 'Severe Obesity' },
];

interface Props {
  initialData?: {
    ageRange?: string;
    gender?: string;
    bodyFrame?: string;
    weight?: string;
  };
  onNext: (data: { ageRange: string; gender: string; bodyFrame: string; weight: string }) => void;
  currentStep: number;
  totalSteps: number;
}

const LCPPhysicalProfileOverview: React.FC<Props> = ({ initialData, onNext, currentStep, totalSteps }) => {
  const [ageRange, setAgeRange] = useState(initialData?.ageRange || '');
  const [gender, setGender] = useState(initialData?.gender || '');
  const [bodyFrame, setBodyFrame] = useState(initialData?.bodyFrame || '');
  const [weight, setWeight] = useState(initialData?.weight || '');
  const [touched, setTouched] = useState(false);

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.ageRange) setAgeRange(initialData.ageRange);
    if (initialData?.gender) setGender(initialData.gender);
    if (initialData?.bodyFrame) setBodyFrame(initialData.bodyFrame);
    if (initialData?.weight) setWeight(initialData.weight);
  }, [initialData]);

  const isValid = ageRange && gender && bodyFrame && weight;

  const handleWeightSelect = (full: string) => {
    setWeight(full);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onNext({ ageRange, gender, bodyFrame, weight });
    }
  };

  return (
    <LCPStepContainer title="Physical Profile Overview" currentStep={currentStep} totalSteps={totalSteps}>
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
          }}>Age</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {AGES.map((age) => (
              <button
                type="button"
                key={age}
                style={ageRange === age ? {
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
                onClick={() => setAgeRange(age)}
              >
                {age}
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
          }}>Gender</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {GENDERS.map((g) => (
              <button
                type="button"
                key={g}
                style={gender === g ? {
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
                onClick={() => setGender(g)}
              >
                {g}
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
          }}>Body Frame</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {BODY_FRAMES.map((frame) => (
              <button
                type="button"
                key={frame}
                style={bodyFrame === frame ? {
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
                onClick={() => setBodyFrame(frame)}
              >
                {frame}
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
          }}>Weight</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {WEIGHTS.map((w) => (
              <button
                type="button"
                key={w.full}
                style={weight === w.full ? {
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
                onClick={() => handleWeightSelect(w.full)}
              >
                {w.short}
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
        {touched && !isValid && (
          <div style={{
            color: '#ef4444',
            fontSize: '0.93rem',
            marginTop: '0.18rem',
            textAlign: 'left'
          }}>Please answer all questions.</div>
        )}
      </form>
    </LCPStepContainer>
  );
};

export default LCPPhysicalProfileOverview; 