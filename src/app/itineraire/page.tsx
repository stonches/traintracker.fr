import React, { Suspense } from 'react';
import { Metadata } from 'next';
import JourneyPlannerContent from '@/components/pages/JourneyPlannerContent';

export const metadata: Metadata = {
  title: "Planificateur d'Itinéraire | Train Tracker France",
  description: "Planifiez votre voyage en train avec des horaires en temps réel. Trouvez les meilleurs itinéraires SNCF entre toutes les gares françaises.",
  keywords: "planificateur itinéraire, voyage train, horaires sncf, trajet train france, réservation train",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/itineraire/",
    languages: {
      "fr": "https://traintracker.fr/itineraire/",
      "en": "https://traintracker.fr/en/journey/",
    },
  },
  openGraph: {
    title: "Planificateur d'Itinéraire | Train Tracker France",
    description: "Planifiez votre voyage en train avec des horaires en temps réel",
    url: "https://traintracker.fr/itineraire/",
    siteName: "Train Tracker France",
    images: [
      {
        url: "/og-journey-fr.jpg",
        width: 1200,
        height: 630,
        alt: "Planificateur d'Itinéraire - Train Tracker France",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planificateur d'Itinéraire | Train Tracker France",
    description: "Planifiez votre voyage en train",
    images: ["/twitter-journey-fr.jpg"],
  },
};

export default function JourneyPlannerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Planificateur d'Itinéraire Train Tracker France",
    "description": "Planifiez votre voyage en train avec des horaires en temps réel",
    "url": "https://traintracker.fr/itineraire/",
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
          <p className="text-gray-600">Chargement du planificateur...</p>
        </div>
      </div>}>
        <JourneyPlannerContent language="fr" />
      </Suspense>
    </>
  );
}