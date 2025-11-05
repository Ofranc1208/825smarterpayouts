/**
 * Common Mistakes When Selling - Educational Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
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
      solution: "Verify licensing with state. Check company reviews and ratings. Never pay upfront fees."
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
        title="Common Mistakes When Selling Your Settlement"
        subtitle="Learn from others' errors—protect your money and get the best deal possible"
        showCTAs={true}
      />

      <main style={{ background: COLORS.backgrounds.lightGray, minHeight: '100vh', padding: `${SPACING.unit.xl} ${SPACING.unit.md}`, boxSizing: 'border-box', width: '100%' }}>
        <div style={{
          maxWidth: SPACING.container.maxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: SPACING.unit.xl,
          boxSizing: 'border-box',
          width: '100%'
        }} className="content-grid">
          
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            {/* Introduction */}
            <section style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.large,
              padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
              marginBottom: SPACING.stack.lg,
              boxShadow: BOX_SHADOWS.medium,
              border: `1px solid ${COLORS.neutral.gray200}`
            }}>
              <h2 style={{
                ...TEXT_PRESETS.heroTitle,
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                color: COLORS.neutral.gray900,
                marginBottom: SPACING.stack.md,
                background: COLORS.titleGradients.grayToGreen,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textAlign: 'center'
              }}>
                Don't Leave Money on the Table
              </h2>
              <p style={{
                fontSize: TYPOGRAPHY.fontSize.body.medium,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                color: COLORS.text.secondary,
                marginBottom: SPACING.stack.md,
                textAlign: 'center',
                maxWidth: '700px',
                margin: `0 auto ${SPACING.stack.md}`
              }}>
                Selling a structured settlement is a <strong>one-time, irreversible decision</strong> that can cost or save you tens of thousands of dollars. The difference between a good deal and a bad one often comes down to avoiding these critical mistakes.
              </p>

              <div style={{
                background: COLORS.backgrounds.greenLight,
                border: `1px solid ${COLORS.borders.green}`,
                borderRadius: BORDER_RADIUS.medium,
                padding: SPACING.card.compact,
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.primary.main,
                  marginBottom: SPACING.stack.xs,
                  textAlign: 'center'
                }}>
                  Average Cost: $15,000 - $50,000
                </h3>
                <p style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.text.secondary,
                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                  margin: 0
                }}>
                  These mistakes have cost settlement holders hundreds of thousands collectively. Learn from them.
                </p>
              </div>
            </section>

            {/* Mistakes List */}
            <section style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.large,
              padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
              marginBottom: SPACING.stack.lg,
              boxShadow: BOX_SHADOWS.medium,
              border: `1px solid ${COLORS.neutral.gray200}`
            }}>
              <h2 style={{
                ...TEXT_PRESETS.heroTitle,
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                color: COLORS.neutral.gray900,
                marginBottom: SPACING.stack.lg,
                background: COLORS.titleGradients.grayToGreen,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textAlign: 'center'
              }}>
                The Most Expensive Mistakes
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.unit.md }}>
                {mistakes.map((mistake, index) => (
                  <div key={index} style={{
                    background: COLORS.backgrounds.lightGray,
                    borderRadius: BORDER_RADIUS.medium,
                    padding: SPACING.card.compact,
                    border: `1px solid ${COLORS.neutral.gray200}`,
                    overflow: 'hidden'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: SPACING.stack.xs }}>
                      <h3 style={{
                        fontSize: TYPOGRAPHY.fontSize.heading.h5,
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        color: COLORS.neutral.gray900,
                        margin: 0,
                        marginBottom: SPACING.unit.sm,
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}>
                        {mistake.title}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        background: COLORS.primary.main,
                        color: COLORS.backgrounds.white,
                        padding: `${SPACING.unit.xs} ${SPACING.unit.sm}`,
                        borderRadius: BORDER_RADIUS.small,
                        fontSize: TYPOGRAPHY.fontSize.body.small,
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: '100%',
                        textAlign: 'center'
                      }}>
                        Cost: {mistake.cost}
                      </span>
                    </div>

                    <div style={{ marginTop: SPACING.stack.sm }}>
                      <p style={{
                        fontSize: TYPOGRAPHY.fontSize.body.small,
                        color: COLORS.text.secondary,
                        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                        marginBottom: SPACING.stack.xs
                      }}>
                        <strong>Why It Hurts:</strong> {mistake.why}
                      </p>
                      <div style={{
                        background: COLORS.backgrounds.greenLight,
                        border: `1px solid ${COLORS.borders.green}`,
                        borderRadius: BORDER_RADIUS.small,
                        padding: SPACING.unit.sm
                      }}>
                        <strong style={{ color: COLORS.primary.main }}>Solution:</strong>{' '}
                        <span style={{ color: COLORS.text.secondary, fontSize: TYPOGRAPHY.fontSize.body.small }}>
                          {mistake.solution}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pre-Sale Checklist */}
            <section style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.large,
              padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
              marginBottom: SPACING.stack.lg,
              boxShadow: BOX_SHADOWS.medium,
              border: `1px solid ${COLORS.neutral.gray200}`
            }}>
              <h2 style={{
                ...TEXT_PRESETS.heroTitle,
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                color: COLORS.neutral.gray900,
                marginBottom: SPACING.stack.md,
                background: COLORS.titleGradients.grayToGreen,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textAlign: 'center'
              }}>
                Pre-Sale Checklist: Do This First
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.unit.xs, maxWidth: '700px', margin: '0 auto' }}>
                {[
                  'Get quotes from 3-5 companies',
                  'Compare discount rates in writing',
                  'Calculate exact cash need',
                  'Consider partial sale options',
                  'Explore all alternatives first',
                  'Consult CPA about taxes',
                  'Verify company licensing',
                  'Check company ratings and reviews',
                  'Read all contracts carefully',
                  'Create financial plan for lump sum',
                  'Prepare court approval docs',
                  'Understand all fees involved'
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: SPACING.unit.sm,
                    padding: SPACING.unit.sm,
                    background: COLORS.backgrounds.lightGray,
                    borderRadius: BORDER_RADIUS.small,
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      color: COLORS.primary.main,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      ✓
                    </span>
                    <span style={{
                      fontSize: TYPOGRAPHY.fontSize.body.small,
                      color: COLORS.text.secondary,
                      lineHeight: TYPOGRAPHY.lineHeight.relaxed
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
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

