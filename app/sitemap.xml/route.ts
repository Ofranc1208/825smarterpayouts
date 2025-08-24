import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://smarterpayouts.com';

  // List all main static routes
  const staticPages = [
    '',
    '/pricing-calculator',
    '/lump-sum-calculator',
    '/about',
    '/contact',
    '/testimonials',
    '/credentials',
    '/resources',
    // Add more static or dynamic routes as needed
  ];

  // Optionally, add dynamic routes here (e.g., blog posts, state laws)
  // Example:
  // const dynamicPages = await fetchDynamicRoutes();

  const urls = staticPages.map(
    (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === '' ? '1.0' : '0.8'}</priority>
      </url>
    `
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 