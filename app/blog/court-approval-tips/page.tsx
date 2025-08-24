'use client';

import Link from 'next/link';
import Image from 'next/image';

// Metadata is handled by the parent layout since this is a client component

export default function CourtApprovalTips() {
  return (
    <>
      {/* Modern Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 50%, #fde047 100%)',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 60px rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.25)',
                textAlign: 'center'
              }}>
                {/* Legal Guide Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  marginBottom: '1.5rem',
                  border: '1px solid #fde047'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>⚖️</span>
                  <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.875rem' }}>LEGAL GUIDE</span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2rem,5vw,2.75rem)',
                  fontWeight: '700',
                  color: '#1f2937',
                  lineHeight: '1.2',
                  marginBottom: '1rem'
                }}>
                  Court Approval Tips for Settlement Sales
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  Expert guidance to prepare, present your case, and maximize approval chances.
                </p>

                <Link href="/pricing-calculator" style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#ffffff',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 25px rgba(245,158,11,0.4)';}}
                onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 15px rgba(245,158,11,0.3)';}}>
                  ⚖️ Get Court-Ready Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="container py-5">
        <article className="mx-auto" style={{ maxWidth: '800px' }}>
          
          {/* Key Success Factors */}
          <div className="bg-light p-4 rounded mb-4" style={{ background:'#f8fafc', border:'1px solid #f3f4f6' }}>
            <h2 className="h5 fw-bold mb-3" style={{ color:'#f59e0b' }}>Key Success Factors</h2>
            <ul className="mb-0" style={{ color:'#4b5563', lineHeight:'1.6' }}>
              <li>Complete documentation and clear financial need explanation</li>
              <li>Understanding of all terms and honest, transparent communication</li>
              <li>Professional preparation and adherence to state requirements</li>
              <li>Expert guidance from experienced settlement companies</li>
            </ul>
          </div>

          {/* What is Court Approval */}
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-4" style={{ color: '#1f2937' }}>
              🏛️ What is Court Approval?
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #fde047'
            }}>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                Court approval is a <strong>legal requirement</strong> for selling your structured settlement. 
                A judge reviews your case to ensure the sale is in your best interest and complies with 
                state and federal law.
              </p>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fde047'
              }}>
                <p style={{ color: '#d97706', lineHeight: '1.6', marginBottom: 0, fontWeight: 500 }}>
                  🛡️ <strong>Protection Purpose:</strong> This process protects you from predatory practices 
                  and ensures you fully understand the transaction before proceeding.
                </p>
              </div>
            </div>
          </section>

          {/* Top 7 Tips */}
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-4" style={{ color: '#1f2937' }}>
              🎯 Top 7 Tips for Court Approval
            </h2>
            
            <div className="row g-4">
              {[
                {
                  num: '1',
                  title: 'Gather All Required Documents',
                  desc: 'Bring your settlement agreement, payment schedule, government-issued ID, and the sale agreement. Missing paperwork is a common reason for delays.',
                  icon: '📋'
                },
                {
                  num: '2', 
                  title: 'Prepare a Clear Statement of Need',
                  desc: 'Judges want to know why you are selling. Be honest and specific about your financial goals (debt, medical bills, education, home purchase).',
                  icon: '💬'
                },
                {
                  num: '3',
                  title: 'Understand the Terms',
                  desc: 'Be ready to explain the sale terms, including the lump sum, discount rate, and fees. Demonstrating understanding shows informed decision-making.',
                  icon: '📊'
                },
                {
                  num: '4',
                  title: 'Consult an Advisor',
                  desc: 'Some states require independent professional advice. Even if not required, consulting a financial advisor or attorney helps preparation.',
                  icon: '🤝'
                },
                {
                  num: '5',
                  title: 'Be Honest and Transparent',
                  desc: 'Answer all questions truthfully. Judges appreciate candor and may deny approval if they sense uncertainty or incomplete information.',
                  icon: '💯'
                },
                {
                  num: '6',
                  title: 'Review State Requirements',
                  desc: 'Each state has unique laws and forms. Check your state\'s specific requirements and compliance needs beforehand.',
                  icon: '📍'
                },
                {
                  num: '7',
                  title: 'Arrive Early & Dress Professionally',
                  desc: 'Treat the hearing like any important legal proceeding. Arriving early and dressing professionally shows respect for the process.',
                  icon: '👔'
                }
              ].map((tip, index) => (
                <div key={index} className="col-md-6">
                  <div style={{
                    background: '#ffffff',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    height: '100%'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        flexShrink: 0
                      }}>
                        {tip.num}
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>{tip.icon}</div>
                    </div>
                    <h3 className="h6 fw-semibold mb-2" style={{ color: '#1f2937' }}>{tip.title}</h3>
                    <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0, fontSize: '0.95rem' }}>
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Judges Look For */}
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-4" style={{ color: '#1f2937' }}>
              👨‍⚖️ What Judges Look For
            </h2>
            
            <div className="row g-4">
              {/* Positive Indicators */}
              <div className="col-md-6">
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                  height: '100%'
                }}>
                  <h3 className="h4 fw-bold mb-3" style={{ color: '#059669' }}>
                    ✅ Positive Indicators
                  </h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: 0 }}>
                    <li>Clear, legitimate financial need</li>
                    <li>Complete understanding of terms</li>
                    <li>All required documentation present</li>
                    <li>Reasonable use of proceeds</li>
                    <li>No signs of pressure or coercion</li>
                    <li>Professional advisor consultation</li>
                  </ul>
                </div>
              </div>

              {/* Red Flags */}
              <div className="col-md-6">
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #fecaca',
                  height: '100%'
                }}>
                  <h3 className="h4 fw-bold mb-3" style={{ color: '#dc2626' }}>
                    🚩 Red Flags to Avoid
                  </h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: 0 }}>
                    <li>Vague or frivolous reasons for selling</li>
                    <li>Lack of understanding of terms</li>
                    <li>Missing critical documents</li>
                    <li>Signs of being pressured to sell</li>
                    <li>Unreasonable or risky spending plans</li>
                    <li>Previous multiple unsuccessful attempts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Questions from Judges */}
          <section className="mb-5">
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #bae6fd'
            }}>
              <h2 className="h3 fw-bold mb-4" style={{ color: '#0369a1' }}>
                ❓ Common Questions from Judges
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Be prepared to answer these typical questions clearly and confidently:
              </p>
              
              <div className="row g-3">
                {[
                  'Why are you selling your structured settlement?',
                  'Do you understand the terms of this sale?',
                  'Have you consulted a financial advisor or attorney?', 
                  'What will you do with the lump sum payment?',
                  'Are you under any pressure to sell?',
                  'Do you understand you\'re giving up future payments?'
                ].map((question, index) => (
                  <div key={index} className="col-md-6">
                    <div style={{
                      background: '#ffffff',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <p style={{ color: '#1f2937', fontWeight: 500, marginBottom: 0, fontSize: '0.95rem' }}>
                        "{question}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* State Requirements */}
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-4" style={{ color: '#1f2937' }}>
              📍 State-Specific Requirements
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #fed7aa'
            }}>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                Each state has unique laws governing structured settlement sales. Some require additional 
                disclosures, waiting periods, or independent professional advice.
              </p>
              <div style={{
                background: 'rgba(234, 88, 12, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fed7aa',
                marginBottom: '1rem'
              }}>
                <p style={{ color: '#ea580c', lineHeight: '1.6', marginBottom: 0, fontWeight: 500 }}>
                  📋 <strong>Important:</strong> Always check your state's specific requirements before proceeding. 
                  Failure to comply with state laws can result in denial or delays.
                </p>
              </div>
              <Link href="/structured-settlement-info-hub/state-laws" style={{
                background: '#ffffff',
                color: '#ea580c',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid #ea580c',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.background='#ea580c';e.currentTarget.style.color='#ffffff';}}
              onMouseLeave={(e)=>{e.currentTarget.style.background='#ffffff';e.currentTarget.style.color='#ea580c';}}>
                📍 View State Laws Guide
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-4" style={{ color: '#1f2937' }}>
              ❓ Frequently Asked Questions
            </h2>
            <div className="accordion" id="faqAccordion">
              {[
                {
                  id: 'faq1',
                  question: 'What happens if my court approval is denied?',
                  answer: 'If denied, you can address the judge\'s concerns and reapply. Common reasons include incomplete documentation, unclear financial need, or not understanding the terms. Your settlement company can help you prepare a stronger application.'
                },
                {
                  id: 'faq2',
                  question: 'How long does the court approval process take?',
                  answer: 'Most hearings are scheduled within 30–45 days of your application. The process may be faster or slower depending on your state and court schedule. Emergency situations may qualify for expedited review.'
                },
                {
                  id: 'faq3',
                  question: 'Do I need an attorney for the court hearing?',
                  answer: 'While not always required, having legal representation can be beneficial, especially for complex cases. Some states require independent professional advice. Your settlement company can guide you on your state\'s requirements.'
                },
                {
                  id: 'faq4',
                  question: 'Can I sell only part of my structured settlement?',
                  answer: 'Yes, partial sales are often approved more easily than full sales. This allows you to get immediate cash while preserving some future income, which judges typically view more favorably.'
                },
                {
                  id: 'faq5',
                  question: 'What documents do I need for court approval?',
                  answer: 'You typically need your settlement agreement, payment schedule, government-issued ID, and the sale agreement. Some states require additional disclosures, financial statements, or professional advisor opinions.'
                },
                {
                  id: 'faq6',
                  question: 'Will the court hearing be public?',
                  answer: 'Court hearings are typically public record, though judges may sometimes allow private hearings for sensitive cases. Your settlement company can advise you on what to expect in your jurisdiction.'
                }
              ].map((faq, index) => (
                <div key={index} className="accordion-item mb-3" style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                  <h3 className="accordion-header">
                    <button 
                      className="accordion-button collapsed fw-semibold" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#${faq.id}`}
                      style={{ 
                        background: '#f9fafb',
                        border: 'none',
                        color: '#1f2937',
                        fontSize: '1.1rem'
                      }}
                    >
                      {faq.question}
                    </button>
                  </h3>
                  <div id={faq.id} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ color: '#4b5563', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expert Support */}
          <section className="mb-5">
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #bbf7d0'
            }}>
              <h2 className="h3 fw-bold mb-3" style={{ color: '#059669' }}>
                🤝 Expert Support Makes the Difference
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                SmarterPayouts has helped thousands of clients successfully navigate the court approval process. 
                Our experienced team knows what judges look for and how to present your case effectively.
              </p>
              <div className="row g-3">
                {[
                  '✅ Document preparation and review',
                  '✅ State law compliance guidance',
                  '✅ Court filing and scheduling',
                  '✅ Hearing preparation coaching'
                ].map((benefit, index) => (
                  <div key={index} className="col-md-6">
                    <p style={{ color: '#059669', fontWeight: 500, marginBottom: 0 }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            border: '1px solid #fde047',
            marginTop: '3rem'
          }}>
            <h2 className="h3 fw-bold mb-3" style={{ color: '#f59e0b' }}>
              Ready for Court Approval?
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Get your court-ready quote and expert guidance through the approval process.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing-calculator" style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 25px rgba(245,158,11,0.4)';}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 15px rgba(245,158,11,0.3)';}}>
                ⚖️ Get Court-Ready Quote
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                background: 'rgba(255,255,255,0.9)',
                color: '#f59e0b',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px solid #f59e0b',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.background='#f59e0b';e.currentTarget.style.color='#ffffff';}}
              onMouseLeave={(e)=>{e.currentTarget.style.background='rgba(255,255,255,0.9)';e.currentTarget.style.color='#f59e0b';}}>
                🤖 Chat with Mint AI
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}