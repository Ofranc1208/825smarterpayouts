/**
 * Home Page Route
 * 
 * Thin wrapper that imports the actual Home page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 * 
 * @route /
 * @author SmarterPayouts Team
 * @since 2024
 */

import { HomePage } from '@/src/components/Pages';

export default function Home() {
  return <HomePage />;
}