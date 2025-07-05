'use client';

import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  RefreshCw, 
  Clock,
  AlertTriangle,
  Construction,
  Zap,
  CloudRain,
  Users
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n/translations';
import { trackTrafficView } from '@/lib/analytics';

interface TrafficInfoContentProps {
  language: 'fr' | 'en';
}

interface Disruption {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  severity: 'low' | 'medium' | 'high';
  category: 'technical' | 'weather' | 'strike' | 'maintenance' | 'incident';
  title: string;
  description: string;
  affectedLines: string[];
  affectedStations: string[];
  startTime: string;
  endTime?: string;
  lastUpdate: string;
  impact: string;
}

export default function TrafficInfoContent({ language }: TrafficInfoContentProps) {
  const [disruptions, setDisruptions] = useState<Disruption[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const t = (key: string) => getTranslation(language, key);

  const generateMockDisruptions = (): Disruption[] => {
    const disruptions: Disruption[] = [
      {
        id: '1',
        type: 'success',
        severity: 'low',
        category: 'technical',
        title: language === 'fr' ? 'Trafic normal' : 'Normal traffic',
        description: language === 'fr' 
          ? 'Le trafic circule normalement sur l\'ensemble du réseau TGV et TER en Île-de-France.'
          : 'Traffic is running normally across the entire TGV and TER network in Île-de-France.',
        affectedLines: ['TGV', 'TER'],
        affectedStations: [],
        startTime: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        impact: language === 'fr' ? 'Aucun impact' : 'No impact'
      },
      {
        id: '2',
        type: 'warning',
        severity: 'medium',
        category: 'weather',
        title: language === 'fr' ? 'Conditions météorologiques' : 'Weather conditions',
        description: language === 'fr' 
          ? 'Vents forts sur la côte méditerranéenne. Possible limitation de vitesse sur certaines lignes. Retards de 10 à 20 minutes possibles.'
          : 'Strong winds on the Mediterranean coast. Possible speed restrictions on some lines. Delays of 10 to 20 minutes possible.',
        affectedLines: ['TGV', 'TER'],
        affectedStations: ['Marseille Saint-Charles', 'Nice-Ville', 'Montpellier Saint-Roch', 'Cannes'],
        startTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        lastUpdate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        impact: language === 'fr' ? 'Retards possibles' : 'Possible delays'
      },
      {
        id: '3',
        type: 'info',
        severity: 'low',
        category: 'maintenance',
        title: language === 'fr' ? 'Travaux programmés week-end' : 'Scheduled weekend work',
        description: language === 'fr' 
          ? 'Travaux de modernisation sur la ligne Paris-Lyon ce week-end (samedi 20h - dimanche 17h). Plan de transport adapté avec bus de substitution.'
          : 'Modernization work on the Paris-Lyon line this weekend (Saturday 8pm - Sunday 5pm). Adapted transport plan with replacement buses.',
        affectedLines: ['TGV'],
        affectedStations: ['Paris Gare de Lyon', 'Lyon Part-Dieu', 'Dijon-Ville'],
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        impact: language === 'fr' ? 'Circulation adaptée' : 'Adapted traffic'
      }
    ];

    // Ajouter occasionnellement des perturbations plus importantes
    if (Math.random() > 0.6) {
      disruptions.push({
        id: '4',
        type: 'error',
        severity: 'high',
        category: 'technical',
        title: language === 'fr' ? 'Incident technique majeur' : 'Major technical incident',
        description: language === 'fr' 
          ? 'Panne du système de signalisation en gare de Lyon Part-Dieu. Retards importants et annulations sur les lignes TGV Sud-Est. Nous mettons tout en œuvre pour rétablir la situation.'
          : 'Signaling system failure at Lyon Part-Dieu station. Significant delays and cancellations on TGV South-East lines. We are working to restore the situation.',
        affectedLines: ['TGV'],
        affectedStations: ['Lyon Part-Dieu'],
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        impact: language === 'fr' ? 'Retards et annulations' : 'Delays and cancellations'
      });
    }

    if (Math.random() > 0.8) {
      disruptions.push({
        id: '5',
        type: 'warning',
        severity: 'medium',
        category: 'strike',
        title: language === 'fr' ? 'Mouvement social' : 'Strike action',
        description: language === 'fr' 
          ? 'Préavis de grève déposé pour jeudi 25 janvier. Perturbations attendues sur le réseau TER et certaines lignes TGV. Plan de transport sera communiqué 48h avant.'
          : 'Strike notice filed for Thursday, January 25. Expected disruptions on the TER network and some TGV lines. Transport plan will be announced 48h in advance.',
        affectedLines: ['TER', 'TGV'],
        affectedStations: [],
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        impact: language === 'fr' ? 'Service réduit prévu' : 'Reduced service expected'
      });
    }

    return disruptions.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    });
  };

  useEffect(() => {
    const loadDisruptions = () => {
      setLoading(true);
      
      setTimeout(() => {
        const mockData = generateMockDisruptions();
        setDisruptions(mockData);
        setLastUpdate(new Date());
        setLoading(false);
      }, 1000);
    };

    // Track traffic info view
    trackTrafficView(language);

    loadDisruptions();
    
    // Mise à jour toutes les 2 minutes
    const interval = setInterval(loadDisruptions, 120000);
    return () => clearInterval(interval);
  }, [language]);

  const getDisruptionIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Zap className="h-5 w-5" />;
      case 'weather':
        return <CloudRain className="h-5 w-5" />;
      case 'strike':
        return <Users className="h-5 w-5" />;
      case 'maintenance':
        return <Construction className="h-5 w-5" />;
      case 'incident':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getDisruptionStyles = (type: string, severity: string) => {
    if (type === 'success') {
      return {
        border: 'border-green-200',
        bg: 'bg-green-50',
        iconColor: 'text-green-600',
        titleColor: 'text-green-800',
        textColor: 'text-green-700'
      };
    } else if (type === 'error' || severity === 'high') {
      return {
        border: 'border-red-200',
        bg: 'bg-red-50',
        iconColor: 'text-red-600',
        titleColor: 'text-red-800',
        textColor: 'text-red-700'
      };
    } else if (type === 'warning' || severity === 'medium') {
      return {
        border: 'border-yellow-200',
        bg: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
        titleColor: 'text-yellow-800',
        textColor: 'text-yellow-700'
      };
    } else {
      return {
        border: 'border-blue-200',
        bg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-800',
        textColor: 'text-blue-700'
      };
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      fr: {
        technical: 'Technique',
        weather: 'Météo',
        strike: 'Mouvement social',
        maintenance: 'Travaux',
        incident: 'Incident'
      },
      en: {
        technical: 'Technical',
        weather: 'Weather',
        strike: 'Strike',
        maintenance: 'Maintenance',
        incident: 'Incident'
      }
    };
    
    return labels[language][category as keyof typeof labels.fr] || category;
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return language === 'fr' ? 'À l\'instant' : 'Just now';
    } else if (diffInMinutes < 60) {
      return language === 'fr' 
        ? `Il y a ${diffInMinutes} min`
        : `${diffInMinutes} min ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return language === 'fr' 
        ? `Il y a ${diffInHours}h`
        : `${diffInHours}h ago`;
    }
  };

  const filteredDisruptions = disruptions.filter(disruption => {
    if (activeFilter === 'all') return true;
    return disruption.category === activeFilter;
  });

  const categories = ['all', 'technical', 'weather', 'strike', 'maintenance', 'incident'];

  const getOverallStatus = () => {
    const highSeverity = disruptions.filter(d => d.severity === 'high').length;
    const mediumSeverity = disruptions.filter(d => d.severity === 'medium').length;
    
    if (highSeverity > 0) {
      return {
        status: language === 'fr' ? 'Perturbations importantes' : 'Major disruptions',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: <AlertCircle className="h-6 w-6" />
      };
    } else if (mediumSeverity > 0) {
      return {
        status: language === 'fr' ? 'Perturbations mineures' : 'Minor disruptions',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: <AlertTriangle className="h-6 w-6" />
      };
    } else {
      return {
        status: language === 'fr' ? 'Trafic normal' : 'Normal traffic',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: <CheckCircle className="h-6 w-6" />
      };
    }
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('traffic.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {language === 'fr' 
                ? 'Suivez en temps réel l\'état du trafic sur le réseau SNCF'
                : 'Follow real-time traffic status on the SNCF network'
              }
            </p>
          </div>

          {/* Overall Status */}
          <div className={`${overallStatus.bgColor} rounded-xl p-6 mb-8`}>
            <div className="flex items-center justify-center space-x-3">
              <div className={overallStatus.color}>
                {overallStatus.icon}
              </div>
              <h2 className={`text-xl font-semibold ${overallStatus.color}`}>
                {overallStatus.status}
              </h2>
            </div>
            {lastUpdate && (
              <div className="text-center mt-2">
                <span className="text-sm text-gray-600">
                  {language === 'fr' 
                    ? `Dernière mise à jour : ${lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
                    : `Last updated: ${lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                  }
                </span>
                {loading && (
                  <RefreshCw className="inline-block h-4 w-4 ml-2 animate-spin" />
                )}
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {disruptions.filter(d => d.severity === 'high').length}
              </div>
              <div className="text-sm text-red-600">
                {language === 'fr' ? 'Graves' : 'Severe'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {disruptions.filter(d => d.severity === 'medium').length}
              </div>
              <div className="text-sm text-yellow-600">
                {language === 'fr' ? 'Modérées' : 'Moderate'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {disruptions.filter(d => d.severity === 'low').length}
              </div>
              <div className="text-sm text-blue-600">
                {language === 'fr' ? 'Mineures' : 'Minor'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {disruptions.length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Total' : 'Total'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' 
                  ? (language === 'fr' ? 'Tout' : 'All')
                  : getCategoryLabel(category)
                }
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Disruptions List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && disruptions.length === 0 ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                      <div className="h-3 w-full bg-gray-300 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDisruptions.length > 0 ? (
            <div className="space-y-4">
              {filteredDisruptions.map((disruption) => {
                const styles = getDisruptionStyles(disruption.type, disruption.severity);
                
                return (
                  <div
                    key={disruption.id}
                    className={`${styles.border} ${styles.bg} rounded-lg p-6 border`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${styles.iconColor} mt-1`}>
                        {getDisruptionIcon(disruption.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className={`font-semibold ${styles.titleColor} mb-1`}>
                              {disruption.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.textColor} border ${styles.border}`}>
                                {getCategoryLabel(disruption.category)}
                              </span>
                              <span className={styles.textColor}>
                                {disruption.impact}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(disruption.lastUpdate)}
                          </span>
                        </div>

                        <p className={`${styles.textColor} mb-4`}>
                          {disruption.description}
                        </p>

                        {/* Affected Lines and Stations */}
                        {(disruption.affectedLines.length > 0 || disruption.affectedStations.length > 0) && (
                          <div className="space-y-2">
                            {disruption.affectedLines.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-gray-600">
                                  {language === 'fr' ? 'Lignes affectées :' : 'Affected lines:'}
                                </span>
                                <div className="flex space-x-1">
                                  {disruption.affectedLines.map((line) => (
                                    <span
                                      key={line}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white text-gray-700 border border-gray-300"
                                    >
                                      {line}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {disruption.affectedStations.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-gray-600">
                                  {language === 'fr' ? 'Gares affectées :' : 'Affected stations:'}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {disruption.affectedStations.slice(0, 4).map((station) => (
                                    <span
                                      key={station}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white text-gray-700 border border-gray-300"
                                    >
                                      {station}
                                    </span>
                                  ))}
                                  {disruption.affectedStations.length > 4 && (
                                    <span className="text-xs text-gray-500">
                                      +{disruption.affectedStations.length - 4} {language === 'fr' ? 'autres' : 'more'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Time info */}
                        {disruption.endTime && (
                          <div className="mt-3 flex items-center space-x-2 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>
                              {language === 'fr' ? 'Fin prévue' : 'Expected end'}: {' '}
                              {new Date(disruption.endTime).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'fr' ? 'Aucune perturbation' : 'No disruptions'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Aucune perturbation dans cette catégorie'
                  : 'No disruptions in this category'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}