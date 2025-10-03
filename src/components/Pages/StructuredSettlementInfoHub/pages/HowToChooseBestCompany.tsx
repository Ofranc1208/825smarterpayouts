/**
 * How to Choose Best Company - Buyer's Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import { HeroSection, Sidebar, RelatedResources, SchemaMarkup } from '../components';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils';

const HowToChooseBestCompany: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "How to Choose the Best Structured Settlement Company | Buyer's Guide",
    description: "10 criteria for selecting a reputable company, red flags to avoid, and questions to ask. Get the best deal possible.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Choose Best Company", url: "https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company" }
  ]);

  const criteria = [
    { title: "Licensing & Accreditation", desc: "Must be licensed in your state with proper insurance and BBB A+ rating" },
    { title: "Competitive Discount Rates", desc: "Rates should be 8-12%. Get quotes from 3-5 companies to compare" },
    { title: "Experience & Track Record", desc: "At least 5-10 years in business with hundreds of completed transactions" },
    { title: "Transparent Pricing", desc: "All fees, costs, and terms disclosed upfront in writing with no hidden charges" },
    { title: "Direct Funding Capability", desc: "Company funds directly, not a broker. Eliminates 2-4% middleman markup" },
    { title: "Customer Reviews", desc: "Consistently positive reviews on BBB, Google, Trustpilot showing good service" },
    { title: "Responsive Communication", desc: "Quick responses, knowledgeable staff, clear explanations during process" },
    { title: "Legal & Court Support", desc: "Handles all court filings with 90%+ approval rate. Knows what judges want" },
    { title: "Flexible Options", desc: "Willing to buy partial payments (3-5 years) not just full settlements" },
    { title: "No Pressure Tactics", desc: "Gives time to compare, encourages shopping around. Legitimate companies want informed customers" }
  ];

  const redFlags = [
    "Pressure tactics or urgency",
    "No physical address or phone",
    "Unlicensed in your state",
    "Upfront fees required",
    "Won't provide discount rate",
    "All negative reviews",
    "Vague contracts",
    "Refuses comparison shopping"
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

      <HeroSection
        title="🏆 How to Choose the Best Settlement Company"
        subtitle="10 criteria for selecting a reputable buyer and getting the best deal"
        showCTAs={true}
      />

      <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 1.5rem', boxSizing: 'border-box', width: '100%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', boxSizing: 'border-box', width: '100%' }} className="content-grid">
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>Why Company Selection Matters</h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
                The company you choose can make a <strong>$10,000-$30,000 difference</strong> in what you receive. Discount rates, fees, and service vary dramatically. This is a one-time decision—choose wisely.
              </p>
              <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#92400e', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>💡 Industry Reality</h3>
                <p style={{ color: '#92400e', lineHeight: '1.6', margin: 0 }}>
                  100+ companies buy settlements, but only 10-15 are truly reputable with fair rates. Many are middlemen who mark up the discount.
                </p>
              </div>
            </section>

            {/* CTA #1 */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>🛒 Compare Top Companies Instantly</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Get quotes from vetted companies in 60 seconds. See who offers the best rates.</p>
              <Link href="/pricing-calculator" style={{ display: 'inline-block', background: 'white', color: COLORS.primary.main, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>💰 Compare Quotes →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>10 Criteria for Best Company</h2>
              {criteria.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < criteria.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ background: COLORS.primary.main, color: 'white', fontSize: '1.125rem', fontWeight: '700', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', flexShrink: 0 }}>{index + 1}</div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: '#6b7280', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* CTA #2 */}
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>🤖 Need Help Evaluating Companies?</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Chat with Mint AI about specific companies you're considering. Get instant guidance on licensing, rates, reputation.</p>
              <Link href="/chat" style={{ display: 'inline-block', background: 'white', color: COLORS.accent.purple, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>💬 Chat with Mint AI →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>🚩 Red Flags: Walk Away If You See These</h2>
              {redFlags.map((flag, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', marginBottom: '0.5rem', background: '#fee2e2', border: '2px solid #ef4444', borderRadius: '8px' }}>
                  <span style={{ color: '#991b1b', fontSize: '1.25rem', fontWeight: '700' }}>✗</span>
                  <span style={{ color: '#991b1b', fontWeight: '600' }}>{flag}</span>
                </div>
              ))}
            </section>

            <RelatedResources resources={[
              { title: "Common Mistakes", description: "Avoid costly errors when selling your structured settlement.", link: "/structured-settlement-info-hub/common-mistakes-selling-structured-settlement" },
              { title: "Maximize Your Offer", description: "12 strategies to get the best possible price for your settlement.", link: "/structured-settlement-info-hub/maximize-offer-selling-structured-settlement" }
            ]} />
          </div>

          <div className="sidebar"><Sidebar /></div>
        </div>
      </main>
    </>
  );
};

export default HowToChooseBestCompany;

