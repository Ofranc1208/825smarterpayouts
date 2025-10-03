/**
 * Glossary of Structured Settlement Terms
 * 
 * SEO-OPTIMIZED with 24+ detailed definitions
 * Alphabetical organization for maximum usability
 * NO CSS FILES - All inline styling
 */

'use client';
import React, { useState } from 'react';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  SchemaMarkup,
  CTASection
} from '../components';
import { glossaryTerms } from '../data/glossaryData';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils';

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique first letters for alphabet navigation
  const alphabet = Array.from(new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))).sort();

  const articleSchema = generateArticleSchema({
    headline: "Glossary of Structured Settlement Terms | Complete Dictionary",
    description: "Comprehensive glossary of structured settlement terminology. Understand factoring, discount rates, court approval, and all key terms.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/glossary-of-structured-settlement-terms"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "Glossary", url: "https://smarterpayouts.com/structured-settlement-info-hub/glossary-of-structured-settlement-terms" }
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
        title="📚 Glossary of Structured Settlement Terms"
        subtitle="Comprehensive dictionary of industry terminology to help you understand structured settlements and the selling process."
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
              {/* Search Bar */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <label htmlFor="search" style={{
                  display: 'block',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  🔍 Search Terms
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search for a term..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1.25rem',
                    fontSize: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />
                <p style={{
                  color: COLORS.text.tertiary,
                  fontSize: '0.875rem',
                  marginTop: '0.75rem',
                  margin: '0.75rem 0 0 0'
                }}>
                  Showing {filteredTerms.length} of {glossaryTerms.length} terms
                </p>
              </div>

              {/* Alphabet Navigation */}
              <div style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  {alphabet.map(letter => (
                    <a
                      key={letter}
                      href={`#${letter}`}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        color: COLORS.primary.main,
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.9375rem',
                        border: '1px solid #bbf7d0',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {letter}
                    </a>
                  ))}
                </div>
              </div>

              {/* Terms List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {filteredTerms.map((glossaryItem, index) => (
                  <div
                    key={index}
                    id={glossaryItem.term[0].toUpperCase()}
                    style={{
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                      border: '1px solid #e5e7eb',
                      transition: 'box-shadow 0.2s ease'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.375rem',
                      fontWeight: '700',
                      color: COLORS.primary.main,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        border: '2px solid #bbf7d0'
                      }}>
                        {glossaryItem.term[0]}
                      </span>
                      {glossaryItem.term}
                    </h3>
                    <p style={{
                      color: COLORS.text.tertiary,
                      lineHeight: '1.8',
                      fontSize: '1.0625rem',
                      marginBottom: glossaryItem.relatedTerms ? '1.25rem' : 0
                    }}>
                      {glossaryItem.definition}
                    </p>
                    {glossaryItem.relatedTerms && glossaryItem.relatedTerms.length > 0 && (
                      <div style={{
                        background: '#f9fafb',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: COLORS.text.primary,
                          marginBottom: '0.5rem'
                        }}>
                          Related Terms:
                        </div>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          {glossaryItem.relatedTerms.map((related, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '0.375rem 0.75rem',
                                background: 'white',
                                borderRadius: '6px',
                                fontSize: '0.8125rem',
                                color: COLORS.primary.main,
                                border: '1px solid #e5e7eb',
                                fontWeight: '500'
                              }}
                            >
                              {related}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <div style={{
                  background: 'white',
                  padding: '3rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                    marginBottom: '0.5rem'
                  }}>
                    No terms found
                  </h3>
                  <p style={{
                    color: COLORS.text.tertiary,
                    fontSize: '0.9375rem'
                  }}>
                    Try a different search term or browse all terms above.
                  </p>
                </div>
              )}

              {/* INLINE CTA - After Terms */}
              {filteredTerms.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  marginTop: '3rem',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                  }}>
                    Need Help Understanding Your Settlement?
                  </h3>
                  <p style={{
                    fontSize: '1.0625rem',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    opacity: 0.95
                  }}>
                    Chat with Mint AI for instant, personalized explanations of complex terms and concepts.
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
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                  }}>
                    💬 Chat with Mint AI →
                  </Link>
                </div>
              )}
            </article>

            <Sidebar relatedArticles={relatedArticlesMap["glossary"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default Glossary;

