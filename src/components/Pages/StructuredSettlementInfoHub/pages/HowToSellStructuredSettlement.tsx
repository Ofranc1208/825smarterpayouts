/**
 * How to Sell a Structured Settlement - Subpage
 * 
 * SEO-OPTIMIZED step-by-step guide
 * HIGH CONVERSION FOCUS with educational value
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  StepTimeline,
  FAQAccordion,
  RelatedResources,
  SchemaMarkup,
  CTASection
} from '../components';
import { sellingFAQs } from '../data/faqData';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils';
import type { StepItem } from '../types';

const HowToSellStructuredSettlement: React.FC = () => {
  const steps: StepItem[] = [
    {
      stepNumber: 1,
      title: 'Get Your Instant Quote',
      description: 'Start by using our free calculator to get an instant, no-obligation quote for your structured settlement payments.',
      details: [
        'Enter your payment schedule and amounts',
        'Receive multiple offer scenarios instantly',
        'Compare full sale vs. partial sale options',
        'No personal information required to see initial quotes',
        'Review transparent discount rates and fees'
      ],
      ctaLink: '/pricing-calculator',
      ctaText: 'Get Your Instant Quote →'
    },
    {
      stepNumber: 2,
      title: 'Review and Accept Your Offer',
      description: 'Once you receive your quote, our team will explain every detail to ensure you understand the transaction.',
      details: [
        'Review your total payout amount in detail',
        'Understand all fees and discount rates',
        'Explore payment method options (wire, ACH, check)',
        'Ask questions and get expert guidance',
        'No pressure - take time to make an informed decision'
      ]
    },
    {
      stepNumber: 3,
      title: 'Complete the Paperwork',
      description: 'After accepting your offer, we handle the paperwork and guide you through every document.',
      details: [
        'Transfer agreement outlining all terms',
        'Court petition for judicial approval',
        'Financial disclosure forms (required by law)',
        'Advance notice documents to all parties',
        'Independent professional advice documentation'
      ]
    },
    {
      stepNumber: 4,
      title: 'Court Approval Process',
      description: 'All structured settlement sales require court approval to protect your interests. We handle the entire process.',
      details: [
        'File petition with appropriate court',
        'Independent advisor reviews your case',
        'Attend brief court hearing (often by phone)',
        'Judge reviews and approves transaction',
        'Receive final court order authorizing sale'
      ],
      ctaLink: '/structured-settlement-info-hub/court-approval-process',
      ctaText: 'Learn About Court Approval →'
    },
    {
      stepNumber: 5,
      title: 'Receive Your Payment',
      description: 'After court approval, you receive your lump sum payment through your preferred method.',
      details: [
        'Choose wire transfer (fastest, 1-2 business days)',
        'Select direct deposit (ACH, 2-3 business days)',
        'Request paper check (5-7 business days)',
        'Funds available immediately upon receipt',
        'Use your money however you choose'
      ]
    }
  ];

  const relatedResources = [
    {
      title: 'State Laws & Requirements',
      description: 'Learn about structured settlement laws and court requirements in your specific state.',
      link: '/structured-settlement-info-hub/state-laws',
      linkText: 'View State Laws'
    },
    {
      title: 'Court Approval Process Explained',
      description: 'Detailed guide to understanding the court approval process and what judges look for.',
      link: '/structured-settlement-info-hub/court-approval-process',
      linkText: 'Learn More'
    }
  ];

  // SEO Schemas
  const articleSchema = generateArticleSchema({
    headline: "How to Sell a Structured Settlement | Step-by-Step Guide",
    description: "Learn how to sell your structured settlement legally and safely. Expert guide covering court approval, pricing, and the complete 5-step process.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement"
  });

  const faqSchema = generateFAQSchema(sellingFAQs.map(faq => ({
    question: faq.question,
    answer: typeof faq.answer === 'string' ? faq.answer : ''
  })));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "How to Sell", url: "https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement" }
  ]);

  return (
    <>
      <SchemaMarkup
        articleSchema={articleSchema}
        faqSchema={faqSchema}
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
        title="How to Sell a Structured Settlement"
        subtitle="A step-by-step guide to selling your structured settlement legally, safely, and efficiently with maximum value."
        showCTAs={true}
      />

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '48px 0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div className="content-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '2rem',
            alignItems: 'start'
          }}>
            <article>
              {/* Trust Signal */}
              <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #93c5fd',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '2.5rem' }}>🛡️</div>
                <div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '0.25rem'
                  }}>
                    Legal, Safe & Court-Approved Process
                  </div>
                  <p style={{
                    color: COLORS.text.tertiary,
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    All structured settlement sales require court approval by law. This protects you from predatory practices and ensures the transaction serves your best interest.
                  </p>
                </div>
              </div>

              {/* Overview Section */}
              <section style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1.5rem'
                }}>
                  Understanding the Process
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  fontSize: '1.0625rem'
                }}>
                  Selling your structured settlement is a legal, court-supervised process designed to protect your interests. The entire transaction typically takes <strong>30-45 days</strong> from start to finish, though timing varies by state.
                </p>

                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '1rem'
                  }}>
                    ✓ Key Points to Know
                  </h3>
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: '1.8',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li><strong>No upfront fees:</strong> All costs are disclosed in your quote and deducted from your payout</li>
                    <li><strong>Court approval required:</strong> A judge reviews every transaction to ensure it's in your best interest</li>
                    <li><strong>Professional guidance included:</strong> We help you through every step of the process</li>
                    <li><strong>Flexible options:</strong> Sell all payments, partial payments, or specific future payments</li>
                    <li><strong>No obligation:</strong> Get quotes and explore options without any commitment</li>
                  </ul>
                </div>
              </section>

              {/* INLINE CTA #1 - Before Steps */}
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                padding: '2.5rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Ready to Start? Get Your Free Quote
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  opacity: 0.95
                }}>
                  Begin the process with an instant quote. No personal information required, no obligation, just see what your settlement is worth.
                </p>
                <Link href="/pricing-calculator" style={{
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

              {/* Step-by-Step Timeline */}
              <section>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  5-Step Process to Sell Your Settlement
                </h2>
                <StepTimeline steps={steps} />
              </section>

              {/* Important Considerations */}
              <section style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1.5rem'
                }}>
                  Important Considerations Before Selling
                </h2>
                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {[
                    {
                      icon: '⚠️',
                      title: 'Discount Rates Matter',
                      description: 'You\'ll receive less than the total future value due to discount rates (typically 9-18%). Compare multiple offers to get the best rate.'
                    },
                    {
                      icon: '📊',
                      title: 'Consider Partial Sales',
                      description: 'You don\'t have to sell all payments. Partial sales let you access some cash now while keeping future income security.'
                    },
                    {
                      icon: '🏛️',
                      title: 'Court Will Review Your Need',
                      description: 'Judges want to see genuine financial need and that selling is in your best interest. Be prepared to explain your reasons.'
                    },
                    {
                      icon: '💼',
                      title: 'Independent Advice Available',
                      description: 'Many states require or recommend independent professional advice. This protects you from unfavorable transactions.'
                    }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: '1px solid #fcd34d',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'start'
                    }}>
                      <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <h3 style={{
                          fontSize: '1.0625rem',
                          fontWeight: '600',
                          color: COLORS.text.primary,
                          marginBottom: '0.5rem'
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          color: COLORS.text.secondary,
                          fontSize: '0.9375rem',
                          lineHeight: '1.7',
                          margin: 0
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <FAQAccordion
                faqs={sellingFAQs}
                title="Frequently Asked Questions About Selling"
              />

              {/* Related Resources */}
              <RelatedResources
                resources={relatedResources}
                title="Next Steps"
              />
            </article>

            <Sidebar relatedArticles={relatedArticlesMap["how-to-sell"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default HowToSellStructuredSettlement;

