'use client';

import React from 'react';

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
  paymentData?: {
    amount: string;
    startDate: string;
    endDate: string;
    paymentMode: string;
    increaseRate: number;
  };
  onEdit?: () => void;
}

// Helper to format dates for display
function formatDate(dateStr: string) {
  if (!dateStr) return 'Not specified';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ReviewStep({ profile, paymentData, onEdit }: Props) {
  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Review & Calculate
      </h3>

      {/* Edit Button */}
      {onEdit && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <button 
            onClick={onEdit}
            type="button"
            style={{
              background: '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#16a34a';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#22c55e';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ✏️ Edit Information
          </button>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        
        {/* Payment Information */}
        {paymentData && (
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: '700',
              color: '#222',
              marginBottom: '0.75rem'
            }}>Payment Details</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontWeight: '500' }}>Payment Mode:</span>
                <span style={{ color: '#222', fontWeight: '600' }}>{paymentData.paymentMode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontWeight: '500' }}>Amount:</span>
                <span style={{ color: '#222', fontWeight: '600' }}>${Number(paymentData.amount).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontWeight: '500' }}>Annual Increase:</span>
                <span style={{ color: '#222', fontWeight: '600' }}>{paymentData.increaseRate}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontWeight: '500' }}>Start Date:</span>
                <span style={{ color: '#222', fontWeight: '600' }}>{formatDate(paymentData.startDate)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontWeight: '500' }}>End Date:</span>
                <span style={{ color: '#222', fontWeight: '600' }}>{formatDate(paymentData.endDate)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Physical Profile */}
        <div style={{
          background: '#f9fafb',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#222',
            marginBottom: '0.75rem'
          }}>Physical Profile</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Age Range:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.ageRange}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Gender:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.gender}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Body Frame:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.bodyFrame}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Weight:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.weight}</span>
            </div>
          </div>
        </div>

        {/* Health Profile */}
        <div style={{
          background: '#f9fafb',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#222',
            marginBottom: '0.75rem'
          }}>Health Profile</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Smoking Status:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.smoke}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>General Health:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.health}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Cardiac Condition:</span>
              <span style={{ color: '#222', fontWeight: '600' }}>{profile.cardiac}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        fontSize: '0.875rem',
        color: '#64748b',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontStyle: 'italic'
      }}>
        This information helps us calculate your life expectancy for accurate life-contingent payment offers.
      </div>
    </div>
  );
}
