import { Metadata } from 'next';
import SearchSection from '@/components/SearchSection';
import FeaturesSection from '@/components/FeaturesSection';
import PopularStationsSection from '@/components/PopularStationsSection';
import { Train, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Train Tracker France - Real-Time French Train Schedules',
  description: 'Check real-time train schedules and departures for all French stations. TGV, TER, Intercités - Official SNCF information updated live.',
  keywords: 'French trains, SNCF, TGV, TER, stations France, real-time, departures, Train Tracker',
  openGraph: {
    title: 'Train Tracker France - Real-Time French Train Schedules',
    description: 'Check real-time train schedules and departures for all French stations.',
    url: 'https://traintracker.fr/en',
    siteName: 'Train Tracker France',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Train Tracker France - Real-Time French Train Schedules',
    description: 'Check real-time train schedules and departures for all French stations.',
  },
  alternates: {
    canonical: 'https://traintracker.fr/en',
    languages: {
      'fr': 'https://traintracker.fr',
      'en': 'https://traintracker.fr/en',
    },
  },
};

export default function EnglishHomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Train Tracker France',
    url: 'https://traintracker.fr/en',
    description: 'Real-time railway information platform for all French stations',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://traintracker.fr/en/search?q={search_term_string}',
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
                Real-time train schedules and departures for all French stations
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span>Real-time</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4" />
                  <span>3000+ stations</span>
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
        <SearchSection locale="en" />

        {/* Features Section */}
        <FeaturesSection locale="en" />

        {/* Popular Stations Section */}
        <PopularStationsSection locale="en" />

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                All French railway services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access real-time information for the entire French rail network
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚄</div>
                <h3 className="font-semibold text-gray-900 mb-2">TGV</h3>
                <p className="text-sm text-gray-600">High-speed trains</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Eurostar</h3>
                <p className="text-sm text-gray-600">International connections</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚆</div>
                <h3 className="font-semibold text-gray-900 mb-2">Intercités</h3>
                <p className="text-sm text-gray-600">Intercity trains</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚊</div>
                <h3 className="font-semibold text-gray-900 mb-2">TER</h3>
                <p className="text-sm text-gray-600">Regional express transport</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to plan your journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Search for your station or plan your route in just a few clicks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/en/search"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Search for a station
              </a>
              <a
                href="/en/journey"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Plan a journey
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}