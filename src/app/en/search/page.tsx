import { Metadata } from 'next';
import StationSearch from '@/components/StationSearch';

export const metadata: Metadata = {
  title: 'Station Search - Train Tracker France',
  description: 'Search among over 3000 French stations and access real-time schedules. Find your station quickly with our advanced search engine.',
  keywords: 'station search, SNCF stations, train schedules, TGV, TER, Intercités',
  openGraph: {
    title: 'Station Search - Train Tracker France',
    description: 'Search among over 3000 French stations and access real-time schedules.',
    url: 'https://traintracker.fr/en/search',
    siteName: 'Train Tracker France',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/en/search',
    languages: {
      'fr': 'https://traintracker.fr/recherche',
      'en': 'https://traintracker.fr/en/search',
    },
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Station Search
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find among over 3000 French stations and access real-time schedules
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StationSearch locale="en" />
      </main>
    </div>
  );
}