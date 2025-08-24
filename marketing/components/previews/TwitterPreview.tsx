"use client";

type TwitterPreviewProps = {
  content: string;
};

export default function TwitterPreview({ content }: TwitterPreviewProps) {
  const styles = {
    card: {
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      padding: '12px 14px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
      maxWidth: '560px',
      margin: '0 auto 16px auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '8px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '9999px',
      background: '#e5e7eb',
      flexShrink: 0,
    },
    nameRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      lineHeight: 1.1,
    },
    displayName: {
      fontWeight: 700,
      color: '#111827',
      fontSize: '0.98rem',
    },
    handle: {
      color: '#6b7280',
      fontSize: '0.95rem',
    },
    body: {
      whiteSpace: 'pre-wrap' as const,
      color: '#111827',
      fontSize: '1rem',
      marginBottom: '10px',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '6px',
      maxWidth: '320px',
      color: '#6b7280',
      fontSize: '0.95rem',
    },
    actionBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      opacity: 0.6,
      cursor: 'not-allowed' as const,
      userSelect: 'none' as const,
    },
    icon: {
      width: '16px',
      height: '16px',
      display: 'inline-block',
      borderRadius: '2px',
      background: '#d1d5db',
    },
  } as const;

  return (
    <article style={styles.card} aria-label="Tweet preview">
      <header style={styles.header}>
        <div style={styles.avatar} aria-hidden="true" />
        <div>
          <div style={styles.nameRow}>
            <span style={styles.displayName}>Smarter Payouts</span>
            <span style={styles.handle}>@smarterpayouts</span>
          </div>
        </div>
      </header>
      <div style={styles.body}>{content || ' '}</div>
      <footer style={styles.actions} aria-hidden>
        <span style={styles.actionBtn}><i style={styles.icon} /> Reply</span>
        <span style={styles.actionBtn}><i style={styles.icon} /> Retweet</span>
        <span style={styles.actionBtn}><i style={styles.icon} /> Like</span>
      </footer>
    </article>
  );
}


