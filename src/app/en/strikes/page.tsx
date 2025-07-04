import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { StrikesPanel } from '@/components/sections/StrikesPanel';

export const metadata = getMetadata(
  'SNCF Strikes and Disruptions France | Train Tracker',
  'Stay informed about current and upcoming SNCF strikes in France. Real-time impact assessment and alternative solutions.',
  '/en/strikes',
  'en'
);

export default function EnglishStrikesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">Strikes</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SNCF Strikes & Disruptions
          </h1>
          <p className="text-lg text-gray-600">
            Stay informed about strikes and service disruptions on the French rail network
          </p>
        </div>

        <StrikesPanel lang="en" />
      </div>
    </div>
  );
}