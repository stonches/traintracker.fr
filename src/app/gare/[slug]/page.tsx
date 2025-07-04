import { notFound } from 'next/navigation';
import { getMetadata } from '@/lib/i18n/metadata';
import { getTranslation } from '@/lib/i18n/utils';
import { DeparturesBoard } from '@/components/sections/DeparturesBoard';

interface StationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock station data
const STATIONS = {
  'gare-du-nord': {
    id: 'stop_area:OCE:SA:87686006',
    name: 'Gare du Nord',
    slug: 'gare-du-nord',
    coordinates: { lat: 48.8809, lon: 2.3553 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
  'gare-de-lyon': {
    id: 'stop_area:OCE:SA:87686077',
    name: 'Gare de Lyon',
    slug: 'gare-de-lyon',
    coordinates: { lat: 48.8447, lon: 2.3740 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
  'montparnasse': {
    id: 'stop_area:OCE:SA:87391003',
    name: 'Montparnasse',
    slug: 'montparnasse',
    coordinates: { lat: 48.8404, lon: 2.3193 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
};

export async function generateMetadata({ params }: StationPageProps) {
  const { slug } = await params;
  const station = STATIONS[slug as keyof typeof STATIONS];
  
  if (!station) {
    return {
      title: 'Gare non trouvée | Train Tracker France',
      description: 'La gare demandée n\'a pas été trouvée.',
    };
  }

  return getMetadata(
    `Gare de ${station.name} France - Départs en Temps Réel | Train Tracker`,
    `${station.name} France : Départs en temps réel, retards et grèves SNCF. Consultez les horaires de trains TGV, TER depuis la gare de ${station.name} sur Train Tracker France.`,
    `/gare/${slug}`,
    'fr'
  );
}

export default async function StationPage({ params }: StationPageProps) {
  const { slug } = await params;
  const station = STATIONS[slug as keyof typeof STATIONS];
  const lang = 'fr';

  if (!station) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span>Gares</span>
            <span>/</span>
            <span className="text-gray-900">{station.name}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {station.name}
          </h1>
          <p className="text-lg text-gray-600">
            {station.region} • {station.departement}
          </p>
        </div>

        <DeparturesBoard stationId={station.id} stationName={station.name} lang={lang} />
      </div>
    </div>
  );
}