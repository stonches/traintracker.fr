import { NextResponse } from 'next/server';
import stationsData from '@/data/stations.json';

export async function GET() {
  const baseUrl = 'https://traintracker.fr';
  const currentDate = new Date().toISOString();
  
  const stations = stationsData.stations;
  
  const urls = [
    // Homepage
    { 
      url: baseUrl, 
      lastModified: currentDate, 
      priority: 1.0, 
      changeFreq: 'daily' 
    },
    { 
      url: `${baseUrl}/en`, 
      lastModified: currentDate, 
      priority: 1.0, 
      changeFreq: 'daily' 
    },
    
    // Main pages French
    { 
      url: `${baseUrl}/itineraire/`, 
      lastModified: currentDate, 
      priority: 0.9, 
      changeFreq: 'daily' 
    },
    { 
      url: `${baseUrl}/info-trafic/`, 
      lastModified: currentDate, 
      priority: 0.9, 
      changeFreq: 'hourly' 
    },
    { 
      url: `${baseUrl}/a-propos/`, 
      lastModified: currentDate, 
      priority: 0.6, 
      changeFreq: 'monthly' 
    },
    { 
      url: `${baseUrl}/contact/`, 
      lastModified: currentDate, 
      priority: 0.6, 
      changeFreq: 'monthly' 
    },
    { 
      url: `${baseUrl}/confidentialite/`, 
      lastModified: currentDate, 
      priority: 0.3, 
      changeFreq: 'yearly' 
    },
    { 
      url: `${baseUrl}/conditions/`, 
      lastModified: currentDate, 
      priority: 0.3, 
      changeFreq: 'yearly' 
    },
    
    // Main pages English
    { 
      url: `${baseUrl}/en/journey/`, 
      lastModified: currentDate, 
      priority: 0.9, 
      changeFreq: 'daily' 
    },
    { 
      url: `${baseUrl}/en/traffic-info/`, 
      lastModified: currentDate, 
      priority: 0.9, 
      changeFreq: 'hourly' 
    },
    { 
      url: `${baseUrl}/en/about/`, 
      lastModified: currentDate, 
      priority: 0.6, 
      changeFreq: 'monthly' 
    },
    { 
      url: `${baseUrl}/en/contact/`, 
      lastModified: currentDate, 
      priority: 0.6, 
      changeFreq: 'monthly' 
    },
    { 
      url: `${baseUrl}/en/privacy/`, 
      lastModified: currentDate, 
      priority: 0.3, 
      changeFreq: 'yearly' 
    },
    { 
      url: `${baseUrl}/en/terms/`, 
      lastModified: currentDate, 
      priority: 0.3, 
      changeFreq: 'yearly' 
    },
    
    // French station pages
    ...stations.map(station => ({
      url: `${baseUrl}/gare/${station.slug}/`,
      lastModified: currentDate,
      priority: 0.8,
      changeFreq: 'hourly'
    })),
    
    // English station pages
    ...stations.map(station => ({
      url: `${baseUrl}/en/station/${station.slug}/`,
      lastModified: currentDate,
      priority: 0.8,
      changeFreq: 'hourly'
    }))
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(({ url, lastModified, priority, changeFreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <priority>${priority}</priority>
    <changefreq>${changeFreq}</changefreq>
  </url>`).join('')}
</urlset>`;
  
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
    },
  });
}