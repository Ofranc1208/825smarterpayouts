'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navigation';

/**
 * Conditional Navbar Bridge Component
 * 
 * A bridge component that connects Next.js App Router routing logic (app/) 
 * with the complex navigation system (src/). This component handles the 
 * simple routing concern of when to show/hide the navbar, while delegating 
 * all complex navigation functionality to the src/Navigation system.
 * 
 * Architecture Decision:
 * - Lives in app/components/NavigationBridge/ as it handles Next.js routing concerns
 * - Imports from src/components/Navigation for complex navigation logic
 * - Keeps clean separation between simple routing logic and complex UI systems
 * 
 * @component ConditionalNavbar
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on homepage (/) - this is intentional design
  if (pathname === '/') return null;
  
  // Show enhanced navbar on all other pages
  return <Navbar />;
}
