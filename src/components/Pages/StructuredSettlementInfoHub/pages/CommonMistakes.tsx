/**
 * Common Mistakes When Selling - Educational Guide
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

const CommonMistakes: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "8 Common Mistakes When Selling a Structured Settlement",
    description: "Avoid costly errors when selling your structured settlement. Learn the 8 most common mistakes, real costs, and how to protect yourself.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/common-mistakes-selling-structured-settlement"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Common Mistakes", url: "https://smarterpayouts.com/structured-settlement-info-hub/common-mistakes-selling-structured-settlement" }
  ]);

  const mistakes = [
    {
      title: "Not Shopping Around for Multiple Quotes",
      cost: "$10,000 - $30,000 lost",
      why: "Discount rates vary 10-20% between companies. First offer is rarely the best deal.",
      solution: "Get quotes from at least 3-5 companies. Compare rates, fees, and terms side-by-side."
    },
    {
      title: "Selling ALL Your Payments at Once",
      cost: "40-60% discount on unnecessary payments",
      why: "Distant payments are heavily discounted. You might only need cash now, not lose future security.",
      solution: "Calculate exact cash need. Sell only 3-5 years of payments, keep the rest for retirement."
    },
    {
      title: "Ignoring the Discount Rate",
      cost: "Accepting poor terms unknowingly",
      why: "Companies hide high rates (12-18%) behind complex math. You might get 50 cents per dollar.",
      solution: "Always ask for discount rate in writing. Market rate is typically 8-12%."
    },
    {
      title: "Rushing the Court Approval Process",
      cost: "Delays of 3-6 months or rejection",
      why: "Judges reject sales not in your best interest. Poor preparation wastes months.",
      solution: "Work with experienced company. Provide all documents. Explain money use clearly."
    },
    {
      title: "Failing to Consider Tax Implications",
      cost: "Unexpected tax bills, benefit losses",
      why: "Lump sums can affect SSI, Medicaid. Large amounts trigger reporting requirements.",
      solution: "Consult CPA before signing. Understand impact on benefits and taxes."
    },
    {
      title: "Working with Unlicensed Companies",
      cost: "Fraud, excessive fees, poor service",
      why: "Unlicensed buyers can disappear. Predatory companies charge hidden fees.",
      solution: "Verify licensing with state. Check BBB ratings. Never pay upfront fees."
    },
    {
      title: "Not Having a Financial Plan",
      cost: "Money wasted within 5 years",
      why: "70% of recipients spend lump sum quickly. No plan = lost long-term security.",
      solution: "Create written budget. Allocate to debt, emergency fund, investments. Get advisor."
    },
    {
      title: "Ignoring Alternatives to Selling",
      cost: "Unnecessary 40-60% discount",
      why: "Loans, payment plans, or assistance might solve problem without huge discount.",
      solution: "Exhaust alternatives first: counseling, hardship programs, payment plans."
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
        title="⚠️ 8 Common Mistakes When Selling Your Settlement"
        subtitle="Learn from others' errors—protect your money and get the best deal possible"
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
            {/* Introduction */}
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                Don't Leave Money on the Table
              </h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
                Selling a structured settlement is a <strong>one-time, irreversible decision</strong> that can cost or save you tens of thousands of dollars. The difference between a good deal and a bad one often comes down to avoiding these 8 critical mistakes.
              </p>

              <div style={{
                background: '#fee2e2',
                border: '2px solid #ef4444',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h3 style={{ color: '#991b1b', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  🚨 Average Cost: $15,000 - $50,000
                </h3>
                <p style={{ color: '#991b1b', lineHeight: '1.6', margin: 0 }}>
                  These mistakes have cost settlement holders hundreds of thousands collectively. Learn from them.
                </p>
              </div>
            </section>

            {/* INLINE CTA #1 */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                💡 Avoid Mistake #1: Get Multiple Quotes
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                Compare offers from top-rated companies. See who gives you the best deal in 60 seconds.
              </p>
              <Link href="/mint-chat-active?type=calculate&source=info-hub-mistakes" style={{
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
                🛒 Compare Quotes Now →
              </Link>
            </div>

            {/* Mistakes List */}
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>
                The 8 Most Expensive Mistakes
              </h2>

              {mistakes.map((mistake, index) => (
                <div key={index} style={{
                  marginBottom: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: index < mistakes.length - 1 ? '2px solid #e5e7eb' : 'none'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                        {mistake.title}
                      </h3>
                      <span style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: '700'
                      }}>
                        💸 Cost: {mistake.cost}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginLeft: '64px' }}>
                    <p style={{ color: '#6b7280', lineHeight: '1.7', marginBottom: '1rem' }}>
                      <strong>Why It Hurts:</strong> {mistake.why}
                    </p>
                    <div style={{
                      background: '#f0fdf4',
                      border: '2px solid #86efac',
                      borderRadius: '8px',
                      padding: '1rem'
                    }}>
                      <strong style={{ color: COLORS.primary.main }}>✓ Solution:</strong>{' '}
                      <span style={{ color: '#166534' }}>{mistake.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* INLINE CTA #2 */}
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              padding: '2.5rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <img
                  src="/assets/images/mint-mascot.png"
                  alt="Mint AI"
                  style={{
                    width: '28px',
                    height: '28px',
                    objectFit: 'contain'
                  }}
                />
                Have Questions About Your Specific Situation?
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                Chat with Mint AI for personalized guidance on avoiding these mistakes. Get instant answers 24/7.
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
                💬 Chat with Mint AI →
              </Link>
            </div>

            {/* Pre-Sale Checklist */}
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                Pre-Sale Checklist: Do This First
              </h2>

              {[
                'Get quotes from 3-5 companies',
                'Compare discount rates in writing',
                'Calculate exact cash need',
                'Consider partial sale options',
                'Explore all alternatives first',
                'Consult CPA about taxes',
                'Verify company licensing',
                'Check BBB ratings and reviews',
                'Read all contracts carefully',
                'Create financial plan for lump sum',
                'Prepare court approval docs',
                'Understand all fees involved'
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '1.25rem', color: COLORS.primary.main }}>✓</span>
                  <span style={{ color: '#374151', lineHeight: '1.6' }}>{item}</span>
                </div>
              ))}
            </section>

            <RelatedResources resources={[
              {
                title: "How to Choose Best Company",
                description: "10 criteria for selecting a reputable buyer and getting the best deal.",
                link: "/structured-settlement-info-hub/how-to-choose-best-company"
              },
              {
                title: "Maximize Your Offer",
                description: "12 strategies to get thousands more when selling your settlement.",
                link: "/structured-settlement-info-hub/maximize-offer-selling-structured-settlement"
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

export default CommonMistakes;

