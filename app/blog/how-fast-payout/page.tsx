'use client';

import Link from 'next/link';

// Metadata is handled by the parent layout since this is a client component

export default function HowFastPayout() {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "2rem 0 3rem",
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
                boxShadow: '0 20px 60px rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.25)',
                textAlign: 'center'
              }}>
                {/* Speed Guide Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  marginBottom: '1.5rem',
                  border: '1px solid #93c5fd'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>⚡</span>
                  <span style={{ color: '#1d4ed8', fontWeight: 600, fontSize: '0.875rem' }}>SPEED GUIDE</span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2rem,5vw,2.75rem)',
                  fontWeight: '700',
                  color: '#1f2937',
                  lineHeight: '1.2',
                  marginBottom: '1rem'
                }}>
                  How Fast Can You Get Your Payout?
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  Complete timeline breakdown from application to cash in hand.
                </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link href="/pricing-calculator" style={{
                  background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                  minWidth: '200px',
                  textAlign: 'center'
                }}>
                  ⚡ Get Your Fastest Offer
                </Link>
                
                <Link href="/mint-intelligent-chat" style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                  minWidth: '200px',
                  textAlign: 'center'
                }}>
                  🤖 Ask Mint AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main style={{
        padding: '48px 16px',
        background: '#ffffff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          
          {/* Key Takeaways */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #f3f4f6',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#2563eb',
              marginBottom: '1rem'
            }}>Key Takeaways</h2>
            <ul style={{
              color: '#4b5563',
              lineHeight: '1.6',
              marginBottom: 0,
              paddingLeft: '1.5rem'
            }}>
              <li>Most payouts are completed within 30–45 days</li>
              <li>Some clients receive funds in as little as 24–72 hours after court approval</li>
              <li>Court approval is the main factor affecting timeline</li>
              <li>Proper documentation helps speed up the process</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <nav style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>Table of Contents</h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              lineHeight: '1.8'
            }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="#timeline" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Typical Timeline</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#process" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>The Process Explained</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#factors" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Factors Affecting Speed</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#expedite" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>How to Expedite</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#emergency" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Emergency Situations</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#faq" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </nav>

          {/* Introduction */}
          <section style={{ marginBottom: '3rem' }}>
            <p style={{ 
              color: '#4b5563', 
              lineHeight: '1.7', 
              fontSize: '1.125rem', 
              marginBottom: '1.5rem' 
            }}>
              When you need cash from your structured settlement, <strong>speed matters</strong>. While the process 
              typically takes 30–45 days, some clients receive their funds in as little as 24–72 hours after court approval. 
              Here's what you need to know about the timeline and how to get your money as quickly as possible.
            </p>
            <p style={{ 
              color: '#4b5563', 
              lineHeight: '1.7', 
              fontSize: '1.125rem' 
            }}>
              Structured settlement transfers are a legal and regulated process designed to protect your best interests. 
              However, that doesn't mean it has to be slow. With proper preparation and support from an experienced 
              buyer like SmarterPayouts, the journey from quote to cash can be surprisingly quick.
            </p>
          </section>

          {/* Timeline Breakdown */}
          <section id="timeline" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              ⏱️ Typical Timeline Breakdown
            </h2>
            
            {/* Timeline Visual */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #93c5fd',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {[
                  { period: 'Days 1-3', title: 'Initial Review', desc: 'Quote acceptance, document collection, and initial processing' },
                  { period: 'Days 4-14', title: 'Legal Preparation', desc: 'Court filings, legal documentation, and petition preparation' },
                  { period: 'Days 15-35', title: 'Court Review', desc: 'Judicial review, hearing scheduling, and approval process' },
                  { period: 'Days 36-45', title: 'Final Payment', desc: 'Court approval, fund transfer, and payment to you' }
                ].map((phase, index) => (
                  <div key={index}>
                    <div style={{
                      background: '#ffffff',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      height: '100%'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        display: 'inline-block',
                        marginBottom: '1rem'
                      }}>
                        {phase.period}
                      </div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>{phase.title}</h3>
                      <p style={{ 
                        color: '#6b7280', 
                        lineHeight: '1.6', 
                        marginBottom: 0, 
                        fontSize: '0.95rem' 
                      }}>
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
              Although each case is unique, structured settlement transfers generally follow this consistent timeline. 
              On average, the full process takes about 30 to 45 days. However, expedited cases can move faster, 
              especially when clients are prepared with their documents and responsive to requests.
            </p>
          </section>

          {/* Process Explained */}
          <section id="process" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              🔄 The Process Explained
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #bbf7d0'
            }}>
              <p style={{ 
                color: '#4b5563', 
                lineHeight: '1.7', 
                marginBottom: '1rem' 
              }}>
                Once you accept an offer, our team begins the legal and administrative process immediately. 
                We handle everything from document preparation to court filings and final disbursement. 
                Our goal is to make it as seamless and stress-free as possible.
              </p>
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #93c5fd'
              }}>
                <p style={{ 
                  color: '#1d4ed8', 
                  lineHeight: '1.6', 
                  marginBottom: 0, 
                  fontWeight: 500 
                }}>
                  💡 <strong>Partnership Approach:</strong> While we take care of the heavy lifting, your cooperation 
                  is essential. Promptly completing your application, submitting accurate documentation, and being 
                  responsive during the review phase will help us move swiftly.
                </p>
              </div>
            </div>
          </section>

          {/* Factors Affecting Speed */}
          <section id="factors" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              🎯 Factors Affecting Speed
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* What Slows Things Down */}
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #fecaca',
                  height: '100%'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#dc2626',
                    marginBottom: '1rem'
                  }}>
                    🐌 What Slows Things Down
                  </h3>
                  <ul style={{ 
                    color: '#4b5563', 
                    lineHeight: '1.6', 
                    marginBottom: 0,
                    paddingLeft: '1.5rem'
                  }}>
                    <li>Missing or incomplete paperwork</li>
                    <li>Delays in court scheduling</li>
                    <li>Jurisdiction-specific requirements</li>
                    <li>Unresponsive communication</li>
                    <li>Complex settlement structures</li>
                  </ul>
                </div>
              </div>

              {/* What Speeds Things Up */}
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                  height: '100%'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#059669',
                    marginBottom: '1rem'
                  }}>
                    ⚡ What Speeds Things Up
                  </h3>
                  <ul style={{ 
                    color: '#4b5563', 
                    lineHeight: '1.6', 
                    marginBottom: 0,
                    paddingLeft: '1.5rem'
                  }}>
                    <li>Complete information submission</li>
                    <li>Quick communication with case manager</li>
                    <li>Electronic signatures (DocuSign)</li>
                    <li>Expedited court jurisdictions</li>
                    <li>Emergency circumstances</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How to Expedite */}
          <section id="expedite" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              🚀 How to Expedite Your Payout
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: '📋', title: 'Prepare Documents', desc: 'Have all settlement documents, IDs, and paperwork ready before starting' },
                { icon: '💻', title: 'Go Digital', desc: 'Choose electronic communication and e-signatures to save days' },
                { icon: '📞', title: 'Stay Responsive', desc: 'Answer calls and emails promptly from your case manager' },
                { icon: '⚖️', title: 'Choose Fast Courts', desc: 'Some jurisdictions offer expedited review for compliant cases' }
              ].map((tip, index) => (
                <div key={index}>
                  <div style={{
                    background: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    gap: '1rem',
                    height: '100%'
                  }}>
                    <div style={{ fontSize: '2rem', flexShrink: 0 }}>{tip.icon}</div>
                    <div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>{tip.title}</h3>
                      <p style={{ 
                        color: '#6b7280', 
                        lineHeight: '1.6', 
                        marginBottom: 0, 
                        fontSize: '0.95rem' 
                      }}>
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Situations */}
          <section id="emergency" style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #fed7aa'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1.5rem'
              }}>
                🚨 Emergency Situations
              </h2>
              <p style={{ 
                color: '#4b5563', 
                lineHeight: '1.7', 
                marginBottom: '1rem' 
              }}>
                Life doesn't wait. If you're dealing with a medical emergency, eviction, or other time-sensitive crisis, 
                we're here to help. SmarterPayouts offers special assistance and faster handling for qualified emergencies.
              </p>
              <div style={{
                background: 'rgba(234, 88, 12, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fed7aa'
              }}>
                <p style={{ 
                  color: '#ea580c', 
                  lineHeight: '1.6', 
                  marginBottom: 0, 
                  fontWeight: 500 
                }}>
                  🏥 <strong>Emergency Priority:</strong> Let your case specialist know immediately about emergency 
                  situations. We'll prioritize your case, explore expedited court options, and do everything 
                  possible to get you your funds in time.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              ❓ Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  question: 'What\'s the fastest someone has received their money?',
                  answer: 'Our record is 24 hours after court approval for an emergency medical situation. With proper documentation and expedited court review, some clients receive funds within 2-3 days of approval.'
                },
                {
                  question: 'Can I get money before court approval?',
                  answer: 'No, court approval is legally required for structured settlement transfers. However, we can expedite the court process and have emergency procedures for urgent situations.'
                },
                {
                  question: 'What documents do I need to speed up the process?',
                  answer: 'You\'ll need your original settlement agreement, annuity contract, valid ID, and bank account information. Having these ready before starting can save 3-5 days.'
                },
                {
                  question: 'Do all courts take the same amount of time?',
                  answer: 'No, court timelines vary by jurisdiction. Some courts offer expedited review for straightforward cases, while others may take longer due to their schedules and procedures.'
                },
                {
                  question: 'How do I know if I qualify for emergency processing?',
                  answer: 'Emergency situations include medical crises, eviction notices, or other documented urgent financial needs. Contact us immediately to discuss your situation and explore expedited options.'
                },
                {
                  question: 'Will electronic signatures really speed things up?',
                  answer: 'Yes! Electronic signatures through DocuSign can save 5-7 days compared to mailing physical documents. It also reduces the risk of lost paperwork and delays.'
                }
              ].map((faq, index) => (
                <details key={index} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '1.25rem'
                }}>
                  <summary style={{
                    fontWeight: 600,
                        color: '#1f2937',
                    cursor: 'pointer',
                        fontSize: '1.1rem'
                  }}>
                      {faq.question}
                  </summary>
                  <div style={{
                    marginTop: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                      {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Mint AI Help Section */}
          <section style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid #93c5fd',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2563eb',
              marginBottom: '1rem'
            }}>
              🤖 Need Instant Answers About Speed?
            </h2>
            <p style={{ 
              color: '#4b5563', 
              fontSize: '1rem', 
              marginBottom: '1.5rem', 
              maxWidth: '600px', 
              margin: '0 auto 1.5rem' 
            }}>
              Mint AI can instantly answer questions about your specific timeline, expedite options, and emergency procedures. 
              Get personalized guidance based on your situation.
            </p>
            
            <Link href="/mint-intelligent-chat" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease'
            }}>
              💬 Ask Mint AI About Your Timeline
            </Link>
          </section>

          {/* Final CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              marginBottom: '2rem', 
              maxWidth: '600px', 
              margin: '0 auto 2rem',
              opacity: 0.9
            }}>
              Use our free Early Payout Calculator to see what your structured settlement payments are worth today.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              <Link href="/pricing-calculator" style={{
                background: '#ffffff',
                color: '#047857',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                ⚡ Calculate Your Offer
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                minWidth: '200px',
                textAlign: 'center'
              }}>
                🤖 Chat with Mint AI
              </Link>
            </div>
            
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                🤖 Get instant timeline estimates and personalized speed tips with Mint AI!
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}