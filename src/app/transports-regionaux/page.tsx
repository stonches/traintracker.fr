import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { RegionalTransport } from '@/components/sections/RegionalTransport';

export const metadata = getMetadata(
  pageMetadata.fr.regional.title,
  pageMetadata.fr.regional.description,
  '/transports-regionaux',
  'fr'
);

export default function RegionalTransportPage() {
  const lang = 'fr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">Transports régionaux</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transports régionaux
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Suivez les transports régionaux en France : TER, Transilien, bus régionaux. 
            Horaires, perturbations et informations en temps réel pour vos déplacements locaux.
          </p>
        </div>

        <RegionalTransport lang={lang} />
      </div>
    </div>
  );
}