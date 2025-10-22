/**
 * Google Tag Manager Component
 * Injects GTM container into the application
 * 
 * @component GoogleTagManager
 * @example
 * ```tsx
 * import GoogleTagManager from '@/src/components/Analytics/GoogleTagManager';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <GoogleTagManager />
 *       </head>
 *       <body>
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

'use client';

import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export default function GoogleTagManager() {
  // Don't render if GTM_ID is not set
  if (!GTM_ID) {
    console.warn('Google Tag Manager: NEXT_PUBLIC_GTM_ID is not set');
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

/**
 * Google Tag Manager NoScript Component
 * Add this immediately after the opening <body> tag
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

