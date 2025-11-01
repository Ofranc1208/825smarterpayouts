// Dynamic County Page - SEO optimized individual county pages
// Enterprise-grade implementation using shared design system

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getStateBySlug, getCountyByStateAndSlug, getStatesWithCountyData, getCountySlugsByState } from '@/src/state-laws/data';
import { buildBreadcrumbJsonLd, buildWebPageSchema, buildCountyJsonLd } from '@/src/state-laws/lib/jsonld';
import CTASection, { CountyPageCTA } from '@/src/state-laws/components/CTASection';
import LegalDisclaimer, { CountyPageDisclaimer } from '@/src/state-laws/components/LegalDisclaimer';
import Breadcrumbs, { CountyPageBreadcrumbs } from '@/src/state-laws/components/Breadcrumbs';
import '../../../../src/state-laws/components/shared-styles.css';

const LazyFABSpeedDial = dynamic(() => import('../../../components/FABSpeedDial'), { ssr: false });

type Props = {
  params: { state: string; county: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const stateData = getStateBySlug(params.state);

  if (!stateData) {
    return {
      title: 'State Not Found | SmarterPayouts',
      description: 'The requested state could not be found in our structured settlement laws database.'
    };
  }

  const { name: stateName, data: stateInfo } = stateData;
  const countyData = getCountyByStateAndSlug(params.state, params.county);

  if (!countyData) {
    return {
      title: 'County Not Found | SmarterPayouts',
      description: 'The requested county information could not be found.'
    };
  }

  const description = `Structured settlement transfer requirements in ${countyData.court.name}, ${stateName}. Court procedures, filing requirements, and local rules for ${countyData.court.name}.`;

  return {
    title: `Structured Settlement Laws in ${stateName} - ${countyData.court.name} | SmarterPayouts`,
    description,
    keywords: [
      `${stateName} structured settlement laws`,
      `${countyData.court.name}`,
      `${stateName} court procedures`,
      'structured settlement transfers',
      'county court requirements'
    ],
    alternates: {
      canonical: `https://www.smarterpayouts.com/state-laws/${stateInfo.slug}/${countyData.slug}`
    },
    openGraph: {
      title: `Structured Settlement Laws in ${stateName} - ${countyData.court.name}`,
      description,
      url: `/state-laws/${stateInfo.slug}/${countyData.slug}`,
      type: 'article',
      siteName: 'SmarterPayouts'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Structured Settlement Laws in ${stateName} - County Court`,
      description
    }
  };
}

export default function CountyLawPage({ params }: Props) {
  const stateData = getStateBySlug(params.state);

  if (!stateData) {
    notFound();
  }

  const { name: stateName, data: stateInfo } = stateData;
  const countyData = getCountyByStateAndSlug(params.state, params.county);

  if (!countyData) {
    notFound();
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'State Laws', url: '/state-laws' },
    { name: stateName, url: `/state-laws/${stateInfo.slug}` },
    { name: countyData.court.name, url: `/state-laws/${stateInfo.slug}/${countyData.slug}` }
  ];

  return (
    <>
      <div className="state-laws-page">
        <div className="state-laws-container">
          {/* Main Content */}
          <article className="state-laws-article">
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                buildBreadcrumbJsonLd(breadcrumbItems),
                buildWebPageSchema(
                  `Structured Settlement Laws in ${stateName} - ${countyData.court.name}`,
                  `Court procedures and requirements for structured settlement transfers in ${countyData.court.name}, ${stateName}.`,
                  `/state-laws/${stateInfo.slug}/${countyData.slug}`,
                  currentDate
                )
              ])
            }}
          />

          {/* Breadcrumbs */}
          <CountyPageBreadcrumbs
            stateName={stateName}
            stateSlug={stateInfo.slug}
            countyName={countyData.court.name}
            countySlug={countyData.slug}
          />

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="state-laws-title">
              Structured Settlement Laws in {stateName}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {countyData.court.name}
            </h2>
            <p className="state-laws-subtitle">
              Court procedures, filing requirements, and local rules for structured settlement transfers in {countyData.court.name}.
            </p>
          </header>

          {/* Table of Contents */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: '1px solid #d1fae5',
            borderLeft: '4px solid #059669',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#047857',
              marginBottom: '1rem'
            }}>
              Table of Contents
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#court-information" style={{ color: '#059669', textDecoration: 'none' }}>
                  → Court Information
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#filing-procedures" style={{ color: '#059669', textDecoration: 'none' }}>
                  → Filing Procedures
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#local-requirements" style={{ color: '#059669', textDecoration: 'none' }}>
                  → Local Requirements
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#judges" style={{ color: '#059669', textDecoration: 'none' }}>
                  → Assigned Judges
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#resources" style={{ color: '#059669', textDecoration: 'none' }}>
                  → Local Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Top CTA - Early conversion opportunity */}
          <div className="mb-8">
            <CountyPageCTA stateName={stateName} />
          </div>

          {/* Quick Overview Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="state-laws-card">
              <div className="state-laws-card-title">🏛️ Court</div>
              <div className="state-laws-card-content">
                {countyData.court.name}
              </div>
              <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                {countyData.court.address}
              </div>
            </div>
            <div className="state-laws-card">
              <div className="state-laws-card-title">⏱️ Processing Time</div>
              <div className="state-laws-card-content">
                {countyData.processingTime}
              </div>
              <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                Filing fee: {countyData.filingFee}
              </div>
            </div>
            <div className="state-laws-card">
              <div className="state-laws-card-title">👥 Population</div>
              <div className="state-laws-card-content">
                {countyData.population}
              </div>
              <div className="state-laws-card-content text-sm text-gray-500 mt-1">
                Volume: {countyData.transferVolume}
              </div>
            </div>
          </div>

          {/* Court Information */}
          <section id="court-information" className="state-laws-section">
            <h2 className="state-laws-section-title">
              Court Information
            </h2>
            <div className="state-laws-card">
              <div className="state-laws-card-title">{countyData.court.name}</div>
              <div className="state-laws-card-content">
                <strong>Address:</strong> {countyData.court.address}
              </div>
              <div className="state-laws-card-content">
                <strong>Phone:</strong> {countyData.court.phone}
              </div>
              <div className="state-laws-card-content">
                <strong>Clerk:</strong> {countyData.court.clerkName}
              </div>
              {countyData.court.jurisdiction && (
                <div className="state-laws-card-content">
                  <strong>Jurisdiction:</strong> {countyData.court.jurisdiction}
                </div>
              )}
              {countyData.court.established && (
                <div className="state-laws-card-content">
                  <strong>Established:</strong> {countyData.court.established}
                </div>
              )}
            </div>
          </section>

          {/* Venue Notes */}
          <section className="state-laws-section">
            <h2 className="state-laws-section-title">
              Venue Overview
            </h2>
            <p className="state-laws-text">
              {countyData.venueNotes}
            </p>
            {countyData.majorCities && countyData.majorCities.length > 0 && (
              <div className="mt-4">
                <strong>Major Cities Served:</strong> {countyData.majorCities.join(', ')}
              </div>
            )}
          </section>

          {/* Filing Procedures */}
          <section id="filing-procedures" className="state-laws-section">
            <h2 className="state-laws-section-title">
              Filing Procedures
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="state-laws-card">
                <div className="state-laws-card-title">📋 Step-by-Step Process</div>
                <div className="space-y-2">
                  {countyData.localProcedures?.map((procedure: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-semibold">{index + 1}.</span>
                      <span className="text-sm">{procedure}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="state-laws-card">
                <div className="state-laws-card-title">⚖️ Local Rules</div>
                <ul className="space-y-1" style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {countyData.localRules?.map((rule: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Special Requirements */}
          <section id="local-requirements" className="state-laws-section">
            <h2 className="state-laws-section-title">
              Special Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="state-laws-card">
                <div className="state-laws-card-title">📋 Mandatory Requirements</div>
                <ul className="space-y-1" style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {countyData.specialRequirements?.map((requirement: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="state-laws-card">
                <div className="state-laws-card-title">⏱️ Timeline</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Filing Fee:</span>
                    <span className="text-sm font-semibold">{countyData.filingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Time:</span>
                    <span className="text-sm font-semibold">{countyData.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transfer Volume:</span>
                    <span className="text-sm font-semibold capitalize">{countyData.transferVolume}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Assigned Judges */}
          {countyData.judges && countyData.judges.length > 0 && (
            <section id="judges" className="state-laws-section">
              <h2 className="state-laws-section-title">
                Assigned Judges
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countyData.judges.map((judge: any, index: number) => (
                  <div key={index} className="state-laws-card">
                    <div className="state-laws-card-title">{judge.name}</div>
                    <div className="state-laws-card-content text-sm">
                      <strong>{judge.title}</strong>
                    </div>
                    <div className="state-laws-card-content text-sm">
                      {judge.division}
                    </div>
                    <div className="state-laws-card-content text-sm text-gray-600">
                      {judge.notes}
                    </div>
                    {judge.experience && (
                      <div className="state-laws-card-content text-xs text-gray-500 mt-2">
                        {judge.experience}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Local Resources */}
          <section id="resources" className="state-laws-resources">
            <h2 className="state-laws-resources-title">
              Local Resources & Links
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {countyData.links.map((link: { label: string; url: string }, index: number) => (
                <div key={index} className="state-laws-resource-item">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="state-laws-resource-link"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <CountyPageCTA stateName={stateName} />

          {/* Navigation Links */}
          <section className="text-center mb-8 space-y-4">
            <div>
              <Link
                href={`/state-laws/${stateInfo.slug}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                ← Back to {stateName} State Laws
              </Link>
            </div>
            <div>
              <Link
                href="/state-laws"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to All States
              </Link>
            </div>
          </section>

          {/* Legal Disclaimer */}
          <CountyPageDisclaimer stateName={stateName} />

          {/* Last Updated */}
          <div className="state-laws-last-updated">
            Content last updated: {currentDate}
          </div>
        </article>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCountyJsonLd(stateName, stateInfo.slug, countyData))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema(
            `Structured Settlement Laws in ${stateName} - ${countyData.court.name}`,
            `Court procedures, filing requirements, and local rules for structured settlement transfers in ${countyData.court.name}, ${stateName}.`,
            `/state-laws/${stateInfo.slug}/${countyData.slug}`,
            currentDate
          ))
        }}
      />
      </div>
      <LazyFABSpeedDial />
    </>
  );
}

// Generate static pages for all counties across all states
export function generateStaticParams() {
  const params: Array<{ state: string; county: string }> = [];

  getStatesWithCountyData().forEach((stateSlug: string) => {
    const countySlugs = getCountySlugsByState(stateSlug);
    countySlugs.forEach((countySlug: string) => {
      params.push({
        state: stateSlug,
        county: countySlug
      });
    });
  });

  return params;
}
