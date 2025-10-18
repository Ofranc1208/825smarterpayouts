import MintChatPage from '@/src/components/Pages/MintChat';
import { Metadata, Viewport } from 'next';

/**
 * Mint Chat Page Route
 *
 * Route for the Mint AI Assistant chat interface.
 * Renders the MintChatPage component with essential SEO metadata.
 */

// Essential SEO metadata for the Mint Chat page
export const metadata: Metadata = {
  title: 'Chat with Mint | SmarterPayouts',
  description: 'Get a 100% guaranteed upfront offer estimate - zero games, just real numbers. No personal info required.',
  keywords: 'structured settlement, upfront offer, guaranteed quote, settlement estimate, Mint',
  authors: [{ name: 'SmarterPayouts Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Chat with Mint | SmarterPayouts',
    description: 'Get a 100% guaranteed upfront offer estimate - zero games, just real numbers. No personal info required.',
    type: 'website',
    url: 'https://smarterpayouts.com/mint-intelligent-chat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with Mint | SmarterPayouts',
    description: 'Get a 100% guaranteed upfront offer estimate - zero games, just real numbers. No personal info required.',
  },
};

// Viewport configuration (separate export per Next.js 14 requirements)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // Enable safe area support
  userScalable: false, // Prevent zoom for better chat experience
};

export default MintChatPage; 