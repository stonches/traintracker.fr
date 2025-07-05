'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  ArrowUpDown, 
  Calendar, 
  Clock, 
  MapPin, 
  Train,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Users,
  Euro
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n/translations';
import { formatFrenchTime, formatFrenchDateTime } from '@/lib/utils/dateUtils';
import { trackJourneySearch } from '@/lib/analytics';
import stationsData from '@/data/stations.json';

interface JourneyPlannerContentProps {
  language: 'fr' | 'en';
}

interface Journey {
  id: string;
  duration: number;
  nbTransfers: number;
  departure: {
    iso: string;
    time: string;
    timestamp: number;
  };
  arrival: {
    iso: string;
    time: string;
    timestamp: number;
  };
  sections: Array<{
    id: string;
    type: string;
    mode: string;
    duration: number;
    from: {
      name: string;
      datetime: any;
      platform?: string;
    };
    to: {
      name: string;
      datetime: any;
      platform?: string;
    };
    train?: {
      number: string;
      name: string;
      serviceType: string;
      line: string;
      lineColor: string;
    };
  }>;
  co2Emission?: number;
  walkingDuration: number;
  trainDuration: number;
}

export default function JourneyPlannerContent({ language }: JourneyPlannerContentProps) {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureDate, setDepartureDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format pour input datetime-local
  });
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const searchParams = useSearchParams();
  const t = (key: string) => getTranslation(language, key);

  const stations = stationsData.stations;

  // Charger les paramètres URL s'ils existent
  useEffect(() => {
    const fromSlug = searchParams.get('from');
    const toSlug = searchParams.get('to');
    
    if (fromSlug) {
      const station = stations.find(s => s.slug === fromSlug);
      if (station) {
        setFromStation(station.name);
      }
    }
    
    if (toSlug) {
      const station = stations.find(s => s.slug === toSlug);
      if (station) {
        setToStation(station.name);
      }
    }
  }, [searchParams, stations]);

  const getStationSuggestions = (query: string) => {
    if (query.length < 2) return [];
    
    return stations.filter(station =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  };

  const generateMockJourneys = (): Journey[] => {
    const mockJourneys: Journey[] = [];
    const baseTime = new Date(departureDate);
    
    // Générer 3-5 itinéraires
    for (let i = 0; i < 4; i++) {
      const departureTime = new Date(baseTime.getTime() + i * 45 * 60000); // Départs étalés
      const duration = 120 + Math.random() * 180; // 2h à 5h
      const arrivalTime = new Date(departureTime.getTime() + duration * 60000);
      
      const nbTransfers = Math.floor(Math.random() * 3); // 0-2 correspondances
      const sections = [];
      
      // Section principale (train)
      sections.push({
        id: `section-${i}-0`,
        type: 'public_transport',
        mode: 'train',
        duration: Math.floor(duration * 0.8),
        from: {
          name: fromStation,
          datetime: {
            iso: departureTime.toISOString(),
            time: departureTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: departureTime.getTime()
          },
          platform: `${Math.floor(Math.random() * 20) + 1}`
        },
        to: {
          name: toStation,
          datetime: {
            iso: arrivalTime.toISOString(),
            time: arrivalTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: arrivalTime.getTime()
          },
          platform: `${Math.floor(Math.random() * 20) + 1}`
        },
        train: {
          number: `TGV ${Math.floor(Math.random() * 9000) + 1000}`,
          name: 'TGV',
          serviceType: 'TGV',
          line: 'TGV',
          lineColor: '#0055A4'
        }
      });

      // Ajouter correspondances si nécessaire
      if (nbTransfers > 0) {
        const connectionStation = stations[Math.floor(Math.random() * stations.length)].name;
        const connectionTime = new Date(departureTime.getTime() + duration * 0.4 * 60000);
        
        sections[0].to.name = connectionStation;
        sections[0].to.datetime = {
          iso: connectionTime.toISOString(),
          time: connectionTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: connectionTime.getTime()
        };
        
        // Correspondance
        const transferDuration = 5 + Math.random() * 15; // 5-20 min
        const nextDepartureTime = new Date(connectionTime.getTime() + transferDuration * 60000);
        
        sections.push({
          id: `section-${i}-1`,
          type: 'public_transport',
          mode: 'train',
          duration: Math.floor(duration * 0.6),
          from: {
            name: connectionStation,
            datetime: {
              iso: nextDepartureTime.toISOString(),
              time: nextDepartureTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              timestamp: nextDepartureTime.getTime()
            },
            platform: `${Math.floor(Math.random() * 20) + 1}`
          },
          to: {
            name: toStation,
            datetime: {
              iso: arrivalTime.toISOString(),
              time: arrivalTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              timestamp: arrivalTime.getTime()
            },
            platform: `${Math.floor(Math.random() * 20) + 1}`
          },
          train: {
            number: `TER ${Math.floor(Math.random() * 9000) + 1000}`,
            name: 'TER',
            serviceType: 'TER',
            line: 'TER',
            lineColor: '#00814F'
          }
        });
      }

      mockJourneys.push({
        id: `journey-${i}`,
        duration: Math.floor(duration),
        nbTransfers,
        departure: {
          iso: departureTime.toISOString(),
          time: departureTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: departureTime.getTime()
        },
        arrival: {
          iso: arrivalTime.toISOString(),
          time: arrivalTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          timestamp: arrivalTime.getTime()
        },
        sections,
        co2Emission: Math.floor(2 + Math.random() * 8), // 2-10 kg CO2
        walkingDuration: Math.floor(Math.random() * 10),
        trainDuration: Math.floor(duration * 0.9)
      });
    }
    
    return mockJourneys.sort((a, b) => a.departure.timestamp - b.departure.timestamp);
  };

  const searchJourneys = async () => {
    if (!fromStation || !toStation) {
      setError(language === 'fr' ? 'Veuillez sélectionner les gares de départ et d\'arrivée' : 'Please select departure and arrival stations');
      return;
    }

    if (fromStation === toStation) {
      setError(language === 'fr' ? 'Les gares de départ et d\'arrivée doivent être différentes' : 'Departure and arrival stations must be different');
      return;
    }

    // Track journey search
    trackJourneySearch(fromStation, toStation, language);

    setLoading(true);
    setError(null);

    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = generateMockJourneys();
      setJourneys(mockData);
    } catch (err) {
      setError(language === 'fr' ? 'Erreur de recherche' : 'Search error');
    } finally {
      setLoading(false);
    }
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}min`;
    }
  };

  const getTransferText = (nbTransfers: number) => {
    if (nbTransfers === 0) {
      return t('journey.directTrain');
    } else if (nbTransfers === 1) {
      return t('journey.oneTransfer');
    } else {
      return `${nbTransfers} ${t('journey.multipleTransfers')}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('journey.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {language === 'fr' 
                ? 'Trouvez les meilleurs itinéraires en train avec des horaires en temps réel'
                : 'Find the best train routes with real-time schedules'
              }
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* From Station */}
              <div className="relative md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('journey.from')}
                </label>
                <input
                  type="text"
                  value={fromStation}
                  onChange={(e) => {
                    setFromStation(e.target.value);
                    setShowFromSuggestions(true);
                  }}
                  onFocus={() => setShowFromSuggestions(true)}
                  placeholder={language === 'fr' ? 'Gare de départ' : 'Departure station'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {showFromSuggestions && fromStation.length >= 2 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {getStationSuggestions(fromStation).map((station) => (
                      <button
                        key={station.id}
                        onClick={() => {
                          setFromStation(station.name);
                          setShowFromSuggestions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      >
                        <div className="font-medium text-gray-900">{station.name}</div>
                        <div className="text-sm text-gray-600">{station.city}, {station.region}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center md:col-span-1">
                <button
                  onClick={swapStations}
                  className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  title={language === 'fr' ? 'Inverser les gares' : 'Swap stations'}
                >
                  <ArrowUpDown className="h-5 w-5" />
                </button>
              </div>

              {/* To Station */}
              <div className="relative md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('journey.to')}
                </label>
                <input
                  type="text"
                  value={toStation}
                  onChange={(e) => {
                    setToStation(e.target.value);
                    setShowToSuggestions(true);
                  }}
                  onFocus={() => setShowToSuggestions(true)}
                  placeholder={language === 'fr' ? 'Gare d\'arrivée' : 'Arrival station'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {showToSuggestions && toStation.length >= 2 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {getStationSuggestions(toStation).map((station) => (
                      <button
                        key={station.id}
                        onClick={() => {
                          setToStation(station.name);
                          setShowToSuggestions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      >
                        <div className="font-medium text-gray-900">{station.name}</div>
                        <div className="text-sm text-gray-600">{station.city}, {station.region}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Departure Date/Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('journey.departure')}
                </label>
                <input
                  type="datetime-local"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={searchJourneys}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  <span>{t('journey.searchJourney')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">{t('journey.loading')}</p>
              </div>
              
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                      <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Journey Results */}
          {journeys.length > 0 && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'fr' 
                    ? `${journeys.length} itinéraires trouvés`
                    : `${journeys.length} journeys found`
                  }
                </h2>
                <div className="text-sm text-gray-600">
                  {fromStation} → {toStation}
                </div>
              </div>

              {journeys.map((journey) => (
                <div key={journey.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Journey Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {journey.departure.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t('journey.departure')}
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center">
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <div className="flex-1 h-0.5 bg-blue-600"></div>
                            <Train className="h-4 w-4 text-blue-600" />
                            <div className="flex-1 h-0.5 bg-blue-600"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDuration(journey.duration)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {getTransferText(journey.nbTransfers)}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {journey.arrival.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t('journey.arrival')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {journey.co2Emission && (
                          <div className="text-sm text-green-600 mb-1">
                            <span className="font-medium">{journey.co2Emission} kg CO₂</span>
                          </div>
                        )}
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          {language === 'fr' ? 'Sélectionner' : 'Select'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {journey.sections.map((section, index) => (
                        <div key={section.id} className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                              style={{ backgroundColor: section.train?.lineColor || '#6B7280' }}
                            >
                              {section.train?.serviceType || 'T'}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {section.train?.number || 'Transport'}
                              </span>
                              <ArrowRight className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600">
                                {section.to.name}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {section.from.datetime?.time} - {section.to.datetime?.time}
                              {section.from.platform && (
                                <span className="ml-2">
                                  • {language === 'fr' ? 'Voie' : 'Platform'} {section.from.platform}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            {formatDuration(section.duration)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {journeys.length === 0 && !loading && !error && fromStation && toStation && (
            <div className="text-center py-12">
              <Train className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('journey.noResults')}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Try modifying your search criteria'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}