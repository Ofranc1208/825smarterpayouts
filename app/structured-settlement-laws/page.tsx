import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Structured Settlement Federal Law | SmarterPayouts',
  description: 'Learn about the key federal laws, tax rules, and court approval process governing structured settlements in the United States.',
  robots: 'index, follow',
};

export default function StructuredSettlementFederalLaw() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "5rem 0 4rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem"
          }}>
            Legal Information
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            ⚖️ Structured Settlement Federal Law
          </h1>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: "1.6"
          }}>
            Understanding the key federal laws, tax rules, and court approval processes governing structured settlements in the United States.
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Link href="/pricing-calculator" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(9, 180, 77, 0.2)"
            }}>💰 Get Your Quote</Link>
            <Link href="/mint-intelligent-chat" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              boxShadow: "0 4px 6px rgba(139, 92, 246, 0.2)"
            }}>💬 Chat with Mint AI</Link>
          </div>
        </div>
      </section>

      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '48px 0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          
          {/* Attorney Disclaimer */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 10%, #f59e0b 100%)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
            border: '1px solid #f59e0b',
            boxShadow: '0 4px 6px rgba(245, 158, 11, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ⚠️ Legal Disclaimer
            </h3>
            <p style={{
              color: '#92400e',
              lineHeight: '1.6',
              fontSize: '0.95rem',
              margin: '0'
            }}>
              <strong>Important:</strong> The information provided on this page represents laws we have gathered for informational purposes only. 
              Laws change frequently and interpretations may vary. <strong>Always consult with a qualified attorney</strong> specializing in structured settlements 
              to ensure the accuracy and applicability of these laws to your specific situation. This information should not be considered legal advice.
            </p>
          </div>
          {/* Key Federal Laws Section */}
          <section style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>📋 Key Federal Laws Governing Structured Settlements</h2>
            
            <article style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>🏛️ Periodic Payment Settlement Act of 1982</h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                The <strong>Periodic Payment Settlement Act of 1982</strong> (Public Law 97-473) was enacted to encourage the use of structured settlements for tort victims. It provides significant tax benefits for both payees and qualified assignees under:
              </p>
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #d1d5db'
              }}>
                <span style={{
                  background: '#059669',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>IRC § 104(a)(2)</span>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>Excludes damages received on account of personal physical injuries or sickness from gross income.</p>
              </div>
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #d1d5db'
              }}>
                <span style={{
                  background: '#059669',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>IRC § 130</span>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>Allows qualified assignments of periodic payment obligations, enabling third parties to assume payment responsibilities without adverse tax consequences.</p>
              </div>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                margin: '0'
              }}>
                This law ensures that structured settlement payments are tax-free to the recipient and promotes long-term financial security for injury victims.
              </p>
            </article>
            <article style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>🛡️ Structured Settlement Protection Act of 2002</h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                The <strong>Structured Settlement Protection Act of 2002</strong> (SSPA) was enacted as part of the Victims of Terrorism Tax Relief Act. It requires <strong>court approval</strong> for any transfer (sale) of structured settlement payment rights. Key provisions include:
              </p>
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #d1d5db'
              }}>
                <span style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>IRC § 5891</span>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>Imposes a <strong>40% excise tax</strong> on any transfer of structured settlement payment rights that is not approved in advance by a court or responsible administrative authority under applicable state law.</p>
              </div>
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #d1d5db'
              }}>
                <span style={{
                  background: '#8b5cf6',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>Best Interest</span>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>Ensures that transfers are in the "best interest" of the payee and their dependents, and that the payee has received independent professional advice.</p>
              </div>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                margin: '0'
              }}>
                This law protects structured settlement recipients from predatory practices and ensures judicial oversight of all transfers.
              </p>
            </article>
            
            <article style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '0',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>🏢 Victims of Terrorism Tax Relief Act of 2001</h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6',
                margin: '0'
              }}>
                This Act includes provisions that further protect structured settlement holders, especially those affected by terrorism or certain disasters. It clarifies and strengthens the requirements for court approval and the tax treatment of structured settlements.
              </p>
            </article>
          </section>
          <section style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>⚖️ Court Approval Process</h2>
            <p style={{
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '1.04rem'
            }}>
              To sell or transfer structured settlement payment rights, federal law (and most state laws) require <strong>court approval</strong>. The process generally involves:
            </p>
            <ol style={{
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '1.03rem',
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.75rem' }}>Filing a petition with the appropriate state court outlining the terms of the transfer.</li>
              <li style={{ marginBottom: '0.75rem' }}>Notifying all interested parties, including the original annuity issuer and any dependents.</li>
              <li style={{ marginBottom: '0.75rem' }}>Attending a court hearing where a judge will determine if the transfer is in the "best interest" of the payee and their family, considering their financial needs and circumstances.</li>
              <li style={{ marginBottom: '0.75rem' }}>Obtaining a court order approving (or denying) the transfer.</li>
            </ol>
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #f59e0b'
            }}>
              <p style={{
                color: '#92400e',
                lineHeight: '1.6',
                fontSize: '1.04rem',
                margin: '0'
              }}>
                <strong>⚠️ Note:</strong> Transfers made without court approval are subject to a 40% excise tax and may be void under federal law.
              </p>
            </div>
          </section>
          <section style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>💰 Tax Implications</h2>
            <ul style={{
              color: '#4b5563',
              lineHeight: '1.6',
              fontSize: '1.03rem',
              paddingLeft: '1.5rem',
              margin: '0'
            }}>
              <li style={{ marginBottom: '0.75rem' }}><strong>Tax-Exempt Status:</strong> Structured settlement payments are generally tax-free to the recipient under <strong>IRC § 104(a)(2)</strong>.</li>
              <li style={{ marginBottom: '0.75rem' }}><strong>Transfers:</strong> If a payee sells their payment rights, the lump sum received may be taxable, and the transfer must be court-approved to avoid excise tax under <strong>IRC § 5891</strong>.</li>
              <li style={{ marginBottom: '0' }}><strong>Qualified Assignments:</strong> Payments made by a qualified assignee remain tax-free if all requirements are met.</li>
            </ul>
          </section>
          <section style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>📚 References & Further Reading</h2>
            <ul style={{
              color: '#4b5563',
              lineHeight: '1.6',
              fontSize: '1.03rem',
              paddingLeft: '1.5rem',
              margin: '0'
            }}>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.law.cornell.edu/uscode/text/26/104" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>26 U.S. Code § 104 - Compensation for injuries or sickness</a></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.law.cornell.edu/uscode/text/26/130" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>26 U.S. Code § 130 - Certain personal injury liability assignments</a></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.law.cornell.edu/uscode/text/26/5891" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>26 U.S. Code § 5891 - Structured settlement factoring transactions</a></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.congress.gov/bill/97th-congress/house-bill/5470" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>Periodic Payment Settlement Act of 1982 (Public Law 97-473)</a></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.congress.gov/bill/107th-congress/house-bill/2884" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>Victims of Terrorism Tax Relief Act of 2001</a></li>
              <li style={{ marginBottom: '0' }}><a href="https://www.nacccs.org/structured-settlement-protection-acts/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>National Association of Settlement Purchasers: State Protection Acts</a></li>
            </ul>
          </section>
          <section style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>🔗 Additional Resources</h2>
            <ul style={{
              color: '#4b5563',
              lineHeight: '1.6',
              fontSize: '1.03rem',
              paddingLeft: '1.5rem',
              margin: '0'
            }}>
              <li style={{ marginBottom: '0.75rem' }}><Link href="/structured-settlement-laws-by-state" style={{ color: '#059669', textDecoration: 'none', fontWeight: '500' }}>Structured Settlement Laws by State</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><a href="https://www.irs.gov/pub/irs-pdf/p4345.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>IRS Publication 4345: Settlements – Taxability</a></li>
              <li style={{ marginBottom: '0' }}><a href="https://www.justice.gov/crt/structured-settlement-fact-sheet" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>U.S. Department of Justice: Structured Settlement Fact Sheet</a></li>
            </ul>
          </section>
        </div>
      </main>

      {/* Final CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Need Help with Your Structured Settlement?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Get your instant quote or chat with Mint AI to understand how federal laws apply to your specific situation.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/pricing-calculator" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(9, 180, 77, 0.3)'
            }}>
              💰 Get Your Instant Quote
            </Link>
            <Link href="/mint-intelligent-chat" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              💬 Chat with Mint AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 