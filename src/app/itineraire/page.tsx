import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { JourneyPlanner } from '@/components/sections/JourneyPlanner';

export const metadata = getMetadata(
  pageMetadata.fr.journey.title,
  pageMetadata.fr.journey.description,
  '/itineraire',
  'fr'
);

export default function JourneyPage() {
  const lang = 'fr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">Planificateur d'itinéraire</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planificateur d'itinéraire
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Planifiez vos trajets SNCF avec calcul en temps réel des retards et grèves. 
            Trouvez les meilleurs itinéraires et alternatives pour vos déplacements en France.
          </p>
        </div>

        <JourneyPlanner lang={lang} />
      </div>
    </div>
  );
}