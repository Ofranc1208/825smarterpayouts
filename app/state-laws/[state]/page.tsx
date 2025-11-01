// Dynamic State Page - SEO optimized individual state pages
// Enterprise-grade implementation with proper metadata and structured data

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getStateBySlug, getNeighboringStates, statesList, allStates } from '@/src/state-laws/data';
import { buildStateJsonLd, buildBreadcrumbJsonLd, buildWebPageSchema } from '@/src/state-laws/lib/jsonld';
import CTASection, { StatePageCTA } from '@/src/state-laws/components/CTASection';
import LegalDisclaimer, { StatePageDisclaimer } from '@/src/state-laws/components/LegalDisclaimer';
import '../../../src/state-laws/components/shared-styles.css';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

type Props = {
  params: { state: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const found = getStateBySlug(params.state);

  if (!found) {
    return {
      title: 'State Not Found | SmarterPayouts',
      description: 'The requested state could not be found in our structured settlement laws database.'
    };
  }

  const { name, data } = found;
  const description = `Learn how to sell structured settlement payments in ${name} under ${data.statuteCitation}. Court approval requirements, key provisions, and official state resources.`;

  return {
    title: `Structured Settlement Laws in ${name} | SmarterPayouts`,
    description,
    robots: 'index, follow',
    keywords: [
      `${name} structured settlement laws`,
      `${name} court approval`,
      `${data.statuteCitation}`,
      'sell structured settlement',
      'state transfer requirements'
    ],
    alternates: {
      canonical: `https://www.smarterpayouts.com/state-laws/${data.slug}`
    },
    openGraph: {
      title: `Structured Settlement Laws in ${name}`,
      description,
      url: `/state-laws/${data.slug}`,
      type: 'article',
      siteName: 'SmarterPayouts',
      images: [
        {
          url: '/og-state-laws.jpg',
          width: 1200,
          height: 630,
          alt: `Structured Settlement Laws in ${name}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Structured Settlement Laws in ${name}`,
      description
    },
    other: {
      'article:author': 'SmarterPayouts',
      'article:section': 'Legal Information',
      'article:tag': [name, 'structured settlement', 'state laws']
    }
  };
}

export default function StateLawPage({ params }: Props) {
  const found = getStateBySlug(params.state);

  if (!found) {
    notFound();
  }

  const { name, data } = found;
  const neighboringStates = getNeighboringStates(name);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'State Laws', url: '/state-laws' },
    { name: name, url: `/state-laws/${data.slug}` }
  ];

  return (
    <>
      <div className="state-laws-page">
        <div className="state-laws-container">
          <article className="state-laws-article">
            {/* JSON-LD Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                  buildStateJsonLd(name, data),
                  buildBreadcrumbJsonLd(breadcrumbItems),
                  buildWebPageSchema(
                    `Structured Settlement Laws in ${name}`,
                    `Court approval requirements, ${data.statuteCitation}, and key provisions for structured settlement transfers in ${name}.`,
                    `/state-laws/${data.slug}`,
                    currentDate
                  )
                ])
              }}
            />

            {/* Breadcrumbs */}
            <nav className="state-laws-breadcrumbs">
              <Link href="/state-laws" className="hover:underline">
                All States
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-600">{name}</span>
            </nav>

            {/* Page Header */}
            <header className="mb-8">
              <h1 className="state-laws-title">
                Structured Settlement Laws in {name}
              </h1>
              <p className="state-laws-subtitle">
                {data.canSell}
              </p>
            </header>

            {/* Quick Overview Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="state-laws-card">
                <div className="state-laws-card-title">📜 Statute</div>
                <div className="state-laws-card-content">
                  {data.statuteCitation}
                </div>
                <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                  Enacted: {data.enactmentDate}
                </div>
              </div>
              <div className="state-laws-card">
                <div className="state-laws-card-title">⚖️ Court Approval</div>
                <div className="state-laws-card-content">
                  Required in {name}
                </div>
                <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                  Superior court review
                </div>
              </div>
              <div className="state-laws-card">
                <div className="state-laws-card-title">🏛️ Resources</div>
                <div className="state-laws-card-content">
                  {data.resources.length} official links
                </div>
                <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                  Statute + Insurance Dept
                </div>
              </div>
            </div>

            {/* Key Provisions */}
            <section className="state-laws-section">
              <h2 className="state-laws-section-title">
                Key Legal Provisions
              </h2>
              <ul className="state-laws-list">
                {data.keyProvisions.map((provision: string, index: number) => (
                  <li key={index} className="state-laws-text">
                    {provision}
                  </li>
                ))}
              </ul>
            </section>

            {/* Court Approval Section */}
            <section className="state-laws-section">
              <h2 className="state-laws-section-title">
                Court Approval Criteria
              </h2>
              <p className="state-laws-text">
                {data.courtApproval}
              </p>
            </section>

            {/* Prohibited Actions */}
            <section className="state-laws-section">
              <h2 className="state-laws-section-title">
                Prohibited Actions
              </h2>
              <ul className="state-laws-list">
                {data.prohibited.map((prohibition: string, index: number) => (
                  <li key={index} className="state-laws-text">
                    {prohibition}
                  </li>
                ))}
              </ul>
            </section>

            {/* Official Resources */}
            <section className="state-laws-resources">
              <h2 className="state-laws-resources-title">
                Official {name} Resources
              </h2>
              <div className="space-y-2">
                {data.resources.map((resource: { label: string; url: string }, index: number) => (
                  <div key={index} className="state-laws-resource-item">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="state-laws-resource-link"
                    >
                      {resource.label}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Neighboring States */}
            {neighboringStates.length > 0 && (
              <section className="state-laws-section">
                <h2 className="state-laws-section-title">
                  Compare with Neighboring States
                </h2>
                <p className="state-laws-text mb-3">
                  See how {name} compares to surrounding states:
                </p>
                <div className="flex flex-wrap gap-2">
                  {neighboringStates.slice(0, 6).map((neighbor: string) => (
                    <Link
                      key={neighbor}
                      href={`/state-laws/${getStateBySlug(neighbor.toLowerCase().replace(/\s+/g, '-'))?.data.slug || 'unknown'}`}
                      className="inline-block bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {neighbor}
                    </Link>
                  ))}
                  {neighboringStates.length > 6 && (
                    <span className="text-gray-500 text-sm px-3 py-1">
                      +{neighboringStates.length - 6} more
                    </span>
                  )}
                </div>
              </section>
            )}

            {/* Call to Action */}
            <StatePageCTA />

            {/* Back to Index */}
            <section className="text-center mb-8">
              <Link
                href="/state-laws"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to All States
              </Link>
            </section>

            {/* Legal Disclaimer */}
            <StatePageDisclaimer stateName={name} />

            {/* Last Updated */}
            <div className="state-laws-last-updated">
              Content last updated: {currentDate}
            </div>
          </article>
        </div>
      </div>
      <LazyFABSpeedDial />
    </>
  );
}

// Generate static pages for all states at build time
export function generateStaticParams() {
  return statesList.map((stateName: string) => ({
    state: allStates[stateName].slug
  }));
}

