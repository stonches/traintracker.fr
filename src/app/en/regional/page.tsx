import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { RegionalTransport } from '@/components/sections/RegionalTransport';

export const metadata = getMetadata(
  pageMetadata.en.regional.title,
  pageMetadata.en.regional.description,
  '/en/regional',
  'en'
);

export default function EnglishRegionalTransportPage() {
  const lang = 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">Regional Transport</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Regional Transport
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track regional transport in France: TER, Transilien, regional buses. 
            Schedules, disruptions and real-time information for your local journeys.
          </p>
        </div>

        <RegionalTransport lang={lang} />
      </div>
    </div>
  );
}