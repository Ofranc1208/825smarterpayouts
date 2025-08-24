'use client';
import Head from 'next/head';

const videos = [
  {
    img: '/assets/images/Self.JPG',
    alt: 'Self Calculate an Early Payout with Smarter Payouts! thumbnail',
    title: 'Self Calculate an Early Payout with Smarter Payouts!',
    desc: "Self-calculate a lump sum offer for your future settlement payments using our real-time tool. It's fast, accurate, and secure.",
    url: 'https://youtu.be/TxFogK2R61o',
  },
  {
    img: '/assets/images/why-wait.JPG',
    alt: 'Why wait, see an Early Lump offer in 2 minutes thumbnail',
    title: 'Why wait, see an Early Lump offer in 2 minutes',
    desc: 'Understand the benefit of receiving a lump-sum today versus waiting for monthly checks. A 2-minute video that explains everything.',
    url: 'https://youtu.be/AYFvqQCCSoY',
  },
  {
    img: '/assets/images/debt.JPG',
    alt: 'How does it feel to be debt free! thumbnail',
    title: 'How does it feel to be debt free!',
    desc: 'See how settlement payments can be used to pay off high-interest debt and regain financial peace of mind.',
    url: 'https://youtu.be/ur9pB2-xkk4',
  },
];

export default function YouTubeChannelPage() {
  return (
    <>
      <Head>
        <title>Smarter Payouts YouTube Channel</title>
        <meta name="description" content="Explore our latest videos and insights on structured settlements and payout strategies." />
      </Head>
      
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
            <div style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem"
            }}>
              YouTube Channel
            </div>
            
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "1.5rem",
              lineHeight: "1.2"
            }}>
              SmarterPayouts Video Library
            </h1>

            <p style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: "1.6"
            }}>
              Learn about structured settlements, early payouts, and financial strategies through our educational video content.
            </p>

            <div style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <a href="https://www.youtube.com/@smarterpayouts" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                color: "white",
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
                📺 Subscribe to Channel
              </a>
              
              <a href="/mint-intelligent-chat" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
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
                💬 Chat with Mint AI
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Videos Section */}
      <section style={{
        background: '#f8fafc',
        padding: "48px 16px"
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1f2937",
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            Featured Videos
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {videos.map((video, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
              }}>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  tabIndex={0} 
                  aria-label={`Watch: ${video.title}`} 
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <img 
                    src={video.img} 
                    alt={video.alt} 
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      aspectRatio: '16/9',
                      objectFit: 'contain', 
                      background: '#fff',
                      borderBottom: '1px solid #e5e7eb'
                    }} 
                  />
                </a>
                
                <div style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem',
                    lineHeight: '1.4'
                  }}>
                    {video.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    flex: '1'
                  }}>
                    {video.desc}
                  </p>
                  
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    tabIndex={0} 
                    aria-label={`Open YouTube: ${video.title}`}
                    style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)";
                    }}
                  >
                    📺 Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #bbf7d0'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#059669'
            }}>
              Want Personalized Guidance?
            </h2>
            <p style={{
              color: '#4b5563',
              fontSize: '1.125rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.
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