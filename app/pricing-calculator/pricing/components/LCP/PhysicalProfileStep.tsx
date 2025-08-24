'use client';

import React from 'react';

// Health questionnaire options - completely independent from SRC
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

export default function PhysicalProfileStep({ profile, updateProfile }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Physical Profile
      </h3>
      
      {/* Age Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Age Range
        </label>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {AGES.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => updateProfile({ ageRange: age })}
              style={{
                border: profile.ageRange === age ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.ageRange === age ? '#d1fae5' : '#ffffff',
                color: profile.ageRange === age ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.ageRange === age ? '600' : '500'
              }}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Gender Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Gender
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {GENDERS.map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => updateProfile({ gender })}
              style={{
                border: profile.gender === gender ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.gender === gender ? '#d1fae5' : '#ffffff',
                color: profile.gender === gender ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.gender === gender ? '600' : '500'
              }}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Body Frame Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Body Frame
        </label>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {BODY_FRAMES.map((frame) => (
            <button
              key={frame}
              type="button"
              onClick={() => updateProfile({ bodyFrame: frame })}
              style={{
                border: profile.bodyFrame === frame ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.bodyFrame === frame ? '#d1fae5' : '#ffffff',
                color: profile.bodyFrame === frame ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.bodyFrame === frame ? '600' : '500'
              }}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      {/* Weight Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Weight Category
        </label>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {WEIGHTS.map((weight) => (
            <button
              key={weight.full}
              type="button"
              onClick={() => updateProfile({ weight: weight.full })}
              style={{
                border: profile.weight === weight.full ? '2px solid #10b981' : '1px solid #d1d5db',
                background: profile.weight === weight.full ? '#d1fae5' : '#ffffff',
                color: profile.weight === weight.full ? '#065f46' : '#374151',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: profile.weight === weight.full ? '600' : '500'
              }}
            >
              {weight.short}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
