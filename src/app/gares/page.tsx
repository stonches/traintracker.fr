import { Metadata } from 'next';
import StationDirectory from '@/components/StationDirectory';

export const metadata: Metadata = {
  title: 'Toutes les Gares - Train Tracker France',
  description: 'Répertoire complet de toutes les gares françaises avec horaires en temps réel. Plus de 3000 stations SNCF avec informations détaillées et géolocalisation.',
  keywords: 'toutes gares France, répertoire stations SNCF, liste complète gares, horaires trains France',
  openGraph: {
    title: 'Toutes les Gares - Train Tracker France',
    description: 'Répertoire complet de toutes les gares françaises avec horaires en temps réel.',
    url: 'https://traintracker.fr/gares',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/gares',
    languages: {
      'fr': 'https://traintracker.fr/gares',
      'en': 'https://traintracker.fr/en/stations',
    },
  },
};

export default function GaresPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Toutes les Gares
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Répertoire complet de plus de 3000 gares françaises avec horaires en temps réel
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StationDirectory locale="fr" />
      </main>
    </div>
  );
}