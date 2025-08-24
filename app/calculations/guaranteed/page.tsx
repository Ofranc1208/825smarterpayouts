"use client";

import React from 'react';
import GuaranteedStepper from '../../../src/components/calculator/guaranteedstep/GuaranteedStepper';
import { CalculatorProvider } from '../../../src/contexts/CalculatorContext';
import { useGuaranteedAssistant, GuaranteedAssistantProvider } from '../../../src/contexts/GuaranteedAssistantContext';


const GuaranteedCalculatorContent: React.FC = () => {
  const { openAssistant } = useGuaranteedAssistant();
  
  return (
      <>
        <style>{`
        @keyframes prominentPulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(34, 180, 85, 0.15);
          }
          50% {
            box-shadow: 0 6px 18px rgba(34, 180, 85, 0.25);
          }
        }
        
        @keyframes mintPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(34, 180, 85, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(34, 180, 85, 0.4);
          }
        }
      `}</style>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '0.5rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '0.75rem',
          padding: '0.5rem 0.25rem',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', 
            fontWeight: '800', 
            color: '#22b455',
            marginBottom: '0',
            marginTop: '0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}>
            Guaranteed Payment Calculator
          </h1>
        </div>
        
        {/* Testing Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '0.5rem',
          padding: '0 0.25rem'
        }}>
          <button
            onClick={() => {
              // Generate new session ID and refresh
              const newSessionId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
              window.location.href = `?sessionId=${newSessionId}`;
            }}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.7rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: 0.8
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = '#4b5563';
              target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = '#6b7280';
              target.style.opacity = '0.8';
            }}
            title="Refresh session for testing - clears all data and starts fresh"
          >
            🔄 Refresh Session
          </button>
        </div>
        
        {/* Prominent AI Assistant Section - Right after title */}
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '2px solid #22b455',
          borderRadius: '12px',
          padding: '8px 12px',
          marginBottom: '16px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '320px',
          boxShadow: '0 4px 12px rgba(34, 180, 85, 0.15)',
          animation: 'prominentPulse 3s ease-in-out infinite'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              flex: '1'
            }}>
              <strong style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#333',
                margin: '0'
              }}>
                Need help?
              </strong>
              <span style={{
                fontSize: '0.7rem',
                color: '#666',
                margin: '0',
                lineHeight: '1.2'
              }}>
                See if you have any questions
              </span>
            </div>
            <button 
              style={{
                background: 'linear-gradient(135deg, #22b455 0%, #1a9a47 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                padding: '6px 15px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(34, 180, 85, 0.3)',
                transition: 'all 0.2s ease',
                minWidth: '62px',
                minHeight: '30px',
                userSelect: 'none',
                letterSpacing: '0.1px',
                flexShrink: '0',
                animation: 'mintPulse 2s ease-in-out infinite'
              }}
              onClick={openAssistant}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1a9a47 0%, #15803d 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 180, 85, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #22b455 0%, #1a9a47 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 180, 85, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 180, 85, 0.3)';
              }}
            >
              Ask Mint
            </button>
          </div>
        </div>
        
        <GuaranteedStepper />
      </div>
    </>
  );
};

const GuaranteedCalculatorPage: React.FC = () => {
  // 🔧 FIX: Simplify like LCP - let GuaranteedAssistantProvider handle sessionId from URL
  return (
    <CalculatorProvider logUserChoiceAsMessage={() => {}}>
      <GuaranteedAssistantProvider>
        <GuaranteedCalculatorContent />
      </GuaranteedAssistantProvider>
    </CalculatorProvider>
  );
};

export default GuaranteedCalculatorPage; 