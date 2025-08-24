import React from 'react';

interface GuaranteedReviewProps {
  paymentMode: string;
  paymentAmount: string;
  annualIncrease: number;
  startDate: string;
  endDate: string;
  payments?: Array<{ amount: string; lumpSumDate: string }>;
  onCalculate: () => void;
  onEdit?: (step: number) => void;
  error?: string;
  currentStep: number;
  totalSteps: number;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const GuaranteedReview: React.FC<GuaranteedReviewProps> = ({
  paymentMode,
  paymentAmount,
  annualIncrease,
  startDate,
  endDate,
  payments,
  onCalculate,
  onEdit,
  error,
  currentStep,
  totalSteps
}) => {
  // Inline styles (converted from module CSS)
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 'auto',
    padding: 0,
    width: '100%'
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    padding: '1rem 0.75rem',
    width: '100%',
    maxWidth: 400,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: 600,
    marginBottom: 18,
    textAlign: 'center'
  };

  const summarySectionStyle: React.CSSProperties = { width: '100%', marginBottom: 18 };
  const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 };
  const labelStyle: React.CSSProperties = { fontWeight: 500, color: '#333' };
  const valueStyle: React.CSSProperties = { fontWeight: 600, color: '#1976d2' };
  const paymentRowStyle: React.CSSProperties = { borderTop: '1px solid #f0f0f0', paddingTop: '0.5rem', marginTop: '0.5rem' };
  const buttonBase: React.CSSProperties = {
    marginTop: 18,
    padding: '0.75rem 1.5rem',
    background: '#22b455',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    boxShadow: '0 2px 8px rgba(34, 180, 85, 0.2)'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Review & Calculate</h2>
        {onEdit && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <button
              style={buttonBase}
              onClick={() => onEdit(1)}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16a34a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22b455';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ✏️ Edit Form
            </button>
          </div>
        )}
        <div style={summarySectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>Payment Mode:</span>
            <span style={valueStyle}>{paymentMode}</span>
          </div>
          {paymentMode === 'Lump Sum' && payments ? (
            <>
              <div style={rowStyle}>
                <span style={labelStyle}>Number of Payments:</span>
                <span style={valueStyle}>{payments.length}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Total Amount:</span>
                <span style={valueStyle}>
                  ${payments.reduce((sum, payment) => sum + Number(payment.amount), 0).toLocaleString()}
                </span>
              </div>
              {payments.map((payment, index) => (
                <div key={index} style={paymentRowStyle}>
                  <div style={rowStyle}>
                    <span style={labelStyle}>Payment {index + 1}:</span>
                    <span style={valueStyle}>${Number(payment.amount).toLocaleString()}</span>
                  </div>
                  <div style={rowStyle}>
                    <span style={labelStyle}>Date:</span>
                    <span style={valueStyle}>{formatDate(payment.lumpSumDate)}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={rowStyle}>
                <span style={labelStyle}>Payment Amount:</span>
                <span style={valueStyle}>${Number(paymentAmount).toLocaleString()}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Start Date:</span>
                <span style={valueStyle}>{formatDate(startDate)}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>End Date:</span>
                <span style={valueStyle}>{formatDate(endDate)}</span>
              </div>
            </>
          )}
          <div style={rowStyle}>
            <span style={labelStyle}>Annual Increase:</span>
            <span style={valueStyle}>{annualIncrease}%</span>
          </div>
        </div>
        <button
          style={buttonBase}
          onClick={onCalculate}
          type="button"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a9a47';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 180, 85, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#22b455';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 180, 85, 0.2)';
          }}
        >
          Calculate
        </button>
        {error && (
          <div style={{ ...rowStyle, color: '#b91c1c', marginTop: '12px', fontWeight: 600 }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuaranteedReview; 