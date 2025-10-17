/**
 * After You Sell - Financial Planning Guide
 * Rich SEO content, heavy CTA placement
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import { HeroSection, Sidebar, RelatedResources, SchemaMarkup } from '../components';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils';

const AfterYouSell: React.FC = () => {
  const articleSchema = generateArticleSchema({
    headline: "After You Sell Your Structured Settlement | Financial Planning Guide",
    description: "90-day plan, smart allocation, avoiding mistakes. Make your lump sum last. Expert financial advice.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "After You Sell", url: "https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement" }
  ]);

  const mistakes = [
    { title: "Buying depreciating assets", why: "New cars, boats lose value instantly. Wait 90 days." },
    { title: "Lending to friends/family", why: "80% never repaid. Ruins relationships and finances." },
    { title: "Quitting job without plan", why: "Even $100k runs out faster than expected." },
    { title: "Ignoring taxes", why: "Lump sums can affect SSI, Medicaid. Consult CPA." },
    { title: "Investing in unknowns", why: "Scammers target windfall recipients. Stick to proven investments." },
    { title: "Lifestyle inflation", why: "Upgrading everything depletes money fast." },
    { title: "Not having financial plan", why: "70% spend it within 5 years without plan." }
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

      <HeroSection title="🎯 After You Sell: Making Your Lump Sum Last" subtitle="90-day plan and strategies to avoid common pitfalls" showCTAs={true} />

      <main style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 1.5rem', boxSizing: 'border-box', width: '100%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', boxSizing: 'border-box', width: '100%' }} className="content-grid">
          <div style={{ minWidth: 0, boxSizing: 'border-box' }}>
            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>The Critical First 90 Days</h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '1.5rem' }}>
                Studies show <strong>70% of windfall recipients lose it within 5 years</strong>. Decisions in first 90 days determine whether you're in successful 30% or regretful 70%.
              </p>
              <div style={{ background: '#fee2e2', border: '2px solid #ef4444', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ color: '#991b1b', fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem' }}>⚠️ The 90-Day Rule</h3>
                <p style={{ color: '#991b1b', lineHeight: '1.6', margin: 0 }}>Do NOT make major purchases for 90 days. Give yourself time to plan. Rushed decisions = regret.</p>
              </div>
            </section>

            {/* CTA #1 */}
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>💬 Get Personalized Financial Advice</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Chat with Mint AI about managing your lump sum and avoiding pitfalls. 24/7 guidance.</p>
              <Link href="/chat" style={{ display: 'inline-block', background: 'white', color: COLORS.accent.purple, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>🤖 Chat with Mint AI →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>Immediate Actions (Week 1)</h2>
              {[
                { action: "Deposit in secure account", desc: "High-yield savings (4-5% APY), NOT checking" },
                { action: "Tell almost no one", desc: "More people know = more requests for money" },
                { action: "Pay off high-interest debt ONLY", desc: "Credit cards 15%+. Hold mortgages until full plan" },
                { action: "Create 6-month emergency fund", desc: "Set aside in separate savings for protection" },
                { action: "Schedule financial advisor", desc: "Fee-only CFP ($2k-$5k) and CPA ($500-$2k)" }
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: COLORS.primary.main, marginBottom: '0.5rem' }}>{i + 1}. {item.action}</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </section>

            {/* CTA #2 */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', padding: '2.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Haven't Sold Yet? Get Your Quote</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: 0.95 }}>Planning is important, but starts with knowing your options. Get instant quote.</p>
              <Link href="/mint-chat-active?type=calculate&source=info-hub-after" style={{ display: 'inline-block', background: 'white', color: COLORS.primary.main, padding: '1rem 2.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '1.125rem', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>💰 Get Your Quote →</Link>
            </div>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>Smart Money Allocation</h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#374151', marginBottom: '2rem' }}>Proven 20/30/50 framework:</p>

              {[
                { bucket: "🚨 Immediate (0-1 year)", percent: "20-30%", uses: "High-interest debt, emergency fund, immediate expenses, advisor fees", account: "High-yield savings 4-5%" },
                { bucket: "📊 Medium-Term (1-5 years)", percent: "20-30%", uses: "Home down payment, vehicle, education, business, improvements", account: "CDs, bonds, conservative investments" },
                { bucket: "🌱 Long-Term (5+ years)", percent: "40-50%", uses: "Retirement, college fund, real estate, stock portfolio, wealth building", account: "IRAs, index funds, diversified investments" }
              ].map((b, i) => (
                <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < 2 ? '2px solid #e5e7eb' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>{b.bucket}</h3>
                    <span style={{ background: COLORS.primary.main, color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '700' }}>{b.percent}</span>
                  </div>
                  <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.7' }}><strong>Uses:</strong> {b.uses}</p>
                  <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.7' }}><strong>Where:</strong> {b.account}</p>
                </div>
              ))}
            </section>

            <section style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>7 Biggest Mistakes to Avoid</h2>
              {mistakes.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', marginBottom: '0.5rem', background: '#fee2e2', border: '2px solid #ef4444', borderRadius: '8px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#991b1b', fontWeight: '700' }}>✗</span>
                  <div>
                    <strong style={{ color: '#991b1b', fontSize: '1.0625rem' }}>{m.title}</strong>
                    <p style={{ color: '#991b1b', margin: '0.25rem 0 0 0', fontSize: '0.9375rem' }}>{m.why}</p>
                  </div>
                </div>
              ))}
            </section>

            <RelatedResources resources={[
              { title: "Maximize Your Offer", description: "12 strategies to get best price before you sell.", link: "/structured-settlement-info-hub/maximize-offer-selling-structured-settlement" },
              { title: "Common Mistakes", description: "Avoid costly errors when selling your settlement.", link: "/structured-settlement-info-hub/common-mistakes-selling-structured-settlement" }
            ]} />
          </div>

          <div className="sidebar"><Sidebar /></div>
        </div>
      </main>
    </>
  );
};

export default AfterYouSell;

