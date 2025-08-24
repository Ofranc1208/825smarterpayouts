import React from 'react';
import { sharedInputStyles } from './AdditionalDetails';

interface AmountInputProps {
  amount: string;
  updateField: (key: string, value: any) => void;
  errors: any;
  showInfo: (html: string) => void;
  tooltipDefinitions: any;
}

// Using shared input styles from AdditionalDetails to avoid duplication

export default function AmountInput({
  amount,
  updateField,
  errors,
  showInfo,
  tooltipDefinitions
}: AmountInputProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove all except digits and decimal
    value = value.replace(/[^\d.]/g, '');
    // Only allow one decimal point
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    // Limit to two decimal places
    if (parts[1]) value = parts[0] + '.' + parts[1].slice(0, 2);
    // Remove leading zeros unless before decimal
    value = value.replace(/^0+(?!\.|$)/, '');
    updateField('amount', value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        Payment Amount ($)
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
            showInfo(tooltipDefinitions.amount);
          }}
        >
          ( More Info )
        </span>
      </label>
      <input
        type="text"
        min={100}
        max={1000000}
        step={1}
        value={amount}
        onChange={handleAmountChange}
        style={{
          ...sharedInputStyles.base,
          ...(errors.amount ? sharedInputStyles.error : {})
        }}
        onKeyPress={e => {
          if (!/[0-9.]/.test(e.key) || (e.key === '.' && amount.includes('.'))) {
            e.preventDefault();
          }
        }}
        onPaste={e => {
          e.preventDefault();
          let pasted = e.clipboardData.getData('text').replace(/[^\d.]/g, '');
          const parts = pasted.split('.');
          if (parts.length > 2) pasted = parts[0] + '.' + parts.slice(1).join('');
          if (parts[1]) pasted = parts[0] + '.' + parts[1].slice(0, 2);
          pasted = pasted.replace(/^0+(?!\.|$)/, '');
          updateField('amount', pasted);
        }}
      />
      {errors.amount && (
        <div style={{
          color: '#ef4444',
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>
          {errors.amount}
        </div>
      )}
    </div>
  );
}
