/**
 * About Page Route
 * 
 * Thin wrapper that imports the actual About page implementation from src/.
 * This follows the architectural pattern where app/ handles routing concerns
 * and src/ contains the actual page logic and components.
 * 
 * @route /about
 * @author SmarterPayouts Team
 * @since 2024
 */

import { AboutPage } from '@/src/components/Pages';

export default function About() {
  return <AboutPage />;
}