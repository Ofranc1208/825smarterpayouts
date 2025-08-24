"use client";
import { useEffect, useState } from 'react';
import { selectImageForContent, selectMediaForContent, getImagePath, getMediaPath } from './imageSelector';

type PlatformXManagerProps = {
  onBack: () => void;
};

export default function PlatformXManager({ onBack }: PlatformXManagerProps) {
  const [topic, setTopic] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSelectingMedia, setIsSelectingMedia] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<{url: string; type: 'image' | 'video'} | null>(null);
  const [publishResult, setPublishResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'generate_topic' | 'generate_content'>('generate_topic');
  const [topics, setTopics] = useState<string[]>([]);

  const styles = {
    container: { maxWidth: '960px', margin: '0 auto', padding: '1rem 0' },
    tabs: { display: 'flex', gap: '0.5rem', margin: '0 0 1rem 0' },
    tab: {
      background: '#f3f4f6', color: '#111', border: '1px solid #e5e7eb',
      borderRadius: '9999px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontWeight: 600,
    },
    tabActive: { background: '#09b44d', color: '#111', border: '1px solid #10b981' },
    headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' },
    heading: { fontSize: '1.3rem', fontWeight: 700, color: '#111827' },
    backButton: {
      background: '#e5e7eb', color: '#111', border: '1px solid #d1d5db', borderRadius: '10px',
      padding: '0.5rem 0.9rem', fontWeight: 600, cursor: 'pointer',
    },
    card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', boxShadow: '0 6px 18px rgba(0,0,0,0.05)' },
    label: { display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#374151' },
    input: { width: '100%', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '0.75rem', fontSize: '0.95rem' },
    button: {
      display: 'inline-block', background: '#09b44d', color: '#111', border: 'none', borderRadius: '10px',
      padding: '0.6rem 1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '0.75rem',
    },
    publishButton: {
      display: 'inline-block', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '10px',
      padding: '0.6rem 1rem', fontWeight: 600, cursor: 'pointer', marginLeft: '0.5rem',
    },
    mediaButtonsRow: {
      display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.75rem',
    },
    mediaButton: {
      flex: 1, background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px',
      padding: '0.8rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    },
    mediaButtonSelected: {
      flex: 1, background: '#059669', color: '#fff', border: 'none', borderRadius: '10px',
      padding: '0.8rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    },
    publishButtonDisabled: {
      display: 'inline-block', background: '#9ca3af', color: '#fff', border: 'none', borderRadius: '10px',
      padding: '0.8rem 1.5rem', fontWeight: 600, cursor: 'not-allowed', marginTop: '0.75rem', width: '100%',
      fontSize: '0.95rem',
    },
    publishButtonEnabled: {
      display: 'inline-block', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '10px',
      padding: '0.8rem 1.5rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem', width: '100%',
      fontSize: '0.95rem',
    },
    mediaPreview: {
      width: '100%', maxWidth: '300px', borderRadius: '10px', border: '1px solid #e5e7eb',
      marginTop: '0.75rem', display: 'block',
    },
    successMessage: {
      background: '#ecfdf5', color: '#059669', border: '1px solid #10b981', borderRadius: '8px',
      padding: '0.75rem', marginTop: '0.75rem', fontSize: '0.9rem',
    },
    errorMessage: {
      background: '#fef2f2', color: '#dc2626', border: '1px solid #ef4444', borderRadius: '8px',
      padding: '0.75rem', marginTop: '0.75rem', fontSize: '0.9rem',
    },
    textarea: { width: '100%', minHeight: '200px', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.95rem', background: '#f9fafb', color: '#111827' },
  } as const;

  const fetchTopics = async () => {
    setIsLoading(true);
    setTopics([]);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      
      const res = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'generate_topics', platform: 'x' }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'API returned error');
      
      const list: string[] = Array.isArray(data?.topics) 
        ? data.topics.map((t: any) => String(t)).filter(Boolean) 
        : [];
      setTopics(list);
    } catch (e: any) {
      const msg = e.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Unknown error');
      setTopics([`Error: ${msg}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (value: string) => {
    setIsLoading(true);
    setContent('');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      
      const res = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: value, task: 'social', platform: 'x' }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'API returned error');
      
      setContent(typeof data.content === 'string' ? data.content : '');
    } catch (e: any) {
      const msg = e.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Unknown error');
      setContent(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'generate_topic') void fetchTopics();
  }, [activeTab]);

  const handleSelectTopic = async (value: string) => {
    setTopic(value);
    setActiveTab('generate_content');
    await generateContent(value);
  };

  const handleGenerateButton = async () => {
    await generateContent(topic);
  };

  const handleSelectMedia = async (mediaType: 'image' | 'video') => {
    if (!content.trim()) {
      setPublishResult('No content available for media selection');
      return;
    }

    setIsSelectingMedia(true);
    setSelectedMedia(null);

    try {
      // Use our curated media selection
      const preferVideo = mediaType === 'video';
      const selectedMediaInfo = selectMediaForContent(topic, content, preferVideo);
      
      // If user wants video but we got image, try to get a video instead
      let finalMedia = selectedMediaInfo;
      if (mediaType === 'video' && selectedMediaInfo.type === 'image') {
        // Force video selection by filtering video library
        const videoMedia = selectMediaForContent(topic, content, true);
        if (videoMedia.type === 'video') {
          finalMedia = videoMedia;
        }
      }
      
      const mediaPath = getMediaPath(finalMedia.filename, finalMedia.type);
      
      // Simulate a brief delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setSelectedMedia({
        url: mediaPath,
        type: finalMedia.type
      });
      setPublishResult(''); // Clear any previous messages

    } catch (e: any) {
      setPublishResult(`❌ Failed to select ${mediaType}: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsSelectingMedia(false);
    }
  };

  const handlePublishToX = async () => {
    if (!content.trim()) {
      setPublishResult('No content to publish');
      return;
    }

    setIsPublishing(true);
    setPublishResult('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch('/api/marketing/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'publish_single',
          content: content,
          platform: 'x',
          mediaUrl: selectedMedia?.url || undefined,
          mediaType: selectedMedia?.type || undefined
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      
      if (data.success) {
        setPublishResult(`✅ Successfully published to X! ${data.url || ''}`);
      } else {
        setPublishResult(`❌ ${data.error || 'Unknown error occurred'}`);
      }

    } catch (e: any) {
      const msg = e.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Unknown error');
      setPublishResult(`❌ Failed to publish: ${msg}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>Managing: X</h2>
        <button type="button" onClick={onBack} style={styles.backButton}>Back to Dashboard</button>
      </div>

      <div style={styles.tabs}>
        <button type="button" onClick={() => setActiveTab('generate_topic')} style={{ ...styles.tab, ...(activeTab === 'generate_topic' ? styles.tabActive : {}) }}>
          1. Generate Topics
        </button>
        <button type="button" onClick={() => setActiveTab('generate_content')} style={{ ...styles.tab, ...(activeTab === 'generate_content' ? styles.tabActive : {}) }}>
          2. Generate Content
        </button>
      </div>

      {activeTab === 'generate_topic' ? (
        <div style={styles.card}>
          <div style={{ color: '#111827', marginBottom: '0.5rem' }}>We’ll suggest multiple topics automatically. Click one to proceed.</div>
          {isLoading && <div>Generating topics…</div>}
          {!isLoading && topics.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
              {topics.map((t, idx) => (
                <button key={idx} type="button" onClick={() => handleSelectTopic(t)} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '9999px', padding: '0.5rem 0.9rem', cursor: 'pointer', textAlign: 'left' }} title={t}>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={styles.card}>
          <label htmlFor="topic-x" style={styles.label}>Topic</label>
          <input id="topic-x" type="text" placeholder="Enter a topic for X" value={topic} onChange={(e) => setTopic(e.target.value)} style={styles.input} />
          <div>
            <button type="button" onClick={handleGenerateButton} disabled={isLoading} style={styles.button} aria-busy={isLoading}>
              {isLoading ? 'Generating…' : 'Generate Content'}
            </button>
            {content && !content.startsWith('Error:') && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                  Choose media type:
                </p>
                <div style={styles.mediaButtonsRow}>
                  <button 
                    type="button" 
                    onClick={() => handleSelectMedia('image')} 
                    disabled={isSelectingMedia} 
                    style={selectedMedia?.type === 'image' ? styles.mediaButtonSelected : styles.mediaButton}
                    aria-busy={isSelectingMedia}
                  >
                    {isSelectingMedia ? '⏳' : '🖼️'} Image
                    {selectedMedia?.type === 'image' && ' ✓'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleSelectMedia('video')} 
                    disabled={isSelectingMedia} 
                    style={selectedMedia?.type === 'video' ? styles.mediaButtonSelected : styles.mediaButton}
                    aria-busy={isSelectingMedia}
                  >
                    {isSelectingMedia ? '⏳' : '🎬'} Video
                    {selectedMedia?.type === 'video' && ' ✓'}
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={handlePublishToX} 
                  disabled={isPublishing || !selectedMedia} 
                  style={!selectedMedia ? styles.publishButtonDisabled : styles.publishButtonEnabled} 
                  aria-busy={isPublishing}
                  title={!selectedMedia ? 'Please select an image or video first' : 'Publish to X'}
                >
                  {isPublishing ? 'Publishing…' : selectedMedia ? '📤 Publish to X' : 'Select media to publish'}
                </button>
              </div>
            )}
          </div>
          <textarea readOnly value={content} placeholder="Generated content will appear here." style={styles.textarea as React.CSSProperties} />
          {selectedMedia && (
            <div>
              <p style={{ margin: '0.75rem 0 0.5rem 0', fontWeight: 600, color: '#374151' }}>
                Selected {selectedMedia.type === 'video' ? 'Video' : 'Image'}:
              </p>
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  muted 
                  loop 
                  style={styles.mediaPreview} 
                  title="Selected social media video"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt="Selected social media image" 
                  style={styles.mediaPreview} 
                />
              )}
            </div>
          )}
          {publishResult && (
            <div style={publishResult.includes('✅') ? styles.successMessage : styles.errorMessage}>
              {publishResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


