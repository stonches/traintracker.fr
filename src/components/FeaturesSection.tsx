import { Clock, MapPin, Smartphone, Zap, Globe, Shield } from 'lucide-react';

interface FeaturesSectionProps {
  locale?: 'fr' | 'en';
}

export default function FeaturesSection({ locale = 'fr' }: FeaturesSectionProps) {
  const features = [
    {
      icon: Clock,
      title: 'Temps réel',
      description: 'Horaires actualisés toutes les 30 secondes avec les dernières informations SNCF',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: MapPin,
      title: '3000+ gares',
      description: 'Couverture complète du réseau ferroviaire français, des grandes gares aux stations rurales',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Smartphone,
      title: 'Mobile-first',
      description: 'Interface optimisée pour mobile avec notifications push et mode hors ligne',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Chargement ultra-rapide avec mise en cache intelligente et optimisations avancées',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Globe,
      title: 'Multilingue',
      description: 'Interface disponible en français et anglais avec commutation transparente',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Shield,
      title: 'Fiabilité',
      description: 'Données officielles SNCF avec garantie de précision et disponibilité 24/7',
      color: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Train Tracker France ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La plateforme la plus complète et la plus fiable pour suivre les trains français
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
            <div className="text-sm text-gray-600">Gares couvertes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Disponibilité</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">30s</div>
            <div className="text-sm text-gray-600">Mise à jour</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Données SNCF</div>
          </div>
        </div>
      </div>
    </section>
  );
}