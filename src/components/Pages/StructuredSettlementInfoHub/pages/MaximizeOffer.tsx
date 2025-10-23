/**
 * Maximize Your Offer - Strategy Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
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

      <HeroSection title="📈 How to Maximize Your Settlement Offer" subtitle="12 proven strategies to get the best possible price" showCTAs={true} />

      <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 1.5rem', boxSizing: 'border-box', width: '100%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', boxSizing: 'border-box', width: '100%' }} className="content-grid">
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>The $10,000-$30,000 Question</h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
                Two people with identical settlements can receive offers differing by <strong>$10,000 to $30,000</strong>. The difference? Knowledge and negotiation.
              </p>
              <div style={{ background: '#d1fae5', border: '2px solid #10b981', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#065f46', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>💰 Real Impact</h3>
                <p style={{ color: '#047857', lineHeight: '1.6', margin: 0 }}>On a $250,000 settlement, reducing discount from 12% to 9% increases payout by ~$15,000. Every point matters.</p>
              </div>
            </section>

            {/* CTA #1 */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Start with Strategy #1: Get Multiple Quotes</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>The most effective way to maximize: compare companies. Get competitive quotes now.</p>
              <Link href="/mint-chat-active?type=calculate" style={{ display: 'inline-block', background: 'white', color: COLORS.primary.main, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>💸 Compare Quotes →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>8 Key Strategies to Maximize</h2>
              {strategies.map((s, i) => (
                <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < strategies.length - 1 ? '2px solid #e5e7eb' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', flex: 1 }}>{i + 1}. {s.title}</h3>
                    <span style={{ background: COLORS.primary.main, color: 'white', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.8125rem', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>{s.impact}</span>
                  </div>
                  <p style={{ color: '#6b7280', lineHeight: '1.7' }}>{s.desc}</p>
                </div>
              ))}
            </section>

            {/* CTA #2 */}
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
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
                Need Personalized Strategy?
              </h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Chat with Mint AI for tailored advice on maximizing your specific settlement offer.</p>
              <Link href="/chat" style={{ display: 'inline-block', background: 'white', color: COLORS.accent.purple, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>💬 Get Strategy Help →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>Real Success Story</h2>
              <div style={{ background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '12px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e40af', marginBottom: '1rem' }}>📖 Sarah's $22,000 Improvement</h4>
                <p style={{ color: '#1e3a8a', lineHeight: '1.8', marginBottom: '1rem' }}>
                  <strong>Initial:</strong> $275,000 in payments. Needed $80,000. First offer: $78,000 at 12% (terrible deal).
                </p>
                <p style={{ color: '#1e3a8a', lineHeight: '1.8', marginBottom: '1rem' }}>
                  <strong>Actions:</strong> Got 5 more quotes, calculated fair value, proposed partial sale (5 years only), prepared business plan, negotiated.
                </p>
                <p style={{ color: '#1e3a8a', lineHeight: '1.8', margin: 0 }}>
                  <strong style={{ color: COLORS.primary.main, fontSize: '1.125rem' }}>Result:</strong> $88,000 for 6 years at 9.2%. <strong>$22,000 better + kept $120,000 future value!</strong>
                </p>
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

