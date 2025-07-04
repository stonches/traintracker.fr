'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, AlertTriangle, RefreshCw, Train } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface DeparturesBoardProps {
  stationId: string;
  stationName: string;
  lang: Language;
}

interface Departure {
  id: string;
  line: {
    name: string;
    code: string;
    color: string;
    mode: string;
  };
  direction: string;
  destination: string;
  platform: string;
  scheduledTime: string;
  actualTime: string;
  delay: number;
  status: 'on_time' | 'delayed' | 'cancelled';
}

const MOCK_DEPARTURES: Departure[] = [
  {
    id: '1',
    line: { name: 'TGV', code: 'TGV 8533', color: '#0088ce', mode: 'TGV' },
    direction: 'Lyon Part-Dieu',
    destination: 'Lyon Part-Dieu',
    platform: '3',
    scheduledTime: '14:30',
    actualTime: '14:35',
    delay: 5,
    status: 'delayed',
  },
  {
    id: '2',
    line: { name: 'TER', code: 'TER 17245', color: '#00ac39', mode: 'TER' },
    direction: 'Meaux',
    destination: 'Meaux',
    platform: '23',
    scheduledTime: '14:32',
    actualTime: '14:32',
    delay: 0,
    status: 'on_time',
  },
  {
    id: '3',
    line: { name: 'TGV', code: 'TGV 6825', color: '#0088ce', mode: 'TGV' },
    direction: 'Marseille St-Charles',
    destination: 'Marseille St-Charles',
    platform: '7',
    scheduledTime: '14:35',
    actualTime: '14:35',
    delay: 0,
    status: 'on_time',
  },
  {
    id: '4',
    line: { name: 'Intercités', code: 'IC 3739', color: '#e60012', mode: 'IC' },
    direction: 'Clermont-Ferrand',
    destination: 'Clermont-Ferrand',
    platform: '12',
    scheduledTime: '14:38',
    actualTime: '',
    delay: 0,
    status: 'cancelled',
  },
];

export function DeparturesBoard({ stationId, lang }: DeparturesBoardProps) {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const loadDepartures = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDepartures(MOCK_DEPARTURES);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading departures:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartures();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDepartures, 30000);
    return () => clearInterval(interval);
  }, [stationId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return 'text-success-600 bg-success-50 border-success-200';
      case 'delayed': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'cancelled': return 'text-danger-600 bg-danger-50 border-danger-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_time': return t('station.onTime');
      case 'delayed': return t('station.delayed');
      case 'cancelled': return t('station.cancelled');
      default: return 'Inconnu';
    }
  };

  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-3">
            <Train className="w-6 h-6 text-primary-600" />
            <span>{t('station.departures')}</span>
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{t('station.updated')} {formatLastUpdated()}</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              title="Actualiser"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Departures List */}
      <div className="divide-y divide-gray-200">
        {departures.length > 0 ? (
          departures.map((departure) => (
            <div key={departure.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {/* Line Badge */}
                  <div 
                    className="px-3 py-1 rounded-lg text-white text-sm font-medium min-w-0 flex-shrink-0"
                    style={{ backgroundColor: departure.line.color }}
                  >
                    {departure.line.code}
                  </div>

                  {/* Destination Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {departure.destination}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(departure.status)}`}>
                        {getStatusText(departure.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Voie {departure.platform}</span>
                      </div>
                      {departure.delay > 0 && (
                        <div className="flex items-center space-x-1 text-warning-600">
                          <AlertTriangle className="w-3 h-3" />
                          <span>+{departure.delay} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Time Info */}
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-gray-900">
                    {departure.status === 'cancelled' ? (
                      <span className="text-danger-600">Supprimé</span>
                    ) : (
                      departure.actualTime || departure.scheduledTime
                    )}
                  </div>
                  {departure.delay > 0 && departure.status !== 'cancelled' && (
                    <div className="text-sm text-gray-500 line-through">
                      {departure.scheduledTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Train className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>{t('station.noData')}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {lang === 'fr' 
            ? 'Les horaires sont fournis à titre indicatif. Vérifiez les informations officielles avant de voyager.'
            : 'Schedules are provided for information only. Please verify official information before traveling.'
          }
        </p>
      </div>
    </div>
  );
}