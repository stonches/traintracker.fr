'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, Clock, MapPin, Train, Calendar, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { Station, Journey } from '@/lib/api/sncf';

interface JourneyPlannerProps {
  locale: 'fr' | 'en';
}

export default function JourneyPlanner({ locale }: JourneyPlannerProps) {
  const { t } = useTranslation(locale);
  
  const [stations, setStations] = useState<Station[]>([]);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [fromSuggestions, setFromSuggestions] = useState<Station[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Station[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState<Station | null>(null);
  const [selectedTo, setSelectedTo] = useState<Station | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/stations/all');
        const data = await response.json();
        
        if (data.success) {
          setStations(data.data);
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (fromQuery.length > 1) {
      const filtered = stations
        .filter(station =>
          station.nom.toLowerCase().includes(fromQuery.toLowerCase()) ||
          station.region?.toLowerCase().includes(fromQuery.toLowerCase())
        )
        .slice(0, 5);
      setFromSuggestions(filtered);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  }, [fromQuery, stations]);

  useEffect(() => {
    if (toQuery.length > 1) {
      const filtered = stations
        .filter(station =>
          station.nom.toLowerCase().includes(toQuery.toLowerCase()) ||
          station.region?.toLowerCase().includes(toQuery.toLowerCase())
        )
        .slice(0, 5);
      setToSuggestions(filtered);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  }, [toQuery, stations]);

  const handleFromSelect = (station: Station) => {
    setSelectedFrom(station);
    setFromQuery(station.nom);
    setShowFromSuggestions(false);
  };

  const handleToSelect = (station: Station) => {
    setSelectedTo(station);
    setToQuery(station.nom);
    setShowToSuggestions(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFrom || !selectedTo) {
      setError(locale === 'fr' ? 'Veuillez sélectionner les gares de départ et d\'arrivée' : 'Please select departure and arrival stations');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dateTime = `${date}T${time}:00`;
      const response = await fetch(`/api/journey/plan?from=${selectedFrom.id}&to=${selectedTo.id}&datetime=${dateTime}`);
      const data = await response.json();
      
      if (data.success) {
        setJourneys(data.data.journeys);
      } else {
        setError(data.error || (locale === 'fr' ? 'Erreur lors de la recherche' : 'Search error'));
      }
    } catch (error) {
      setError(locale === 'fr' ? 'Erreur de connexion' : 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  };

  const formatTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTrainIcon = (type: string) => {
    switch (type) {
      case 'TGV':
        return '🚄';
      case 'Eurostar':
      case 'Thalys':
        return '🚅';
      case 'Intercités':
        return '🚆';
      case 'TER':
        return '🚊';
      case 'Transilien':
        return '🚈';
      default:
        return '🚂';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Station */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('journey.from')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={fromQuery}
                  onChange={(e) => setFromQuery(e.target.value)}
                  onFocus={() => setShowFromSuggestions(fromQuery.length > 1)}
                  placeholder={locale === 'fr' ? 'Gare de départ' : 'Departure station'}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {fromSuggestions.map((station) => (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() => handleFromSelect(station)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{station.nom}</div>
                        {station.region && (
                          <div className="text-sm text-gray-600">{station.region}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* To Station */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('journey.to')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={toQuery}
                  onChange={(e) => setToQuery(e.target.value)}
                  onFocus={() => setShowToSuggestions(toQuery.length > 1)}
                  placeholder={locale === 'fr' ? 'Gare d\'arrivée' : 'Arrival station'}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {toSuggestions.map((station) => (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() => handleToSelect(station)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{station.nom}</div>
                        {station.region && (
                          <div className="text-sm text-gray-600">{station.region}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('journey.date')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('journey.time')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !selectedFrom || !selectedTo}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{locale === 'fr' ? 'Recherche...' : 'Searching...'}</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>{t('journey.search')}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Journey Results */}
      {journeys.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('journey.results')}
          </h2>
          
          <div className="space-y-4">
            {journeys.map((journey, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatTime(journey.departure_time)} → {formatTime(journey.arrival_time)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(journey.duration)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {journey.nb_transfers === 0 
                        ? (locale === 'fr' ? 'Direct' : 'Direct')
                        : `${journey.nb_transfers} ${journey.nb_transfers === 1 
                            ? (locale === 'fr' ? 'correspondance' : 'transfer')
                            : (locale === 'fr' ? 'correspondances' : 'transfers')
                          }`
                      }
                    </div>
                    {journey.co2_emission && (
                      <div className="text-sm text-green-600 flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        {journey.co2_emission}g CO₂
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 overflow-x-auto">
                  {journey.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex items-center space-x-2 flex-shrink-0">
                      {section.train && (
                        <>
                          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-lg">{getTrainIcon(section.train.type)}</span>
                            <span className="text-sm font-medium text-blue-800">
                              {section.train.type} {section.train.numero}
                            </span>
                          </div>
                          {sectionIndex < journey.sections.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{locale === 'fr' ? 'Départ:' : 'Departure:'}</span> {selectedFrom?.nom}
                  </div>
                  <div>
                    <span className="font-medium">{locale === 'fr' ? 'Arrivée:' : 'Arrival:'}</span> {selectedTo?.nom}
                  </div>
                  <div>
                    <span className="font-medium">{t('journey.duration')}:</span> {formatDuration(journey.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && journeys.length === 0 && selectedFrom && selectedTo && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Train className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {locale === 'fr' ? 'Aucun itinéraire trouvé' : 'No routes found'}
          </h3>
          <p className="text-gray-600">
            {locale === 'fr' 
              ? 'Essayez de modifier votre recherche ou de choisir une autre date.'
              : 'Try modifying your search or choosing a different date.'
            }
          </p>
        </div>
      )}
    </div>
  );
}