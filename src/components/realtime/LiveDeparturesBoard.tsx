'use client';

import React, { useState, useEffect } from 'react';
import { 
  Train, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  ArrowRight 
} from 'lucide-react';
import { getTimeUntilTrain, getDelayStatus, formatFrenchTime } from '@/lib/utils/dateUtils';
import { getTranslation } from '@/lib/i18n/translations';

interface Departure {
  id: string;
  trainNumber: string;
  trainName: string;
  destination: string;
  scheduledTime: {
    iso: string;
    time: string;
    timestamp: number;
  };
  realTime: {
    iso: string;
    time: string;
    timestamp: number;
  };
  delay: number;
  platform: string;
  line: string;
  lineColor: string;
  status: string;
  serviceType: string;
  realTimeStatus: string;
}

interface LiveDeparturesBoardProps {
  stationId: string;
  type: 'departures' | 'arrivals';
  language: 'fr' | 'en';
}

export default function LiveDeparturesBoard({ stationId, type, language }: LiveDeparturesBoardProps) {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = (key: string) => getTranslation(language, key);

  // Simulation de données temps réel (remplacer par l'API réelle)
  const generateMockDepartures = (): Departure[] => {
    const mockDepartures: Departure[] = [];
    const now = new Date();
    
    // Générer 15-20 départs/arrivées
    const count = Math.floor(Math.random() * 6) + 15;
    
    const destinations = [
      'Lyon Part-Dieu', 'Marseille Saint-Charles', 'Bordeaux Saint-Jean',
      'Toulouse Matabiau', 'Nice-Ville', 'Strasbourg', 'Nantes', 'Rennes',
      'Montpellier Saint-Roch', 'Lille Europe', 'Dijon-Ville', 'Tours',
      'Angers Saint-Laud', 'Le Mans', 'Poitiers', 'Clermont-Ferrand'
    ];
    
    const services = [
      { type: 'TGV', color: '#0055A4' },
      { type: 'TER', color: '#00814F' },
      { type: 'Intercités', color: '#CD2E3A' },
      { type: 'Eurostar', color: '#FFD320' },
      { type: 'Ouigo', color: '#FF6B35' }
    ];
    
    for (let i = 0; i < count; i++) {
      const service = services[Math.floor(Math.random() * services.length)];
      const destination = destinations[Math.floor(Math.random() * destinations.length)];
      
      // Générer des heures de départ/arrivée réalistes
      const baseTime = new Date(now.getTime() + (i * 8 + Math.random() * 15) * 60000); // Échelonner sur plusieurs heures
      const delay = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0; // 30% de chance de retard
      const realTime = new Date(baseTime.getTime() + delay * 60000);
      
      const platform = Math.floor(Math.random() * 23) + 1; // Voies 1-23
      const trainNumber = `${service.type} ${Math.floor(Math.random() * 9000) + 1000}`;
      
      mockDepartures.push({
        id: `${stationId}-${type}-${i}`,
        trainNumber,
        trainName: service.type,
        destination,
        scheduledTime: {
          iso: baseTime.toISOString(),
          time: baseTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: baseTime.getTime()
        },
        realTime: {
          iso: realTime.toISOString(),
          time: realTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: realTime.getTime()
        },
        delay,
        platform: platform.toString(),
        line: service.type,
        lineColor: service.color,
        status: delay > 10 ? 'delayed' : delay > 0 ? 'slight-delay' : 'on-time',
        serviceType: service.type,
        realTimeStatus: 'real-time'
      });
    }
    
    // Trier par heure de départ/arrivée
    return mockDepartures.sort((a, b) => a.realTime.timestamp - b.realTime.timestamp);
  };

  useEffect(() => {
    const loadDepartures = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockData = generateMockDepartures();
        setDepartures(mockData);
        setLastUpdate(new Date());
      } catch (err) {
        setError(language === 'fr' ? 'Erreur de chargement' : 'Loading error');
      } finally {
        setLoading(false);
      }
    };

    loadDepartures();

    // Mise à jour automatique toutes les 30 secondes
    const interval = setInterval(loadDepartures, 30000);
    return () => clearInterval(interval);
  }, [stationId, type, language]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'slight-delay':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'text-green-600';
      case 'slight-delay':
        return 'text-yellow-600';
      case 'delayed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading && departures.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {type === 'departures' ? t('stations.departures') : t('stations.arrivals')}
          </h2>
          <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
        </div>
        
        {/* Loading skeleton */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 last:border-b-0">
              <div className="col-span-2">
                <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 w-28 bg-gray-300 rounded"></div>
              </div>
              <div className="text-center">
                <div className="h-4 w-12 bg-gray-300 rounded mx-auto"></div>
              </div>
              <div className="text-right">
                <div className="h-5 w-16 bg-gray-300 rounded ml-auto mb-1"></div>
                <div className="h-3 w-20 bg-gray-300 rounded ml-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('errors.networkError')}
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {t('errors.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {type === 'departures' ? t('stations.departures') : t('stations.arrivals')}
        </h2>
        <div className="flex items-center space-x-3">
          {lastUpdate && (
            <span className="text-sm text-gray-500">
              {language === 'fr' 
                ? `Mis à jour à ${lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
                : `Updated at ${lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
              }
            </span>
          )}
          {loading && <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
        <div className="col-span-2">
          {language === 'fr' ? 'Train' : 'Train'}
        </div>
        <div className="col-span-2">
          {type === 'departures' ? t('stations.destination') : t('stations.origin')}
        </div>
        <div className="text-center">
          {t('stations.platform')}
        </div>
        <div className="text-right">
          {t('stations.scheduledTime')}
        </div>
      </div>

      {/* Departures List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {departures.slice(0, 15).map((departure, index) => {
          const timeUntil = getTimeUntilTrain(departure.realTime.iso);
          const delayStatus = getDelayStatus(departure.delay);
          
          return (
            <div
              key={departure.id}
              className={`grid grid-cols-6 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                timeUntil.status === 'immediate' ? 'bg-red-50 border-red-200' : ''
              }`}
            >
              {/* Train Info */}
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: departure.lineColor }}
                  >
                    {departure.serviceType}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {departure.trainNumber}
                  </span>
                </div>
                {departure.trainName !== departure.serviceType && (
                  <div className="text-sm text-gray-600">
                    {departure.trainName}
                  </div>
                )}
              </div>

              {/* Destination */}
              <div className="col-span-2">
                <div className="font-medium text-gray-900 mb-1">
                  {departure.destination}
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(departure.status)}
                  <span className={`text-sm ${getStatusColor(departure.status)}`}>
                    {departure.delay > 0 ? delayStatus.text : t('stations.onTime')}
                  </span>
                </div>
              </div>

              {/* Platform */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm">
                  {departure.platform}
                </div>
              </div>

              {/* Time */}
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  timeUntil.status === 'immediate' ? 'text-red-600' : 
                  timeUntil.status === 'soon' ? 'text-orange-600' : 'text-gray-900'
                }`}>
                  {departure.realTime.time}
                </div>
                <div className="text-sm text-gray-600">
                  {departure.delay > 0 && departure.scheduledTime.time !== departure.realTime.time && (
                    <span className="line-through mr-2">
                      {departure.scheduledTime.time}
                    </span>
                  )}
                  <span className={timeUntil.status === 'immediate' ? 'text-red-600 font-medium' : ''}>
                    {timeUntil.text}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{t('stations.onTime')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>{t('stations.delayed')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>
              {language === 'fr' ? 'Immédiat' : 'Immediate'}
            </span>
          </div>
        </div>
        <div>
          {language === 'fr' 
            ? `${departures.length} trains affichés`
            : `${departures.length} trains shown`
          }
        </div>
      </div>
    </div>
  );
}