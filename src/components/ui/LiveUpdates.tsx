'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertCircle, CheckCircle, Clock, Info, RefreshCw } from 'lucide-react';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';

interface TrafficUpdate {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  affectedLines: string[];
  affectedStations: string[];
  startTime: string;
  endTime?: string;
  lastUpdate: string;
}

export default function LiveUpdates() {
  const [updates, setUpdates] = useState<TrafficUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);
  const t = (key: string) => getTranslation(currentLang, key);

  // Simulation de données de trafic (remplacer par l'API réelle)
  const generateMockUpdates = (): TrafficUpdate[] => {
    const mockUpdates: TrafficUpdate[] = [
      {
        id: '1',
        type: 'success',
        severity: 'low',
        title: currentLang === 'fr' ? 'Trafic normal' : 'Normal traffic',
        description: currentLang === 'fr' 
          ? 'Le trafic circule normalement sur l\'ensemble du réseau TGV' 
          : 'Traffic is running normally across the entire TGV network',
        affectedLines: ['TGV'],
        affectedStations: [],
        startTime: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      },
      {
        id: '2',
        type: 'warning',
        severity: 'medium',
        title: currentLang === 'fr' ? 'Retards possibles' : 'Possible delays',
        description: currentLang === 'fr' 
          ? 'Conditions météorologiques défavorables dans la région Provence-Alpes-Côte d\'Azur. Retards de 10-15 minutes possibles.' 
          : 'Unfavorable weather conditions in the Provence-Alpes-Côte d\'Azur region. Delays of 10-15 minutes possible.',
        affectedLines: ['TGV', 'TER'],
        affectedStations: ['Marseille Saint-Charles', 'Nice-Ville', 'Cannes'],
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Il y a 2 heures
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // Dans 4 heures
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000).toISOString() // Il y a 30 minutes
      },
      {
        id: '3',
        type: 'info',
        severity: 'low',
        title: currentLang === 'fr' ? 'Travaux programmés' : 'Scheduled maintenance',
        description: currentLang === 'fr' 
          ? 'Travaux de maintenance sur la ligne Paris-Lyon ce week-end. Circulation adaptée.' 
          : 'Maintenance work on the Paris-Lyon line this weekend. Adapted traffic.',
        affectedLines: ['TGV'],
        affectedStations: ['Paris Gare de Lyon', 'Lyon Part-Dieu'],
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Dans 2 jours
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Dans 3 jours
        lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // Il y a 6 heures
      }
    ];

    // Ajouter occasionnellement des perturbations plus importantes
    if (Math.random() > 0.8) {
      mockUpdates.push({
        id: '4',
        type: 'error',
        severity: 'high',
        title: currentLang === 'fr' ? 'Perturbation importante' : 'Major disruption',
        description: currentLang === 'fr' 
          ? 'Incident technique en gare de Lyon Part-Dieu. Retards importants et annulations possibles.' 
          : 'Technical incident at Lyon Part-Dieu station. Significant delays and possible cancellations.',
        affectedLines: ['TGV', 'TER', 'Métro'],
        affectedStations: ['Lyon Part-Dieu'],
        startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // Il y a 45 minutes
        lastUpdate: new Date(Date.now() - 10 * 60 * 1000).toISOString() // Il y a 10 minutes
      });
    }

    return mockUpdates.sort((a, b) => {
      // Trier par sévérité puis par heure de mise à jour
      const severityOrder = { high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    });
  };

  useEffect(() => {
    const loadUpdates = () => {
      setLoading(true);
      // Simuler un délai d'API
      setTimeout(() => {
        const mockData = generateMockUpdates();
        setUpdates(mockData);
        setLastRefresh(new Date());
        setLoading(false);
      }, 800);
    };

    loadUpdates();

    // Mise à jour toutes les 2 minutes
    const interval = setInterval(loadUpdates, 120000);
    return () => clearInterval(interval);
  }, [currentLang]);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getUpdateStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return currentLang === 'fr' ? 'À l\'instant' : 'Just now';
    } else if (diffInMinutes < 60) {
      return currentLang === 'fr' 
        ? `Il y a ${diffInMinutes} min`
        : `${diffInMinutes} min ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return currentLang === 'fr' 
        ? `Il y a ${diffInHours}h`
        : `${diffInHours}h ago`;
    }
  };

  if (loading && updates.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-3 w-full bg-gray-300 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                </div>
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
            {lastRefresh && (
              currentLang === 'fr' 
                ? `Mis à jour à ${lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
                : `Updated at ${lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
            )}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {loading && (
            <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
          )}
          <Link
            href={currentLang === 'fr' ? '/info-trafic/' : '/en/traffic-info/'}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {currentLang === 'fr' ? 'Voir tout' : 'View all'}
          </Link>
        </div>
      </div>

      {/* Liste des mises à jour */}
      <div className="space-y-3">
        {updates.slice(0, 4).map((update) => (
          <div
            key={update.id}
            className={`border rounded-lg p-4 ${getUpdateStyles(update.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getUpdateIcon(update.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {update.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(update.lastUpdate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {update.description}
                </p>
                
                {/* Lignes et gares affectées */}
                {(update.affectedLines.length > 0 || update.affectedStations.length > 0) && (
                  <div className="space-y-2">
                    {update.affectedLines.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {currentLang === 'fr' ? 'Lignes :' : 'Lines:'}
                        </span>
                        <div className="flex space-x-1">
                          {update.affectedLines.map((line) => (
                            <span
                              key={line}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {line}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {update.affectedStations.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {currentLang === 'fr' ? 'Gares :' : 'Stations:'}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {update.affectedStations.slice(0, 3).map((station) => (
                            <span
                              key={station}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white text-gray-700 border border-gray-200"
                            >
                              {station}
                            </span>
                          ))}
                          {update.affectedStations.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{update.affectedStations.length - 3} {currentLang === 'fr' ? 'autres' : 'more'}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucune mise à jour */}
      {updates.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400" />
          <p className="text-lg font-medium mb-1">
            {currentLang === 'fr' ? 'Trafic normal' : 'Normal traffic'}
          </p>
          <p className="text-sm">
            {currentLang === 'fr' 
              ? 'Aucune perturbation signalée actuellement'
              : 'No disruptions currently reported'
            }
          </p>
        </div>
      )}
    </div>
  );
}