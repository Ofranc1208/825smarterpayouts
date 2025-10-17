/**
 * FAQ Page - Structured Settlement Info Hub
 * 
 * COMPREHENSIVE FAQ for maximum SEO impact
 * Featured snippet optimization
 * NO CSS FILES - All inline styling
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/src/components/shared/styles';
import {
  HeroSection,
  Sidebar,
  FAQAccordion,
  SchemaMarkup,
  CTASection
} from '../components';
import { allFAQs, generalFAQs, sellingFAQs, legalFAQs, financialFAQs } from '../data/faqData';
import { relatedArticlesMap } from '../data/relatedArticles';
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema } from '../utils';

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions', count: allFAQs.length },
    { id: 'general', label: 'General Info', count: generalFAQs.length },
    { id: 'selling', label: 'Selling Process', count: sellingFAQs.length },
    { id: 'legal', label: 'Legal & Court', count: legalFAQs.length },
    { id: 'financial', label: 'Financial', count: financialFAQs.length }
  ];

  const getFAQsByCategory = () => {
    switch (activeCategory) {
      case 'general':
        return generalFAQs;
      case 'selling':
        return sellingFAQs;
      case 'legal':
        return legalFAQs;
      case 'financial':
        return financialFAQs;
      default:
        return allFAQs;
    }
  };

  // SEO Schemas - ALL questions for maximum SEO
  const faqSchema = generateFAQSchema(allFAQs.map(faq => ({
    question: faq.question,
    answer: typeof faq.answer === 'string' ? faq.answer : ''
  })));

  const articleSchema = generateArticleSchema({
    headline: "Structured Settlement FAQs | Comprehensive Answers",
    description: "Get answers to the most common questions about structured settlements, selling, court approval, and more. Trusted resource for consumers.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub/faq"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://smarterpayouts.com" },
    { name: "Knowledge Hub", url: "https://smarterpayouts.com/structured-settlement-info-hub" },
    { name: "FAQ", url: "https://smarterpayouts.com/structured-settlement-info-hub/faq" }
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
            .category-filters {
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
          }
        `
      }} />

      <HeroSection
        title="📖 Frequently Asked Questions"
        subtitle="Find answers to common questions about structured settlements, selling, court approval, and financial considerations."
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
              {/* Category Filters */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  Filter by Category
                </h2>
                <div className="category-filters" style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      style={{
                        padding: '0.625rem 1.25rem',
                        borderRadius: '8px',
                        border: activeCategory === category.id 
                          ? `2px solid ${COLORS.primary.main}` 
                          : '1px solid #e5e7eb',
                        background: activeCategory === category.id
                          ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                          : 'white',
                        color: activeCategory === category.id
                          ? COLORS.primary.main
                          : COLORS.text.secondary,
                        fontSize: '0.9375rem',
                        fontWeight: activeCategory === category.id ? '600' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activeCategory === category.id
                          ? '0 4px 10px rgba(9, 180, 77, 0.18)'
                          : '0 1px 4px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

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
                  marginBottom: '1rem'
                }}>
                  Get Answers to Your Questions
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.8',
                  fontSize: '1.0625rem',
                  marginBottom: '1.5rem'
                }}>
                  We've compiled the most frequently asked questions about structured settlements to help you make informed decisions. Can't find your answer? <a href="/mint-intelligent-chat" style={{ color: COLORS.primary.main, fontWeight: '600', textDecoration: 'none' }}>Chat with Mint AI</a> for instant personalized assistance.
                </p>

                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #93c5fd',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '2rem' }}>💡</div>
                  <p style={{
                    color: COLORS.text.secondary,
                    fontSize: '0.9375rem',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    <strong>Quick Tip:</strong> Use the category filters above to find questions specific to your needs. All information is current as of {new Date().getFullYear()} and based on federal and state structured settlement protection laws.
                  </p>
                </div>
              </section>

              {/* FAQ Accordion */}
              <FAQAccordion
                faqs={getFAQsByCategory()}
                title={`${activeCategory === 'all' ? 'All' : categories.find(c => c.id === activeCategory)?.label} Questions (${getFAQsByCategory().length})`}
              />

              {/* INLINE CTA - After FAQs */}
              <div style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                padding: '2.5rem',
                borderRadius: '16px',
                marginTop: '2rem',
                marginBottom: '2rem',
                textAlign: 'center',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Find Out What Your Settlement is Worth
                </h3>
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  opacity: 0.95
                }}>
                  Get your instant quote now. See multiple scenarios and payment options in less than 60 seconds.
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
                  💰 Calculate My Offer →
                </Link>
              </div>

              {/* Still Have Questions Section */}
              <section style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                padding: '2.5rem',
                borderRadius: '16px',
                marginTop: '3rem',
                border: '1px solid #bbf7d0',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  color: COLORS.text.primary,
                  marginBottom: '1rem'
                }}>
                  Still Have Questions?
                </h2>
                <p style={{
                  color: COLORS.text.tertiary,
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontSize: '1.0625rem'
                }}>
                  Our team is here to help. Get instant answers with Mint AI or calculate your personalized quote.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <a
                    href="/mint-intelligent-chat"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: 'white',
                      padding: '0.875rem 1.75rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    💬 Chat with Mint AI
                  </a>
                  <a
                    href="/mint-chat-active?type=calculate"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                      color: 'white',
                      padding: '0.875rem 1.75rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      boxShadow: '0 4px 6px rgba(9, 180, 77, 0.3)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    💰 Get Your Quote
                  </a>
                </div>
              </section>
            </article>

            <Sidebar relatedArticles={relatedArticlesMap["faq"]} />
          </div>
        </div>
      </main>

      <CTASection />
    </>
  );
};

export default FAQPage;

