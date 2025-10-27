// States Index Page - SEO optimized list of all states
// Enterprise-grade implementation with proper metadata

import Link from 'next/link';
import type { Metadata } from 'next';
import { allStates, statesList, groupStatesByLetter } from '@/src/state-laws/data';
import { buildStateLawsIndexJsonLd, buildWebPageSchema } from '@/src/state-laws/lib/jsonld';
import CTASection from '@/src/state-laws/components/CTASection';
import LegalDisclaimer from '@/src/state-laws/components/LegalDisclaimer';
import '../../src/state-laws/components/shared-styles.css';

export const metadata: Metadata = {
  title: 'Structured Settlement Laws by State | SmarterPayouts',
  description: 'Comprehensive guide to structured settlement transfer laws in all 50 US states plus Washington DC. Court approval requirements, statutes, and legal resources for every state.',
  keywords: [
    'structured settlement laws by state',
    'court approval requirements',
    'state statutes',
    'settlement transfer laws',
    'legal requirements by state'
  ],
  alternates: {
    canonical: 'https://smarterpayouts.com/state-laws'
  },
  openGraph: {
    title: 'Structured Settlement Laws by State | Complete Guide',
    description: 'Find structured settlement transfer requirements, court approval processes, and legal resources for every US state.',
    url: 'https://smarterpayouts.com/state-laws',
    type: 'website',
    siteName: 'SmarterPayouts'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structured Settlement Laws by State',
    description: 'Complete guide to court approval requirements and legal processes in every state.'
  }
};

export default function StateLawsIndexPage() {
  const groupedStates = groupStatesByLetter();
  const totalStates = statesList.length;

  return (
    <div className="state-laws-page">
      <div className="state-laws-container">
        <article className="state-laws-article">
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                buildStateLawsIndexJsonLd(),
                buildWebPageSchema(
                  'Structured Settlement Laws by State | Complete Guide',
                  'Comprehensive guide to structured settlement transfer laws in all 50 US states plus Washington DC. Court approval requirements, statutes, and legal resources for every state.',
                  '/state-laws'
                )
              ])
            }}
          />

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="state-laws-title">
              Structured Settlement Laws by State
            </h1>
            <p className="state-laws-subtitle">
              Court approval requirements, statute citations, and key provisions for all {totalStates} US states and Washington DC.
              Each state has unique legal requirements for structured settlement transfers.
            </p>
          </header>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="state-laws-card">
              <div className="state-laws-card-title">📊 Total States</div>
              <div className="state-laws-card-content">
                {totalStates} states + DC covered with comprehensive legal information
              </div>
            </div>
            <div className="state-laws-card">
              <div className="state-laws-card-title">⚖️ Court Approval</div>
              <div className="state-laws-card-content">
                Required in every state to protect payee interests
              </div>
            </div>
            <div className="state-laws-card">
              <div className="state-laws-card-title">📋 Legal Resources</div>
              <div className="state-laws-card-content">
                Direct links to state statutes and insurance departments
              </div>
            </div>
          </div>

          {/* States by Letter */}
          <section className="mb-8">
            <h2 className="state-laws-section-title mb-6">
              Browse by State
            </h2>

            {Object.keys(groupedStates).sort().map(letter => (
              <div key={letter} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {letter}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupedStates[letter].map((stateName: string) => {
                    const slug = allStates[stateName].slug;
                    return (
                      <Link
                        key={slug}
                        href={`/state-laws/${slug}`}
                        className="state-laws-card hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="state-laws-card-title">{stateName}</div>
                        <div className="state-laws-card-content text-sm">
                          {allStates[stateName].statuteCitation}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* Call to Action */}
          <CTASection
            title="Need Help with Your State?"
            description="Our specialists can guide you through the structured settlement transfer process in your specific state."
          />

          {/* Legal Disclaimer */}
          <LegalDisclaimer />

          {/* Last Updated */}
          <div className="state-laws-last-updated">
            Content last updated: {new Date().toLocaleDateString()}
          </div>
        </article>
      </div>
    </div>
  );
}

// Generate static props for better performance
export function generateStaticParams() {
  return statesList.map((stateName: string) => ({
    state: allStates[stateName].slug
  }));
}
