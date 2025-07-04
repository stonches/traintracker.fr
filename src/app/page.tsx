import { Metadata } from 'next';
import SearchSection from '@/components/SearchSection';
import FeaturesSection from '@/components/FeaturesSection';
import PopularStationsSection from '@/components/PopularStationsSection';
import { Train, Search, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Train Tracker France - Horaires de Trains en Temps Réel',
  description: 'Consultez les horaires et départs de trains en temps réel pour toutes les gares françaises. TGV, TER, Intercités - Informations officielles SNCF mises à jour en direct.',
  keywords: 'horaires trains, SNCF, TGV, TER, gares France, temps réel, départs trains, Train Tracker',
  openGraph: {
    title: 'Train Tracker France - Horaires de Trains en Temps Réel',
    description: 'Consultez les horaires et départs de trains en temps réel pour toutes les gares françaises.',
    url: 'https://traintracker.fr',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Train Tracker France - Horaires de Trains en Temps Réel',
    description: 'Consultez les horaires et départs de trains en temps réel pour toutes les gares françaises.',
  },
  alternates: {
    canonical: 'https://traintracker.fr',
    languages: {
      'fr': 'https://traintracker.fr',
      'en': 'https://traintracker.fr/en',
    },
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Train Tracker France',
    url: 'https://traintracker.fr',
    description: 'Plateforme d\'informations ferroviaires en temps réel pour toutes les gares françaises',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://traintracker.fr/recherche?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Train Tracker France',
      url: 'https://traintracker.fr',
      logo: 'https://traintracker.fr/logo.png',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Train className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Train Tracker France
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Horaires et départs de trains en temps réel pour toutes les gares françaises
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span>Temps réel</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4" />
                  <span>3000+ gares</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Train className="h-4 w-4" />
                  <span>TGV, TER, Intercités</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <SearchSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Popular Stations Section */}
        <PopularStationsSection />

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tous les services ferroviaires français
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accédez aux informations en temps réel pour l'ensemble du réseau ferré français
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚄</div>
                <h3 className="font-semibold text-gray-900 mb-2">TGV</h3>
                <p className="text-sm text-gray-600">Trains à grande vitesse</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Eurostar</h3>
                <p className="text-sm text-gray-600">Liaisons internationales</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚆</div>
                <h3 className="font-semibold text-gray-900 mb-2">Intercités</h3>
                <p className="text-sm text-gray-600">Trains intercités</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚊</div>
                <h3 className="font-semibold text-gray-900 mb-2">TER</h3>
                <p className="text-sm text-gray-600">Transport express régional</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à planifier votre voyage ?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Recherchez votre gare ou planifiez votre itinéraire en quelques clics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/recherche"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Rechercher une gare
              </a>
              <a
                href="/itineraire"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Planifier un trajet
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
