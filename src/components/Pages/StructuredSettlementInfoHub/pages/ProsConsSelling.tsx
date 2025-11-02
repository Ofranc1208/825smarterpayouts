/**
 * Pros & Cons of Selling Structured Settlement
 * 
 * BALANCED, SEO-OPTIMIZED guide with HEAVY CTA placement
 * Multiple conversion opportunities throughout content
 * NO CSS FILES - All inline styling
 */

'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/src/components/shared/Button';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  FAQAccordion,
  RelatedResources,
  SchemaMarkup,
  CTASection
} from '../components';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils';

const ProsConsSelling: React.FC = () => {
  const faqs = [
    {
      question: "What are the main benefits of selling a structured settlement?",
      answer: "The main benefits include immediate access to cash for emergencies or investments, flexibility to pay off high-interest debt, ability to handle large expenses like medical bills or education, and freedom from waiting for periodic payments."
    },
    {
      question: "What are the risks or downsides of selling?",
      answer: "Potential downsides include receiving less than the total value due to discount rates (typically 9-18%), losing guaranteed future income, possible impact on government benefits, and the irreversible nature of the transaction once approved."
    },
    {
      question: "How do I know if selling is right for me?",
      answer: "Consider selling if you have genuine financial need, high-interest debt to eliminate, investment opportunities with higher returns, or major life expenses. Avoid selling if you rely on payments for living expenses or have no clear financial plan for the lump sum."
    }
  ];

  const relatedResources = [
    {
      title: "Alternatives to Selling",
      description: "Explore other options like structured settlement loans or partial sales that may better fit your needs.",
      link: "/structured-settlement-info-hub/alternatives-to-selling-structured-settlement"
    },
    {
      title: "How to Maximize Your Offer",
      description: "Learn strategies to get the best possible price when selling your structured settlement.",
      link: "/structured-settlement-info-hub/maximize-offer-selling-structured-settlement"
    }
  ];

  // Schemas
  const articleSchema = generateArticleSchema({
    headline: "Pros and Cons of Selling a Structured Settlement | Balanced Guide",
    description: "Weigh the advantages and disadvantages of selling your structured settlement. Expert insights on benefits, risks, and making an informed decision.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement"
  });

  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Pros & Cons", url: "https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement" }
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
          @media (max-width: 1024px) {
            .content-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .sidebar {
              position: static !important;
              width: 100% !important;
              max-width: 100% !important;
            }
          }
          @media (max-width: 768px) {
            .content-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
            .sidebar {
              position: static !important;
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `
      }} />

      <HeroSection
        title="⚖️ Pros & Cons of Selling Your Structured Settlement"
        subtitle="Make an informed decision by understanding both the advantages and disadvantages of selling your structured settlement payments."
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
            {/* Main Content */}
            <article style={{
              minWidth: 0,
              width: '100%'
            }}>
              {/* Introduction */}
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
                  Making an Informed Decision
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  fontSize: '1.0625rem',
                  marginBottom: '1.5rem'
                }}>
                  Selling your structured settlement is a major financial decision that can significantly impact your future. While it provides immediate access to cash, it also means giving up guaranteed future income. Understanding both sides helps you make the right choice for your situation.
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #93c5fd'
                }}>
                  <p style={{
                    color: COLORS.text.secondary,
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    💡 <strong>Key Insight:</strong> There's no universal "right" answer. The decision depends on your unique financial situation, goals, and needs. This guide helps you evaluate what's best for YOU.
                  </p>
                </div>
              </section>

              {/* PROS Section */}
              <section style={{
                background: 'white',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: COLORS.primary.main,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  Advantages of Selling
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      title: '💰 Immediate Access to Large Lump Sum',
                      benefits: [
                        'Handle emergency expenses (medical bills, urgent home repairs)',
                        'Pay off high-interest credit card debt or loans',
                        'Make down payment on a home or vehicle',
                        'Cover major life events (wedding, education)',
                        'Access funds when you need them most'
                      ]
                    },
                    {
                      title: '📈 Investment Opportunities',
                      benefits: [
                        'Invest in business ventures or startup costs',
                        'Purchase income-generating real estate',
                        'Start or grow a retirement account',
                        'Potentially earn higher returns than your discount rate',
                        'Build wealth through strategic investments'
                      ]
                    },
                    {
                      title: '🎯 Financial Flexibility',
                      benefits: [
                        'Control when and how you use your money',
                        'Consolidate multiple debts into one manageable payment',
                        'Improve credit score by eliminating debt',
                        'Create your own financial plan without constraints',
                        'Freedom to adapt to changing circumstances'
                      ]
                    },
                    {
                      title: '⚡ Eliminate Financial Stress',
                      benefits: [
                        'Stop waiting for monthly or annual payments',
                        'End anxiety about managing limited income',
                        'Handle unexpected financial emergencies',
                        'Peace of mind with accessible funds',
                        'Simplify your financial situation'
                      ]
                    }
                  ].map((pro, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #a7f3d0'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: COLORS.text.primary,
                        marginBottom: '0.75rem'
                      }}>
                        {pro.title}
                      </h3>
                      <ul style={{
                        color: COLORS.text.secondary,
                        lineHeight: '1.6',
                        paddingLeft: '1.5rem',
                        margin: 0
                      }}>
                        {pro.benefits.map((benefit, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* INLINE CTA after pros */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                textAlign: 'center',
                border: '1px solid #d1fae5'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  See What Your Settlement is Worth Today
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  color: COLORS.text.secondary
                }}>
                  Get an instant, no-obligation quote in 60 seconds. See multiple scenarios and compare your options.
                </p>
                <Button
                  as="a"
                  href="/mint-chat-active?type=calculate"
                  variant="technology-primary"
                  size="sm"
                  enhancedHover={true}
                  shimmer={true}
                >
                  💰 Calculate My Offer Now →
                </Button>
              </div>

              {/* CONS Section */}
              <section style={{
                background: 'white',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#dc2626',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                  Disadvantages & Risks
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      title: '💸 Receive Less Than Total Value',
                      risks: [
                        'Discount rates typically range from 9-18%',
                        'You\'ll get 60-85% of total future payments',
                        'Time value of money calculation reduces your payout',
                        'The longer the payment period, the lower the offer',
                        'Cannot get 100% of future value in any scenario'
                      ]
                    },
                    {
                      title: '📉 Loss of Guaranteed Future Income',
                      risks: [
                        'No more regular periodic payments for living expenses',
                        'Give up tax-free income stream',
                        'Lose financial security for retirement or long-term needs',
                        'Cannot reverse the decision once court-approved',
                        'May regret selling if lump sum is mismanaged'
                      ]
                    },
                    {
                      title: '🏛️ Government Benefits Impact',
                      risks: [
                        'Large lump sum may affect SSI or Medicaid eligibility',
                        'Could disqualify you from needs-based assistance',
                        'May push income over benefit thresholds',
                        'Requires careful planning to avoid losing benefits',
                        'Consult benefits advisor before selling'
                      ]
                    },
                    {
                      title: '🎲 Mismanagement Risk',
                      risks: [
                        'Statistics show many people spend lump sums quickly',
                        'Without financial discipline, money can disappear fast',
                        'May face pressure from family/friends for money',
                        'No built-in spending controls like periodic payments',
                        'Should have solid financial plan before selling'
                      ]
                    }
                  ].map((con, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #fecaca'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: COLORS.text.primary,
                        marginBottom: '0.75rem'
                      }}>
                        {con.title}
                      </h3>
                      <ul style={{
                        color: COLORS.text.secondary,
                        lineHeight: '1.6',
                        paddingLeft: '1.5rem',
                        margin: 0
                      }}>
                        {con.risks.map((risk, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* INLINE CTA after cons - Chat with AI */}
              <div style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                textAlign: 'center',
                border: '1px solid #e9d5ff'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  Not Sure if Selling is Right for You?
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  color: COLORS.text.secondary
                }}>
                  Chat with Mint AI to explore your options, understand alternatives, and get personalized guidance 24/7.
                </p>
                <Button
                  as="a"
                  href="/mint-intelligent-chat"
                  variant="mint-chat"
                  size="sm"
                  enhancedHover={true}
                  shimmer={true}
                  shimmerDelay={1}
                >
                  💬 Get Free AI Guidance →
                </Button>
              </div>

              {/* Decision Framework */}
              <section style={{
                background: 'white',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1.25rem'
                }}>
                  When Selling Makes Sense
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #a7f3d0',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '0.75rem'
                  }}>
                    ✅ Good Reasons to Sell:
                  </h3>
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: '1.6',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>Eliminating high-interest debt (credit cards, payday loans)</li>
                    <li style={{ marginBottom: '0.5rem' }}>Emergency medical expenses not covered by insurance</li>
                    <li style={{ marginBottom: '0.5rem' }}>Business investment with clear ROI projections</li>
                    <li style={{ marginBottom: '0.5rem' }}>Education costs for yourself or dependents</li>
                    <li style={{ marginBottom: '0.5rem' }}>Down payment on income-generating property</li>
                    <li style={{ marginBottom: '0.5rem' }}>You have other reliable income sources</li>
                    <li style={{ marginBottom: '0.5rem' }}>You have a detailed financial plan for the funds</li>
                  </ul>
                </div>

                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1.25rem'
                }}>
                  When to Avoid Selling
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #fecaca'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '0.75rem'
                  }}>
                    ⛔ Poor Reasons to Sell:
                  </h3>
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: '1.6',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li style={{ marginBottom: '0.5rem' }}>Non-essential luxury purchases (vacations, vehicles, etc.)</li>
                    <li style={{ marginBottom: '0.5rem' }}>Pressure from family or friends to access money</li>
                    <li style={{ marginBottom: '0.5rem' }}>Gambling or speculative investments</li>
                    <li style={{ marginBottom: '0.5rem' }}>No clear plan for how to use the funds</li>
                    <li style={{ marginBottom: '0.5rem' }}>You depend on payments for basic living expenses</li>
                    <li style={{ marginBottom: '0.5rem' }}>Receiving government benefits that could be affected</li>
                    <li style={{ marginBottom: '0.5rem' }}>Acting out of impatience rather than genuine need</li>
                  </ul>
                </div>
              </section>

              {/* FAQ */}
              <FAQAccordion faqs={faqs} title="Common Questions About Pros & Cons" />

              {/* Related Resources */}
              <RelatedResources resources={relatedResources} />
            </article>

            <Sidebar relatedArticles={relatedArticlesMap["pros-cons"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default ProsConsSelling;

