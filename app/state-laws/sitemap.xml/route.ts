// State Laws Sitemap XML Route
// Generates XML sitemap for all state law pages
// This fixes the missing sitemap.xml route that Google Search Console is looking for

import { NextResponse } from 'next/server';
import sitemap from '../../sitemap';
import type { MetadataRoute } from 'next';

export async function GET() {
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
}
