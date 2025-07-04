import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { JourneyPlanner } from '@/components/sections/JourneyPlanner';

export const metadata = getMetadata(
  pageMetadata.en.journey.title,
  pageMetadata.en.journey.description,
  '/en/journey',
  'en'
);

export default function EnglishJourneyPage() {
  const lang = 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">Journey Planner</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Journey Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Plan your SNCF journeys with real-time delay and strike calculations. 
            Find the best routes and alternatives for your travel across France.
          </p>
        </div>

        <JourneyPlanner lang={lang} />
      </div>
    </div>
  );
}