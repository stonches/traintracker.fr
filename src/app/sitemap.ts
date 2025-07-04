import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://traintracker.fr';
  
  // Popular stations for sitemap
  const popularStations = [
    'paris-gare-du-nord',
    'paris-gare-de-lyon',
    'lyon-part-dieu',
    'marseille-saint-charles',
    'lille-europe',
    'bordeaux-saint-jean',
    'toulouse-matabiau',
    'strasbourg',
    'nantes',
    'rennes',
    'nice-ville',
    'montpellier-saint-roch'
  ];

  // Main pages (French)
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/recherche`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/itineraire`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gares`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // English pages
  const englishPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/journey`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/stations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Station pages (French)
  const frenchStationPages = popularStations.map(slug => ({
    url: `${baseUrl}/gare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  // Station pages (English)
  const englishStationPages = popularStations.map(slug => ({
    url: `${baseUrl}/en/station/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.7,
  }));

  return [
    ...mainPages,
    ...englishPages,
    ...frenchStationPages,
    ...englishStationPages,
  ];
}