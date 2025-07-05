import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StationPageContent from '@/components/pages/StationPageContent';
import stationsData from '@/data/stations.json';

interface StationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return stationsData.stations.map((station) => ({
    slug: station.slug,
  }));
}

export async function generateMetadata({ params }: StationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = stationsData.stations.find(s => s.slug === slug);
  
  if (!station) {
    return {
      title: 'Station not found | Train Tracker France',
      description: 'The requested station was not found.'
    };
  }

  const title = `${station.name} - Schedules & Departures | Train Tracker France`;
  const description = `Real-time schedules ${station.name}: departures, arrivals, delays, platforms. Updated passenger information. ${station.services.join(', ')}.`;
  const url = `https://traintracker.fr/en/station/${station.slug}/`;

  return {
    title,
    description,
    keywords: `${station.name}, ${station.city}, ${station.city} station, ${station.name} schedules, ${station.services.join(', ')}, ${station.city} train`,
    authors: [{ name: 'Train Tracker France' }],
    creator: 'Train Tracker France',
    publisher: 'Train Tracker France',
    alternates: {
      canonical: url,
      languages: {
        'fr': `https://traintracker.fr/gare/${station.slug}/`,
        'en': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Train Tracker France',
      images: [
        {
          url: '/og-station-en.jpg',
          width: 1200,
          height: 630,
          alt: `${station.name} - Train Tracker France`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-station-en.jpg'],
    },
    other: {
      'geo.region': 'FR',
      'geo.placename': station.city,
      'geo.position': `${station.coordinates.lat};${station.coordinates.lon}`,
      'ICBM': `${station.coordinates.lat}, ${station.coordinates.lon}`,
    },
  };
}

export default async function EnglishStationPage({ params }: StationPageProps) {
  const { slug } = await params;
  const station = stationsData.stations.find(s => s.slug === slug);
  
  if (!station) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TrainStation",
    "name": station.name,
    "identifier": station.id,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": station.city,
      "addressRegion": station.region,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": station.coordinates.lat,
      "longitude": station.coordinates.lon
    },
    "url": `https://traintracker.fr/en/station/${station.slug}/`,
    "description": station.descriptionEn,
    "amenityFeature": station.facilities?.map(facility => ({
      "@type": "LocationFeatureSpecification",
      "name": facility
    })) || [],
    "publicTransportMode": station.services,
    "provider": {
      "@type": "Organization",
      "name": "Train Tracker France",
      "url": "https://traintracker.fr"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <StationPageContent station={station} language="en" />
    </>
  );
}