/**
 * Structured Settlement Info Hub - Main Landing Page
 * 
 * SEO-OPTIMIZED CENTERPIECE PAGE
 * NO CSS FILES - All inline styling
 * Maximum SEO impact with rich content and structured data
 * 
 * Features:
 * - Hero section with CTAs
 * - Featured content cards
 * - Resource grid
 * - Sticky sidebar
 * - Final CTA section
 * - Complete schema markup (Article, FAQ, Breadcrumb, LegalService)
 * - Responsive design with inline media queries
 */

'use client';
import React from 'react';
import {
  HeroSection,
  ContentCard,
  ResourceGrid,
  Sidebar,
  CTASection,
  SchemaMarkup
} from './components';
import {
  featuredCards,
  resourceCards,
  sidebarRelatedArticles
} from './data/hubContent';
import { 
  generateArticleSchema, 
  generateBreadcrumbSchema,
  generateLegalServiceSchema 
} from './data/schemaData';

const StructuredSettlementInfoHubPage: React.FC = () => {
  // Generate schemas for maximum SEO
  const articleSchema = generateArticleSchema({
    headline: "Structured Settlement Info Hub | Complete Guide & Resources",
    description: "Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at SmarterPayouts.",
    url: "https://smarterpayouts.com/structured-settlement-info-hub"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Home",
      url: "https://smarterpayouts.com"
    },
    {
      name: "Knowledge Hub",
      url: "https://smarterpayouts.com/structured-settlement-info-hub"
    }
  ]);

  const legalServiceSchema = generateLegalServiceSchema();

  return (
    <>
      {/* Schema Markup for SEO */}
      <SchemaMarkup
        articleSchema={articleSchema}
        breadcrumbSchema={breadcrumbSchema}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />

      {/* Responsive Media Queries - Inline */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .main-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .sidebar {
              order: -1;
              width: 100% !important;
              position: static !important;
            }
          }
          @media (max-width: 480px) {
            .main-grid {
              padding: 0 8px !important;
            }
          }
        `
      }} />

      {/* Hero Section */}
      <HeroSection
        badge="Knowledge Center"
        title="📚 Structured Settlement Info Hub"
        subtitle="Your comprehensive resource for understanding, selling, and maximizing your structured settlement payout."
        showCTAs={true}
      />

      {/* Main Content */}
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
          <div className="main-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {/* Content Column */}
            <div style={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0'
            }}>
              
              {/* Featured Content Cards */}
              {featuredCards.map((card, index) => (
                <ContentCard
                  key={index}
                  emoji={card.emoji}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  buttonLink={card.buttonLink}
                />
              ))}

              {/* Explore Resources Section */}
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  📚 Explore Our Resources
                </h2>
                <ResourceGrid resources={resourceCards} />
              </section>

            </div>

            {/* Sidebar */}
            <Sidebar relatedArticles={sidebarRelatedArticles} />
          </div>
        </div>
      </main>

      {/* Final CTA Section */}
      <CTASection />
    </>
  );
};

export default StructuredSettlementInfoHubPage;

