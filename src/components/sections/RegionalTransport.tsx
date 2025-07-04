'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, AlertTriangle, Bus, Train, RefreshCw, ExternalLink } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface RegionalTransportProps {
  lang: Language;
}

interface RegionalService {
  id: string;
  name: string;
  type: 'ter' | 'transilien' | 'bus';
  region: string;
  status: 'good' | 'disrupted' | 'severely_disrupted';
  disruptions: number;
  coverage: string[];
  website: string;
  description: string;
}

interface RegionalDisruption {
  id: string;
  service: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  startTime: string;
  affectedLines: string[];
}

const MOCK_REGIONAL_SERVICES: RegionalService[] = [
  {
    id: 'ter-idf',
    name: 'TER Île-de-France',
    type: 'ter',
    region: 'Île-de-France',
    status: 'good',
    disruptions: 0,
    coverage: ['Seine-et-Marne', 'Essonne', 'Val-d\'Oise'],
    website: 'https://www.ter.sncf.com/ile-de-france',
    description: 'Trains Express Régionaux en Île-de-France',
  },
  {
    id: 'transilien',
    name: 'Transilien SNCF',
    type: 'transilien',
    region: 'Île-de-France',
    status: 'disrupted',
    disruptions: 3,
    coverage: ['RER C', 'RER D', 'RER E', 'Lignes H, J, K, L, N, P, R, U'],
    website: 'https://www.transilien.com',
    description: 'Réseau de trains de banlieue parisienne',
  },
  {
    id: 'ter-aura',
    name: 'TER Auvergne-Rhône-Alpes',
    type: 'ter',
    region: 'Auvergne-Rhône-Alpes',
    status: 'good',
    disruptions: 1,
    coverage: ['Rhône', 'Isère', 'Savoie', 'Haute-Savoie', 'Loire', 'Drôme'],
    website: 'https://www.ter.sncf.com/auvergne-rhone-alpes',
    description: 'Trains régionaux en Auvergne-Rhône-Alpes',
  },
  {
    id: 'ter-hdf',
    name: 'TER Hauts-de-France',
    type: 'ter',
    region: 'Hauts-de-France',
    status: 'good',
    disruptions: 0,
    coverage: ['Nord', 'Pas-de-Calais', 'Somme', 'Oise', 'Aisne'],
    website: 'https://www.ter.sncf.com/hauts-de-france',
    description: 'Trains régionaux dans les Hauts-de-France',
  },
  {
    id: 'cars-region-idf',
    name: 'Cars Région Île-de-France',
    type: 'bus',
    region: 'Île-de-France',
    status: 'good',
    disruptions: 0,
    coverage: ['Seine-et-Marne', 'Yvelines', 'Essonne', 'Val-d\'Oise'],
    website: 'https://www.iledefrance-mobilites.fr',
    description: 'Bus régionaux en Île-de-France',
  },
];

const MOCK_REGIONAL_DISRUPTIONS: RegionalDisruption[] = [
  {
    id: '1',
    service: 'Transilien SNCF',
    title: 'Perturbation ligne RER C',
    description: 'Travaux de maintenance entre Pontoise et Ermont. Circulation perturbée jusqu\'à 18h.',
    severity: 'medium',
    startTime: '2024-12-10T14:00:00Z',
    affectedLines: ['RER C'],
  },
  {
    id: '2',
    service: 'Transilien SNCF',
    title: 'Retards ligne H',
    description: 'Incident technique en gare de Paris Nord. Retards de 10-15 minutes.',
    severity: 'low',
    startTime: '2024-12-10T15:30:00Z',
    affectedLines: ['Ligne H'],
  },
  {
    id: '3',
    service: 'TER Auvergne-Rhône-Alpes',
    title: 'Suppression de trains Lyon-Grenoble',
    description: 'Conditions météorologiques difficiles. 2 trains supprimés ce soir.',
    severity: 'high',
    startTime: '2024-12-10T16:00:00Z',
    affectedLines: ['Lyon-Grenoble'],
  },
];

export function RegionalTransport({ lang }: RegionalTransportProps) {
  const [services, setServices] = useState<RegionalService[]>([]);
  const [disruptions, setDisruptions] = useState<RegionalDisruption[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const loadRegionalData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setServices(MOCK_REGIONAL_SERVICES);
        setDisruptions(MOCK_REGIONAL_DISRUPTIONS);
      } catch (error) {
        console.error('Error loading regional data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRegionalData();
  }, []);

  const regions = [...new Set(services.map(s => s.region))];
  const types = [
    { value: 'ter', label: 'TER' },
    { value: 'transilien', label: 'Transilien' },
    { value: 'bus', label: 'Bus régionaux' },
  ];

  const filteredServices = services.filter(service => {
    if (selectedRegion !== 'all' && service.region !== selectedRegion) return false;
    if (selectedType !== 'all' && service.type !== selectedType) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-success-600 bg-success-50 border-success-200';
      case 'disrupted': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'severely_disrupted': return 'text-danger-600 bg-danger-50 border-danger-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Bon';
      case 'disrupted': return 'Perturbé';
      case 'severely_disrupted': return 'Très perturbé';
      default: return 'Inconnu';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'low': return 'text-success-600 bg-success-50 border-success-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ter':
      case 'transilien':
        return <Train className="w-5 h-5" />;
      case 'bus':
        return <Bus className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-soft animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">
            Services de transport régional
          </h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="all">Toutes les régions</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="all">Tous les types</option>
              {types.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-primary-600">
                    {getTypeIcon(service.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.region}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Couverture:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {service.coverage.slice(0, 3).map((area) => (
                      <span key={area} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                        {area}
                      </span>
                    ))}
                    {service.coverage.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                        +{service.coverage.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>

                {service.disruptions > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning-600" />
                    <span className="text-warning-700">
                      {service.disruptions} perturbation{service.disruptions > 1 ? 's' : ''} en cours
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Site officiel</span>
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Visiter</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Disruptions */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning-600" />
              <span>Perturbations récentes</span>
            </h3>
            <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {disruptions.length > 0 ? (
            disruptions.map((disruption) => (
              <div key={disruption.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-warning-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{disruption.title}</h4>
                        <p className="text-sm text-gray-500">{disruption.service}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disruption.severity)}`}>
                        {disruption.severity === 'high' ? 'Élevé' : disruption.severity === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{disruption.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Lignes: {disruption.affectedLines.join(', ')}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Depuis {formatTime(disruption.startTime)}</span>
                        </span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Plus d'infos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucune perturbation signalée</p>
              <p className="text-sm mt-1">Le trafic régional fonctionne normalement</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-primary-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          À propos des transports régionaux
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800">
          <div>
            <strong>TER (Transport Express Régional)</strong> : Trains régionaux SNCF connectant les villes et villages au sein d'une même région.
          </div>
          <div>
            <strong>Transilien</strong> : Réseau de trains de banlieue parisienne, comprenant les RER et les lignes de train de banlieue.
          </div>
          <div>
            <strong>Bus régionaux</strong> : Lignes de bus assurant la desserte des zones non couvertes par le train.
          </div>
          <div>
            <strong>Billetterie intégrée</strong> : De nombreuses régions proposent des tarifs combinés train + bus pour faciliter vos déplacements.
          </div>
        </div>
      </div>
    </div>
  );
}