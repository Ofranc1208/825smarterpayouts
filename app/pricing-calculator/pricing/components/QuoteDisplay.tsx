import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface QuoteDisplayProps {
  calculationResult: any;
}

export default function QuoteDisplay({ calculationResult }: QuoteDisplayProps) {
  console.log('🔍 DEBUG: QuoteDisplay received calculationResult:', calculationResult);
  
  if (!calculationResult) {
    return (
      <div style={{
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#1e293b',
          marginBottom: '1rem'
        }}>
          Your Quote
        </h2>
        <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Calculating your quote...
        </div>
      </div>
    );
  }

  // Handle different payment types
  if (calculationResult.requiresContact) {
    return (
      <div style={{
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#1e293b',
          marginBottom: '1rem'
        }}>
          {calculationResult.type === 'Life Contingent' ? 'Life Contingent Quote' : 'Quote Review Required'}
        </h2>
        
        <div style={{
          background: '#ffffff',
          borderRadius: '8px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '1rem',
            color: '#374151',
            marginBottom: '1rem',
            lineHeight: '1.6'
          }}>
            {calculationResult.message}
          </div>
          
          <div style={{
            background: '#f0fdf4',
            borderRadius: '6px',
            padding: '1rem',
            border: '1px solid #bbf7d0'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#166534',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              📋 Your Details:
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#166534',
              lineHeight: '1.5'
            }}>
              • Amount: ${calculationResult.amount?.toLocaleString()}<br/>
              • Payment Mode: {calculationResult.paymentMode}<br/>
              • Start Date: {calculationResult.startDate}<br/>
              • End Date: {calculationResult.endDate}<br/>
              • Annual Increase: {calculationResult.increaseRate}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle guaranteed payments with professional pricing
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#1e293b',
        marginBottom: '1rem'
      }}>
        Your Guaranteed Quote
      </h2>
      
      {/* Primary Offer */}
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '1.25rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem'
      }}>
        <div style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#10b981',
          marginBottom: '0.25rem'
        }}>
          ${calculationResult.lumpSum?.toLocaleString() || 'Calculating...'}
        </div>
        <div style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          Recommended Lump Sum Offer
        </div>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#059669', 
          background: '#f0fdf4', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '4px',
          display: 'inline-block'
        }}>
          {calculationResult.pricingMethod || 'Professional Pricing'}
        </div>
      </div>
      
      {/* Min/Max Range */}
      {calculationResult.minOffer && calculationResult.maxOffer && (
        <div style={{
          background: '#f0fdf4',
          borderRadius: '8px',
          padding: '1rem',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '0.75rem'
          }}>
            📊 Your Offer Range
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#dc2626'
              }}>
                ${calculationResult.minOffer?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>
                Minimum Offer
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#059669'
              }}>
                ${calculationResult.maxOffer?.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>
                Maximum Offer
              </div>
            </div>
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#166534',
            marginTop: '0.75rem',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Offers are rounded to the nearest $100 for professional pricing
          </div>
        </div>
      )}

      {/* Mint AI Help - Inlined from MintAIHelp.tsx */}
      <div style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #93c5fd',
        marginTop: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <Image 
            src="/assets/images/mint-mascot.png" 
            alt="Mint AI" 
            width={32} 
            height={32}
            style={{ borderRadius: '50%' }}
          />
          <span style={{ color: '#1d4ed8', fontWeight: 600 }}>
            Questions about your quote?
          </span>
        </div>
        
        <Link href="/mint-intelligent-chat" style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: '#ffffff',
          padding: '0.75rem 1.5rem',
          borderRadius: '25px',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          💬 Ask Mint AI
        </Link>
      </div>
    </div>
  );
}
