'use client';

import { useState } from 'react';
import { ClientFAQ } from './SharedFAQ';
import { miniFAQData } from '../data/faqData';
import Link from 'next/link';
import Image from 'next/image';

export default function MiniFAQ() {
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set());

  const toggleFaq = (id: string) => {
    const newOpenFaqs = new Set(openFaqs);
    if (newOpenFaqs.has(id)) {
      newOpenFaqs.delete(id);
    } else {
      newOpenFaqs.add(id);
    }
    setOpenFaqs(newOpenFaqs);
  };

  return (
    <section style={{
      padding: "0.5rem 0",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "3rem" 
        }}>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Common Questions, Clear Answers
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#374151", // Improved contrast for accessibility
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Get instant answers to your most frequently asked questions
          </p>
        </div>
        
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "800px"
          }}>
            <div style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e5e7eb",
              overflow: "hidden"
            }}>
              {miniFAQData.map((faq, index) => (
                <div key={faq.id} style={{
                  borderBottom: index < miniFAQData.length - 1 ? "1px solid #f3f4f6" : "none"
                }}>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: "100%",
                      padding: "2rem",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <h5 style={{
                      margin: "0",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      flex: "1",
                      paddingRight: "1rem"
                    }}>
                      {faq.question}
                    </h5>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "transform 0.3s ease",
                      transform: openFaqs.has(faq.id) ? "rotate(45deg)" : "rotate(0deg)",
                      flexShrink: "0"
                    }}>
                      {openFaqs.has(faq.id) ? "−" : "+"}
                    </div>
                  </button>
                  
                  {openFaqs.has(faq.id) && (
                    <div style={{
                      padding: "0 2rem 2rem",
                      background: "#f8fafc",
                      borderTop: "1px solid #f3f4f6"
                    }}>
                      <div style={{
                        fontSize: "1rem",
                        lineHeight: "1.7",
                        color: "#374151", // Improved contrast for accessibility
                        fontWeight: "400"
                      }}>
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div style={{ 
              textAlign: "center", 
              marginTop: "3rem" 
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem"
              }}>
                <Link href="/faqs" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2rem",
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                  minWidth: "200px",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(5, 150, 105, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
                }}>
                  See All FAQs
                  <span style={{ fontSize: "1.2rem" }}>→</span>
                </Link>
                
                <div style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  borderRadius: "12px",
                  border: "1px solid #bbf7d0",
                  margin: "0 auto"
                }}>
                  <p style={{
                    margin: "0",
                    fontSize: "1rem",
                    color: "#059669",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    textAlign: "center"
                  }}>
                    <Image
                      src="/assets/images/mint-mascot.png"
                      alt="Mint AI"
                      width={30}
                      height={30}
                      style={{ display: 'inline-block', flexShrink: "0" }}
                    />
                    <span>Still have questions? <strong>Chat with Mint AI</strong> for instant help 24/7!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
