import { Metadata, Viewport } from 'next';
import MintChatActivePage from './MintChatActivePage';

/**
 * Active Mint Chat Page Route
 *
 * Dedicated full-page chat experience without navigation.
 * Users are redirected here when they start chatting from the main mint-intelligent-chat page.
 * Provides an immersive, distraction-free chat environment.
 */

// SEO metadata for the active chat page
export const metadata: Metadata = {
  title: 'Chatting with Mint | SmarterPayouts',
  description: 'Active chat session with Mint AI Assistant - Get your settlement questions answered instantly.',
  robots: {
    index: false, // Don't index active chat sessions
    follow: false,
  },
};

// Viewport configuration (separate export per Next.js 14 requirements)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // Enable safe area support
  userScalable: false, // Prevent zoom for better chat experience
};

export default MintChatActivePage;
