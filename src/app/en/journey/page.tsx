import React, { Suspense } from 'react';
import { Metadata } from 'next';
import JourneyPlannerContent from '@/components/pages/JourneyPlannerContent';

export const metadata: Metadata = {
  title: "Journey Planner | Train Tracker France",
  description: "Plan your train journey with real-time schedules. Find the best SNCF routes between all French stations.",
  keywords: "journey planner, train travel, sncf schedules, train trip france, train booking",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/en/journey/",
    languages: {
      "fr": "https://traintracker.fr/itineraire/",
      "en": "https://traintracker.fr/en/journey/",
    },
  },
  openGraph: {
    title: "Journey Planner | Train Tracker France",
    description: "Plan your train journey with real-time schedules",
    url: "https://traintracker.fr/en/journey/",
    siteName: "Train Tracker France",
    images: [
      {
        url: "/og-journey-en.jpg",
        width: 1200,
        height: 630,
        alt: "Journey Planner - Train Tracker France",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Planner | Train Tracker France",
    description: "Plan your train journey",
    images: ["/twitter-journey-en.jpg"],
  },
};

export default function EnglishJourneyPlannerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Journey Planner Train Tracker France",
    "description": "Plan your train journey with real-time schedules",
    "url": "https://traintracker.fr/en/journey/",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Any",
    "provider": {
      "@type": "Organization",
      "name": "Train Tracker France",
      "url": "https://traintracker.fr"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
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
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading journey planner...</p>
        </div>
      </div>}>
        <JourneyPlannerContent language="en" />
      </Suspense>
    </>
  );
}