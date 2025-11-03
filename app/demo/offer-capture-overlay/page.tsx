"use client";

import React, { useState } from 'react';
import OfferCaptureOverlay from '@/src/components/calculator/shared-results/OfferCaptureOverlay';

/**
 * ============================================================================
 * DEMO PAGE - OFFER CAPTURE OVERLAY PREVIEW
 * ============================================================================
 * Standalone page to preview the offer capture overlay component
 * Access at: http://localhost:3000/demo/offer-capture-overlay
 * 
 * This demo shows how the overlay appears after a delay and allows you to
 * test the email/SMS capture functionality.
 */
export default function OfferCaptureOverlayDemo() {
  const [demoStarted, setDemoStarted] = useState(false);
  const [capturedData, setCapturedData] = useState<{
    email?: string;
    phone?: string;
    deliveryMethod: 'email' | 'sms';
  } | null>(null);
  const [overlayKey, setOverlayKey] = useState(0);

  const handleStartDemo = () => {
    setDemoStarted(true);
    setCapturedData(null);
    setOverlayKey(prev => prev + 1); // Reset overlay by changing key
  };

  const handleSuccess = (data: { email?: string; phone?: string; deliveryMethod: 'email' | 'sms' }) => {
    setCapturedData(data);
    console.log('Offer captured:', data);
  };

  const handleReset = () => {
    setDemoStarted(false);
    setCapturedData(null);
    setOverlayKey(prev => prev + 1);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem auto'
      }}>
        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: 700, 
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          Offer Capture Overlay Demo
        </h1>
        <p style={{ 
          fontSize: '0.9375rem', 
          color: '#6b7280',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          Preview the offer capture overlay that appears after your offer is displayed.
          The overlay will slide up from the bottom after 7 seconds.
        </p>

        {!demoStarted ? (
          <button
            onClick={handleStartDemo}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
            }}
          >
            🚀 Start Demo (Overlay in 3 seconds)
          </button>
        ) : (
          <div style={{
            padding: '1.5rem',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '0.9375rem',
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              ⏱️ Waiting for overlay... (3 seconds)
            </p>
            <p style={{
              fontSize: '0.8125rem',
              color: '#9ca3af',
              marginBottom: '1.5rem'
            }}>
              The overlay will slide up from the bottom automatically.
            </p>
            <button
              onClick={handleReset}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>

      {/* Mock Offer Display */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Early Payout Offer
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          STRUCTURED SETTLEMENT VALUATION
        </p>

        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: '#f9fafb',
          borderRadius: '8px'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '0.5rem',
            margin: 0
          }}>
            Minimum Payout
          </p>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1f2937',
            margin: 0
          }}>
            $225,000
          </p>
        </div>

        <div style={{
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          borderRadius: '12px',
          border: '2px solid #22c55e'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#15803d',
            marginBottom: '0.5rem',
            margin: 0,
            fontWeight: 600
          }}>
            Maximum Payout
          </p>
          <p style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#16a34a',
            margin: 0
          }}>
            $250,000
          </p>
        </div>

        <p style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          margin: 0,
          lineHeight: '1.6'
        }}>
          This offer is based on the information you provided and represents an estimated range.<br />
          Final terms subject to verification and approval.
        </p>
      </div>

      {/* Captured Data Display */}
      {capturedData && (
        <div style={{
          maxWidth: '600px',
          margin: '2rem auto 0',
          padding: '1.5rem',
          background: '#dcfce7',
          borderRadius: '12px',
          border: '2px solid #22c55e'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#15803d',
            marginBottom: '0.75rem',
            margin: '0 0 0.75rem 0'
          }}>
            ✓ Data Captured Successfully!
          </h3>
          <div style={{
            fontSize: '0.875rem',
            color: '#166534',
            lineHeight: '1.8'
          }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Delivery Method:</strong> {capturedData.deliveryMethod === 'email' ? 'Email' : 'Text Message'}
            </p>
            {capturedData.email && (
              <p style={{ margin: '0.25rem 0' }}>
                <strong>Email:</strong> {capturedData.email}
              </p>
            )}
            {capturedData.phone && (
              <p style={{ margin: '0.25rem 0' }}>
                <strong>Phone:</strong> {capturedData.phone}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        maxWidth: '600px',
        margin: '2rem auto 0',
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#1f2937',
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          How It Works:
        </h3>
        <ul style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          lineHeight: '1.8',
          margin: 0,
          paddingLeft: '1.5rem'
        }}>
          <li>Click "Start Demo" to begin the timer</li>
          <li>After 3 seconds, the overlay will block the entire screen</li>
          <li>You must provide your information to continue (no dismiss option)</li>
          <li>Switch between Email and SMS tabs</li>
          <li>Enter your contact information</li>
          <li>See the bonus message about calling for $5,000 bonus</li>
          <li>Submit to unlock the screen and see success message</li>
        </ul>
      </div>

      {/* Overlay Component */}
      {demoStarted && (
        <OfferCaptureOverlay
          key={overlayKey}
          calculatorType="guaranteed"
          delaySeconds={3}
          onSuccess={handleSuccess}
          onDismiss={() => console.log('Overlay dismissed')}
        />
      )}
    </div>
  );
}
