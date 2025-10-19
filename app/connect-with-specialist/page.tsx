/**
 * Connect with Specialist Page Route
 *
 * Dedicated page for specialist chat interactions. This page provides
 * the entry point for users who want to connect with settlement specialists
 * through various contact methods (live chat, SMS, phone call).
 *
 * Features:
 * - Specialist-specific welcome screen with contact options
 * - Integration with existing chat infrastructure
 * - Session tracking for specialist interactions
 * - Seamless routing back to main chat
 *
 * @route /connect-with-specialist
 * @author SmarterPayouts Team
 * @since 2025
 */

import { Metadata } from 'next';
import MintChatActivePage from '@/src/components/Pages/MintChatActivePage/MintChatActivePage';

// Essential SEO metadata for the specialist chat page
export const metadata: Metadata = {
  title: 'Connect with Settlement Specialists | SmarterPayouts',
  description: 'Get personalized guidance from our licensed settlement specialists. Choose from live chat, SMS, or phone consultation - completely free and confidential.',
  keywords: 'settlement specialist, structured settlement help, live chat specialist, SMS consultation, phone consultation, settlement experts',
  authors: [{ name: 'SmarterPayouts Team' }],
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    userScalable: false,
  },
  openGraph: {
    title: 'Connect with Settlement Specialists | SmarterPayouts',
    description: 'Get personalized guidance from our licensed settlement specialists. Choose from live chat, SMS, or phone consultation - completely free and confidential.',
    type: 'website',
    url: 'https://smarterpayouts.com/connect-with-specialist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with Settlement Specialists | SmarterPayouts',
    description: 'Get personalized guidance from our licensed settlement specialists. Choose from live chat, SMS, or phone consultation - completely free and confidential.',
  },
};

/**
 * Specialist Chat Page Component
 * 
 * Reuses the MintChatActivePage component with specialist mode.
 * The specialist mode is automatically detected from the URL parameter ?type=specialist
 * and displays specialist-specific welcome messages and contact options.
 */
export default function ConnectWithSpecialistPage() {
  return <MintChatActivePage />;
}
