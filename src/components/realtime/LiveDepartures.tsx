'use client';

import { useState, useEffect } from 'react';
import { Train, DepartureBoard } from '@/lib/api/sncf';
import { Clock, MapPin, AlertTriangle, RefreshCw } from 'lucide-react';

interface LiveDeparturesProps {
  stationId: string;
  stationName: string;
  autoUpdate?: boolean;
  updateInterval?: number;
  maxDepartures?: number;
  locale?: 'fr' | 'en';
}

export default function LiveDepartures({ 
  stationId, 
  stationName, 
  autoUpdate = true, 
  updateInterval = 30000,
  maxDepartures = 10,
  locale = 'fr'
}: LiveDeparturesProps) {
  const [departures, setDepartures] = useState<DepartureBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchDepartures = async () => {
    try {
      const response = await fetch(`/api/stations/departures/${stationId}`);
      const data = await response.json();
      
      if (data.success) {
        setDepartures(data.data);
        setError(null);
        setLastUpdate(new Date());
      } else {
        setError(data.error || 'Erreur lors de la récupération des départs');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartures();
    
    if (autoUpdate) {
      const interval = setInterval(fetchDepartures, updateInterval);
      return () => clearInterval(interval);
    }
  }, [stationId, autoUpdate, updateInterval]);

  const getStatusColor = (status: Train['statut']) => {
    switch (status) {
      case 'a_heure':
        return 'text-green-600 bg-green-50';
      case 'retard':
        return 'text-orange-600 bg-orange-50';
      case 'retard_indetermine':
        return 'text-red-600 bg-red-50';
      case 'supprime':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: Train['statut']) => {
    switch (status) {
      case 'a_heure':
        return 'À l\'heure';
      case 'retard':
        return 'Retardé';
      case 'retard_indetermine':
        return 'Retard indéterminé';
      case 'supprime':
        return 'Supprimé';
      default:
        return 'Statut inconnu';
    }
  };

  const getTrainIcon = (type: Train['type']) => {
    switch (type) {
      case 'TGV':
        return '🚄';
      case 'Eurostar':
        return '🚅';
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

  const formatDepartureTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeUntilDeparture = (dateTime: string) => {
    const now = new Date();
    const departure = new Date(dateTime);
    const diffMs = departure.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes <= 0) return 'À quai';
    if (diffMinutes < 60) return `${diffMinutes} min`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Départs en Temps Réel</h2>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold text-gray-900">Départs en Temps Réel</h2>
        </div>
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
        <button
          onClick={fetchDepartures}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!departures || departures.prochainsDepartures.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Départs en Temps Réel</h2>
        <div className="text-gray-600 text-center py-8">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Aucun départ prévu pour cette gare</p>
        </div>
      </div>
    );
  }

  const displayedDepartures = departures.prochainsDepartures.slice(0, maxDepartures);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Départs en Temps Réel</h2>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            Mis à jour {lastUpdate.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <button
            onClick={fetchDepartures}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayedDepartures.map((train, index) => (
          <div 
            key={`${train.id}-${index}`} 
            className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTrainIcon(train.type)}</span>
                <div>
                  <div className="font-semibold text-gray-900">
                    {train.type} {train.numero}
                  </div>
                  <div className="text-sm text-gray-600">
                    {train.nom}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {getTimeUntilDeparture(train.heureDepart)}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDepartureTime(train.heureDepart)}
                  {train.retard > 0 && (
                    <span className="text-orange-600 ml-1">
                      (+{train.retard} min)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-sm text-gray-600">Destination: </span>
                  <span className="font-medium text-gray-900">{train.destination}</span>
                </div>
                {train.voie && (
                  <div>
                    <span className="text-sm text-gray-600">Voie: </span>
                    <span className="font-medium text-gray-900">{train.voie}</span>
                  </div>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(train.statut)}`}>
                {getStatusText(train.statut)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {departures.prochainsDepartures.length > maxDepartures && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {departures.prochainsDepartures.length - maxDepartures} départs supplémentaires disponibles
          </p>
        </div>
      )}
    </div>
  );
}