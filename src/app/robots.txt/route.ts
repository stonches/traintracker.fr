import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://traintracker.fr/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Allow access to important pages
Allow: /gare/
Allow: /en/station/
Allow: /itineraire/
Allow: /en/journey/
Allow: /info-trafic/
Allow: /en/traffic-info/

# Block API endpoints from indexing
Disallow: /api/

# Block private pages
Disallow: /admin/
Disallow: /_next/
Disallow: /.well-known/

# Allow favicons and images
Allow: /favicon.ico
Allow: /images/
Allow: /icons/

# Block development files
Disallow: /*.json$
Disallow: /*.map$

# Host directive
Host: https://traintracker.fr`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}