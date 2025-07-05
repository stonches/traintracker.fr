'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Train, Clock, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';
import { getTimeUntilTrain, getDelayStatus } from '@/lib/utils/dateUtils';
import { trackDepartureView } from '@/lib/analytics';
import stationsData from '@/data/stations.json';

interface NextTrain {
  id: string;
  trainNumber: string;
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
  serviceType: string;
  station: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function NextTrainWidget() {
  const [nextTrains, setNextTrains] = useState<NextTrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);
  const t = (key: string) => getTranslation(currentLang, key);

  const stations = stationsData.stations;
  const popularStations = stations.slice(0, 5); // Top 5 stations

  // Simulation de données temps réel (remplacer par l'API réelle)
  const generateMockTrainData = (): NextTrain[] => {
    const mockTrains: NextTrain[] = [];
    
    popularStations.forEach((station, stationIndex) => {
      // Générer 1-2 trains par gare populaire
      const trainCount = Math.random() > 0.5 ? 2 : 1;
      
      for (let i = 0; i < trainCount; i++) {
        const now = new Date();
        const departureTime = new Date(now.getTime() + (stationIndex * 10 + i * 5 + 5) * 60000); // Entre 5-45 minutes
        const delay = Math.random() > 0.7 ? Math.floor(Math.random() * 15) : 0;
        const realDepartureTime = new Date(departureTime.getTime() + delay * 60000);
        
        const services = ['TGV', 'TER', 'Intercités', 'Eurostar'];
        const serviceType = services[Math.floor(Math.random() * services.length)];
        
        const destinations = [
          'Lyon Part-Dieu', 'Marseille Saint-Charles', 'Bordeaux Saint-Jean',
          'Toulouse Matabiau', 'Nice-Ville', 'Strasbourg', 'Nantes', 'Rennes'
        ];
        const destination = destinations[Math.floor(Math.random() * destinations.length)];
        
        mockTrains.push({
          id: `${station.id}-${i}-${Date.now()}`,
          trainNumber: `${serviceType} ${Math.floor(Math.random() * 9000) + 1000}`,
          destination,
          scheduledTime: {
            iso: departureTime.toISOString(),
            time: departureTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: departureTime.getTime()
          },
          realTime: {
            iso: realDepartureTime.toISOString(),
            time: realDepartureTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: realDepartureTime.getTime()
          },
          delay,
          platform: `${Math.floor(Math.random() * 20) + 1}`,
          serviceType,
          station: {
            id: station.id,
            name: station.name,
            slug: station.slug
          }
        });
      }
    });

    // Trier par heure de départ
    return mockTrains.sort((a, b) => a.realTime.timestamp - b.realTime.timestamp);
  };

  useEffect(() => {
    const loadNextTrains = () => {
      setLoading(true);
      // Simuler un délai d'API
      setTimeout(() => {
        const trains = generateMockTrainData();
        setNextTrains(trains);
        setLastUpdate(new Date());
        setLoading(false);
      }, 1000);
    };

    loadNextTrains();

    // Mise à jour toutes les 30 secondes
    const interval = setInterval(loadNextTrains, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && nextTrains.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-3 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header avec dernière mise à jour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-green-600" />
          <span className="text-sm text-gray-600">
            {lastUpdate && (
              currentLang === 'fr' 
                ? `Mis à jour à ${lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
                : `Updated at ${lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
            )}
          </span>
        </div>
        {loading && (
          <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
        )}
      </div>

      {/* Liste des prochains trains */}
      <div className="space-y-3">
        {nextTrains.slice(0, 5).map((train) => {
          const timeUntil = getTimeUntilTrain(train.realTime.iso);
          const delayStatus = getDelayStatus(train.delay);
          const stationUrl = currentLang === 'fr' 
            ? `/gare/${train.station.slug}/`
            : `/en/station/${train.station.slug}/`;

          return (
            <Link
              key={train.id}
              href={stationUrl}
              onClick={() => trackDepartureView(train.station.name, currentLang)}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Train className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {train.trainNumber}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {train.serviceType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{train.station.name} → {train.destination}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currentLang === 'fr' ? 'Voie' : 'Platform'} {train.platform}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className={`text-lg font-bold ${timeUntil.status === 'immediate' ? 'text-red-600' : timeUntil.status === 'soon' ? 'text-orange-600' : 'text-gray-900'}`}>
                      {train.realTime.time}
                    </div>
                    {timeUntil.status === 'immediate' && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {timeUntil.text}
                  </div>
                  {train.delay > 0 && (
                    <div className={`text-xs mt-1 ${delayStatus.color}`}>
                      {delayStatus.text}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Message si aucun train */}
      {nextTrains.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <Train className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium mb-1">
            {t('errors.noData')}
          </p>
          <p className="text-sm">
            {currentLang === 'fr' 
              ? 'Aucun train dans les prochaines heures'
              : 'No trains in the next few hours'
            }
          </p>
        </div>
      )}
    </div>
  );
}