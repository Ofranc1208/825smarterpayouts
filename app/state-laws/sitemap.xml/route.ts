// DEPRECATED: This route is redundant - all sitemap data is now in app/sitemap.ts
// The main sitemap at /sitemap.xml already includes all state law pages
// This route is kept for backward compatibility but returns 404 to avoid duplicate sitemaps

import { NextResponse } from 'next/server';

export async function GET() {
  // Return 404 - this route is deprecated
  // All sitemap data is available at /sitemap.xml
  return new NextResponse('Not Found - Use /sitemap.xml instead', { 
    status: 404,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
