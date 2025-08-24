'use client';
import React, { useState } from 'react';
import MintBadge from '../components/MintBadge';

interface Company {
  name: string;
  formerNames?: string[];
  phone: string;
  fax: string;
  email: string;
  website: string;
  address: string;
  officeHours: string;
  verifyPays?: boolean | string;
  acblsadapos?: string[];
  notes?: string;
}

const acronymDescriptions: Record<string, string> = {
  AC: 'Assignment Confirmation',
  BL: 'Benefits Letter',
  SA: 'Settlement Agreement',
  DA: 'Disclosure Agreement',
  POS: 'Proof of Service',
};

const companies: Company[] = [
  {
    name: 'AIG (American General / Life Insurance Branch)',
    formerNames: ['AIG American General Life', 'American General Life Insurance Company of New York (NY Branch)'],
    phone: '800-888-2452',
    fax: '713-831-3028',
    email: 'customersupport@aig.com',
    website: 'https://www.aig.com',
    address: 'P.O. Box 305355, Nashville, TN 37230',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Allstate Life Insurance Company',
    phone: '800-366-1411',
    fax: '',
    email: 'AFRUnit@allstate.com',
    website: 'https://www.allstate.com',
    address: '3100 Sanders Road, Northbrook, IL 60062',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['AC', 'BL'],
    notes: '',
  },
  {
    name: 'Berkshire Hathaway Life Insurance Company of NE',
    phone: '800-624-5554',
    fax: '',
    email: '',
    website: 'https://www.berkshirehathaway.com/insurance/insurance.html',
    address: '1314 Douglas Street, Suite 1400, Omaha, NE 68102',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['AC', 'SA', 'QA'],
    notes: '',
  },
  {
    name: 'MassMutual Life Insurance Company',
    phone: '800-272-2216',
    fax: '',
    email: 'service@massmutual.com',
    website: 'https://www.massmutual.com',
    address: '1295 State Street, Springfield, MA 01111',
    officeHours: '',
    verifyPays: '',
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'MetLife',
    formerNames: ['Metropolitan Life Insurance Company'],
    phone: '800-638-5433',
    fax: '',
    email: '',
    website: 'https://www.metlife.com',
    address: 'P.O. Box 14587, Lexington, KY 40512',
    officeHours: '',
    verifyPays: '',
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'New York Life Insurance Company',
    phone: '800-225-5695',
    fax: '212-576-3500',
    email: 'customerservice@newyorklife.com',
    website: 'https://www.newyorklife.com',
    address: '51 Madison Avenue, New York, NY 10010',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Pacific Life Insurance Company',
    phone: '800-800-7646',
    fax: '949-420-6821',
    email: 'service@pacificlife.com',
    website: 'https://www.pacificlife.com',
    address: 'P.O. Box 9000, Newport Beach, CA 92658',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['BL'],
    notes: '',
  },
  {
    name: 'Prudential Insurance Company of America',
    phone: '800-778-2255',
    fax: '877-889-6446',
    email: 'contactus@prudential.com',
    website: 'https://www.prudential.com',
    address: 'P.O. Box 7392, Philadelphia, PA 19176',
    officeHours: '',
    verifyPays: false,
    acblsadapos: ['AC', 'SA', 'QA'],
    notes: "STLegal@prudential.com",
  },
  {
    name: 'Symetra Life Insurance Company',
    phone: '800-796-3872',
    fax: '866-817-2207',
    email: 'service@symetra.com',
    website: 'https://www.symetra.com',
    address: 'P.O. Box 34690, Seattle, WA 98124',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Transamerica Life Insurance Company',
    phone: '800-797-2643',
    fax: '800-553-6074',
    email: 'customercare@transamerica.com',
    website: 'https://www.transamerica.com',
    address: '6400 C Street SW, Cedar Rapids, IA 52499',
    officeHours: '',
    verifyPays: true,
    acblsadapos: ['BL', 'AC', 'QA', 'SA'],
    notes: 'When requesting ask for "Verification of Benefits"',
  },
  {
    name: 'American United Life Insurance Company',
    phone: '800-382-4000',
    fax: '',
    email: '',
    website: 'https://www.oneamerica.com',
    address: 'One American Square, Indianapolis, IN 46206',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Athene Annuity & Life Assurance Company',
    phone: '888-266-8489',
    fax: '',
    email: '',
    website: 'https://www.athene.com',
    address: 'P.O. Box 725449, Atlanta, GA 31139',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Brighthouse Life Insurance Company',
    formerNames: ['MetLife Assurance Company of Connecticut'],
    phone: '800-638-5433',
    fax: '',
    email: '',
    website: 'https://www.brighthousefinancial.com',
    address: '11225 North Community House Road, Charlotte, NC 28277',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Companion Life Insurance Company',
    phone: '800-753-0404',
    fax: '',
    email: '',
    website: 'https://www.companionlife.com',
    address: '7909 Parklane Road, Suite 200, Columbia, SC 29223',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'First Berkshire Hathaway Life Insurance Company',
    phone: '800-624-5554',
    fax: '',
    email: '',
    website: 'https://www.berkshirehathaway.com/insurance/insurance.html',
    address: '1314 Douglas Street, Suite 1400, Omaha, NE 68102',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Genworth Life Insurance Company',
    formerNames: ['GE Capital Assurance', 'General Electric Capital Assurance', 'GE Life & Annuity'],
    phone: '888-436-9678',
    fax: '804-281-6200',
    email: '',
    website: 'https://www.genworth.com',
    address: '6620 West Broad Street, Richmond, VA 23230',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Great American Life Insurance Company',
    phone: '800-854-3649',
    fax: '',
    email: '',
    website: 'https://www.greatamericaninsurancegroup.com',
    address: '301 E. Fourth Street, Cincinnati, OH 45202',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'John Hancock Life Insurance Company',
    phone: '800-624-5155',
    fax: '617-572-1571',
    email: '',
    website: 'https://www.johnhancock.com',
    address: 'P.O. Box 55979, Boston, MA 02205',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Liberty Life Assurance Company of Boston',
    phone: '800-451-7065',
    fax: '',
    email: '',
    website: 'https://www.libertymutual.com',
    address: '100 Liberty Way, Dover, NH 03820',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Minnesota Life Insurance Company',
    phone: '800-362-3141',
    fax: '',
    email: '',
    website: 'https://www.securian.com',
    address: '400 Robert Street North, St. Paul, MN 55101',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Mutual of Omaha Insurance Company',
    phone: '800-775-6000',
    fax: '',
    email: 'clientservices@mutualofomaha.com',
    website: 'https://www.mutualofomaha.com',
    address: 'Mutual of Omaha Plaza, Omaha, NE 68175',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Nationwide Life Insurance Company',
    phone: '800-848-6331',
    fax: '',
    email: 'customerservice@nationwide.com',
    website: 'https://www.nationwide.com',
    address: 'One Nationwide Plaza, Columbus, OH 43215',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Independent Life Insurance Company',
    formerNames: [],
    phone: '800-793-7474',
    fax: '',
    email: 'info@independent.life',
    website: 'https://www.independent.life',
    address: '8950 SW 74th Ct, Suite 2201, Miami, FL 33156',
    officeHours: '',
    verifyPays: true,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'USAA Life Insurance Company',
    formerNames: [],
    phone: '800-531-8722',
    fax: '',
    email: '',
    website: 'https://www.usaa.com',
    address: '9800 Fredericksburg Road, San Antonio, TX 78288',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Hartford Life Insurance Company',
    formerNames: ['Genworth Life Insurance Company', 'Hartford Life and Annuity Insurance Company'],
    phone: '800-862-6668',
    fax: '',
    email: '',
    website: 'https://www.genworth.com',
    address: '6620 West Broad Street, Richmond, VA 23230',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: 'Hartford Life business was acquired by Genworth in 2004. Some legacy policies may still be serviced under the Hartford name.'
  },
  {
    name: 'United States Life Insurance Company in the City of New York',
    formerNames: ['AIG', 'American General Life Insurance Company of New York'],
    phone: '800-221-9039',
    fax: '',
    email: '',
    website: 'https://www.corebridgefinancial.com',
    address: 'One World Financial Center, 200 Liberty Street, New York, NY 10281',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: '',
  },
  {
    name: 'Pacific Life & Annuity Company (NY)',
    formerNames: ['Pacific Life Insurance Company'],
    phone: '800-800-7646',
    fax: '',
    email: '',
    website: 'https://ssa.pacificlife.com',
    address: '700 Newport Center Drive, Newport Beach, CA 92660',
    officeHours: '',
    verifyPays: false,
    acblsadapos: [],
    notes: 'Handles NY-specific structured settlements.'
  },
];

function icon(label: string) {
  switch (label) {
    case 'phone': return '📞';
    case 'fax': return '📠';
    case 'email': return '📧';
    case 'website': return '🌐';
    case 'officeHours': return '🕒';
    case 'address': return '🏢';
    case 'formerNames': return '🔄';
    case 'verifyPays': return '✔️';
    case 'acblsadapos': return 'ℹ️';
    case 'notes': return '📝';
    default: return '';
  }
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [showLegend, setShowLegend] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  React.useEffect(() => {
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
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "4rem 0 3rem",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <MintBadge variant="compact" style={{ marginBottom: "2rem" }} />
            <div style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem"
            }}>
              Insurance Directory
            </div>
            
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "1.5rem",
              lineHeight: "1.2"
            }}>
              Structured Settlement Insurance Companies
            </h1>

            <p style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: "1.6"
            }}>
              Complete directory with contact information for insurance companies that provide structured settlement annuities. Search and verify payments instantly.
            </p>

            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <button onClick={() => {
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchInput) searchInput.focus();
              }} style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                🔍 Search Directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        background: '#f8fafc',
        padding: "48px 16px",
        minHeight: '50vh'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              aria-expanded={showLegend}
              aria-controls="acronym-legend"
              onClick={() => setShowLegend((v) => !v)}
              style={{
                background: 'white',
                border: '1px solid #d1d5db',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#059669";
                e.currentTarget.style.color = "#059669";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.color = "#374151";
              }}
            >
              {showLegend ? 'Hide Acronym Legend' : 'Show Acronym Legend'}
            </button>
            {showLegend && (
              <div id="acronym-legend" style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                <span style={{ 
                  fontWeight: '600',
                  marginRight: '1rem',
                  color: '#1f2937'
                }}>Acronym Legend:</span>
                {Object.entries(acronymDescriptions).map(([ac, desc]) => (
                  <span key={ac} style={{ marginRight: '1rem', display: 'inline-block', marginBottom: '0.25rem' }}>
                    <span style={{
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      color: '#1f2937',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginRight: '0.25rem'
                    }}>{ac}</span>
                    {desc}
                  </span>
                ))}
                <span style={{ marginLeft: '1rem', display: 'inline-block' }}>
                  <span style={{
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    color: '#1f2937',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    marginRight: '0.25rem'
                  }}>✔️</span>
                  Will verify payments by phone
                </span>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search insurance company, acronym, or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search insurance company"
            style={{
              width: '100%',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              fontSize: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              outline: 'none',
              transition: 'all 0.2s ease',
              display: 'block'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#059669";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <div style={{ marginBottom: '2rem' }}>
            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '3rem 0',
                fontSize: '1.125rem'
              }}>No companies found.</div>
            )}
            {filtered.map((c, i) => (
              <div key={c.name + i} style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`company-details-${i}`}
                  style={{
                    width: '100%',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#059669',
                    borderRadius: '8px',
                    background: openIndex === i ? '#e9f9f1' : '#fff',
                    border: '1px solid #e5e7eb',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (openIndex !== i) {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== i) {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  {c.name}
                  <span style={{ fontSize: '1.2rem', marginLeft: '8px' }}>{openIndex === i ? '▲' : '▼'}</span>
                </button>
                {openIndex === i && (
                  <div id={`company-details-${i}`} style={{
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginTop: '0.5rem',
                    background: '#fff',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontSize: '0.975rem' }}>
                      {c.formerNames && c.formerNames.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('formerNames')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Formerly:</span> {c.formerNames.join(', ')}
                        </div>
                      )}
                      
                      <div style={{ marginBottom: '1rem' }}>
                        {c.phone && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('phone')}</span>
                            <span style={{ fontWeight: '600', color: '#1f2937' }}>Phone:</span>
                            <a href={`tel:${c.phone.replace(/[^\d]/g, '')}`} style={{
                              textDecoration: 'none',
                              color: '#059669',
                              marginLeft: '0.5rem'
                            }}>{c.phone}</a>
                          </div>
                        )}
                        {c.fax && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('fax')}</span>
                            <span style={{ fontWeight: '600', color: '#1f2937' }}>Fax:</span> {c.fax}
                          </div>
                        )}
                        {c.email && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('email')}</span>
                            <span style={{ fontWeight: '600', color: '#1f2937' }}>Email:</span>
                            <a href={`mailto:${c.email}`} style={{
                              textDecoration: 'none',
                              color: '#059669',
                              marginLeft: '0.5rem'
                            }}>{c.email}</a>
                          </div>
                        )}
                        {c.website && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('website')}</span>
                            <span style={{ fontWeight: '600', color: '#1f2937' }}>Website:</span>
                            <a href={c.website} target="_blank" rel="noopener noreferrer" style={{
                              textDecoration: 'none',
                              color: '#059669',
                              marginLeft: '0.5rem'
                            }}>{c.website.replace('https://','').replace('www.','')}</a>
                          </div>
                        )}
                      </div>
                      
                      <div style={{ borderBottom: '1px solid #f0f0f0', margin: '1rem 0' }}></div>
                      
                      {c.address && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('address')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Address:</span> {c.address}
                        </div>
                      )}
                      {c.officeHours && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('officeHours')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Office Hours:</span> {c.officeHours}
                        </div>
                      )}
                      
                      <div style={{ borderBottom: '1px solid #f0f0f0', margin: '1rem 0' }}></div>
                      
                      {c.acblsadapos && c.acblsadapos.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('acblsadapos')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Structured Settlement Docs:</span>
                          {c.acblsadapos.map(ac => (
                            <span 
                              key={ac} 
                              title={acronymDescriptions[ac] || ac}
                              style={{
                                background: '#f3f4f6',
                                border: '1px solid #e5e7eb',
                                color: '#1f2937',
                                padding: '0.125rem 0.375rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                marginLeft: '0.25rem'
                              }}
                            >{ac}</span>
                          ))}
                        </div>
                      )}
                      
                      {typeof c.verifyPays !== 'undefined' && c.verifyPays !== '' && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('verifyPays')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Verify Pays by Phone:</span>
                          {c.verifyPays === true ? (
                            <span style={{ color: '#059669', fontWeight: '600', marginLeft: '0.5rem' }}>Yes</span>
                          ) : (
                            <span style={{ color: '#dc2626', fontWeight: '600', marginLeft: '0.5rem' }}>No</span>
                          )}
                        </div>
                      )}
                      
                      {c.notes && (
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '1rem', marginRight: '6px' }}>{icon('notes')}</span>
                          <span style={{ fontWeight: '600', color: '#1f2937' }}>Notes:</span> {c.notes}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #bbf7d0',
            marginTop: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#059669'
            }}>
              Need Help with Your Structured Settlement?
            </h2>
            <p style={{
              color: '#4b5563',
              fontSize: '1.125rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Get personalized guidance from Mint AI or calculate your settlement value with our advanced tools.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                💬 Chat with Mint AI
              </a>
              
              <a href="/pricing-calculator" style={{
                background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                📊 Calculate Value
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 