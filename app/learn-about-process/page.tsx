/**
 * Learn About Our Process Page Route
 *
 * Thin wrapper that imports the actual MintChatActivePage implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 *
 * @route /learn-about-process
 * @author SmarterPayouts Team
 * @since 2025
 */

import { MintChatActivePage } from '@/src/components/Pages';

// Re-export metadata and viewport from the src implementation
export { metadata, viewport } from '@/src/components/Pages/MintChatActivePage';

export default function LearnAboutProcessPage() {
  return <MintChatActivePage />;
}
