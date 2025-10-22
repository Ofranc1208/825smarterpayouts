/**
 * Page Tracking Hook
 * Automatically tracks page views when route changes
 * 
 * @hook usePageTracking
 * @example
 * ```tsx
 * 'use client';
 * import { usePageTracking } from '@/src/hooks/usePageTracking';
 * 
 * export default function Layout({ children }) {
 *   usePageTracking();
 *   return <>{children}</>;
 * }
 * ```
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/src/lib/analytics/gtag';

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      pageview(url);
    }
  }, [pathname, searchParams]);
}

