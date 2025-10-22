// FAQ Section - under 50 lines per complexity rule
// Interactive FAQ about structured settlements and federal law

'use client';

import { useState } from 'react';
import { settlementLawPageData } from '../../data';

export default function FAQSection() {
  const { faq } = settlementLawPageData;
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'taxation': return '#059669';
      case 'transfers': return '#dc2626';
      case 'legal': return '#2563eb';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'taxation': return '💰';
      case 'transfers': return '🔄';
      case 'legal': return '⚖️';
      default: return '❓';
    }
  };

  return (
    <section style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f3f4f6'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 0.375rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.125rem' }}>❓</span>
          Frequently Asked Questions
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '0.8125rem',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Common questions about structured settlement federal laws and regulations.
        </p>
      </div>

      {/* FAQ Items */}
      <div style={{
        display: 'grid',
        gap: '0.75rem'
      }}>
        {faq.map((item, index) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              overflow: 'hidden',
              background: openItems.includes(item.id) ? '#f9fafb' : 'white'
            }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              {/* Question Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.6875rem',
                    padding: '0.125rem 0.5rem',
                    background: getCategoryColor(item.category),
                    color: 'white',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    letterSpacing: '0.025em'
                  }}>
                    {item.category}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {item.question}
                </h3>
              </div>

              {/* Expand Arrow */}
              <div style={{
                flexShrink: 0,
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  transform: openItems.includes(item.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  display: 'inline-block'
                }}>
                  ▼
                </span>
              </div>
            </button>

            {/* Answer */}
            {openItems.includes(item.id) && (
              <div style={{
                padding: '0 1rem 0.875rem 1rem',
                background: '#f9fafb',
                borderTop: '1px solid #e5e7eb'
              }}>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '0.8125rem'
                }}>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '1.25rem',
        padding: '0.875rem',
        background: '#f8fafc',
        borderRadius: '0.375rem',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{
          color: '#6b7280',
          margin: 0,
          fontSize: '0.75rem',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          <strong>Need more help?</strong> These answers provide general information only. 
          Always consult with a qualified attorney for advice specific to your situation.
        </p>
      </div>
    </section>
  );
}
