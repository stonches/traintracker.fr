import { Metadata } from 'next';
import JourneyPlanner from '@/components/JourneyPlanner';

export const metadata: Metadata = {
  title: 'Planificateur d\'Itinéraire - Train Tracker France',
  description: 'Planifiez votre voyage en train avec notre planificateur d\'itinéraire en temps réel. Trouvez les meilleures connexions entre toutes les gares françaises.',
  keywords: 'planificateur itinéraire, voyage train, connexions SNCF, TGV, TER, correspondances',
  openGraph: {
    title: 'Planificateur d\'Itinéraire - Train Tracker France',
    description: 'Planifiez votre voyage en train avec notre planificateur d\'itinéraire en temps réel.',
    url: 'https://traintracker.fr/itineraire',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/itineraire',
    languages: {
      'fr': 'https://traintracker.fr/itineraire',
      'en': 'https://traintracker.fr/en/journey',
    },
  },
};

export default function ItinerairePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Planificateur d\'Itinéraire',
    description: 'Planifiez votre voyage en train avec notre planificateur d\'itinéraire en temps réel',
    url: 'https://traintracker.fr/itineraire',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Train Tracker France',
      url: 'https://traintracker.fr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Planificateur d'Itinéraire
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trouvez le meilleur itinéraire pour votre voyage en train avec des informations en temps réel
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JourneyPlanner locale="fr" />
        </main>
      </div>
    </>
  );
}