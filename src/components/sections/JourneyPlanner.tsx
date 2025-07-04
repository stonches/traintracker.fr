'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Clock, MapPin, Calendar, Users, ExternalLink, AlertTriangle, TrendingUp } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';
import { StationSearch } from '@/components/ui/StationSearch';

interface JourneyPlannerProps {
  lang: Language;
}

interface Journey {
  id: string;
  departure: {
    station: string;
    time: string;
    platform?: string;
  };
  arrival: {
    station: string;
    time: string;
    platform?: string;
  };
  duration: string;
  changes: number;
  price: {
    amount: number;
    currency: string;
  };
  trains: Array<{
    line: string;
    number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
  }>;
  disruptions: string[];
  co2: number;
  status: 'on_time' | 'delayed' | 'disrupted';
}

const MOCK_JOURNEYS: Journey[] = [
  {
    id: '1',
    departure: { station: 'Paris Gare du Nord', time: '14:35', platform: '3' },
    arrival: { station: 'Lyon Part-Dieu', time: '16:33', platform: '7' },
    duration: '1h 58m',
    changes: 0,
    price: { amount: 65, currency: 'EUR' },
    trains: [
      {
        line: 'TGV inOui',
        number: '6533',
        from: 'Paris Gare du Nord',
        to: 'Lyon Part-Dieu',
        departure: '14:35',
        arrival: '16:33',
        duration: '1h 58m',
      },
    ],
    disruptions: [],
    co2: 2.1,
    status: 'on_time',
  },
  {
    id: '2',
    departure: { station: 'Paris Gare du Nord', time: '15:17', platform: '5' },
    arrival: { station: 'Lyon Part-Dieu', time: '17:25', platform: '4' },
    duration: '2h 08m',
    changes: 0,
    price: { amount: 45, currency: 'EUR' },
    trains: [
      {
        line: 'OUIGO',
        number: '7855',
        from: 'Paris Gare du Nord',
        to: 'Lyon Part-Dieu',
        departure: '15:17',
        arrival: '17:25',
        duration: '2h 08m',
      },
    ],
    disruptions: ['Retard possible de 10-15 minutes'],
    co2: 2.1,
    status: 'delayed',
  },
  {
    id: '3',
    departure: { station: 'Paris Gare du Nord', time: '16:45' },
    arrival: { station: 'Lyon Part-Dieu', time: '19:12' },
    duration: '2h 27m',
    changes: 1,
    price: { amount: 35, currency: 'EUR' },
    trains: [
      {
        line: 'TER Bourgogne',
        number: '17245',
        from: 'Paris Gare du Nord',
        to: 'Dijon',
        departure: '16:45',
        arrival: '18:30',
        duration: '1h 45m',
      },
      {
        line: 'TGV inOui',
        number: '9847',
        from: 'Dijon',
        to: 'Lyon Part-Dieu',
        departure: '18:45',
        arrival: '19:12',
        duration: '42m',
      },
    ],
    disruptions: [],
    co2: 1.8,
    status: 'on_time',
  },
  {
    id: '4',
    departure: { station: 'Paris Est', time: '07:45' },
    arrival: { station: 'Strasbourg', time: '09:28' },
    duration: '1h 43m',
    changes: 0,
    price: { amount: 89, currency: 'EUR' },
    trains: [
      {
        line: 'TGV Euroduplex',
        number: '2713',
        from: 'Paris Est',
        to: 'Strasbourg',
        departure: '07:45',
        arrival: '09:28',
        duration: '1h 43m',
      },
    ],
    disruptions: [],
    co2: 1.9,
    status: 'on_time',
  },
  {
    id: '5',
    departure: { station: 'Paris Montparnasse', time: '08:15' },
    arrival: { station: 'Bordeaux Saint-Jean', time: '11:22' },
    duration: '3h 07m',
    changes: 0,
    price: { amount: 75, currency: 'EUR' },
    trains: [
      {
        line: 'TGV inOui',
        number: '8541',
        from: 'Paris Montparnasse',
        to: 'Bordeaux Saint-Jean',
        departure: '08:15',
        arrival: '11:22',
        duration: '3h 07m',
      },
    ],
    disruptions: [],
    co2: 3.2,
    status: 'on_time',
  },
  {
    id: '6',
    departure: { station: 'Paris Montparnasse', time: '09:30' },
    arrival: { station: 'Nantes', time: '11:35' },
    duration: '2h 05m',
    changes: 0,
    price: { amount: 55, currency: 'EUR' },
    trains: [
      {
        line: 'TGV Atlantique',
        number: '8245',
        from: 'Paris Montparnasse',
        to: 'Nantes',
        departure: '09:30',
        arrival: '11:35',
        duration: '2h 05m',
      },
    ],
    disruptions: [],
    co2: 2.1,
    status: 'on_time',
  },
  {
    id: '7',
    departure: { station: 'Paris Gare de Lyon', time: '11:15' },
    arrival: { station: 'Marseille Saint-Charles', time: '14:28' },
    duration: '3h 13m',
    changes: 0,
    price: { amount: 95, currency: 'EUR' },
    trains: [
      {
        line: 'TGV inOui',
        number: '6173',
        from: 'Paris Gare de Lyon',
        to: 'Marseille Saint-Charles',
        departure: '11:15',
        arrival: '14:28',
        duration: '3h 13m',
      },
    ],
    disruptions: [],
    co2: 3.5,
    status: 'on_time',
  },
  {
    id: '8',
    departure: { station: 'Paris Montparnasse', time: '13:45' },
    arrival: { station: 'Toulouse Matabiau', time: '18:22' },
    duration: '4h 37m',
    changes: 0,
    price: { amount: 85, currency: 'EUR' },
    trains: [
      {
        line: 'TGV inOui',
        number: '8563',
        from: 'Paris Montparnasse',
        to: 'Toulouse Matabiau',
        departure: '13:45',
        arrival: '18:22',
        duration: '4h 37m',
      },
    ],
    disruptions: [],
    co2: 4.1,
    status: 'on_time',
  },
  {
    id: '9',
    departure: { station: 'Paris Gare du Nord', time: '15:30' },
    arrival: { station: 'Lille Europe', time: '16:35' },
    duration: '1h 05m',
    changes: 0,
    price: { amount: 45, currency: 'EUR' },
    trains: [
      {
        line: 'TGV inOui',
        number: '7025',
        from: 'Paris Gare du Nord',
        to: 'Lille Europe',
        departure: '15:30',
        arrival: '16:35',
        duration: '1h 05m',
      },
    ],
    disruptions: [],
    co2: 1.2,
    status: 'on_time',
  },
];

export function JourneyPlanner({ lang }: JourneyPlannerProps) {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    // Set default date to today
    const today = new Date();
    setDepartureDate(today.toISOString().split('T')[0]);
    setDepartureTime('14:00');
  }, []);

  const handleSearch = async () => {
    if (!fromStation || !toStation) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setJourneys(MOCK_JOURNEYS);
    } catch (error) {
      console.error('Error searching journeys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_time': return 'text-green-600 bg-green-50';
      case 'delayed': return 'text-yellow-600 bg-yellow-50';
      case 'disrupted': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_time': return 'À l\'heure';
      case 'delayed': return 'Retardé';
      case 'disrupted': return 'Perturbé';
      default: return 'Inconnu';
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {t('journey.search')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* From Station */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('journey.from')}
            </label>
            <StationSearch
              lang={lang}
              placeholder="Paris Gare du Nord"
              onStationSelect={(station) => setFromStation(station.name)}
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-end justify-center lg:col-span-1">
            <button
              onClick={swapStations}
              className="p-3 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors mb-2"
            >
              <ArrowRight className="w-5 h-5 transform rotate-90 lg:rotate-0" />
            </button>
          </div>

          {/* To Station */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('journey.to')}
            </label>
            <StationSearch
              lang={lang}
              placeholder="Lyon Part-Dieu"
              onStationSelect={(station) => setToStation(station.name)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voyageurs
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'voyageur' : 'voyageurs'}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!fromStation || !toStation || isLoading}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Recherche...' : t('journey.search')}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Recherche des meilleurs itinéraires...</p>
          </div>
        </div>
      )}

      {/* Journey Results */}
      {hasSearched && !isLoading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {t('journey.results')} ({journeys.length})
            </h3>
            <div className="text-sm text-gray-500">
              Triés par heure de départ
            </div>
          </div>

          {journeys.length > 0 ? (
            <div className="space-y-4">
              {journeys.map((journey) => (
                <div key={journey.id} className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden hover:shadow-medium transition-shadow">
                  <div className="p-4 sm:p-6">
                    {/* Journey Header - Mobile First */}
                    <div className="space-y-4">
                      {/* Mobile Layout */}
                      <div className="md:hidden">
                        {/* Price and Status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-col">
                            <div className="text-xl font-bold text-primary-600">
                              {formatPrice(journey.price.amount, journey.price.currency)}
                            </div>
                            <div className="text-xs text-gray-500">par personne</div>
                          </div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(journey.status)}`}>
                            {getStatusText(journey.status)}
                          </div>
                        </div>

                        {/* Train Types */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {journey.trains.map((train, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
                                {train.line} {train.number}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Times and Journey Info */}
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{journey.departure.time}</div>
                            <div className="text-xs text-gray-500 leading-tight">{journey.departure.station}</div>
                            {journey.departure.platform && (
                              <div className="text-xs text-gray-400">Voie {journey.departure.platform}</div>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 mb-1">{journey.duration}</div>
                            <div className="flex items-center w-full">
                              <div className="h-0.5 bg-gray-300 flex-1"></div>
                              <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                              <div className="h-0.5 bg-gray-300 flex-1"></div>
                            </div>
                            {journey.changes > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                {journey.changes} corresp.
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{journey.arrival.time}</div>
                            <div className="text-xs text-gray-500 leading-tight">{journey.arrival.station}</div>
                            {journey.arrival.platform && (
                              <div className="text-xs text-gray-400">Voie {journey.arrival.platform}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-900">{journey.departure.time}</div>
                            <div className="text-sm text-gray-500">{journey.departure.station}</div>
                            {journey.departure.platform && (
                              <div className="text-xs text-gray-400">Voie {journey.departure.platform}</div>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="text-sm text-gray-500 mb-1">{journey.duration}</div>
                            <div className="flex items-center">
                              <div className="h-0.5 bg-gray-300 w-16"></div>
                              <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                              <div className="h-0.5 bg-gray-300 w-16"></div>
                            </div>
                            {journey.changes > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                {journey.changes} correspondance{journey.changes > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <div className="text-xl font-bold text-gray-900">{journey.arrival.time}</div>
                            <div className="text-sm text-gray-500">{journey.arrival.station}</div>
                            {journey.arrival.platform && (
                              <div className="text-xs text-gray-400">Voie {journey.arrival.platform}</div>
                            )}
                          </div>

                          {/* Train Types on Desktop */}
                          <div className="flex flex-col space-y-1">
                            {journey.trains.map((train, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
                                {train.line} {train.number}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {formatPrice(journey.price.amount, journey.price.currency)}
                          </div>
                          <div className="text-sm text-gray-500">par personne</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(journey.status)}`}>
                            {getStatusText(journey.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Disruptions */}
                    {journey.disruptions.length > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-yellow-800">
                            {journey.disruptions.map((disruption, index) => (
                              <div key={index}>{disruption}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Journey Details */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{journey.co2} kg CO₂</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{passengers} voyageur{passengers > 1 ? 's' : ''}</span>
                          </div>
                          <div className="hidden md:block">
                            Trains: {journey.trains.map(t => t.number).join(', ')}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            Détails
                          </button>
                          <button className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                            <ExternalLink className="w-4 h-4" />
                            <span>{t('journey.book')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun itinéraire trouvé pour cette recherche.</p>
              <p className="text-sm text-gray-500 mt-1">Essayez de modifier vos critères de recherche.</p>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {!hasSearched && (
        <div className="bg-primary-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">
            Conseils pour votre recherche
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800">
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Réservez à l'avance</strong> pour bénéficier des meilleurs tarifs.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Évitez les heures de pointe</strong> pour plus de disponibilités.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Voyagez en TER</strong> pour réduire votre empreinte carbone.
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Vérifiez les grèves</strong> avant votre départ.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}