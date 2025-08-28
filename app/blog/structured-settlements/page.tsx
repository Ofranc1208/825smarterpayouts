'use client';

import Link from 'next/link';
import Image from 'next/image';

// Metadata is handled by the parent layout since this is a client component

export default function StructuredSettlements() {
  return (
    <>
      {/* Modern Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '100%',
              maxWidth: '900px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 60px rgba(5,150,105,0.12)',
                border: '1px solid rgba(5,150,105,0.25)',
                textAlign: 'center'
              }}>
                {/* Complete Guide Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  marginBottom: '1.5rem',
                  border: '1px solid #a7f3d0'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>📚</span>
                  <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.875rem' }}>COMPLETE GUIDE</span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2rem,5vw,2.75rem)',
                  fontWeight: '700',
                  color: '#1f2937',
                  lineHeight: '1.2',
                  marginBottom: '1rem'
                }}>
                  Understanding Structured Settlements
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  Everything you need to know about structured settlements, how they work, and your options.
                </p>

                <Link href="/pricing-calculator" style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(5,150,105,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(5,150,105,0.3)';
                }}>
                  💰 See Your Settlement Value
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main style={{ 
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem',
        marginTop: '1rem' // Add space to account for navigation
      }}>
        <article style={{ 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          
          {/* Key Takeaways */}
          <div style={{ 
            background: '#f8fafc', 
            border: '1px solid #f3f4f6',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2.5rem'
          }}>
            <h2 style={{ 
              color: '#059669',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>Key Takeaways</h2>
            <ul style={{ 
              color: '#4b5563', 
              lineHeight: '1.6',
              marginBottom: 0,
              paddingLeft: '1.5rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>Structured settlements provide long-term, tax-free financial security for injury and lawsuit claimants.</li>
              <li style={{ marginBottom: '0.5rem' }}>Payments are funded by annuities and can be tailored to individual needs.</li>
              <li style={{ marginBottom: '0.5rem' }}>You can sell your future payments for cash, with court approval, if your needs change.</li>
              <li style={{ marginBottom: 0 }}>SmarterPayouts offers a transparent, fast, and secure process for accessing your funds.</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>Table of Contents</h2>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              lineHeight: '1.8'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#intro" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>What Is a Structured Settlement?</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#history" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>A Brief History</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#how-it-works" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>How Structured Settlements Work</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#pros-cons" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Pros and Cons</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#tax" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Tax Implications</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#cash-out" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>Why Cash Out?</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#how-to-sell" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>How to Sell Your Payments</a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#faq" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>FAQ</a>
              </li>
            </ul>
          </nav>

          {/* Article Introduction */}
          <section id="intro" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              💼 What Is a Structured Settlement?
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem' }}>
              <strong>Structured settlements</strong> are a powerful financial tool designed to provide long-term security 
              and peace of mind for individuals who have received compensation from personal injury, wrongful death, or 
              other legal claims. Instead of a single lump sum, recipients receive a series of scheduled payments, often 
              funded by an annuity from a highly rated insurance company.
            </p>
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem' }}>
              This arrangement ensures a steady stream of income, helping claimants manage medical expenses, living costs, 
              and future needs without the risk of quickly spending a large sum.
            </p>
          </section>

          {/* History Section */}
          <section id="history" style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #fde047',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                color: '#92400e',
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                📜 A Brief History of Structured Settlements
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                Structured settlements originated in the United States in the 1970s, following high-profile cases like 
                the Dalkon Shield litigation. Lawmakers recognized that many injury victims who received large lump sums 
                quickly exhausted their funds, leaving them financially vulnerable.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                In response, Congress passed legislation encouraging the use of structured settlements, including the 
                <strong> Periodic Payment Settlement Act of 1982</strong>. This act provided tax advantages for recipients 
                and helped establish structured settlements as a preferred method of compensation.
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: 0 }}>
                Today, structured settlements are widely used in the U.S., Canada, and other countries. They are 
                especially common in cases involving minors, catastrophic injuries, or long-term care needs.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              ⚙️ How Structured Settlements Work
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🏢</span>
                  </div>
                  <h3 style={{ 
                    color: '#1f2937',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>Annuity Purchase</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    The defendant or their insurer purchases an annuity from a reputable insurance company 
                    to fund your payment schedule.
                  </p>
                </div>
              </div>

              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>📅</span>
                  </div>
                  <h3 style={{ 
                    color: '#1f2937',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>Custom Schedule</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    Payments can be customized—monthly, quarterly, annually, or even as future 
                    lump sums for major expenses.
                  </p>
                </div>
              </div>

              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                  </div>
                  <h3 style={{ 
                    color: '#1f2937',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>Protection</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    The insurance company assumes investment risk, so you don't worry about 
                    market fluctuations or outliving your funds.
                  </p>
                </div>
              </div>

              <div>
                <div style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  height: '100%'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>💸</span>
                  </div>
                  <h3 style={{ 
                    color: '#1f2937',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>Tax-Free</h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0 }}>
                    Recipients benefit from guaranteed, tax-free payments for the duration 
                    of the agreement, often for life.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section id="pros-cons" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              ⚖️ Pros and Cons of Structured Settlements
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Benefits */}
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                  height: '100%'
                }}>
                  <h3 style={{ 
                    color: '#059669',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    ✅ Benefits
                  </h3>
                  <ul style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: 0 }}>
                    <li>Guaranteed, tax-free payments</li>
                    <li>Customizable payment schedules</li>
                    <li>Protection from market risk and poor investment choices</li>
                    <li>Financial security for the future</li>
                    <li>Especially beneficial for minors and long-term care needs</li>
                  </ul>
                </div>
              </div>

              {/* Drawbacks */}
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #fecaca',
                  height: '100%'
                }}>
                  <h3 style={{ 
                    color: '#dc2626',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    ⚠️ Drawbacks
                  </h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                    The main drawback is <strong>inflexibility</strong>. If your financial situation changes, 
                    accessing funds ahead of schedule can be challenging.
                  </p>
                  <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: 0 }}>
                    Selling future payments requires court approval and may result in receiving 
                    less than the total value of the annuity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Implications */}
          <section id="tax" style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #bae6fd'
            }}>
              <h2 style={{ 
                color: '#0369a1',
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                🧾 Tax Implications of Structured Settlements
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                One of the biggest advantages of structured settlements is that payments for personal injury or 
                wrongful death claims are generally <strong>tax-free under U.S. law</strong>. This means recipients 
                do not pay federal or state income tax on their periodic payments.
              </p>
              <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fbbf24',
                marginBottom: 0
              }}>
                <p style={{ color: '#92400e', lineHeight: '1.6', marginBottom: 0, fontWeight: 500 }}>
                  ⚠️ <strong>Important:</strong> If you sell your future payments for a lump sum, the proceeds may be 
                  subject to taxes or fees. It's important to consult a tax professional before making any decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Why Cash Out */}
          <section id="cash-out" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              💰 Why Cash Out Your Structured Settlement?
            </h2>
            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              Life is unpredictable. You may face unexpected expenses—medical emergencies, debt, education costs, 
              or investment opportunities. In these situations, waiting years for your payments may not be practical.
            </p>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { icon: '🏥', title: 'Medical Emergencies', desc: 'Unexpected health expenses not covered by insurance' },
                { icon: '🎓', title: 'Education', desc: 'Invest in your future with immediate educational funding' },
                { icon: '🏠', title: 'Real Estate', desc: 'Purchase a home or investment property opportunity' },
                { icon: '💼', title: 'Business', desc: 'Start or expand a business with immediate capital' }
              ].map((item, index) => (
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
                    <div style={{ fontSize: '2rem', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <h3 style={{ 
                        color: '#1f2937',
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                      }}>{item.title}</h3>
                      <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0, fontSize: '0.95rem' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '1.125rem' }}>
              Selling all or part of your structured settlement can provide the immediate cash you need to take 
              control of your finances. SmarterPayouts helps you unlock the value of your settlement quickly 
              and securely with no hidden fees or obligations.
            </p>
          </section>

          {/* How to Sell */}
          <section id="how-to-sell" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              📋 How to Sell Your Structured Settlement Payments
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { num: '1', title: 'Get Free Quote', desc: 'Use our Early Payout Calculator for an instant, no-obligation estimate of your settlement value.' },
                { num: '2', title: 'Review & Ask', desc: 'Review your personalized offer and ask questions—our expert team is here to help you understand every detail.' },
                { num: '3', title: 'Digital Paperwork', desc: 'Complete all necessary paperwork digitally with secure DocuSign technology.' },
                { num: '4', title: 'Court Approval', desc: 'We handle the entire court approval process for you, ensuring everything meets legal requirements.' },
                { num: '5', title: 'Get Your Cash', desc: 'Once approved, receive your funds by direct deposit, check, or in-person delivery.' }
              ].map((step, index) => (
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
                    <div style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: '#ffffff',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <h3 style={{ 
                        color: '#1f2937',
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                      }}>{step.title}</h3>
                      <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: 0, fontSize: '0.95rem' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              ❓ Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  id: 'faq1',
                  question: 'Are structured settlements safe?',
                  answer: 'Yes. Payments are funded by highly rated insurance companies and are protected by state and federal regulations. The insurance companies backing these settlements are carefully selected for their financial stability.'
                },
                {
                  id: 'faq2',
                  question: 'Can I sell only part of my settlement?',
                  answer: 'Absolutely. You can sell all or just a portion of your future payments, depending on your needs. This flexibility allows you to get immediate cash while preserving some future income.'
                },
                {
                  id: 'faq3',
                  question: 'How long does the selling process take?',
                  answer: 'Most transactions are completed within 30–45 days, depending on court schedules and documentation. Our team works diligently to expedite the process while ensuring all legal requirements are met.'
                },
                {
                  id: 'faq4',
                  question: 'Will I owe taxes if I sell my payments?',
                  answer: 'The lump sum you receive may be subject to taxes or fees. Since tax situations vary by individual, we recommend consulting with a qualified tax professional for personalized advice.'
                },
                {
                  id: 'faq5',
                  question: 'Why choose SmarterPayouts?',
                  answer: 'We offer transparent quotes, fast service, and a customer-first approach. Our experienced team guides you every step of the way, ensuring you understand the process and feel confident in your decision.'
                }
              ].map((faq, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    background: '#f9fafb',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{ 
                      color: '#1f2937',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {faq.question}
                    </h3>
                  </div>
                  <div style={{ 
                    padding: '1.5rem',
                    color: '#4b5563', 
                    lineHeight: '1.6' 
                  }}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            border: '1px solid #bbf7d0',
            marginTop: '3rem'
          }}>
            <h2 style={{ 
              color: '#059669',
              fontSize: '1.75rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              See What Your Settlement Is Worth
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Use our free Early Payout Calculator to get a personalized quote — without phone calls or hidden steps.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pricing-calculator" style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(5,150,105,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(5,150,105,0.3)';
              }}>
                💰 Get Your Instant Offer
              </Link>
              
              <Link href="/mint-intelligent-chat" style={{
                background: 'rgba(255,255,255,0.9)',
                color: '#059669',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px solid #059669',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#059669';
              }}>
                🤖 Chat with Mint AI
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}