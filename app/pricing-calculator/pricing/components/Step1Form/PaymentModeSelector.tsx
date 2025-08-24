import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { sharedButtonStyles } from './PaymentTypeSelector';

interface PaymentModeSelectorProps {
  paymentMode: string;
  updateField: (key: string, value: any) => void;
  showInfo: (html: string) => void;
  tooltipDefinitions: any;
  router: AppRouterInstance;
}



export default function PaymentModeSelector({
  paymentMode,
  updateField,
  showInfo,
  tooltipDefinitions,
  router
}: PaymentModeSelectorProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '0.5rem'
      }}>
        Payment Mode
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
            showInfo(tooltipDefinitions.paymentMode);
          }}
        >
          ( More Info )
        </span>
      </label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0.5rem'
      }}>
        {['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'].map(mode => (
          <button
            key={mode}
            type="button"
            style={{
              ...sharedButtonStyles.base,
              ...(paymentMode === mode ? sharedButtonStyles.selected : {})
            }}
            onClick={() => {
              updateField('paymentMode', mode);
              if (mode === 'Lump Sum') {
                router.push('/lump-sum-calculator');
              }
            }}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
