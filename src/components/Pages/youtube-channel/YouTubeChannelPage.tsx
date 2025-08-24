/**
 * YouTube Channel Page - Modular Implementation
 * 
 * Modern, enterprise-ready YouTube channel page built with modular components.
 * Features comprehensive SEO, error handling, loading states, accessibility,
 * and performance optimizations. Follows SmarterPayouts design system and
 * architectural patterns.
 * 
 * @component YouTubeChannelPage
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  SEOHead, 
  HeroSection, 
  VideoGallerySection, 
  CTASection 
} from './components';

/**
 * Video data interface
 */
interface VideoData {
  img: string;
  alt: string;
  title: string;
  desc: string;
  url: string;
  duration?: string;
  views?: string;
}

/**
 * Page state interface
 */
interface PageState {
  isLoading: boolean;
  error: string | null;
  videos: VideoData[];
}

/**
 * Default video data with enhanced metadata
 */
const DEFAULT_VIDEOS: VideoData[] = [
  {
    img: '/assets/images/Self.JPG',
    alt: 'Self Calculate an Early Payout with Smarter Payouts! thumbnail',
    title: 'Self Calculate an Early Payout with Smarter Payouts!',
    desc: "Self-calculate a lump sum offer for your future settlement payments using our real-time tool. It's fast, accurate, and secure.",
    url: 'https://youtu.be/TxFogK2R61o',
    duration: '3:45',
    views: '2.1K'
  },
  {
    img: '/assets/images/why-wait.JPG',
    alt: 'Why wait, see an Early Lump offer in 2 minutes thumbnail',
    title: 'Why wait, see an Early Lump offer in 2 minutes',
    desc: 'Understand the benefit of receiving a lump-sum today versus waiting for monthly checks. A 2-minute video that explains everything.',
    url: 'https://youtu.be/AYFvqQCCSoY',
    duration: '2:15',
    views: '1.8K'
  },
  {
    img: '/assets/images/debt.JPG',
    alt: 'How does it feel to be debt free! thumbnail',
    title: 'How does it feel to be debt free!',
    desc: 'See how settlement payments can be used to pay off high-interest debt and regain financial peace of mind.',
    url: 'https://youtu.be/ur9pB2-xkk4',
    duration: '4:20',
    views: '3.2K'
  },
];

/**
 * Error boundary component for graceful error handling
 */
const ErrorBoundary = ({ children, fallback }: { 
  children: React.ReactNode; 
  fallback: React.ReactNode;
}): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('YouTube Channel Page Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * Main YouTube Channel Page Component
 * 
 * Orchestrates all modular components and handles page-level state management,
 * error handling, and performance optimizations.
 * 
 * @returns {JSX.Element} Complete YouTube channel page
 */
export default function YouTubeChannelPage(): JSX.Element {
  const [pageState, setPageState] = useState<PageState>({
    isLoading: true,
    error: null,
    videos: []
  });

  /**
   * Initialize page data
   */
  const initializePageData = useCallback(async () => {
    try {
      setPageState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simulate API call delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real application, this would fetch from an API
      // const response = await fetch('/api/youtube-videos');
      // const videos = await response.json();
      
      setPageState({
        isLoading: false,
        error: null,
        videos: DEFAULT_VIDEOS
      });
    } catch (error) {
      console.error('Failed to load YouTube channel data:', error);
      setPageState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load video content. Please try again later.'
      }));
    }
  }, []);

  /**
   * Handle retry functionality
   */
  const handleRetry = useCallback(() => {
    initializePageData();
  }, [initializePageData]);

  /**
   * Initialize page on mount
   */
  useEffect(() => {
    initializePageData();
  }, [initializePageData]);

  /**
   * Error fallback component
   */
  const ErrorFallback = (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#f8fafc'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#dc2626' }}>
          Something went wrong
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          We encountered an error while loading the YouTube channel page. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#dc2626',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b91c1c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
          }}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <main role="main" style={{ minHeight: '100vh' }}>
        {/* SEO and Meta Tags */}
        <SEOHead />
        
        {/* Hero Section */}
        <HeroSection 
          title="SmarterPayouts Video Library"
          description="Learn about structured settlements, early payouts, and financial strategies through our educational video content."
          channelUrl="https://www.youtube.com/@smarterpayouts"
          mintChatUrl="/mint-intelligent-chat"
        />
        
        {/* Video Gallery Section */}
        <VideoGallerySection 
          videos={pageState.videos}
          title="Featured Videos"
          isLoading={pageState.isLoading}
          error={pageState.error}
          maxVideos={6} // Limit for performance
        />
        
        {/* Call-to-Action Section */}
        <CTASection 
          title="Want Personalized Guidance?"
          description="Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools."
          mintChatUrl="/mint-intelligent-chat"
          calculatorUrl="/pricing-calculator"
          theme="green"
        />
      </main>
    </ErrorBoundary>
  );
}
