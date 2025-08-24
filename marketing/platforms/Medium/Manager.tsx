"use client";
import { useEffect, useState } from 'react';
import { selectMediaForContent, getMediaPath } from './imageSelector';

type MediumManagerProps = { onBack: () => void; };

export default function MediumManager({ onBack }: MediumManagerProps) {
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
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' },
    title: { fontSize: '1.3rem', fontWeight: 700, color: '#111827' },
    backButton: { background: '#e5e7eb', color: '#111', border: '1px solid #d1d5db', borderRadius: '10px', padding: '0.5rem 0.9rem', fontWeight: 600, cursor: 'pointer' },
    tabContainer: { display: 'flex', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' },
    activeTab: { padding: '0.75rem 1rem', cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid #00ab6c', background: 'transparent', fontSize: '0.95rem', fontWeight: 600, color: '#00ab6c' },
    inactiveTab: { padding: '0.75rem 1rem', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: 600, color: '#6b7280' },
    card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', boxShadow: '0 6px 18px rgba(0,0,0,0.05)' },
    input: { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '0.75rem' },
    button: { background: '#00ab6c', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' },
    topicChip: { display: 'inline-block', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '20px', padding: '0.5rem 1rem', margin: '0.25rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 },
    selectedTopicChip: { display: 'inline-block', background: '#00ab6c', color: '#fff', border: '1px solid #00ab6c', borderRadius: '20px', padding: '0.5rem 1rem', margin: '0.25rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 },
    textarea: { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', minHeight: '200px', resize: 'vertical' as const },
    mediaButtonsRow: { display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.75rem' },
    mediaButton: { flex: 1, background: '#00ab6c', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.8rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    mediaButtonSelected: { flex: 1, background: '#059669', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.8rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    publishButtonDisabled: { display: 'inline-block', background: '#9ca3af', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.8rem 1.5rem', fontWeight: 600, cursor: 'not-allowed', marginTop: '0.75rem', width: '100%', fontSize: '0.95rem' },
    publishButtonEnabled: { display: 'inline-block', background: '#00ab6c', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.8rem 1.5rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem', width: '100%', fontSize: '0.95rem' },
    mediaPreview: { width: '100%', maxWidth: '400px', borderRadius: '10px', border: '1px solid #e5e7eb', marginTop: '0.75rem', display: 'block' },
    successMessage: { background: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '8px', marginTop: '0.75rem', fontSize: '0.9rem' },
    errorMessage: { background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', marginTop: '0.75rem', fontSize: '0.9rem' },
  } as const;

  const fetchTopics = async () => {
    setIsLoading(true);
    setTopics([]);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'generate_topics', platform: 'medium' }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      
      const data = await res.json();
      if (data.topics && Array.isArray(data.topics)) {
        setTopics(data.topics);
      } else {
        setTopics(['Error: Invalid response format']);
      }
    } catch (e: any) {
      const msg = e.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Unknown error');
      setTopics([`Error: ${msg}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (selectedTopic: string) => {
    setIsLoading(true);
    setContent('');
    setSelectedMedia(null);
    setPublishResult('');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Longer timeout for articles
      
      const res = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, task: 'article', platform: 'medium' }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      
      const data = await res.json();
      setContent(data.content || 'Error: No content received');
      
    } catch (e: any) {
      const msg = e.name === 'AbortError' ? 'Request timeout' : (e?.message || 'Unknown error');
      setContent(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setActiveTab('generate_content');
    generateContent(selectedTopic);
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
      const preferVideo = mediaType === 'video';
      const selectedMediaInfo = selectMediaForContent(topic, content, preferVideo);
      
      let finalMedia = selectedMediaInfo;
      if (mediaType === 'video' && selectedMediaInfo.type === 'image') {
        const videoMedia = selectMediaForContent(topic, content, true);
        if (videoMedia.type === 'video') {
          finalMedia = videoMedia;
        }
      }
      
      const mediaPath = getMediaPath(finalMedia.filename, finalMedia.type);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setSelectedMedia({
        url: mediaPath,
        type: finalMedia.type
      });
      setPublishResult('');

    } catch (e: any) {
      setPublishResult(`❌ Failed to select ${mediaType}: ${e?.message || 'Unknown error'}`);
    } finally {
      setIsSelectingMedia(false);
    }
  };

  const handlePublishToMedium = async () => {
    if (!content.trim()) {
      setPublishResult('No content to publish');
      return;
    }

    if (!selectedMedia) {
      setPublishResult('Please select an image or video first');
      return;
    }

    setIsPublishing(true);
    setPublishResult('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // Longer timeout for Medium
      
      const res = await fetch('/api/marketing/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish_single',
          content: content,
          platform: 'medium',
          topic: topic, // Medium needs the title
          mediaUrl: selectedMedia.url,
          mediaType: selectedMedia.type
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      
      const data = await res.json();
      if (data.success) {
        setPublishResult(`✅ Successfully published to Medium! ${data.url || ''}`);
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

  useEffect(() => {
    if (activeTab === 'generate_topic') {
      fetchTopics();
    }
  }, [activeTab]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Managing: Medium</h2>
        <button type="button" onClick={onBack} style={styles.backButton}>
          Back to Dashboard
        </button>
      </div>

      <div style={styles.tabContainer}>
        <button
          type="button"
          onClick={() => setActiveTab('generate_topic')}
          style={activeTab === 'generate_topic' ? styles.activeTab : styles.inactiveTab}
        >
          1. Generate Topics
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('generate_content')}
          style={activeTab === 'generate_content' ? styles.activeTab : styles.inactiveTab}
        >
          2. Generate Article
        </button>
      </div>

      {activeTab === 'generate_topic' && (
        <div style={styles.card}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
            Suggested Medium Article Topics
          </h3>
          
          <button 
            type="button" 
            onClick={fetchTopics} 
            disabled={isLoading} 
            style={styles.button} 
            aria-busy={isLoading}
          >
            {isLoading ? 'Generating Topics…' : 'Generate New Topics'}
          </button>
          
          <div style={{ marginTop: '1rem' }}>
            {topics.map((topicOption, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectTopic(topicOption)}
                style={topic === topicOption ? styles.selectedTopicChip : styles.topicChip}
                disabled={topicOption.startsWith('Error:')}
              >
                {topicOption}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'generate_content' && (
        <div style={styles.card}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
            Generate Medium Article
          </h3>
          
          <label htmlFor="topic-medium" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
            Article Topic:
          </label>
          <input 
            id="topic-medium" 
            type="text" 
            placeholder="Enter a topic for Medium article" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            style={styles.input} 
          />
          <div>
            <button type="button" onClick={handleGenerateButton} disabled={isLoading} style={styles.button} aria-busy={isLoading}>
              {isLoading ? 'Generating Article…' : 'Generate Article Content'}
            </button>
            {content && !content.startsWith('Error:') && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                  Choose featured media:
                </p>
                <div style={styles.mediaButtonsRow}>
                  <button 
                    type="button" 
                    onClick={() => handleSelectMedia('image')} 
                    disabled={isSelectingMedia} 
                    style={selectedMedia?.type === 'image' ? styles.mediaButtonSelected : styles.mediaButton}
                    aria-busy={isSelectingMedia}
                  >
                    {isSelectingMedia ? '⏳' : '🖼️'} Featured Image
                    {selectedMedia?.type === 'image' && ' ✓'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleSelectMedia('video')} 
                    disabled={isSelectingMedia} 
                    style={selectedMedia?.type === 'video' ? styles.mediaButtonSelected : styles.mediaButton}
                    aria-busy={isSelectingMedia}
                  >
                    {isSelectingMedia ? '⏳' : '🎬'} Featured Video
                    {selectedMedia?.type === 'video' && ' ✓'}
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={handlePublishToMedium} 
                  disabled={isPublishing || !selectedMedia} 
                  style={!selectedMedia ? styles.publishButtonDisabled : styles.publishButtonEnabled} 
                  aria-busy={isPublishing}
                  title={!selectedMedia ? 'Please select featured media first' : 'Publish to Medium'}
                >
                  {isPublishing ? 'Publishing…' : selectedMedia ? '📝 Publish to Medium' : 'Select media to publish'}
                </button>
              </div>
            )}
          </div>
          <textarea readOnly value={content} placeholder="Generated article content will appear here." style={styles.textarea as React.CSSProperties} />
          {selectedMedia && (
            <div>
              <p style={{ margin: '0.75rem 0 0.5rem 0', fontWeight: 600, color: '#374151' }}>
                Featured {selectedMedia.type === 'video' ? 'Video' : 'Image'}:
              </p>
              {selectedMedia.type === 'video' ? (
                <video src={selectedMedia.url} controls muted loop style={styles.mediaPreview} title="Featured Medium article video">
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedMedia.url} alt="Featured Medium article image" style={styles.mediaPreview} />
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


