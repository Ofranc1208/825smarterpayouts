/**
 * Google Analytics Component
 * Injects GA4 tracking scripts into the application
 * 
 * @component GoogleAnalytics
 * @example
 * ```tsx
 * import GoogleAnalytics from '@/src/components/Analytics/GoogleAnalytics';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <GoogleAnalytics />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

'use client';

import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/src/lib/analytics/gtag';

export default function GoogleAnalytics() {
  // Don't render if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

