/**
 * State Laws & Requirements Page
 * 
 * SEO-OPTIMIZED state-by-state legal information
 * 20+ states with detailed requirements
 * NO CSS FILES - All inline styling
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  SchemaMarkup,
  CTASection
} from '../components';
import { statesData } from '../data/stateData';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '../utils';

const StateLaws: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');

  const stateToShow = selectedState ? statesData.find(s => s.abbreviation === selectedState) : null;

  const articleSchema = generateArticleSchema({
    headline: "State-by-State Structured Settlement Laws & Requirements",
    description: "Comprehensive guide to structured settlement laws by state. Court approval requirements, timelines, and consumer protections.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/state-laws"
  });

  const faqSchema = generateFAQSchema([
    {
      question: "Do all states require court approval to sell a structured settlement?",
      answer: "Yes, all states require court approval, but the process and requirements vary. Some states have additional consumer protections or unique steps."
    },
    {
      question: "How long does the process take in my state?",
      answer: "The timeline varies by state, but most take 30-60 days from application to payment. Some states have faster or slower court schedules."
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "State Laws", url: "https://smarterpayouts.com/structured-settlement-info-hub/state-laws" }
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
            .state-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .state-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `
      }} />

      <HeroSection
        title="⚖️ State Laws & Requirements"
        subtitle="Explore state-specific laws and regulations for selling structured settlements. Find requirements, timelines, and court approval details for your state."
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
            <article>
              {/* Overview */}
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
                  Understanding State Requirements
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  fontSize: '1.0625rem',
                  marginBottom: '1.5rem'
                }}>
                  All 50 states require court approval for structured settlement transfers under the Structured Settlement Protection Acts (SSPAs). However, specific requirements, timelines, and consumer protections vary significantly by state.
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #93c5fd'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '1rem'
                  }}>
                    🛡️ Why Court Approval is Required
                  </h3>
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: '1.8',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li>Protect consumers from predatory practices and excessive discount rates</li>
                    <li>Ensure the transaction serves the seller's best financial interest</li>
                    <li>Verify no undue pressure, fraud, or coercion in the sale</li>
                    <li>Review the adequacy of the purchase price and financial need</li>
                    <li>Confirm the seller understands the terms and consequences</li>
                  </ul>
                </div>
              </section>

              {/* State Selector */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <label htmlFor="state-select" style={{
                  display: 'block',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  📍 Select Your State
                </label>
                <select
                  id="state-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1.25rem',
                    fontSize: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    color: COLORS.text.primary,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="">-- Choose a state --</option>
                  {statesData.map(state => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* INLINE CTA - After state selector, before details */}
              {!stateToShow && (
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
                    Ready to Sell? Get Your Instant Quote
                  </h3>
                  <p style={{
                    fontSize: '1.0625rem',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    opacity: 0.95
                  }}>
                    See what your structured settlement is worth in your state. Free quote, no obligation.
                  </p>
                  <Link href="/mint-chat-active?type=calculate" style={{
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
                    💰 Get My Quote →
                  </Link>
                </div>
              )}

              {/* Selected State Details */}
              {stateToShow ? (
                <section style={{
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                  marginBottom: '2rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: COLORS.text.primary,
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.125rem',
                      fontWeight: '700'
                    }}>
                      {stateToShow.abbreviation}
                    </span>
                    {stateToShow.state}
                  </h2>
                  
                  {/* Requirements */}
                  <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.375rem',
                      fontWeight: '600',
                      color: COLORS.text.primary,
                      marginBottom: '1rem'
                    }}>
                      📋 Requirements
                    </h3>
                    <ul style={{
                      color: COLORS.text.secondary,
                      lineHeight: '2',
                      paddingLeft: '1.5rem'
                    }}>
                      {stateToShow.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div style={{
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: COLORS.text.primary,
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⏱️ Typical Timeline
                    </h3>
                    <p style={{
                      color: COLORS.text.secondary,
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {stateToShow.timeline}
                    </p>
                  </div>

                  {/* Notes */}
                  {stateToShow.notes && (
                    <div style={{
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #fcd34d'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: COLORS.text.primary,
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        💡 Important Notes
                      </h3>
                      <p style={{
                        color: COLORS.text.secondary,
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        margin: 0
                      }}>
                        {stateToShow.notes}
                      </p>
                    </div>
                  )}
                </section>
              ) : (
                /* All States Grid */
                <section>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    Available States
                  </h2>
                  <div className="state-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {statesData.map(state => (
                      <button
                        key={state.abbreviation}
                        onClick={() => setSelectedState(state.abbreviation)}
                        style={{
                          background: 'white',
                          padding: '1.25rem',
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                      >
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: COLORS.primary.main,
                          marginBottom: '0.5rem'
                        }}>
                          {state.abbreviation}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: COLORS.text.tertiary,
                          fontWeight: '500'
                        }}>
                          {state.state}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <Sidebar relatedArticles={relatedArticlesMap["state-laws"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default StateLaws;

