'use client';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  onFAQClick?: (questionId: string) => void;
}

export default function FAQSection({ onFAQClick }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How quickly can I get a response to my inquiry?",
      answer: "We respond to all inquiries within 24 hours during business days. For urgent matters, you can call us directly or use our live chat feature for immediate assistance."
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include details about your structured settlement, any specific questions you have, and the best way to contact you. The more information you provide, the better we can assist you."
    },
    {
      question: "Is there a cost for the initial consultation?",
      answer: "No, our initial consultation is completely free. We'll review your situation and provide expert advice with no obligation or upfront costs."
    },
    {
      question: "Can I speak with someone immediately?",
      answer: "Yes! You can call us during business hours (Monday-Friday, 9 AM - 6 PM EST) or use our Mint AI chat feature available 24/7 for instant responses."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    if (onFAQClick) {
      onFAQClick(`faq-${index}`);
    }
  };

  return (
    <section style={{
      padding: "4rem 0",
      background: "white"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1rem"
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280"
          }}>
            Quick answers to common questions about contacting us
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "hidden"
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: "1.5rem",
                  background: openIndex === index ? "#f9fafb" : "white",
                  border: "none",
                  textAlign: "left",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease"
                }}
              >
                {faq.question}
                <span style={{
                  fontSize: "1.5rem",
                  transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div style={{
                  padding: "0 1.5rem 1.5rem",
                  background: "#f9fafb",
                  borderTop: "1px solid #e5e7eb"
                }}>
                  <p style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                    margin: "0"
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
