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
      title: 'Gare non trouvée | Train Tracker France',
      description: 'La gare demandée n\'a pas été trouvée.'
    };
  }

  const title = `${station.name} - Horaires et Départs | Train Tracker France`;
  const description = `Horaires en temps réel ${station.name} : départs, arrivées, retards, voies. Informations voyageurs actualisées. ${station.services.join(', ')}.`;
  const url = `https://traintracker.fr/gare/${station.slug}/`;

  return {
    title,
    description,
    keywords: `${station.name}, ${station.city}, gare ${station.city}, horaires ${station.name}, ${station.services.join(', ')}, train ${station.city}`,
    authors: [{ name: 'Train Tracker France' }],
    creator: 'Train Tracker France',
    publisher: 'Train Tracker France',
    alternates: {
      canonical: url,
      languages: {
        'fr': url,
        'en': `https://traintracker.fr/en/station/${station.slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Train Tracker France',
      images: [
        {
          url: '/og-station.jpg',
          width: 1200,
          height: 630,
          alt: `${station.name} - Train Tracker France`,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-station.jpg'],
    },
    other: {
      'geo.region': 'FR',
      'geo.placename': station.city,
      'geo.position': `${station.coordinates.lat};${station.coordinates.lon}`,
      'ICBM': `${station.coordinates.lat}, ${station.coordinates.lon}`,
    },
  };
}

export default async function StationPage({ params }: StationPageProps) {
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
    "url": `https://traintracker.fr/gare/${station.slug}/`,
    "description": station.description,
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
      <StationPageContent station={station} language="fr" />
    </>
  );
}