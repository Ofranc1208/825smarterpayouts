'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

const FAQ_DATA = [
  {
    question: "Do I need to provide personal information?",
    answer: "No. Our AI calculator and phone quotes do not require sensitive personal information, social security numbers, or credit checks. Just payment details."
  },
  {
    question: "How fast will I get my quote?",
    answer: "AI calculator quotes are instant (60 seconds). Phone quotes are provided during your call. Both are equally accurate and reliable."
  },
  {
    question: "Is there any obligation or pressure?",
    answer: "Never. All quotes are completely free, confidential, and come with zero obligation or sales pressure. You're in control of your decision."
  },
  {
    question: "What if I have a unique or complex situation?",
    answer: "Our AI handles most complex cases instantly. For unique situations, our human experts can walk you through specialized options step by step."
  },
  {
    question: "How accurate are the quotes?",
    answer: "Our AI-powered quotes are based on real market data and current rates. They're as accurate as quotes from traditional companies, often more so."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ 
      padding: SPACING.section.standard, 
      background: '#ffffff'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: SPACING.container.paddingX
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.xxl
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: SPACING.stack.sm
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get instant answers to common questions about getting your quote
          </p>
        </div>

        {/* Ask Mint AI CTA */}
        <Link
          href="/mint-intelligent-chat"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#f0fdf4',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid #22c55e',
            textDecoration: 'none',
            marginBottom: SPACING.stack.xl,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dcfce7';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f0fdf4';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain'
            }}
          />
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#047857'
          }}>
            Have a specific question? Ask Mint AI →
          </div>
        </Link>

        {/* FAQ Container */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>

          {/* FAQ Items */}
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            const isLast = index === FAQ_DATA.length - 1;
            
            return (
              <div 
                key={index} 
                style={{
                  borderBottom: isLast ? 'none' : '1px solid #f3f4f6'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#111827',
                    flex: 1,
                    paddingRight: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {faq.question}
                  </h3>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? '#22c55e' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}>
                    <span style={{
                      color: isOpen ? 'white' : '#6b7280',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      display: 'inline-block'
                    }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    background: '#fafafa'
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '0.9375rem',
                      color: '#6b7280',
                      lineHeight: '1.7'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Button */}
        <div style={{ 
          textAlign: 'center',
          marginTop: SPACING.stack.xl
        }}>
          <Link
            href="/faqs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'white',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              color: '#047857',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#22c55e';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#047857';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View All FAQs
            <span style={{ fontSize: '1.125rem' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
