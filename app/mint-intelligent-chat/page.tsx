import MintChatPage from '@/src/components/Pages/MintChat';
import { Metadata } from 'next';

/**
 * Mint Chat Page Route
 *
 * Route for the Mint AI Assistant chat interface.
 * Renders the MintChatPage component with essential SEO metadata.
 */

// Essential SEO metadata for the Mint Chat page
export const metadata: Metadata = {
  title: 'Chat with Mint AI Assistant | SmarterPayouts',
  description: 'Get instant answers about your structured settlement with our AI-powered assistant. Available 24/7 for questions and quotes.',
  keywords: 'AI assistant, structured settlement chat, instant quotes, settlement questions, Mint AI',
  authors: [{ name: 'SmarterPayouts Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Chat with Mint AI Assistant | SmarterPayouts',
    description: 'Get instant answers about your structured settlement with our AI-powered assistant.',
    type: 'website',
    url: 'https://smarterpayouts.com/mint-intelligent-chat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with Mint AI Assistant | SmarterPayouts',
    description: 'Get instant answers about your structured settlement with our AI-powered assistant.',
  },
};

export default MintChatPage; 