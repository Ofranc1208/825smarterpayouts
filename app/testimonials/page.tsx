'use client';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Nat Reynolds',
    location: 'Denver, CO',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'SmarterPayouts gave me an instant quote online with zero hassle. The process was transparent, there were no hidden fees, and I felt in control the entire time. Highly recommend their modern, digital approach!',
    alt: 'Profile photo of Nat Reynolds',
    rating: 5,
  },
  {
    name: 'Celia Almeda',
    location: 'Austin, TX',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'I loved how easy it was to get a quote without any phone calls or pressure. Everything was clear, fast, and I always knew what to expect. SmarterPayouts is truly a step ahead!',
    alt: 'Profile photo of Celia Almeda',
    rating: 5,
  },
  {
    name: 'Roberto García',
    location: 'Miami, FL',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    text: 'The online process was simple and transparent. I appreciated the honest pricing and the fact that there were no hidden fees. I would recommend SmarterPayouts to anyone looking for a trustworthy company.',
    alt: 'Profile photo of Roberto García',
    rating: 5,
  },
  {
    name: 'Lori Stanley',
    location: 'New York, NY',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Truly revolutionized the way I work, providing a seamless experience that streamlines tasks and enhances productivity. Its intuitive interface and comprehensive features make it an indispensable tool for professionals in any industry.',
    alt: 'Profile photo of Lori Stanley',
    rating: 5,
  },
  {
    name: 'Sintia Kent',
    location: 'Chicago, IL',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'This platform has exceeded my expectations with its user-friendly interface and robust functionality. It has significantly improved my workflow efficiency and collaboration capabilities, making it an essential tool for my team\'s success.',
    alt: 'Profile photo of Sintia Kent',
    rating: 5,
  },
];

// Quick testimonials for the grid section
const quickTestimonials = [
  {
    name: 'Maria S.',
    location: 'NY',
    text: 'No surprises, no stress. The self-calculate tool is a game changer.',
    rating: 5,
  },
  {
    name: 'James L.',
    location: 'GA',
    text: 'Quick, easy, and the team answered all my questions.',
    rating: 5,
  },
  {
    name: 'D. Chen',
    location: 'CA',
    text: 'I appreciated the transparency and how simple everything was.',
    rating: 5,
  },
  {
    name: 'Samantha R.',
    location: 'FL',
    text: 'I felt in control and informed every step of the way.',
    rating: 5,
  },
  {
    name: 'Brian T.',
    location: 'TX',
    text: 'Got my payout options in minutes. Very professional and friendly service.',
    rating: 5,
  },
  {
    name: 'Lisa M.',
    location: 'OH',
    text: 'The online calculator saved me hours of research. Highly recommend!',
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>Client Testimonials | SmarterPayouts</title>
        <meta name="description" content="Read real reviews from clients who trusted SmarterPayouts with their structured settlement payouts. Transparent, no-pressure experience." />
        <meta name="keywords" content="structured settlement testimonials, client reviews, payout reviews, settlement company reviews" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Testimonials – SmarterPayouts" />
        <meta name="twitter:description" content="Read real reviews from clients who trusted SmarterPayouts with their structured settlement payouts." />
        <meta name="twitter:site" content="@SmarterPayouts" />
        <meta name="twitter:image" content="https://smarterpayouts.com/assets/images/social-preview.jpg" />

        {/* Open Graph */}
        <meta property="og:image" content="https://smarterpayouts.com/assets/images/social-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmarterPayouts",
              "url": "https://smarterpayouts.com",
              "logo": "https://smarterpayouts.com/assets/images/logo.png",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-954-764-9750",
                  "contactType": "customer service",
                  "areaServed": "US",
                  "availableLanguage": "English"
                }
              ],
              "sameAs": [
                "https://www.bbb.org/",
                "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName"
              ]
            })
          }}
        />

        {/* JSON-LD Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://smarterpayouts.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Testimonials",
                  "item": "https://smarterpayouts.com/testimonials"
                }
              ]
            })
          }}
        />
      </Head>

      {/* Modern Hero Section */}
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
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              maxWidth: '800px',
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
                Client Success Stories
              </div>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                What Our Clients Are Saying
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.6"
              }}>
                Real feedback from real people. Discover why clients trust SmarterPayouts for a transparent, no-pressure experience.
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem"
              }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: "1.25rem" }}>★</span>
                  ))}
                </div>
                <span style={{ color: "#6b7280", fontWeight: "500" }}>4.9/5 from 400+ clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Grid */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name}>
              <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #f3f4f6",
                height: "100%",
                transition: "all 0.3s ease",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}>
                {/* Quote Icon */}
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontSize: "3rem",
                  color: "#e5e7eb",
                  fontFamily: "serif"
                }}>
                  "
                </div>

                {/* Stars */}
                <div style={{ marginBottom: "1rem" }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: "1rem" }}>★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p style={{
                  fontSize: "1rem",
                  color: "#374151",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  fontStyle: "italic"
                }}>
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Image
                    src={testimonial.img}
                    alt={testimonial.alt}
                    width={48}
                    height={48}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                  <div>
                    <div style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "0.95rem"
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      color: "#6b7280",
                      fontSize: "0.875rem"
                    }}>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Testimonials Section */}
      <section style={{
        background: "#f9fafb",
        padding: "4rem 0"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "3rem"
              }}>
                More Client Experiences
              </h2>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {quickTestimonials.map((testimonial, index) => (
              <div key={testimonial.name}>
                <div style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                  <p style={{
                    fontSize: "0.95rem",
                    color: "#4b5563",
                    lineHeight: "1.5",
                    marginBottom: "1rem",
                    fontStyle: "italic"
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{
                        fontWeight: "600",
                        color: "#1f2937",
                        fontSize: "0.9rem"
                      }}>
                        {testimonial.name}
                      </div>
                      <div style={{
                        color: "#6b7280",
                        fontSize: "0.8rem"
                      }}>
                        {testimonial.location}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} style={{ color: "#fbbf24", fontSize: "0.75rem" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <div style={{
              background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
              borderRadius: "16px",
              padding: "3rem 2rem",
              color: "white"
            }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                marginBottom: "1rem"
              }}>
                Ready to Experience the Difference?
              </h2>
              <p style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                opacity: "0.9"
              }}>
                Join hundreds of satisfied clients who chose transparency and simplicity.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/pricing-calculator" style={{
                  background: "white",
                  color: "#059669",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
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
                  Get Your Quote
                </a>
                <a href="/contact" style={{
                  border: "2px solid white",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "white";
                }}>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 