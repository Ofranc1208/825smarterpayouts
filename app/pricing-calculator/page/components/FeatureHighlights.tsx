import React from 'react';
import Link from 'next/link';
import { SITE_STATS } from '../../../config/siteConfig';

export default function FeatureHighlights() {
  const features = [
    {
      icon: '⚡',
      title: '60 Sec',
      subtitle: 'Instant Quote'
    },
    {
      icon: '/assets/images/mint-mascot.png',
      title: 'AI',
      subtitle: 'Powered'
    },
    {
      icon: '📞',
      title: 'No',
      subtitle: 'Phone Calls'
    },
    {
      icon: '✅',
      title: SITE_STATS.compliance.value,
      subtitle: 'Compliant',
      link: SITE_STATS.compliance.link,
      description: SITE_STATS.compliance.description
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      {features.map((feature, index) => {
        const FeatureCard = (
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '16px',
            padding: '1rem',
            border: '1px solid #bbf7d0',
            cursor: feature.link ? 'pointer' : 'default',
            transition: feature.link ? 'transform 0.2s ease' : 'none'
          }}
          title={feature.description || undefined}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {feature.icon.startsWith('/') ? (
                <img
                  src={feature.icon}
                  alt=""
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                feature.icon
              )}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>
              {feature.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#065f46' }}>
              {feature.subtitle}
            </div>
          </div>
        );

        return (
          <div key={index} style={{ width: '100%' }}>
            {feature.link ? (
              <Link href={feature.link} style={{ textDecoration: 'none' }}>
                {FeatureCard}
              </Link>
            ) : (
              FeatureCard
            )}
          </div>
        );
      })}
    </div>
  );
}
