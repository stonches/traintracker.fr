'use client';

import { useState, useEffect } from 'react';
import { Train } from '@/lib/api/sncf';
import { Clock, MapPin, AlertTriangle } from 'lucide-react';

interface NextTrainWidgetProps {
  stationId: string;
  stationName: string;
  autoUpdate?: boolean;
  updateInterval?: number;
  locale?: 'fr' | 'en';
}

interface NextTrainData {
  train: Train;
  tempsRestant: {
    millisecondes: number;
    minutes: number;
    formatte: string;
  };
}

export default function NextTrainWidget({ 
  stationId, 
  stationName, 
  autoUpdate = true, 
  updateInterval = 30000,
  locale = 'fr'
}: NextTrainWidgetProps) {
  const [nextTrain, setNextTrain] = useState<NextTrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  const fetchNextTrain = async () => {
    try {
      // Mock data for static site - in production you'd call SNCF API directly
      const departureTime = new Date(Date.now() + 12 * 60000); // 12 minutes from now
      const mockNextTrain = {
        train: {
          id: '1',
          numero: '7652',
          type: 'TGV' as const,
          nom: 'TGV INOUI',
          destination: 'Lyon Part-Dieu',
          heureDepart: departureTime.toISOString(),
          voie: '3',
          retard: 0,
          statut: 'a_heure' as const
        },
        tempsRestant: {
          millisecondes: 12 * 60000,
          minutes: 12,
          formatte: '12 min'
        }
      };
      
      setNextTrain(mockNextTrain);
      setCountdown(mockNextTrain.tempsRestant.millisecondes);
      setError(null);
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextTrain();
    
    if (autoUpdate) {
      const interval = setInterval(fetchNextTrain, updateInterval);
      return () => clearInterval(interval);
    }
  }, [stationId, autoUpdate, updateInterval]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1000));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (ms: number): string => {
    if (ms <= 0) return 'À quai';
    
    const totalMinutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    if (totalMinutes > 0) {
      return `${totalMinutes} min ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Prochain Train</h2>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-bold text-gray-900">Prochain Train</h2>
        </div>
        <div className="text-red-600 text-sm">
          {error}
        </div>
        <button
          onClick={fetchNextTrain}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!nextTrain) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Prochain Train</h2>
        <div className="text-gray-600 text-center py-8">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Aucun train prévu pour cette gare</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Prochain Train</h2>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">
            Mis à jour il y a {Math.floor((Date.now() - new Date(nextTrain.train.heureDepart).getTime()) / 60000)} min
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Countdown */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatCountdown(countdown)}
          </div>
          <div className="text-sm text-gray-600">
            jusqu'au départ
          </div>
        </div>

        {/* Train Details */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getTrainIcon(nextTrain.train.type)}</span>
              <div>
                <div className="font-semibold text-gray-900">
                  {nextTrain.train.type} {nextTrain.train.numero}
                </div>
                <div className="text-sm text-gray-600">
                  {nextTrain.train.nom}
                </div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nextTrain.train.statut)}`}>
              {getStatusText(nextTrain.train.statut)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-sm text-gray-600">Destination</div>
              <div className="font-medium text-gray-900">{nextTrain.train.destination}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Départ</div>
              <div className="font-medium text-gray-900">
                {new Date(nextTrain.train.heureDepart).toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
                {nextTrain.train.retard > 0 && (
                  <span className="text-orange-600 ml-1">
                    (+{nextTrain.train.retard} min)
                  </span>
                )}
              </div>
            </div>
          </div>

          {nextTrain.train.voie && (
            <div className="mt-3">
              <div className="text-sm text-gray-600">Voie</div>
              <div className="font-medium text-gray-900">{nextTrain.train.voie}</div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="flex space-x-2">
            <button
              onClick={fetchNextTrain}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Actualiser
            </button>
            <button
              onClick={() => window.location.href = `/gare/${stationId}`}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              Voir tous les départs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}