import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Search, MapPin, Train, Clock } from 'lucide-react';
import { StationSearch } from '@/components/ui/StationSearch';

export const metadata = getMetadata(
  'Gares SNCF France - Recherche et Informations | Train Tracker',
  'Trouvez et consultez les informations de toutes les gares SNCF en France. Horaires, départs en temps réel et services disponibles.',
  '/gares',
  'fr'
);

export default function StationsPage() {
  // All supported stations with working pages
  const availableStations = [
    { name: 'Gare du Nord', city: 'Paris', region: 'Île-de-France', slug: 'gare-du-nord' },
    { name: 'Gare de Lyon', city: 'Paris', region: 'Île-de-France', slug: 'gare-de-lyon' },
    { name: 'Montparnasse', city: 'Paris', region: 'Île-de-France', slug: 'montparnasse' },
    { name: 'Part-Dieu', city: 'Lyon', region: 'Auvergne-Rhône-Alpes', slug: 'part-dieu' },
    { name: 'Marseille Saint-Charles', city: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', slug: 'marseille-saint-charles' },
    { name: 'Toulouse Matabiau', city: 'Toulouse', region: 'Occitanie', slug: 'toulouse-matabiau' },
    { name: 'Lille Europe', city: 'Lille', region: 'Hauts-de-France', slug: 'lille-europe' },
    { name: 'Strasbourg', city: 'Strasbourg', region: 'Grand Est', slug: 'strasbourg' },
    { name: 'Bordeaux Saint-Jean', city: 'Bordeaux', region: 'Nouvelle-Aquitaine', slug: 'bordeaux-saint-jean' },
    { name: 'Nantes', city: 'Nantes', region: 'Pays de la Loire', slug: 'nantes' },
  ];

  const regions = [
    { name: 'Île-de-France', stations: 157 },
    { name: 'Auvergne-Rhône-Alpes', stations: 342 },
    { name: 'Nouvelle-Aquitaine', stations: 298 },
    { name: 'Occitanie', stations: 276 },
    { name: 'Hauts-de-France', stations: 234 },
    { name: 'Grand Est', stations: 267 },
    { name: 'Provence-Alpes-Côte d\'Azur', stations: 198 },
    { name: 'Pays de la Loire', stations: 189 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">Gares</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gares SNCF France
            </h1>
            <p className="text-lg text-gray-600">
              Recherchez et consultez les informations de plus de 3000 gares en France
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Rechercher une gare
            </h2>
            <div className="max-w-2xl">
              <StationSearch
                lang="fr"
                placeholder="Tapez le nom d'une gare ou d'une ville..."
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Trouvez votre gare par nom, ville ou code UIC
            </p>
          </div>

          {/* Available Stations */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Train className="w-5 h-5 mr-2" />
              Gares disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableStations.map((station, index) => (
                <a
                  key={index}
                  href={`/gare/${station.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {station.name}
                      </h3>
                      <p className="text-sm text-gray-600">{station.city}</p>
                      <p className="text-xs text-gray-500">{station.region}</p>
                    </div>
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Gares par région
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{region.name}</h3>
                  <p className="text-sm text-gray-600">{region.stations} gares</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-2xl p-6">
              <Clock className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Horaires en temps réel
              </h3>
              <p className="text-primary-800 text-sm">
                Consultez les départs et arrivées actualisés en continu pour toutes les gares.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <MapPin className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Services en gare
              </h3>
              <p className="text-green-800 text-sm">
                Découvrez les services disponibles : consignes, restaurants, boutiques et plus.
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <Train className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Correspondances
              </h3>
              <p className="text-orange-800 text-sm">
                Planifiez vos correspondances et trouvez les meilleurs itinéraires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}