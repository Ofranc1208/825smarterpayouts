/**
 * Directory Section Component - Resources Page
 *
 * Interactive insurance company directory with search, filter, and collapsible cards.
 * Includes acronym legend and company details display.
 *
 * @component
 * @returns {JSX.Element} Complete directory interface with search and company listings
 *
 * @example
 * <DirectorySection />
 */

'use client';
import React, { useState, useEffect } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { companies, acronymDescriptions, getFieldIcon, type Company } from '../types';

export default function DirectorySection() {
  const [search, setSearch] = useState('');
  const [showLegend, setShowLegend] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true and initialize showLegend based on screen size after hydration
    setMounted(true);
    setShowLegend(window.innerWidth >= 768);

    const handleResize = () => {
      setShowLegend(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered = companies.filter((c) => {
    const searchLower = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(searchLower) ||
      (c.formerNames && c.formerNames.some((fn) => fn.toLowerCase().includes(searchLower))) ||
      (c.acblsadapos && c.acblsadapos.some((a) => a.toLowerCase().includes(searchLower))) ||
      (c.notes && c.notes.toLowerCase().includes(searchLower))
    );
  });

  return (
    <section
      aria-label="Insurance company directory"
      style={{
        background: COLORS.backgrounds.lightGray,
        paddingTop: SPACING.unit.lg,
        paddingBottom: SPACING.unit.xxxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        minHeight: '50vh'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Acronym Legend Toggle */}
        <div style={{ marginBottom: SPACING.stack.lg }}>
          {mounted && (
            <button
              type="button"
              aria-expanded={showLegend}
              aria-controls="acronym-legend"
              onClick={() => setShowLegend((v) => !v)}
              style={{
                background: COLORS.backgrounds.white,
                border: `1px solid ${COLORS.borders.medium}`,
                padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
                borderRadius: BORDER_RADIUS.small,
                fontSize: TYPOGRAPHY.fontSize.body.small,
                fontWeight: TYPOGRAPHY.fontWeight.medium,
                color: COLORS.text.primary,
                cursor: 'pointer',
                marginBottom: SPACING.stack.md,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary.main;
                e.currentTarget.style.color = COLORS.primary.main;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.borders.medium;
                e.currentTarget.style.color = COLORS.text.primary;
              }}
            >
              {showLegend ? 'Hide Acronym Legend' : 'Show Acronym Legend'}
            </button>
          )}

          {/* Acronym Legend */}
          {mounted && showLegend && (
            <div
              id="acronym-legend"
              style={{
                padding: SPACING.card.compact,
                background: COLORS.backgrounds.white,
                borderRadius: BORDER_RADIUS.medium,
                boxShadow: BOX_SHADOWS.small,
                fontSize: TYPOGRAPHY.fontSize.body.small,
                marginBottom: SPACING.stack.md,
                border: `1px solid ${COLORS.borders.light}`
              }}
            >
              <span style={{
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                marginRight: SPACING.inline.md,
                color: COLORS.text.primary
              }}>
                Acronym Legend:
              </span>
              {Object.entries(acronymDescriptions).map(([ac, desc]) => (
                <span
                  key={ac}
                  style={{
                    marginRight: SPACING.inline.md,
                    display: 'inline-block',
                    marginBottom: SPACING.unit.xxs
                  }}
                >
                  <span style={{
                    background: COLORS.backgrounds.lightGray,
                    border: `1px solid ${COLORS.borders.light}`,
                    color: COLORS.text.primary,
                    padding: `${SPACING.unit.xxxs} ${SPACING.unit.xs}`,
                    borderRadius: BORDER_RADIUS.xsmall,
                    fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                    marginRight: SPACING.inline.xxs
                  }}>
                    {ac}
                  </span>
                  {desc}
                </span>
              ))}
              <span style={{ marginLeft: SPACING.inline.md, display: 'inline-block' }}>
                <span style={{
                  background: COLORS.backgrounds.lightGray,
                  border: `1px solid ${COLORS.borders.light}`,
                  color: COLORS.text.primary,
                  padding: `${SPACING.unit.xxxs} ${SPACING.unit.xs}`,
                  borderRadius: BORDER_RADIUS.xsmall,
                  fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                  marginRight: SPACING.inline.xxs
                }}>
                  ✔️
                </span>
                Will verify payments by phone
              </span>
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search insurance company, acronym, or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search insurance company"
          style={{
            width: '100%',
            maxWidth: '480px',
            margin: `0 auto ${SPACING.stack.xl}`,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
            borderRadius: BORDER_RADIUS.medium,
            border: `1px solid ${COLORS.borders.medium}`,
            outline: 'none',
            transition: 'all 0.2s ease',
            display: 'block'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = COLORS.primary.main;
            e.currentTarget.style.boxShadow = `0 0 0 3px rgba(5, 150, 105, 0.1)`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = COLORS.borders.medium;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        {/* Company Cards */}
        <div style={{ marginBottom: SPACING.stack.xl }}>
          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: COLORS.text.secondary,
              padding: `${SPACING.unit.xxxl} 0`,
              fontSize: TYPOGRAPHY.fontSize.body.large
            }}>
              No companies found.
            </div>
          )}

          {filtered.map((company, index) => (
            <div key={company.name + index} style={{ marginBottom: SPACING.stack.md }}>
              {/* Company Header Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`company-details-${index}`}
                style={{
                  width: '100%',
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.primary.main,
                  borderRadius: BORDER_RADIUS.medium,
                  background: openIndex === index ? COLORS.backgrounds.greenLight : COLORS.backgrounds.white,
                  border: `1px solid ${COLORS.borders.light}`,
                  padding: `${SPACING.unit.lg} ${SPACING.unit.xl}`,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (openIndex !== index) {
                    e.currentTarget.style.background = COLORS.backgrounds.lightGray;
                    e.currentTarget.style.borderColor = COLORS.borders.medium;
                  }
                }}
                onMouseLeave={(e) => {
                  if (openIndex !== index) {
                    e.currentTarget.style.background = COLORS.backgrounds.white;
                    e.currentTarget.style.borderColor = COLORS.borders.light;
                  }
                }}
              >
                {company.name}
                <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h5, marginLeft: SPACING.inline.xs }}>
                  {openIndex === index ? '▲' : '▼'}
                </span>
              </button>

              {/* Company Details */}
              {openIndex === index && (
                <div
                  id={`company-details-${index}`}
                  style={{
                    borderRadius: BORDER_RADIUS.large,
                    padding: SPACING.card.compact,
                    marginTop: SPACING.stack.xs,
                    background: COLORS.backgrounds.white,
                    boxShadow: BOX_SHADOWS.small,
                    border: `1px solid ${COLORS.borders.light}`
                  }}
                >
                  <div style={{ fontSize: TYPOGRAPHY.fontSize.body.medium }}>
                    {/* Former Names */}
                    {company.formerNames && company.formerNames.length > 0 && (
                      <div style={{ marginBottom: SPACING.stack.md }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('formerNames')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Formerly:
                        </span>{' '}
                        {company.formerNames.join(', ')}
                      </div>
                    )}

                    {/* Contact Information */}
                    <div style={{ marginBottom: SPACING.stack.md }}>
                      {company.phone && (
                        <div style={{ marginBottom: SPACING.stack.xs }}>
                          <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                            {getFieldIcon('phone')}
                          </span>
                          <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                            Phone:
                          </span>
                          <a
                            href={`tel:${company.phone.replace(/[^\d]/g, '')}`}
                            style={{
                              textDecoration: 'none',
                              color: COLORS.primary.main,
                              marginLeft: SPACING.inline.xs
                            }}
                          >
                            {company.phone}
                          </a>
                        </div>
                      )}
                      {company.fax && (
                        <div style={{ marginBottom: SPACING.stack.xs }}>
                          <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                            {getFieldIcon('fax')}
                          </span>
                          <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                            Fax:
                          </span>{' '}
                          {company.fax}
                        </div>
                      )}
                      {company.email && (
                        <div style={{ marginBottom: SPACING.stack.xs }}>
                          <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                            {getFieldIcon('email')}
                          </span>
                          <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                            Email:
                          </span>
                          <a
                            href={`mailto:${company.email}`}
                            style={{
                              textDecoration: 'none',
                              color: COLORS.primary.main,
                              marginLeft: SPACING.inline.xs
                            }}
                          >
                            {company.email}
                          </a>
                        </div>
                      )}
                      {company.website && (
                        <div style={{ marginBottom: SPACING.stack.xs }}>
                          <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                            {getFieldIcon('website')}
                          </span>
                          <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                            Website:
                          </span>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: COLORS.primary.main,
                              marginLeft: SPACING.inline.xs
                            }}
                          >
                            {company.website.replace('https://', '').replace('www.', '')}
                          </a>
                        </div>
                      )}
                    </div>

                    <div style={{
                      borderBottom: `1px solid ${COLORS.borders.light}`,
                      margin: `${SPACING.stack.md} 0`
                    }}></div>

                    {/* Address & Office Hours */}
                    {company.address && (
                      <div style={{ marginBottom: SPACING.stack.md }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('address')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Address:
                        </span>{' '}
                        {company.address}
                      </div>
                    )}
                    {company.officeHours && (
                      <div style={{ marginBottom: SPACING.stack.md }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('officeHours')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Office Hours:
                        </span>{' '}
                        {company.officeHours}
                      </div>
                    )}

                    <div style={{
                      borderBottom: `1px solid ${COLORS.borders.light}`,
                      margin: `${SPACING.stack.md} 0`
                    }}></div>

                    {/* Document Requirements */}
                    {company.acblsadapos && company.acblsadapos.length > 0 && (
                      <div style={{ marginBottom: SPACING.stack.md }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('acblsadapos')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Structured Settlement Docs:
                        </span>
                        {company.acblsadapos.map((ac) => (
                          <span
                            key={ac}
                            title={acronymDescriptions[ac] || ac}
                            style={{
                              background: COLORS.backgrounds.lightGray,
                              border: `1px solid ${COLORS.borders.light}`,
                              color: COLORS.text.primary,
                              padding: `${SPACING.unit.xxxs} ${SPACING.unit.xs}`,
                              borderRadius: BORDER_RADIUS.xsmall,
                              fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                              marginLeft: SPACING.inline.xxs
                            }}
                          >
                            {ac}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Verify Payments */}
                    {typeof company.verifyPays !== 'undefined' && company.verifyPays !== '' && (
                      <div style={{ marginBottom: SPACING.stack.md }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('verifyPays')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Verify Pays by Phone:
                        </span>
                        {company.verifyPays === true ? (
                          <span style={{
                            color: COLORS.primary.main,
                            fontWeight: TYPOGRAPHY.fontWeight.semibold,
                            marginLeft: SPACING.inline.xs
                          }}>
                            Yes
                          </span>
                        ) : (
                          <span style={{
                            color: '#dc2626',
                            fontWeight: TYPOGRAPHY.fontWeight.semibold,
                            marginLeft: SPACING.inline.xs
                          }}>
                            No
                          </span>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    {company.notes && (
                      <div style={{ marginBottom: 0 }}>
                        <span style={{ fontSize: TYPOGRAPHY.fontSize.body.medium, marginRight: SPACING.inline.xs }}>
                          {getFieldIcon('notes')}
                        </span>
                        <span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.text.primary }}>
                          Notes:
                        </span>{' '}
                        {company.notes}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

