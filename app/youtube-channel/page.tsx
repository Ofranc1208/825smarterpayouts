/**
 * YouTube Channel Page Route
 * 
 * Thin wrapper that imports the actual YouTube Channel page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 * 
 * @route /youtube-channel
 * @author SmarterPayouts Team
 * @since 2024
 */

import { YouTubeChannelPage } from '@/src/components/Pages';

export default function YouTubeChannel() {
  return <YouTubeChannelPage />;
}