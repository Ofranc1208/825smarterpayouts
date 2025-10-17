'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import DualNavbar from '@/src/components/Navigation';

/**
 * Conditional Navbar Bridge Component
 * 
 * PURE BRIDGE - NO STYLING WHATSOEVER
 * 
 * This component ONLY handles routing logic:
 * - Shows nothing on homepage (/)
 * - Shows src/Navigation/DualNavbar on all other pages
 * - Contains ZERO styling, ZERO inline styles, ZERO CSS
 * - All navigation styling comes from src/Navigation system
 * 
 * @component ConditionalNavbar
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update body data-page attribute for CSS targeting
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-page', pathname);
    }
  }, [pathname]);

  // Don't show navbar on homepage (/) or active chat page - these are standalone experiences
  // Check this FIRST, before any rendering
  if (pathname === '/' || pathname === '/mint-chat-active') return null;
  
  // Show nothing during SSR/hydration - let src/Navigation handle everything
  if (!isClient) {
    return null;
  }
  
  // Show enhanced navbar on all other pages
  return <DualNavbar />;
}
