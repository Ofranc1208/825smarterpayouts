import { NextResponse } from 'next/server';
import sitemapFunction from '../sitemap';
import type { MetadataRoute } from 'next';

export async function GET() {
  const sitemapData = sitemapFunction();
  const currentDate = new Date();

  // Generate XML sitemap
  let xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  sitemapData.forEach((entry: MetadataRoute.Sitemap[number]) => {
    const lastMod = entry.lastModified instanceof Date
      ? entry.lastModified.toISOString()
      : currentDate.toISOString();

    xmlSitemap += `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  });

  xmlSitemap += `
</urlset>`;

  return new NextResponse(xmlSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
