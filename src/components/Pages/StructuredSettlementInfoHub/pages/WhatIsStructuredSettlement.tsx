/**
 * What is a Structured Settlement? - Subpage
 * 
 * SEO-OPTIMIZED comprehensive guide
 * NO CSS FILES - All inline styling
 * Maximum educational value and SEO impact
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  FAQAccordion,
  RelatedResources,
  SchemaMarkup,
  CTASection
} from '../components';
import { generalFAQs } from '../data/faqData';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils';

const WhatIsStructuredSettlement: React.FC = () => {
  // Schema markup for maximum SEO
  const articleSchema = generateArticleSchema({
    headline: "What is a Structured Settlement? | Complete Guide",
    description: "Learn what a structured settlement is, how it works, and your options. Expert guide covering tax benefits, payment schedules, and selling your settlement.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement"
  });

  const faqSchema = generateFAQSchema(generalFAQs.map(faq => ({
    question: faq.question,
    answer: typeof faq.answer === 'string' ? faq.answer : ''
  })));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "What is a Structured Settlement?", url: "https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement" }
  ]);

  const relatedResources = [
    {
      title: "How to Sell Your Structured Settlement",
      description: "Step-by-step guide to selling your structured settlement payments legally and safely.",
      link: "/structured-settlement-info-hub/how-to-sell-structured-settlement",
      linkText: "Read Guide"
    },
    {
      title: "State Laws & Requirements",
      description: "Review structured settlement laws and court approval requirements in your state.",
      link: "/structured-settlement-info-hub/state-laws",
      linkText: "View State Laws"
    }
  ];

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
        title="What is a Structured Settlement?"
        subtitle="A comprehensive guide to understanding structured settlements, how they work, and your options for managing your payments."
        showCTAs={false}
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
            <article>
              {/* Last Updated Badge */}
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                marginBottom: '2rem',
                display: 'inline-block',
                color: COLORS.primary.dark,
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                ✓ Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>

              {/* Introduction Section */}
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
                  Understanding Structured Settlements
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  fontSize: '1.0625rem'
                }}>
                  A <strong>structured settlement</strong> is a financial arrangement where you receive periodic payments over time instead of a single lump sum, typically resulting from a personal injury lawsuit, workers' compensation claim, or insurance settlement. These payments are designed to provide long-term financial security and are protected by federal and state laws.
                </p>
                
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    ✅ Key Benefits of Structured Settlements
                  </h3>
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: '1.8',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li><strong>Tax-Free Payments:</strong> Under IRC Section 104(a)(2), payments for physical injury or sickness are excluded from federal income tax</li>
                    <li><strong>Court-Approved Security:</strong> Payments are guaranteed by highly-rated insurance companies with A- or better A.M. Best ratings</li>
                    <li><strong>Customized Schedule:</strong> Payment plans tailored to your specific needs and life circumstances</li>
                    <li><strong>Protected from Market Volatility:</strong> Payments are unaffected by stock market fluctuations or economic downturns</li>
                    <li><strong>Creditor Protection:</strong> In many states, structured settlement payments are protected from creditors and lawsuits</li>
                  </ul>
                </div>
              </section>

              {/* How They Work Section */}
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
                  How Structured Settlements Work
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  fontSize: '1.0625rem'
                }}>
                  When you receive a structured settlement, your settlement amount is converted into a series of guaranteed payments funded through an annuity. Here's how the process works:
                </p>

                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {[
                    {
                      step: '1',
                      title: 'Settlement Agreement',
                      description: 'After resolving your case, you and the defendant agree to a structured settlement instead of a lump sum payment. This is typically recommended by attorneys for large settlements.'
                    },
                    {
                      step: '2',
                      title: 'Annuity Purchase',
                      description: 'The defendant (or their insurance company) purchases an annuity from a highly-rated life insurance company. This annuity becomes the funding source for your payments.'
                    },
                    {
                      step: '3',
                      title: 'Payment Schedule Design',
                      description: 'Your payment schedule is customized based on your needs. You can choose monthly, quarterly, annual payments, or a combination. You can also schedule lump sums for specific future dates (college, retirement, etc.).'
                    },
                    {
                      step: '4',
                      title: 'Guaranteed Payments Begin',
                      description: 'Once the annuity is in place, you begin receiving tax-free payments according to your agreed-upon schedule. These payments continue regardless of market conditions.'
                    }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {item.step}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: COLORS.text.primary,
                          marginBottom: '0.5rem'
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          color: COLORS.text.tertiary,
                          lineHeight: '1.7',
                          margin: 0,
                          fontSize: '0.9375rem'
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* INLINE CTA #1 - After How They Work */}
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
                  Considering Selling Your Structured Settlement?
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  opacity: 0.95
                }}>
                  Get an instant, no-obligation quote to see what your payments are worth today. Takes less than 60 seconds.
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
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}>
                  💰 Calculate Your Offer Now →
                </Link>
              </div>

              {/* Payment Schedule Options */}
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
                  Payment Schedule Options
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  marginBottom: '1.5rem',
                  fontSize: '1.0625rem'
                }}>
                  Structured settlements can be customized to meet your specific financial needs:
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {[
                    { icon: '📅', title: 'Monthly Payments', desc: 'Regular income for living expenses and bills' },
                    { icon: '📆', title: 'Annual Payments', desc: 'Larger payments once per year for major expenses' },
                    { icon: '💰', title: 'Lump Sum + Payments', desc: 'Immediate cash plus future periodic payments' },
                    { icon: '🎓', title: 'Future Lump Sums', desc: 'Scheduled payments for college, retirement, etc.' },
                    { icon: '⏰', title: 'Life Contingent', desc: 'Payments continue for your entire lifetime' },
                    { icon: '📊', title: 'Period Certain', desc: 'Fixed payments for a specified number of years' }
                  ].map((option, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: '1px solid #bbf7d0',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{option.icon}</div>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: COLORS.text.primary,
                        marginBottom: '0.5rem'
                      }}>
                        {option.title}
                      </h3>
                      <p style={{
                        color: COLORS.text.tertiary,
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {option.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* INLINE CTA #2 - Before FAQ */}
              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
                  Have Questions? Get Instant Answers
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  opacity: 0.95
                }}>
                  Chat with Mint AI for personalized guidance about your structured settlement, selling options, and financial decisions.
                </p>
                <Link href="/mint-intelligent-chat" style={{
                  display: 'inline-block',
                  background: 'white',
                  color: '#7c3aed',
                  padding: '1rem 2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}>
                  💬 Chat with Mint AI Now →
                </Link>
              </div>

              {/* FAQ Section */}
              <FAQAccordion
                faqs={generalFAQs}
                title="Common Questions About Structured Settlements"
              />

              {/* Related Resources */}
              <RelatedResources
                resources={relatedResources}
                title="Continue Learning"
              />
            </article>

            {/* Sidebar */}
            <Sidebar relatedArticles={relatedArticlesMap["what-is"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default WhatIsStructuredSettlement;

