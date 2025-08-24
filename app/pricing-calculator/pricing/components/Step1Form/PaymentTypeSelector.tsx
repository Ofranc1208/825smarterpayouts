import React from 'react';

interface PaymentTypeSelectorProps {
  paymentType: string;
  updateField: (key: string, value: any) => void;
  showInfo: (html: string) => void;
  tooltipDefinitions: any;
}

// Shared button styles - exported to prevent duplication across components
export const sharedButtonStyles = {
  base: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    background: '#ffffff',
    color: '#374151',
    transition: 'all 0.2s ease'
  },
  selected: {
    background: '#059669',
    color: '#ffffff',
    border: '1px solid #059669'
  }
};

export default function PaymentTypeSelector({
  paymentType,
  updateField,
  showInfo,
  tooltipDefinitions
}: PaymentTypeSelectorProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        Type of Payment
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
            showInfo(tooltipDefinitions.paymentType);
          }}
        >
          ( More Info )
        </span>
      </label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.5rem'
      }}>
        {['Guaranteed', 'Life Contingent', "I Don't Know"].map(type => (
          <button
            key={type}
            type="button"
            style={{
              ...sharedButtonStyles.base,
              ...(paymentType === type ? sharedButtonStyles.selected : {})
            }}
            onClick={() => updateField('paymentType', type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
