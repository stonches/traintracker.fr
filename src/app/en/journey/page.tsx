import { Metadata } from 'next';
import JourneyPlanner from '@/components/JourneyPlanner';

export const metadata: Metadata = {
  title: 'Journey Planner - Train Tracker France',
  description: 'Plan your train journey with our real-time journey planner. Find the best connections between all French stations.',
  keywords: 'journey planner, train travel, SNCF connections, TGV, TER, transfers',
  openGraph: {
    title: 'Journey Planner - Train Tracker France',
    description: 'Plan your train journey with our real-time journey planner.',
    url: 'https://traintracker.fr/en/journey',
    siteName: 'Train Tracker France',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/en/journey',
    languages: {
      'fr': 'https://traintracker.fr/itineraire',
      'en': 'https://traintracker.fr/en/journey',
    },
  },
};

export default function JourneyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Journey Planner',
    description: 'Plan your train journey with our real-time journey planner',
    url: 'https://traintracker.fr/en/journey',
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
                Journey Planner
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find the best route for your train journey with real-time information
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <JourneyPlanner locale="en" />
        </main>
      </div>
    </>
  );
}