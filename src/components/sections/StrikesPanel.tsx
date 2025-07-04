'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Users, TrendingDown, ExternalLink, Calendar } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface StrikesPanelProps {
  lang: Language;
}

interface Strike {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'upcoming' | 'ended';
  affectedServices: string[];
  expectedImpact: {
    nationalLines: number;
    regionalLines: number;
    localServices: number;
  };
  organizer: string;
  reason: string;
  alternatives: string[];
}

const MOCK_STRIKES: Strike[] = [
  {
    id: 'strike-1',
    title: 'Grève interprofessionnelle SNCF',
    description: 'Grève nationale du personnel SNCF pour l\'amélioration des conditions de travail et des salaires. Impact significatif sur l\'ensemble du réseau ferroviaire français.',
    startDate: '2024-12-15T00:00:00Z',
    endDate: '2024-12-17T23:59:59Z',
    severity: 'high',
    status: 'upcoming',
    affectedServices: ['TGV', 'TER', 'Intercités', 'Transilien'],
    expectedImpact: {
      nationalLines: 60,
      regionalLines: 40,
      localServices: 30,
    },
    organizer: 'CGT Cheminots, UNSA Ferroviaire, SUD-Rail',
    reason: 'Revalorisation salariale et amélioration des conditions de travail',
    alternatives: ['Bus de substitution sur les lignes principales', 'Covoiturage SNCF Connect', 'Transport aérien'],
  },
  {
    id: 'strike-2',
    title: 'Grève locale Île-de-France',
    description: 'Mouvement de grève du personnel Transilien pour protester contre les nouveaux horaires de travail.',
    startDate: '2024-12-12T06:00:00Z',
    endDate: '2024-12-12T22:00:00Z',
    severity: 'medium',
    status: 'active',
    affectedServices: ['Transilien'],
    expectedImpact: {
      nationalLines: 0,
      regionalLines: 0,
      localServices: 50,
    },
    organizer: 'CGT-Cheminots',
    reason: 'Opposition aux nouveaux horaires de service',
    alternatives: ['Métro RATP', 'Bus RATP', 'RER non affecté'],
  },
];

export function StrikesPanel({ lang }: StrikesPanelProps) {
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming'>('current');
  const [isLoading, setIsLoading] = useState(true);

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    const loadStrikes = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStrikes(MOCK_STRIKES);
      } catch (error) {
        console.error('Error loading strikes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStrikes();
  }, []);

  const currentStrikes = strikes.filter(s => s.status === 'active');
  const upcomingStrikes = strikes.filter(s => s.status === 'upcoming');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return t('strikes.high');
      case 'medium': return t('strikes.medium');
      case 'low': return t('strikes.low');
      default: return 'Inconnu';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStrike = (strike: Strike) => (
    <div key={strike.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {strike.title}
            </h3>
            <div className="flex items-center space-x-3 mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(strike.severity)}`}>
                {getSeverityText(strike.severity)}
              </span>
              <span className="text-sm text-gray-500 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {formatDate(strike.startDate)} - {formatDate(strike.endDate)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {strike.description}
      </p>

      {/* Impact Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">
            {100 - strike.expectedImpact.nationalLines}%
          </div>
          <div className="text-xs text-gray-600">TGV/Intercités</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {100 - strike.expectedImpact.regionalLines}%
          </div>
          <div className="text-xs text-gray-600">TER</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {100 - strike.expectedImpact.localServices}%
          </div>
          <div className="text-xs text-gray-600">Transilien</div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium text-gray-900">Organisateurs:</span>
          <span className="ml-2 text-gray-600">{strike.organizer}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Motif:</span>
          <span className="ml-2 text-gray-600">{strike.reason}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">Services affectés:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {strike.affectedServices.map((service) => (
              <span key={service} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Alternatives */}
      {strike.alternatives.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
            <TrendingDown className="w-4 h-4" />
            <span>{t('strikes.alternatives')}</span>
          </h4>
          <ul className="space-y-1">
            {strike.alternatives.map((alternative, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{alternative}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
          <ExternalLink className="w-3 h-3" />
          <span>Plus d'informations</span>
        </button>
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>Ajouter au calendrier</span>
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors ${
                activeTab === 'current'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>{t('strikes.current')} ({currentStrikes.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{t('strikes.upcoming')} ({upcomingStrikes.length})</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'current' && (
            <div className="space-y-6">
              {currentStrikes.length > 0 ? (
                currentStrikes.map(renderStrike)
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune grève en cours actuellement</p>
                  <p className="text-sm mt-1">Le trafic SNCF fonctionne normalement</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              {upcomingStrikes.length > 0 ? (
                upcomingStrikes.map(renderStrike)
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Aucune grève programmée</p>
                  <p className="text-sm mt-1">Situation stable prévue</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}