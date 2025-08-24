'use client';

import { useEffect, useRef, forwardRef } from 'react';
import Link from 'next/link';
import { SITE_STATS } from '../config/siteConfig';

interface StatRibbonProps {
  icon: string;
  label: string;
  ariaLabel: string;
  href?: string;
  description?: string;
}

const StatRibbon = forwardRef<HTMLDivElement, StatRibbonProps>(({ icon, label, ariaLabel, href, description }, ref) => {
  const content = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 160,
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem 1rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      border: "1px solid #f3f4f6",
      transition: "all 0.2s ease",
      cursor: href ? "pointer" : "default"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
    }}
    title={description}
    >
      <span
        style={{
          marginBottom: "0.5rem",
          fontSize: '2.5rem',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '3rem',
          opacity: 0.9
        }}
        role="img"
        aria-label={ariaLabel}
      >
        {icon}
      </span>
      <div ref={ref} style={{ 
        fontSize: '1.75rem', 
        minHeight: '2.25rem',
        color: "#047857", // Improved contrast
        fontWeight: "700"
      }}>
        0
      </div>
      <div style={{
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#374151", // Improved contrast for accessibility
        textAlign: "center"
      }}>{label}</div>
    </div>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
  ) : content;
});

StatRibbon.displayName = 'StatRibbon';

export default function Stats() {
  const clientRef = useRef<HTMLDivElement>(null);
  const payoutRef = useRef<HTMLDivElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);
  const statesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = [
      { ref: clientRef, target: 400, suffix: '+' },
      { ref: payoutRef, target: 50, prefix: '$', suffix: '+ Million' },
      { ref: daysRef, target: 30 },
      { ref: statesRef, target: 49, suffix: '+' },
    ];
    const duration = 10000;

    counters.forEach(({ ref, target, prefix = '', suffix = '' }) => {
      if (!ref.current) return;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * target);
        if (ref.current) {
          ref.current.textContent = `${prefix}${value.toLocaleString('en-US')}${suffix}`;
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    });
  }, []);

  return (
    <section style={{
      padding: "0.5rem 0", 
      background: "#f8fafb",
      borderTop: "1px solid #e5e7eb",
      borderBottom: "1px solid #e5e7eb"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto", 
        padding: "0 1rem"
      }}>
        <h2 style={{ 
          fontSize: "2rem",
          fontWeight: "600",
          color: "#047857", // Improved contrast
          marginBottom: "2.5rem",
          textAlign: "center"
        }}>
          Trusted Nationwide
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem"
        }}>
          <StatRibbon ref={clientRef} icon="🤝" ariaLabel="Clients Helped" label="Clients Helped" />
          <StatRibbon ref={payoutRef} icon="💵" ariaLabel="Future Payments Exchanged" label="Future Payments Exchanged" />
          <StatRibbon 
            ref={daysRef} 
            icon="⏱️" 
            ariaLabel={SITE_STATS.avgDays.description} 
            label={SITE_STATS.avgDays.label}
            href={SITE_STATS.avgDays.link}
            description={SITE_STATS.avgDays.description}
          />
          <StatRibbon 
            ref={statesRef} 
            icon="🌎" 
            ariaLabel={SITE_STATS.statesCovered.description} 
            label={SITE_STATS.statesCovered.label}
            href={SITE_STATS.statesCovered.link}
            description={SITE_STATS.statesCovered.description}
          />
        </div>
      </div>
    </section>
  );
}
