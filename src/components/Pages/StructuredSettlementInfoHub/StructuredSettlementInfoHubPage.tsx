/**
 * Structured Settlement Info Hub - Main Landing Page
 *
 * SEO-OPTIMIZED CENTERPIECE PAGE with optimized spacing
 * NO CSS FILES - All inline styling
 * Maximum SEO impact with rich content and structured data
 *
 * Features:
 * - Hero section with CTAs (optimized padding)
 * - Featured content cards
 * - Resource grid
 * - Sticky sidebar
 * - Final CTA section (reduced padding)
 * - Complete schema markup (Article, FAQ, Breadcrumb, LegalService)
 * - Responsive design with inline media queries
 * - Cleaner, more compact layout
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
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
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
        title="Structured Settlement Info Hub"
        subtitle="Your comprehensive resource for understanding, selling, and maximizing your structured settlement payout."
        showCTAs={true}
      />

      {/* Main Content */}
      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '32px 0'
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
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  ...TEXT_PRESETS.heroTitle,
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  color: COLORS.neutral.gray900,
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  background: COLORS.titleGradients.grayToGreen,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  Explore Our Resources
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

