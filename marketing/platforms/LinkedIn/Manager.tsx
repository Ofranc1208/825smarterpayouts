"use client";
import { useEffect, useState } from 'react';
import { selectMediaForContent, getMediaPath } from './imageSelector';

type LinkedInManagerProps = { onBack: () => void; };

export default function LinkedInManager({ onBack }: LinkedInManagerProps) {
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
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      borderBottom: '2px solid #0077b5',
      paddingBottom: '1rem'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#0077b5',
      margin: 0
    },
    backButton: {
      backgroundColor: '#f3f2ef',
      color: '#0077b5',
      border: '1px solid #0077b5',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '1.5rem',
      borderBottom: '1px solid #e1e9ee'
    },
    tab: {
      backgroundColor: 'transparent',
      color: '#666666',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid transparent',
      padding: '0.75rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    activeTab: {
      backgroundColor: 'transparent',
      color: '#0077b5',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #0077b5',
      padding: '0.75rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #e1e9ee',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    topicsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    topicChip: {
      backgroundColor: '#f3f2ef',
      color: '#0077b5',
      border: '1px solid #e1e9ee',
      borderRadius: '6px',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'left' as const,
      outline: 'none'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #e1e9ee',
      borderRadius: '4px',
      outline: 'none',
      fontFamily: 'inherit',
      marginBottom: '1rem'
    },
    generateButton: {
      backgroundColor: '#0077b5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      marginBottom: '1rem'
    },
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '0.75rem',
      fontSize: '0.95rem',
      border: '1px solid #e1e9ee',
      borderRadius: '4px',
      outline: 'none',
      fontFamily: 'inherit',
      resize: 'vertical' as const,
      lineHeight: '1.5',
      backgroundColor: '#fafafa'
    },
    mediaButtonsRow: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    mediaButton: {
      backgroundColor: '#f3f2ef',
      color: '#0077b5',
      border: '1px solid #e1e9ee',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    mediaButtonSelected: {
      backgroundColor: '#0077b5',
      color: 'white',
      border: '1px solid #0077b5',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    publishButtonEnabled: {
      backgroundColor: '#057642',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      marginBottom: '1rem',
      width: '100%'
    },
    publishButtonDisabled: {
      backgroundColor: '#cccccc',
      color: '#666666',
      border: 'none',
      borderRadius: '4px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'not-allowed',
      transition: 'all 0.2s ease',
      outline: 'none',
      marginBottom: '1rem',
      width: '100%'
    },
    mediaPreview: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
      border: '1px solid #e1e9ee'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
      borderRadius: '4px',
      padding: '0.75rem',
      fontSize: '0.9rem',
      marginTop: '1rem'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
      borderRadius: '4px',
      padding: '0.75rem',
      fontSize: '0.9rem',
      marginTop: '1rem'
    },
    loadingMessage: {
      color: '#666666',
      fontSize: '0.9rem',
      fontStyle: 'italic',
      textAlign: 'center' as const,
      padding: '1rem'
    }
  } as const;

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'generate_topics', platform: 'linkedin' })
      });
      const data = await response.json();
      if (data.ok && data.topics) {
        setTopics(data.topics);
      } else {
        setTopics(['Failed to generate topics. Please try again.']);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      setTopics(['Error connecting to server. Please check your connection.']);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (value: string) => {
    setIsLoading(true);
    setContent('');
    try {
      const response = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: value, task: 'social', platform: 'linkedin' })
      });
      const data = await response.json();
      if (data.ok && data.content) {
        setContent(data.content);
      } else {
        setContent('Error: Failed to generate content. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setContent('Error: Unable to connect to content generation service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = async (value: string) => {
    setTopic(value);
    setActiveTab('generate_content');
    await generateContent(value);
  };

  const handleGenerateButton = async () => {
    if (!topic.trim()) return;
    await generateContent(topic);
  };

  const handleSelectMedia = async (mediaType: 'image' | 'video') => {
    setIsSelectingMedia(true);
    try {
      const media = selectMediaForContent(content, mediaType);
      if (media) {
        const mediaUrl = getMediaPath(media);
        setSelectedMedia({ url: mediaUrl, type: mediaType });
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    } finally {
      setIsSelectingMedia(false);
    }
  };

  const handlePublishToLinkedIn = async () => {
    if (!content || !selectedMedia) return;
    
    setIsPublishing(true);
    setPublishResult('');
    
    try {
      const response = await fetch('/api/marketing/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish_single',
          content,
          platform: 'linkedin',
          topic,
          mediaUrl: selectedMedia.url,
          mediaType: selectedMedia.type
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setPublishResult(`✅ Successfully published to LinkedIn! View at: ${data.url}`);
        // Clear form after successful publish
        setContent('');
        setSelectedMedia(null);
        setTopic('');
        setActiveTab('generate_topic');
      } else {
        setPublishResult(`❌ Failed to publish: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error publishing to LinkedIn:', error);
      setPublishResult('❌ Network error while publishing. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'generate_topic') {
      void fetchTopics();
    }
  }, [activeTab]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>LinkedIn Professional Content</h2>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('generate_topic')}
          style={activeTab === 'generate_topic' ? styles.activeTab : styles.tab}
        >
          1. Generate Topics
        </button>
        <button
          onClick={() => setActiveTab('generate_content')}
          style={activeTab === 'generate_content' ? styles.activeTab : styles.tab}
        >
          2. Create Content
        </button>
      </div>

      {activeTab === 'generate_topic' ? (
        <div style={styles.card}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0077b5', fontSize: '1.1rem' }}>
            Professional LinkedIn Topics
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: '#666666', fontSize: '0.9rem' }}>
            Select a topic to automatically generate professional LinkedIn content:
          </p>
          
          {isLoading ? (
            <div style={styles.loadingMessage}>
              Generating professional topics for LinkedIn...
            </div>
          ) : (
            <div style={styles.topicsGrid}>
              {topics.map((topicText, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectTopic(topicText)}
                  style={styles.topicChip}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e1e9ee';
                    e.currentTarget.style.borderColor = '#0077b5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f2ef';
                    e.currentTarget.style.borderColor = '#e1e9ee';
                  }}
                >
                  {topicText}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={styles.card}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0077b5', fontSize: '1.1rem' }}>
            Professional Content Creation
          </h3>
          
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
            Topic:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a professional topic for LinkedIn"
            style={styles.input}
          />
          
          <button
            onClick={handleGenerateButton}
            disabled={isLoading || !topic.trim()}
            style={styles.generateButton}
            onMouseEnter={(e) => {
              if (!isLoading && topic.trim()) {
                e.currentTarget.style.backgroundColor = '#005885';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && topic.trim()) {
                e.currentTarget.style.backgroundColor = '#0077b5';
              }
            }}
          >
            {isLoading ? 'Generating...' : 'Generate Professional Content'}
          </button>

          {content && !content.startsWith('Error:') && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                Choose professional media:
              </p>
              <div style={styles.mediaButtonsRow}>
                <button
                  type="button"
                  onClick={() => handleSelectMedia('image')}
                  disabled={isSelectingMedia}
                  style={selectedMedia?.type === 'image' ? styles.mediaButtonSelected : styles.mediaButton}
                  aria-busy={isSelectingMedia}
                >
                  {isSelectingMedia ? '⏳' : '🖼️'} Professional Image
                  {selectedMedia?.type === 'image' && ' ✓'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectMedia('video')}
                  disabled={isSelectingMedia}
                  style={selectedMedia?.type === 'video' ? styles.mediaButtonSelected : styles.mediaButton}
                  aria-busy={isSelectingMedia}
                >
                  {isSelectingMedia ? '⏳' : '🎬'} Professional Video
                  {selectedMedia?.type === 'video' && ' ✓'}
                </button>
              </div>
              <button
                type="button"
                onClick={handlePublishToLinkedIn}
                disabled={isPublishing || !selectedMedia}
                style={!selectedMedia ? styles.publishButtonDisabled : styles.publishButtonEnabled}
                aria-busy={isPublishing}
                title={!selectedMedia ? 'Please select an image or video first' : 'Publish to LinkedIn'}
              >
                {isPublishing ? 'Publishing…' : selectedMedia ? '🏢 Publish to LinkedIn' : 'Select media to publish'}
              </button>
            </div>
          )}

          <textarea
            readOnly
            value={content}
            placeholder="Generated professional content will appear here."
            style={styles.textarea as React.CSSProperties}
          />

          {selectedMedia && (
            <div>
              <p style={{ margin: '0.75rem 0 0.5rem 0', fontWeight: 600, color: '#374151' }}>
                Selected {selectedMedia.type === 'video' ? 'Professional Video' : 'Professional Image'}:
              </p>
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  muted
                  loop
                  style={styles.mediaPreview}
                  title="Selected professional video"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia.url}
                  alt="Selected professional image"
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
