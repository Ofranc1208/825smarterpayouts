/**
 * Alternatives to Selling - Comprehensive Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  RelatedResources,
  SchemaMarkup
} from '../components';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils';

const AlternativesToSelling: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "Alternatives to Selling Your Structured Settlement | 6 Smart Options",
    description: "Explore 6 alternatives to selling: loans, payment acceleration, budgeting, and more. Preserve more value while solving your financial needs.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/alternatives-to-selling-structured-settlement"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Alternatives", url: "https://smarterpayouts.com/structured-settlement-info-hub/alternatives-to-selling-structured-settlement" }
  ]);

  const alternatives = [
    {
      title: "Personal Loans Using Settlement as Collateral",
      icon: "🏦",
      pros: ["Keep settlement intact", "No court approval", "Faster than selling"],
      cons: ["Interest rates 8-15%", "Monthly payments", "Risk losing collateral"],
      bestFor: "Short-term needs under $50,000"
    },
    {
      title: "Payment Acceleration (Negotiate with Insurer)",
      icon: "⚡",
      pros: ["Keep full payment amounts", "No discount applied", "No court needed"],
      cons: ["Rarely granted", "Administrative resistance", "Not guaranteed"],
      bestFor: "Minor schedule adjustments"
    },
    {
      title: "Budgeting & Financial Planning",
      icon: "📊",
      pros: ["Keep full settlement value", "Build financial literacy", "No fees"],
      cons: ["Requires discipline", "Takes time", "May not solve crisis"],
      bestFor: "Long-term financial stability"
    },
    {
      title: "Government Assistance Programs",
      icon: "🏛️",
      pros: ["Free money (no repayment)", "Preserve settlement", "Multiple programs"],
      cons: ["Eligibility requirements", "Lengthy application", "Limited amounts"],
      bestFor: "Healthcare, housing, education"
    },
    {
      title: "Negotiate with Creditors",
      icon: "💬",
      pros: ["Reduces immediate pressure", "No settlement loss", "Often successful"],
      cons: ["May affect credit", "Requires negotiation skills", "Not all cooperate"],
      bestFor: "Medical bills, credit card debt"
    },
    {
      title: "Credit Counseling Services",
      icon: "📋",
      pros: ["Professional guidance", "Debt management plans", "Usually non-profit/free"],
      cons: ["Takes 3-5 years", "Not for emergencies", "Requires commitment"],
      bestFor: "Chronic debt problems"
    }
  ];

  return (
    <>
      <SchemaMarkup
        articleSchema={articleSchema}
        breadcrumbSchema={breadcrumbSchema}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          * { box-sizing: border-box !important; }
          body, html { margin: 0 !important; padding: 0 !important; }
          @media (max-width: 768px) {
            .content-grid { grid-template-columns: 1fr !important; }
            .sidebar { position: static !important; width: 100% !important; }
          }
        `
      }} />

      <HeroSection
        title="🔄 Alternatives to Selling Your Settlement"
        subtitle="6 options to get cash without selling at a 40-60% discount"
        showCTAs={true}
      />

      <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 1.5rem', boxSizing: 'border-box', width: '100%' }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2.5rem',
          boxSizing: 'border-box',
          width: '100%'
        }} className="content-grid">
          
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                Before You Accept a 40-60% Discount
              </h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
                Selling your structured settlement means accepting a <strong>significant discount</strong>. Before making this irreversible decision, explore these alternatives that might preserve more money while still addressing your financial needs.
              </p>

              <div style={{
                background: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h3 style={{ color: '#92400e', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  ⚠️ Reality Check
                </h3>
                <p style={{ color: '#92400e', lineHeight: '1.6', margin: 0 }}>
                  While alternatives exist, they are not always practical. If you need immediate cash and explored other options, selling might still be your best choice.
                </p>
              </div>
            </section>

            {/* INLINE CTA #1 */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                💬 Not Sure Which Option Is Right?
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                Chat with Mint AI for personalized guidance on alternatives vs. selling for your specific situation.
              </p>
              <Link href="/chat" style={{
                display: 'inline-block',
                background: 'white',
                color: COLORS.accent.purple,
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.125rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
              }}>
                🤖 Chat with Mint AI →
              </Link>
            </div>

            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>
                6 Alternatives to Consider
              </h2>

              {alternatives.map((alt, index) => (
                <div key={index} style={{
                  marginBottom: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: index < alternatives.length - 1 ? '2px solid #e5e7eb' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>{alt.icon}</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                      {alt.title}
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: COLORS.primary.main, marginBottom: '0.75rem' }}>
                        ✓ Pros:
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#374151' }}>
                        {alt.pros.map((pro, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#dc2626', marginBottom: '0.75rem' }}>
                        ✗ Cons:
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#374151' }}>
                        {alt.cons.map((con, i) => (
                          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem'
                  }}>
                    <strong style={{ color: COLORS.primary.main }}>Best For:</strong>{' '}
                    <span style={{ color: '#374151' }}>{alt.bestFor}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* INLINE CTA #2 */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                Explored All Options? Get Your Quote
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                If selling makes the most sense, find out what you can get. Free quote, no obligation.
              </p>
              <Link href="/mint-chat-active?type=calculate&source=info-hub-alternatives" style={{
                display: 'inline-block',
                background: 'white',
                color: COLORS.primary.main,
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.125rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
              }}>
                💰 Get Instant Quote →
              </Link>
            </div>

            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                When to Try Alternatives vs. When to Sell
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: '#f0fdf4',
                  border: '2px solid #86efac',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: COLORS.primary.main, marginBottom: '1rem' }}>
                    ✓ Try Alternatives First If:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#374151', lineHeight: '1.7' }}>
                    <li style={{ marginBottom: '0.75rem' }}>You need less than $25,000</li>
                    <li style={{ marginBottom: '0.75rem' }}>Your financial situation is temporary</li>
                    <li style={{ marginBottom: '0.75rem' }}>You have good credit for loans</li>
                    <li style={{ marginBottom: '0.75rem' }}>Creditors are willing to negotiate</li>
                    <li>You can wait 30-90 days for a solution</li>
                  </ul>
                </div>

                <div style={{
                  background: '#fef3c7',
                  border: '2px solid #fbbf24',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#92400e', marginBottom: '1rem' }}>
                    → Consider Selling If:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#92400e', lineHeight: '1.7' }}>
                    <li style={{ marginBottom: '0.75rem' }}>You need more than $50,000</li>
                    <li style={{ marginBottom: '0.75rem' }}>Financial need is permanent (business, home, education)</li>
                    <li style={{ marginBottom: '0.75rem' }}>Alternatives explored and rejected</li>
                    <li style={{ marginBottom: '0.75rem' }}>You prefer lump sum over periodic payments</li>
                    <li>The discount is worth the immediate cash access</li>
                  </ul>
                </div>
              </div>
            </section>

            <RelatedResources resources={[
              {
                title: "Pros & Cons of Selling",
                description: "Weigh the advantages and disadvantages to make an informed decision.",
                link: "/structured-settlement-info-hub/pros-cons-selling-structured-settlement"
              },
              {
                title: "Common Mistakes",
                description: "Avoid costly errors that have cost others thousands of dollars.",
                link: "/structured-settlement-info-hub/common-mistakes-selling-structured-settlement"
              }
            ]} />
          </div>

          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default AlternativesToSelling;

