import MintChatPage from '@/src/components/Pages/MintChat';
import { Metadata } from 'next';

/**
 * Mint Chat Page Route - Enterprise Edition
 * 
 * This page route imports and renders the enterprise-grade
 * MintChatPage component with comprehensive SEO metadata.
 * 
 * All logic, components, and functionality are contained within
 * the src/components/Pages/MintChat/ module for better
 * organization and maintainability.
 * 
 * @page /mint-intelligent-chat
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

// Enterprise-grade SEO metadata for App Router
export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#059669',
});

export const metadata: Metadata = {
  title: 'Chat with Mint AI Assistant | SmarterPayouts - Instant Settlement Quotes',
  description: 'Get instant answers about your structured settlement with our AI-powered assistant. No personal information required - just ask and get expert guidance immediately.',
  keywords: 'AI assistant, structured settlement chat, instant quotes, settlement questions, Mint AI, transparent pricing, market rates, settlement calculator',
  authors: [{ name: 'SmarterPayouts Team' }],
  creator: 'SmarterPayouts',
  publisher: 'SmarterPayouts',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smarterpayouts.com/mint-intelligent-chat',
    title: 'Chat with Mint AI Assistant | SmarterPayouts',
    description: 'Get instant answers about your structured settlement with our AI-powered assistant. No personal information required.',
    siteName: 'SmarterPayouts',
    images: [
      {
        url: 'https://smarterpayouts.com/images/mint-ai-chat-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Mint AI Assistant Chat Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with Mint AI Assistant | SmarterPayouts',
    description: 'Get instant answers about your structured settlement with our AI-powered assistant. No personal information required.',
    creator: '@SmarterPayouts',
    images: ['https://smarterpayouts.com/images/mint-ai-chat-preview.jpg'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/mint-intelligent-chat',
  },
  category: 'Financial Services',
};

export default MintChatPage; 