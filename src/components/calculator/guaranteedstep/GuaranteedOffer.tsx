import React, { useState, useEffect } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { validateOfferThreshold, formatCurrency } from '../../../../app/utils/validationHelpers';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';

interface GuaranteedOfferProps {
  calculationResult: {
    minOffer: number;
    maxOffer: number;
  };
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

const GuaranteedOffer: React.FC<GuaranteedOfferProps> = ({ calculationResult, onBack, currentStep, totalSteps }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { handoffToMainChat } = useGuaranteedAssistant();

  // Validate offer threshold
  const offerValidation = validateOfferThreshold(calculationResult.minOffer, calculationResult.maxOffer);

  // Trigger confetti animation when component mounts (only if offer is valid)
  useEffect(() => {
    if (offerValidation.shouldShowOffer) {
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [offerValidation.shouldShowOffer]);

  // If offer is below threshold, show message instead of offer
  if (!offerValidation.shouldShowOffer) {
    return (
      <GuaranteedStepContainer title="Offer Information" currentStep={currentStep} totalSteps={totalSteps}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#856404',
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>No Offers Available</h3>
            <p style={{
              color: '#664d03',
              marginBottom: '1.5rem',
              lineHeight: '1.5',
              fontSize: '1rem'
            }}>{offerValidation.message}</p>
            <div style={{
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{
                color: '#856404',
                marginBottom: '0.75rem',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>Suggestions to get an offer:</h4>
              <ul style={{
                listStyleType: 'disc',
                marginLeft: '1.5rem'
              }}>
                <li style={{
                  color: '#664d03',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>Increase your payment amount</li>
                <li style={{
                  color: '#664d03',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>Extend your date range</li>
                <li style={{
                  color: '#664d03',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>Consider including more payments</li>
                <li style={{
                  color: '#664d03',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>Contact our specialists for assistance</li>
              </ul>
            </div>
            {onBack && (
              <button onClick={onBack} style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                target.style.transform = 'translateY(-1px)';
                target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.2)';
              }}>
                Go Back to Edit
              </button>
            )}
          </div>
        </div>
      </GuaranteedStepContainer>
    );
  }

  return (
    <GuaranteedStepContainer title="Congratulations! Here's Your Early Payout Offer" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: '1000',
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #ff6b9d, #a8e6cf, #ffd93d, #6c5ce7)',
                borderRadius: '50%',
                animation: `confettiFall linear infinite`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                opacity: '0.9',
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div style={{
        width: '100%',
        marginBottom: '1.5rem',
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '0.5rem 0'
        }}>
          <span style={{
            color: '#666',
            fontWeight: '600',
            fontSize: '0.98rem',
            marginBottom: '0.3rem'
          }}>Minimum Offer</span>
          <span style={{
            color: '#15803d',
            fontSize: '1.365rem',
            fontWeight: '800',
            letterSpacing: '0.01em',
            textAlign: 'center'
          }}>{formatCurrency(calculationResult.minOffer)}</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '0.5rem 0'
        }}>
          <span style={{
            color: '#666',
            fontWeight: '600',
            fontSize: '0.98rem',
            marginBottom: '0.3rem'
          }}>Maximum Offer</span>
          <span style={{
            color: '#15803d',
            fontSize: '1.89rem',
            fontWeight: '800',
            letterSpacing: '0.01em',
            textAlign: 'center'
          }}>{formatCurrency(calculationResult.maxOffer)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button
          onClick={handoffToMainChat}
          style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
            target.style.transform = 'translateY(-2px)';
            target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            target.style.transform = 'translateY(0)';
            target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
          }}
        >
          💬 Continue in Main Chat
        </button>
        
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              color: '#6b7280',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.borderColor = '#9ca3af';
              target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.borderColor = '#e5e7eb';
              target.style.color = '#6b7280';
            }}
          >
            ← Back to Review
          </button>
        )}
      </div>

      {/* CSS Animation for confetti */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedOffer; 