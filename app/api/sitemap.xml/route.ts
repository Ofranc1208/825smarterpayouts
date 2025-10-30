// Sitemap XML API Route
// Serves the sitemap.xml file for Google Search Console
// Imports sitemap data from /app/sitemap.ts

import { NextResponse } from 'next/server';
import sitemap from '../../sitemap';
import type { MetadataRoute } from 'next';

export async function GET() {
  try {
    // Get sitemap entries from the existing sitemap.ts file
    const sitemapEntries: MetadataRoute.Sitemap = sitemap();

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry: MetadataRoute.Sitemap[number]) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified ? new Date(entry.lastModified).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
