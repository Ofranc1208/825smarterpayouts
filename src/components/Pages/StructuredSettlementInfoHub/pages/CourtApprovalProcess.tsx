/**
 * Court Approval Process Page
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

const CourtApprovalProcess: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "Court Approval Process for Selling Structured Settlements",
    description: "Complete guide to court approval: timeline, what judges look for, required documents, and how to prepare for your hearing.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Court Approval", url: "https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process" }
  ]);

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
            .content-grid {
              grid-template-columns: 1fr !important;
            }
            .sidebar {
              position: static !important;
              width: 100% !important;
            }
          }
        `
      }} />

      <HeroSection
        title="⚖️ Court Approval Process: What to Expect"
        subtitle="Complete guide to the legal requirements for selling your structured settlement"
        showCTAs={true}
      />

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '3rem 1.5rem',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2.5rem',
          boxSizing: 'border-box',
          width: '100%'
        }} className="content-grid">
          
          {/* Main Content */}
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            {/* Why Court Approval Required */}
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                Why Court Approval Is Required
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: '1.7',
                color: '#374151',
                marginBottom: '1.5rem'
              }}>
                The <strong>Structured Settlement Protection Act</strong> (federal law) and state laws require judicial approval before you can sell structured settlement payments. This protects you from predatory companies and ensures the sale is in your best interest.
              </p>

              <div style={{
                background: '#eff6ff',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h3 style={{ color: '#1e40af', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  🏛️ Legal Standard: "Best Interest"
                </h3>
                <p style={{ color: '#1e3a8a', lineHeight: '1.6', margin: 0 }}>
                  Judges must determine that the transfer is in your "best interest" considering your age, mental capacity, financial situation, dependents, and the reason you need cash.
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
                🤖 Questions About the Legal Process?
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                Chat with Mint AI to understand court requirements specific to your state and situation.
              </p>
              <Link href="/chat" style={{
                display: 'inline-block',
                background: 'white',
                color: '#8b5cf6',
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

            {/* Timeline */}
            <section style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                5-Step Court Approval Timeline
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: '1.7',
                color: '#374151',
                marginBottom: '2rem'
              }}>
                <strong>Total Timeline: 6-12 weeks</strong> from filing to payment. Some states are faster (California, Florida: 4-6 weeks), others slower (New York, Illinois: 10-16 weeks).
              </p>

              {/* Steps */}
              {[
                {
                  num: 1,
                  title: 'Petition Filing',
                  desc: 'The purchasing company files a petition with the court in your jurisdiction',
                  time: '1-2 weeks'
                },
                {
                  num: 2,
                  title: 'Notice & Disclosure',
                  desc: 'All parties (insurance company, annuity issuer, interested parties) are notified',
                  time: '2-4 weeks'
                },
                {
                  num: 3,
                  title: 'Court Hearing',
                  desc: 'Judge reviews the petition and may ask you questions about the sale',
                  time: '4-8 weeks'
                },
                {
                  num: 4,
                  title: 'Judge Decision',
                  desc: 'Judge approves or denies the sale based on legal requirements',
                  time: 'Same day or 1-2 weeks'
                },
                {
                  num: 5,
                  title: 'Order Execution',
                  desc: 'If approved, court order is executed and payment is processed',
                  time: '1-2 weeks'
                }
              ].map((step) => (
                <div key={step.num} style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: step.num < 5 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div style={{
                    background: COLORS.primary.main,
                    color: 'white',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                      {step.desc}
                    </p>
                    <span style={{
                      background: '#f0fdf4',
                      color: COLORS.primary.main,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      ⏱️ {step.time}
                    </span>
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
                Ready to Start the Process?
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>
                Get your instant quote now. We handle all court filings and legal requirements.
              </p>
              <Link href="/pricing-calculator" style={{
                display: 'inline-block',
                background: 'white',
                color: '#059669',
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.125rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
              }}>
                💰 Get My Quote →
              </Link>
            </div>

            <RelatedResources resources={[
              {
                title: "How to Sell Process",
                description: "Learn the complete 5-step process for selling your structured settlement.",
                link: "/structured-settlement-info-hub/how-to-sell-structured-settlement"
              },
              {
                title: "What is a Structured Settlement?",
                description: "Understand the basics of structured settlements and how they work.",
                link: "/structured-settlement-info-hub/what-is-a-structured-settlement"
              }
            ]} />
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default CourtApprovalProcess;

