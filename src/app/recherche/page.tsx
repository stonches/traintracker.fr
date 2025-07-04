import { Metadata } from 'next';
import StationSearch from '@/components/StationSearch';

export const metadata: Metadata = {
  title: 'Recherche de Gares - Train Tracker France',
  description: 'Recherchez parmi plus de 3000 gares françaises et accédez aux horaires en temps réel. Trouvez votre gare rapidement avec notre moteur de recherche avancé.',
  keywords: 'recherche gares, stations SNCF, horaires trains, TGV, TER, Intercités',
  openGraph: {
    title: 'Recherche de Gares - Train Tracker France',
    description: 'Recherchez parmi plus de 3000 gares françaises et accédez aux horaires en temps réel.',
    url: 'https://traintracker.fr/recherche',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/recherche',
    languages: {
      'fr': 'https://traintracker.fr/recherche',
      'en': 'https://traintracker.fr/en/search',
    },
  },
};

export default function RecherchePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Recherche de Gares
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trouvez parmi plus de 3000 gares françaises et accédez aux horaires en temps réel
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StationSearch locale="fr" />
      </main>
    </div>
  );
}