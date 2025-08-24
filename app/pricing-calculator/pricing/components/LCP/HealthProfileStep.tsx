'use client';

import React from 'react';

// Health questionnaire options - completely independent from SRC
const SMOKE_OPTIONS = ['Yes', 'No'];
const HEALTH_OPTIONS = ['Great', 'Normal', 'Fair', 'Below Fair'];
const CARDIAC_OPTIONS = ['Normal', 'Medicated', 'High', 'Not Sure'];

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
  profile: HealthProfile;
  updateProfile: (updates: Partial<HealthProfile>) => void;
}

export default function HealthProfileStep({ profile, updateProfile }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Health Profile
      </h3>
      
      {/* Smoking Status */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Do You Smoke?
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {SMOKE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateProfile({ smoke: option })}
              style={{
                border: profile.smoke === option ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.smoke === option ? '#d1fae5' : '#ffffff',
                color: profile.smoke === option ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.smoke === option ? '600' : '500'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* General Health */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          General Health
        </label>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {HEALTH_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateProfile({ health: option })}
              style={{
                border: profile.health === option ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.health === option ? '#d1fae5' : '#ffffff',
                color: profile.health === option ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.health === option ? '600' : '500'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cardiac Condition */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Cardiac Condition
        </label>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {CARDIAC_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateProfile({ cardiac: option })}
              style={{
                border: profile.cardiac === option ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.cardiac === option ? '#d1fae5' : '#ffffff',
                color: profile.cardiac === option ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.cardiac === option ? '600' : '500'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
