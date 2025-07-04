import { notFound } from 'next/navigation';
import { getMetadata } from '@/lib/i18n/metadata';
import { getTranslation } from '@/lib/i18n/utils';
import { DeparturesBoard } from '@/components/sections/DeparturesBoard';

interface StationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Station data with proper UIC codes
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
  'part-dieu': {
    id: 'stop_area:OCE:SA:87723197',
    name: 'Part-Dieu',
    slug: 'part-dieu',
    coordinates: { lat: 45.7603, lon: 4.8595 },
    region: 'Auvergne-Rhône-Alpes',
    departement: 'Lyon',
  },
  'marseille-saint-charles': {
    id: 'stop_area:OCE:SA:87751008',
    name: 'Marseille Saint-Charles',
    slug: 'marseille-saint-charles',
    coordinates: { lat: 43.3029, lon: 5.3808 },
    region: 'Provence-Alpes-Côte d\'Azur',
    departement: 'Marseille',
  },
  'toulouse-matabiau': {
    id: 'stop_area:OCE:SA:87611004',
    name: 'Toulouse Matabiau',
    slug: 'toulouse-matabiau',
    coordinates: { lat: 43.6109, lon: 1.4540 },
    region: 'Occitanie',
    departement: 'Toulouse',
  },
  'lille-europe': {
    id: 'stop_area:OCE:SA:87286005',
    name: 'Lille Europe',
    slug: 'lille-europe',
    coordinates: { lat: 50.6386, lon: 3.0754 },
    region: 'Hauts-de-France',
    departement: 'Lille',
  },
  'strasbourg': {
    id: 'stop_area:OCE:SA:87212027',
    name: 'Strasbourg',
    slug: 'strasbourg',
    coordinates: { lat: 48.5847, lon: 7.7339 },
    region: 'Grand Est',
    departement: 'Strasbourg',
  },
  'bordeaux-saint-jean': {
    id: 'stop_area:OCE:SA:87581009',
    name: 'Bordeaux Saint-Jean',
    slug: 'bordeaux-saint-jean',
    coordinates: { lat: 44.8261, lon: -0.5569 },
    region: 'Nouvelle-Aquitaine',
    departement: 'Bordeaux',
  },
  'nantes': {
    id: 'stop_area:OCE:SA:87481002',
    name: 'Nantes',
    slug: 'nantes',
    coordinates: { lat: 47.2169, lon: -1.5412 },
    region: 'Pays de la Loire',
    departement: 'Nantes',
  },
};

export async function generateStaticParams() {
  return Object.keys(STATIONS).map((slug) => ({
    slug,
  }));
}

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