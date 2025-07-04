import { Metadata } from 'next';
import StationDirectory from '@/components/StationDirectory';

export const metadata: Metadata = {
  title: 'All Stations - Train Tracker France',
  description: 'Complete directory of all French stations with real-time schedules. Over 3000 SNCF stations with detailed information and geolocation.',
  keywords: 'all French stations, SNCF station directory, complete station list, French train schedules',
  openGraph: {
    title: 'All Stations - Train Tracker France',
    description: 'Complete directory of all French stations with real-time schedules.',
    url: 'https://traintracker.fr/en/stations',
    siteName: 'Train Tracker France',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/en/stations',
    languages: {
      'fr': 'https://traintracker.fr/gares',
      'en': 'https://traintracker.fr/en/stations',
    },
  },
};

export default function StationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Stations
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete directory of over 3000 French stations with real-time schedules
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StationDirectory locale="en" />
      </main>
    </div>
  );
}