'use client';

import React from 'react';

export default function BenefitsSection() {
  // Industry Problems Section
  const industryProblems = [
    {
      icon: "💰",
      title: "Hidden Profit Margins",
      description: "Traditional companies inflate prices 15-30% above market rates to maximize profits"
    },
    {
      icon: "🚫",
      title: "No Upfront Pricing",
      description: "They hide costs to prevent comparison shopping and pressure you into quick decisions"
    },
    {
      icon: "📞",
      title: "High-Pressure Sales",
      description: "Aggressive phone calls and pressure tactics to close deals before you can research"
    }
  ];

  // Benefits Grid
  const benefits = [
         {
       icon: "🔍",
       title: "Complete Price Transparency",
       description: "Unlike traditional companies that hide pricing to maximize profit margins, we provide upfront quotes based on current market averages. No surprises, no hidden fees, no pressure tactics.",
       highlight: "Traditional companies often markup prices 15-30% above market rates to increase profit margins",
       backgroundColor: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
       borderColor: "#09b44d",
       iconBackground: "linear-gradient(135deg, #059669 0%, #047857 100%)",
       highlightColor: "#059669",
       highlightBackground: "rgba(9, 180, 77, 0.1)"
     },
    {
      icon: "📊",
      title: "Fair Market-Based Rates",
      description: "Our AI-powered platform calculates offers based on real market data and industry averages, not inflated profit targets. You get competitive rates that reflect true market value.",
      highlight: "Market-average pricing ensures you receive 15-20% more than traditional company offers",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
      borderColor: "#93c5fd",
      iconBackground: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
      highlightColor: "#1d4ed8",
      highlightBackground: "rgba(29, 78, 216, 0.1)"
    },
    {
      icon: "⚖️",
      title: "Compare Before You Commit",
      description: "Get multiple quotes instantly and compare offers side-by-side. Traditional companies discourage comparison shopping because they rely on information asymmetry to maximize profits.",
      highlight: "Comparison shopping can increase your settlement value by 25-40%",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
      borderColor: "#fbbf24",
      iconBackground: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      highlightColor: "#d97706",
      highlightBackground: "rgba(245, 158, 11, 0.1)"
    },
    {
      icon: "🚫",
      title: "Zero Pressure Environment",
      description: "Research and compare at your own pace. No aggressive sales tactics, no phone calls, no personal information required. Many traditional companies use high-pressure sales because they need to close deals quickly.",
      highlight: "Take your time to make the right decision - no sales pressure or deadlines",
      backgroundColor: "linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)",
      borderColor: "#c084fc",
      iconBackground: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
      highlightColor: "#7c3aed",
      highlightBackground: "rgba(124, 58, 237, 0.1)"
    }
  ];

  return (
    <section style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      padding: "2rem 0",
      borderTop: "1px solid #e5e7eb"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        {/* Industry Problems Section */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          padding: "2rem 1.5rem",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          textAlign: "center",
          marginBottom: "2rem",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, #fef9f9 0%, #fef2f2 100%)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            marginBottom: "1.25rem",
            border: "1px solid #f5b5b5"
          }}>
            <span style={{ fontSize: "1rem" }}>⚠️</span>
            <span style={{ color: "#dc2626", fontWeight: "600", fontSize: "0.875rem" }}>
              INDUSTRY PROBLEM
            </span>
          </div>
          
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "700",
            color: "#b91c1c",
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            Why Traditional Settlement Companies Don't Offer Upfront Pricing
          </h2>
          
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: "1.6"
          }}>
            Most companies hide their pricing to maximize profits at your expense. 
            Here's exactly why they don't want you to see upfront costs:
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.25rem"
          }}>
            {industryProblems.map((problem, index) => (
              <div
                key={index}
                style={{
                  padding: "1.25rem",
                  background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  borderRadius: "12px",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 1px 6px rgba(0, 0, 0, 0.06)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{
                    fontSize: "1.75rem",
                    marginBottom: "0.75rem",
                    textAlign: "center"
                  }}>
                    {problem.icon}
                  </div>
                  <h4 style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#dc2626",
                    marginBottom: "0.5rem",
                    textAlign: "center"
                  }}>
                    {problem.title}
                  </h4>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    lineHeight: "1.5",
                    textAlign: "center",
                    margin: 0
                  }}>
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

                          {/* Solution Introduction */}
          <div style={{
            textAlign: "center",
            marginBottom: "2rem"
          }}>
           <div style={{
             display: "inline-flex",
             alignItems: "center",
             gap: "0.5rem",
             background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
             padding: "0.5rem 1rem",
             borderRadius: "24px",
             marginBottom: "1.5rem",
             border: "1px solid #09b44d"
           }}>
             <span style={{ fontSize: "1rem" }}>✅</span>
             <span style={{ 
               color: "#059669", 
               fontWeight: "600", 
               fontSize: "0.875rem" 
             }}>
               THE SMARTERPAYOUTS SOLUTION
             </span>
           </div>
          
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1rem",
            lineHeight: "1.2"
          }}>
            Why Upfront Pricing is the New Industry Standard
          </h2>
          
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Get transparent, market-based pricing before you commit. Compare offers 
            intelligently and make informed decisions about your structured settlement.
          </p>
        </div>

                  {/* Benefits Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                background: benefit.backgroundColor,
                padding: "2rem",
                borderRadius: "16px",
                border: `1px solid ${benefit.borderColor}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: benefit.iconBackground,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem"
              }}>
                <span style={{ fontSize: "1.5rem", color: "white" }}>{benefit.icon}</span>
              </div>
              
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1rem"
              }}>
                {benefit.title}
              </h3>
              
              <p style={{
                color: "#374151",
                lineHeight: "1.6",
                marginBottom: "1rem"
              }}>
                {benefit.description}
              </p>
              
              <div style={{
                padding: "1rem",
                background: benefit.highlightBackground,
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: benefit.highlightColor,
                fontWeight: "500"
              }}>
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>

                 {/* Bottom CTA */}
         <div style={{
           textAlign: "center",
           background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
           borderRadius: "16px",
           padding: "2rem",
           color: "#ffffff"
         }}>
          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
            color: "#ffffff"
          }}>
            Ready to See What Your Settlement is Worth?
          </h3>
          <p style={{
            fontSize: "0.875rem",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "1.5rem",
            maxWidth: "500px",
            margin: "0 auto 1.5rem"
          }}>
            Join thousands who have used our calculator to make informed decisions about their structured settlements.
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem"
            }}>
              <span style={{ color: "#fbbf24" }}>✓</span>
              <span>100% Free</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem"
            }}>
              <span style={{ color: "#fbbf24" }}>✓</span>
              <span>No Personal Info Required</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem"
            }}>
              <span style={{ color: "#fbbf24" }}>✓</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
