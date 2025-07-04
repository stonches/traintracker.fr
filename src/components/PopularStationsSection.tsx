import { ArrowRight, MapPin, Clock } from 'lucide-react';

interface PopularStationsSectionProps {
  locale?: 'fr' | 'en';
}

export default function PopularStationsSection({ locale = 'fr' }: PopularStationsSectionProps) {
  const popularStations = [
    {
      nom: 'Paris Gare du Nord',
      slug: 'paris-gare-du-nord',
      region: 'Île-de-France',
      description: 'Principale gare parisienne pour les destinations du nord',
      services: ['TGV', 'Eurostar', 'Thalys', 'TER'],
      icon: '🚄'
    },
    {
      nom: 'Paris Gare de Lyon',
      slug: 'paris-gare-de-lyon',
      region: 'Île-de-France',
      description: 'Gare principale pour le sud-est de la France',
      services: ['TGV', 'Intercités', 'TER'],
      icon: '🚄'
    },
    {
      nom: 'Lyon Part-Dieu',
      slug: 'lyon-part-dieu',
      region: 'Auvergne-Rhône-Alpes',
      description: 'Hub ferroviaire du sud-est français',
      services: ['TGV', 'Intercités', 'TER'],
      icon: '🚆'
    },
    {
      nom: 'Marseille Saint-Charles',
      slug: 'marseille-saint-charles',
      region: 'Provence-Alpes-Côte d\'Azur',
      description: 'Porte d\'entrée ferroviaire de la Méditerranée',
      services: ['TGV', 'Intercités', 'TER'],
      icon: '🚆'
    },
    {
      nom: 'Lille Europe',
      slug: 'lille-europe',
      region: 'Hauts-de-France',
      description: 'Gare internationale du nord de la France',
      services: ['TGV', 'Eurostar', 'Thalys'],
      icon: '🚅'
    },
    {
      nom: 'Bordeaux Saint-Jean',
      slug: 'bordeaux-saint-jean',
      region: 'Nouvelle-Aquitaine',
      description: 'Principale gare du sud-ouest français',
      services: ['TGV', 'Intercités', 'TER'],
      icon: '🚄'
    },
    {
      nom: 'Toulouse Matabiau',
      slug: 'toulouse-matabiau',
      region: 'Occitanie',
      description: 'Hub ferroviaire du Sud-Ouest',
      services: ['TGV', 'Intercités', 'TER'],
      icon: '🚆'
    },
    {
      nom: 'Strasbourg',
      slug: 'strasbourg',
      region: 'Grand Est',
      description: 'Carrefour ferroviaire franco-allemand',
      services: ['TGV', 'TER', 'ICE'],
      icon: '🚄'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gares les plus consultées
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accédez rapidement aux principales gares françaises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularStations.map((station, index) => (
            <a
              key={index}
              href={`/gare/${station.slug}`}
              className="group bg-gray-50 hover:bg-blue-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{station.icon}</div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                {station.nom}
              </h3>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {station.region}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {station.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {station.services.map((service, serviceIndex) => (
                  <span
                    key={serviceIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* View All Stations Link */}
        <div className="text-center mt-12">
          <a
            href="/gares"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span>Voir toutes les gares</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}