/**
 * Maximize Your Offer - Strategy Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import { HeroSection, Sidebar, RelatedResources, SchemaMarkup } from '../components';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils';

const MaximizeOffer: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "How to Maximize Your Structured Settlement Offer | 12 Strategies",
    description: "12 proven strategies to get the best price. Worth $10,000-$30,000 in extra value. Expert negotiation tactics.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/maximize-offer-selling-structured-settlement"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Maximize Offer", url: "https://smarterpayouts.com/structured-settlement-info-hub/maximize-offer-selling-structured-settlement" }
  ]);

  const strategies = [
    { title: "Shop Around Aggressively", impact: "$10,000-$25,000", desc: "Get quotes from 5+ companies. Competition drives up offers by 10-20%." },
    { title: "Understand Your True Value", impact: "$5,000-$15,000", desc: "Calculate present value yourself. Know fair rates to spot lowball offers instantly." },
    { title: "Sell Only What You Need", impact: "$8,000-$20,000", desc: "Near-term payments (0-5 years) get better rates. Minimize discount by selling partial." },
    { title: "Negotiate the Discount Rate", impact: "$5,000-$15,000", desc: "1% discount rate = $3,000-$8,000 difference. Focus on lowering the rate." },
    { title: "Eliminate Middlemen", impact: "$5,000-$12,000", desc: "Work with direct funders, not brokers. Brokers add 2-4% markup." },
    { title: "Improve Your Court Case", impact: "$2,000-$8,000", desc: "Strong case = higher approval odds = better rates from companies." },
    { title: "Time Your Sale Strategically", impact: "$3,000-$10,000", desc: "Q1-Q2 when companies compete for business. Avoid Nov-Dec (year-end capacity)." },
    { title: "Be Willing to Walk Away", impact: "$5,000-$20,000", desc: "Your strongest tool. If no fair offers, wait 3-6 months for better market." }
  ];

  return (
    <>
      <SchemaMarkup articleSchema={articleSchema} breadcrumbSchema={breadcrumbSchema} />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box !important; }
        body, html { margin: 0 !important; padding: 0 !important; }
        @media (max-width: 768px) { 
          .content-grid { grid-template-columns: 1fr !important; } 
          .sidebar { position: static !important; width: 100% !important; } 
        }
      ` }} />

      <HeroSection title="How to Maximize Your Settlement Offer" subtitle="Proven strategies to get the best possible price" showCTAs={true} />

      <main style={{ background: COLORS.backgrounds.lightGray, minHeight: '100vh', padding: `${SPACING.unit.xl} ${SPACING.unit.md}`, boxSizing: 'border-box', width: '100%' }}>
        <div style={{ maxWidth: SPACING.container.maxWidth, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: SPACING.unit.xl, boxSizing: 'border-box', width: '100%' }} className="content-grid">
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            <section style={{ background: COLORS.backgrounds.white, borderRadius: BORDER_RADIUS.large, padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`, marginBottom: SPACING.stack.lg, boxShadow: BOX_SHADOWS.medium, border: `1px solid ${COLORS.neutral.gray200}` }}>
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
                The $10,000-$30,000 Question
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
                Two people with identical settlements can receive offers differing by <strong>$10,000 to $30,000</strong>. The difference? Knowledge and negotiation.
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
                  Real Impact
                </h3>
                <p style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.text.secondary,
                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                  margin: 0
                }}>
                  On a $250,000 settlement, reducing discount from 12% to 9% increases payout by ~$15,000. Every point matters.
                </p>
              </div>
            </section>

            <section style={{ background: COLORS.backgrounds.white, borderRadius: BORDER_RADIUS.large, padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`, marginBottom: SPACING.stack.lg, boxShadow: BOX_SHADOWS.medium, border: `1px solid ${COLORS.neutral.gray200}` }}>
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
                Key Strategies to Maximize
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.unit.md }}>
                {strategies.map((s, i) => (
                  <div key={i} style={{
                    background: COLORS.backgrounds.lightGray,
                    borderRadius: BORDER_RADIUS.medium,
                    padding: SPACING.card.compact,
                    border: `1px solid ${COLORS.neutral.gray200}`,
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.stack.xs, gap: SPACING.unit.md, flexWrap: 'wrap' }}>
                      <h3 style={{
                        fontSize: TYPOGRAPHY.fontSize.heading.h5,
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        color: COLORS.neutral.gray900,
                        flex: 1,
                        minWidth: '200px'
                      }}>
                        {i + 1}. {s.title}
                      </h3>
                      <span style={{
                        background: COLORS.primary.main,
                        color: COLORS.backgrounds.white,
                        padding: `${SPACING.unit.xs} ${SPACING.unit.sm}`,
                        borderRadius: BORDER_RADIUS.small,
                        fontSize: TYPOGRAPHY.fontSize.body.small,
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {s.impact}
                      </span>
                    </div>
                    <p style={{
                      fontSize: TYPOGRAPHY.fontSize.body.small,
                      color: COLORS.text.secondary,
                      lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                      margin: 0
                    }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: COLORS.backgrounds.white, borderRadius: BORDER_RADIUS.large, padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`, marginBottom: SPACING.stack.lg, boxShadow: BOX_SHADOWS.medium, border: `1px solid ${COLORS.neutral.gray200}` }}>
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
                Real Success Story
              </h2>
              <div style={{
                background: COLORS.backgrounds.lightGray,
                border: `1px solid ${COLORS.neutral.gray200}`,
                borderRadius: BORDER_RADIUS.medium,
                padding: SPACING.card.standard,
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <h4 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.neutral.gray900,
                  marginBottom: SPACING.stack.sm,
                  textAlign: 'center'
                }}>
                  Sarah's $22,000 Improvement
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.unit.sm }}>
                  <p style={{
                    fontSize: TYPOGRAPHY.fontSize.body.small,
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    margin: 0
                  }}>
                    <strong>Initial:</strong> $275,000 in payments. Needed $80,000. First offer: $78,000 at 12% (terrible deal).
                  </p>
                  <p style={{
                    fontSize: TYPOGRAPHY.fontSize.body.small,
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    margin: 0
                  }}>
                    <strong>Actions:</strong> Got 5 more quotes, calculated fair value, proposed partial sale (5 years only), prepared business plan, negotiated.
                  </p>
                  <p style={{
                    fontSize: TYPOGRAPHY.fontSize.body.small,
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    margin: 0
                  }}>
                    <strong style={{ color: COLORS.primary.main }}>Result:</strong> $88,000 for 6 years at 9.2%. <strong>$22,000 better + kept $120,000 future value!</strong>
                  </p>
                </div>
              </div>
            </section>

            <RelatedResources resources={[
              { title: "How to Choose Best Company", description: "10 criteria for selecting a reputable buyer.", link: "/structured-settlement-info-hub/how-to-choose-best-company" },
              { title: "Common Mistakes", description: "Avoid costly errors that reduce your offer.", link: "/structured-settlement-info-hub/common-mistakes-selling-structured-settlement" }
            ]} />
          </div>

          <div className="sidebar"><Sidebar /></div>
        </div>
      </main>
    </>
  );
};

export default MaximizeOffer;

