"use client";
import { useState } from 'react';
import PlatformManager from './PlatformManager';

export default function Dashboard() {
  // Dashboard hub state
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  // Simple inline styles for clarity and separation
  const styles = {
    container: {
      maxWidth: '960px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    heading: {
      fontSize: '1.75rem',
      fontWeight: 700,
      marginBottom: '1.25rem',
      color: '#111827',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.25rem',
    },
    card: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1rem',
      cursor: 'pointer',
      boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      marginBottom: '0.25rem',
    },
    cardDesc: {
      fontSize: '0.9rem',
      color: '#4b5563',
    },
    // Removed section styles as content generation moved to PlatformManager
  } as const;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Marketing Agent Dashboard</h1>

      {activePlatform === null ? (
        <div style={styles.grid as React.CSSProperties}>
          <div style={styles.card} onClick={() => setActivePlatform('x')} role="button" tabIndex={0}>
            <div style={styles.cardTitle}>X</div>
            <div style={styles.cardDesc}>Quick announcements and updates</div>
          </div>
          <div style={styles.card} onClick={() => setActivePlatform('facebook')} role="button" tabIndex={0}>
            <div style={styles.cardTitle}>Facebook</div>
            <div style={styles.cardDesc}>Community engagement and posts</div>
          </div>
          <div style={styles.card} onClick={() => setActivePlatform('medium')} role="button" tabIndex={0}>
            <div style={styles.cardTitle}>Medium</div>
            <div style={styles.cardDesc}>Long-form articles and thought leadership</div>
          </div>
          <div style={styles.card} onClick={() => setActivePlatform('linkedin')} role="button" tabIndex={0}>
            <div style={styles.cardTitle}>LinkedIn</div>
            <div style={styles.cardDesc}>Professional networking and B2B content</div>
          </div>
        </div>
      ) : (
        <PlatformManager platformName={activePlatform} onBack={() => setActivePlatform(null)} />
      )}
    </div>
  );
}



