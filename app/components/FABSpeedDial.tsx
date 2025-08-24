'use client';

import { useState, useEffect, useRef } from 'react';

export default function FABSpeedDial() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(false);
  const fabRef = useRef<HTMLDivElement | null>(null);

  // Pulse animation every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Tooltip on first load
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAB = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const closeFAB = () => {
    setIsOpen(false);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Dispatch custom event to trigger chat widget
    window.dispatchEvent(new CustomEvent('openChatWidget'));
    closeFAB();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        closeFAB();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div
        ref={fabRef}
        className={`fab-speed-dial ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'flex-end',
          gap: '16px',
          maxWidth: 'calc(100vw - 16px)'
        }}
      >
        {/* Main White Questions Button */}
        <button
          className={`fab-main fab-questions${pulse ? ' fab-pulse-enhanced' : ''}`}
          aria-label="Open contact options"
          aria-expanded={isOpen}
          onClick={toggleFAB}
          style={{
            background: '#fff',
            color: '#198754',
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            padding: '0.5rem 1.1rem',
            marginBottom: 4,
            marginRight: 2,
            display: 'inline-block',
            pointerEvents: 'auto',
            userSelect: 'none',
            letterSpacing: 0.1,
            zIndex: 1000,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative',
            minWidth: 120,
            minHeight: 48
          }}
        >
          <span style={{ fontSize: 18, marginRight: 8, verticalAlign: 'middle' }}>💬</span>
          Contact Us
        </button>
        {/* FAB Items Container */}
        <div 
          className="fab-items"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: isOpen ? 'auto' : 'none',
            marginBottom: '8px'
          }}
        >
          {/* Call Option */}
          <a 
            href="tel:+19547649750" 
            className="fab-item fab-call" 
            aria-label="Call Us"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#333',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: 'fit-content'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '20px' }}>📞</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Call Us</span>
          </a>

          {/* Chat Option */}
          <button
            className="fab-item fab-chat"
            aria-label="Chat With Us"
            data-testid="fab-chat-trigger"
            onClick={handleChatClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#333',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: 'fit-content',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '20px' }}>💬</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Chat With Us</span>
          </button>

          {/* Email Option */}
          <a 
            href="/contact" 
            className="fab-item fab-contact" 
            aria-label="Email Us"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#333',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: 'fit-content'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '20px' }}>✉️</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Email Us</span>
          </a>
        </div>
      </div>
      <style>{`
        .fab-speed-dial {
          font-family: system-ui, -apple-system, sans-serif;
        }
        .fab-main {
          transform: scale(1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fab-main:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .fab-main:active {
          transform: scale(0.98);
        }
        .fab-pulse-enhanced {
          animation: fabPulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,0.10); }
          50% { box-shadow: 0 2px 8px rgba(25, 135, 84, 0.25); }
        }
        .fab-items {
          transform-origin: bottom right;
        }
        .fab-item {
          transform: translateX(0);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fab-item:hover {
          transform: translateX(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .fab-item:active {
          transform: translateX(-2px);
        }
        @media (max-width: 600px) {
          .fab-speed-dial {
            bottom: 16px;
            right: 16px;
          }
          .fab-main {
            font-size: 15px !important;
            padding: 0.4rem 0.9rem !important;
            min-width: 110px !important;
            min-height: 44px !important;
          }
          .fab-item {
            padding: 10px 14px !important;
          }
          .fab-item span:last-child {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}
