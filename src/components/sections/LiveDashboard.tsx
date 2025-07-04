'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle, TrendingUp, MapPin, ExternalLink } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface LiveDashboardProps {
  lang: Language;
}

interface MajorDelay {
  stationName: string;
  averageDelay: number;
  affectedDepartures: number;
}

interface Disruption {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  affectedLines: string[];
  startTime: string;
}

interface NetworkStatus {
  overall: 'good' | 'disrupted' | 'severely_disrupted';
  regions: {
    name: string;
    status: 'good' | 'disrupted' | 'severely_disrupted';
    activeDisruptions: number;
  }[];
}

const MOCK_MAJOR_DELAYS: MajorDelay[] = [
  { stationName: 'Gare du Nord', averageDelay: 15, affectedDepartures: 12 },
  { stationName: 'Gare de Lyon', averageDelay: 8, affectedDepartures: 6 },
  { stationName: 'Montparnasse', averageDelay: 5, affectedDepartures: 3 },
];

const MOCK_DISRUPTIONS: Disruption[] = [
  {
    id: '1',
    title: 'Incident technique sur la ligne TGV Est',
    description: 'Problème d\'infrastructure entre Champagne-Ardenne et Reims',
    severity: 'high',
    affectedLines: ['TGV Est'],
    startTime: '2024-12-10T14:30:00Z',
  },
  {
    id: '2',
    title: 'Travaux programmés ligne TER Normandie',
    description: 'Maintenance préventive sur le tronçon Caen-Bayeux',
    severity: 'medium',
    affectedLines: ['TER Normandie'],
    startTime: '2024-12-10T06:00:00Z',
  },
];

const MOCK_NETWORK_STATUS: NetworkStatus = {
  overall: 'disrupted',
  regions: [
    { name: 'Île-de-France', status: 'disrupted', activeDisruptions: 5 },
    { name: 'Auvergne-Rhône-Alpes', status: 'good', activeDisruptions: 1 },
    { name: 'Hauts-de-France', status: 'good', activeDisruptions: 2 },
    { name: 'Nouvelle-Aquitaine', status: 'good', activeDisruptions: 0 },
    { name: 'Grand Est', status: 'severely_disrupted', activeDisruptions: 8 },
    { name: 'Occitanie', status: 'good', activeDisruptions: 1 },
  ],
};

export function LiveDashboard({ lang }: LiveDashboardProps) {
  const [majorDelays, setMajorDelays] = useState<MajorDelay[]>([]);
  const [disruptions, setDisruptions] = useState<Disruption[]>([]);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setMajorDelays(MOCK_MAJOR_DELAYS);
        setDisruptions(MOCK_DISRUPTIONS);
        setNetworkStatus(MOCK_NETWORK_STATUS);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'disrupted': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'severely_disrupted': return 'text-red-600 bg-red-50 border-red-200';
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
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-soft animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header with last updated */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('home.liveDelays')}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{t('station.updated')} {formatLastUpdated()}</span>
        </div>
      </div>

      {/* Network Status Overview */}
      {networkStatus && (
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <span>État du réseau</span>
          </h3>
          
          <div className="mb-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(networkStatus.overall)}`}>
              {getStatusText(networkStatus.overall)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {networkStatus.regions.map((region) => (
              <div key={region.name} className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs font-medium text-gray-700 mb-1 truncate" title={region.name}>
                  {region.name}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(region.status)}`}>
                  {getStatusText(region.status)}
                </div>
                {region.activeDisruptions > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {region.activeDisruptions} perturbation{region.activeDisruptions > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Major Delays */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span>Retards importants</span>
          </h3>
          
          <div className="space-y-3">
            {majorDelays.map((delay, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{delay.stationName}</div>
                    <div className="text-sm text-gray-500">
                      {delay.affectedDepartures} départ{delay.affectedDepartures > 1 ? 's' : ''} concerné{delay.affectedDepartures > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600">
                    +{delay.averageDelay} min
                  </div>
                  <div className="text-xs text-gray-500">en moyenne</div>
                </div>
              </div>
            ))}
          </div>

          {majorDelays.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucun retard important signalé</p>
            </div>
          )}
        </div>

        {/* Recent Disruptions */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span>{t('home.recentDisruptions')}</span>
          </h3>
          
          <div className="space-y-4">
            {disruptions.map((disruption) => (
              <div key={disruption.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 flex-1">{disruption.title}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disruption.severity)}`}>
                    {disruption.severity === 'high' ? 'Élevé' : disruption.severity === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{disruption.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Lignes: {disruption.affectedLines.join(', ')}</span>
                    <span>Depuis {formatTime(disruption.startTime)}</span>
                  </div>
                  <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    <span>Détails</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {disruptions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucune perturbation récente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}