import React, { forwardRef } from 'react';
import { sharedButtonStyles } from './PaymentTypeSelector';

interface AdditionalDetailsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  additionalDetailsError: string;
  increaseRate: number;
  startDate: string;
  endDate: string;
  updateField: (key: string, value: any) => void;
  setTouched: (touched: any) => void;
  touched: any;
  showFieldError: (field: string) => boolean;
  showInfo: (html: string) => void;
  tooltipDefinitions: any;
}

// Using shared button styles from PaymentTypeSelector to avoid duplication

export const sharedInputStyles = {
  base: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '0.75rem',
    background: '#ffffff',
    color: '#374151'
  },
  error: {
    border: '1px solid #ef4444'
  }
};

const AdditionalDetails = forwardRef<HTMLDivElement, AdditionalDetailsProps>(({
  isCollapsed,
  setIsCollapsed,
  additionalDetailsError,
  increaseRate,
  startDate,
  endDate,
  updateField,
  setTouched,
  touched,
  showFieldError,
  showInfo,
  tooltipDefinitions
}, ref) => {
  return (
    <div style={{ marginBottom: '1.5rem' }} ref={ref}>
      <h3 
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#374151',
          marginBottom: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        Additional Details
        <span style={{
          transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </h3>
      
      {additionalDetailsError && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '0.75rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          {additionalDetailsError}
        </div>
      )}
      
      {!isCollapsed && (
        <div style={{ paddingTop: '0.75rem' }}>
          {/* Annual Increase */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '0.75rem'
            }}>
              Annual Increase (%)
              <span 
                style={{
                  color: '#3b82f6',
                  cursor: 'pointer',
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  textDecoration: 'underline'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  showInfo(tooltipDefinitions.increaseRate);
                }}
              >
                ( More Info )
              </span>
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
              gap: '0.5rem'
            }}>
              {[0, 1, 2, 3, 4, 5, 6].map(rate => (
                <button
                  key={rate}
                  type="button"
                  style={{
                    ...sharedButtonStyles.base,
                    padding: '0.5rem',
                    ...(increaseRate === rate ? sharedButtonStyles.selected : {})
                  }}
                  onClick={() => updateField('increaseRate', rate)}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
          
          {/* Dates */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Payment Start Date
                <span 
                  style={{
                    color: '#3b82f6',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    textDecoration: 'underline'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showInfo(tooltipDefinitions.startDate);
                  }}
                >
                  ( More Info )
                </span>
              </label>
              <input
                type="date"
                value={startDate}
                min="2024-05-14"
                onChange={(e) => {
                  updateField('startDate', e.target.value);
                  setTouched((t: any) => ({ ...t, startDate: true }));
                }}
                onBlur={() => setTouched((t: any) => ({ ...t, startDate: true }))}
                              style={{
                ...sharedInputStyles.base,
                ...(showFieldError('startDate') ? sharedInputStyles.error : {})
              }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Payment End Date
                <span 
                  style={{
                    color: '#3b82f6',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    textDecoration: 'underline'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showInfo(tooltipDefinitions.endDate);
                  }}
                >
                  ( More Info )
                </span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  updateField('endDate', e.target.value);
                  setTouched((t: any) => ({ ...t, endDate: true }));
                }}
                onBlur={() => setTouched((t: any) => ({ ...t, endDate: true }))}
                              style={{
                ...sharedInputStyles.base,
                ...(showFieldError('endDate') ? sharedInputStyles.error : {})
              }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

AdditionalDetails.displayName = 'AdditionalDetails';

export default AdditionalDetails;
