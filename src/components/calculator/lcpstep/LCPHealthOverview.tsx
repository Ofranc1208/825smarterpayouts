"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';

const SMOKE_OPTIONS = ['Yes', 'No'];
const HEALTH_OPTIONS = ['Great', 'Normal', 'Fair', 'Below Fair'];
const CARDIAC_OPTIONS = ['Normal', 'Medicated', 'High', 'Not Sure'];

interface Props {
  initialData?: {
    smoke?: string;
    health?: string;
    cardiac?: string;
  };
  onNext: (data: { smoke: string; health: string; cardiac: string }) => void;
  currentStep: number;
  totalSteps: number;
}

const LCPHealthOverview: React.FC<Props> = ({ initialData, onNext, currentStep, totalSteps }) => {
  const [smoke, setSmoke] = useState(initialData?.smoke || '');
  const [health, setHealth] = useState(initialData?.health || '');
  const [cardiac, setCardiac] = useState(initialData?.cardiac || '');
  const [touched, setTouched] = useState(false);

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.smoke) setSmoke(initialData.smoke);
    if (initialData?.health) setHealth(initialData.health);
    if (initialData?.cardiac) setCardiac(initialData.cardiac);
  }, [initialData]);

  const isValid = smoke && health && cardiac;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      onNext({ smoke, health, cardiac });
    }
  };

  return (
    <LCPStepContainer title="Lifestyle Overview" currentStep={currentStep} totalSteps={totalSteps}>
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
          }}>Do You Smoke?</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {SMOKE_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                style={smoke === opt ? {
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
                onClick={() => setSmoke(opt)}
              >
                {opt}
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
          }}>Health Profile</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {HEALTH_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                style={health === opt ? {
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
                onClick={() => setHealth(opt)}
              >
                {opt}
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
          }}>Cardiac Health</label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.1rem'
          }}>
            {CARDIAC_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                style={cardiac === opt ? {
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
                onClick={() => setCardiac(opt)}
              >
                {opt}
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

export default LCPHealthOverview; 