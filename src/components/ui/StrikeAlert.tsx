'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, X, ExternalLink } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface StrikeAlertProps {
  lang: Language;
}

interface Strike {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  severity: 'high' | 'medium' | 'low';
  affectedServices: string[];
  expectedImpact: {
    nationalLines: number;
    regionalLines: number;
    localServices: number;
  };
}

const MOCK_STRIKES: Strike[] = [
  {
    id: 'strike-1',
    title: 'Grève nationale SNCF',
    description: 'Grève interprofessionnelle du 15 au 17 décembre. Perturbations importantes sur le réseau national.',
    startDate: '2024-12-15T00:00:00Z',
    endDate: '2024-12-17T23:59:59Z',
    severity: 'high',
    affectedServices: ['TGV', 'TER', 'Intercités'],
    expectedImpact: {
      nationalLines: 60,
      regionalLines: 40,
      localServices: 30,
    },
  },
];

export function StrikeAlert({ lang }: StrikeAlertProps) {
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [dismissedStrikes, setDismissedStrikes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    // Load dismissed strikes from localStorage
    const dismissed = localStorage.getItem('dismissed-strikes');
    if (dismissed) {
      try {
        setDismissedStrikes(JSON.parse(dismissed));
      } catch (e) {
        console.error('Error loading dismissed strikes:', e);
      }
    }

    // Simulate API call
    const loadStrikes = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call getCurrentStrikes()
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const now = new Date();
        const activeStrikes = MOCK_STRIKES.filter(strike => {
          const endDate = new Date(strike.endDate);
          return endDate > now;
        });
        
        setStrikes(activeStrikes);
      } catch (error) {
        console.error('Error loading strikes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStrikes();
  }, []);

  const handleDismissStrike = (strikeId: string) => {
    const newDismissed = [...dismissedStrikes, strikeId];
    setDismissedStrikes(newDismissed);
    localStorage.setItem('dismissed-strikes', JSON.stringify(newDismissed));
  };

  const visibleStrikes = strikes.filter(strike => !dismissedStrikes.includes(strike.id));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger-50 border-danger-200 text-danger-800';
      case 'medium': return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'low': return 'bg-success-50 border-success-200 text-success-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      case 'medium': return <Clock className="w-5 h-5 text-warning-600" />;
      case 'low': return <Clock className="w-5 h-5 text-success-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-gray-100 rounded-2xl p-6 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="mt-3 h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (visibleStrikes.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-success-50 border border-success-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success-800">
                {t('home.noStrikesToday')}
              </h3>
              <p className="text-success-700 mt-1">
                Le trafic SNCF fonctionne normalement aujourd'hui.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      {visibleStrikes.map((strike) => (
        <div
          key={strike.id}
          className={`border rounded-2xl p-6 ${getSeverityColor(strike.severity)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                {getSeverityIcon(strike.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold truncate">
                    {strike.title}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-current bg-opacity-10">
                    {t('home.strikeAlert')}
                  </span>
                </div>
                
                <p className="text-sm mb-3 leading-relaxed">
                  {strike.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <div className="text-xs opacity-75 uppercase tracking-wide">
                      TGV / Intercités
                    </div>
                    <div className="text-lg font-bold">
                      {100 - strike.expectedImpact.nationalLines}% des trains
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <div className="text-xs opacity-75 uppercase tracking-wide">
                      TER
                    </div>
                    <div className="text-lg font-bold">
                      {100 - strike.expectedImpact.regionalLines}% des trains
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <div className="text-xs opacity-75 uppercase tracking-wide">
                      Transilien
                    </div>
                    <div className="text-lg font-bold">
                      {100 - strike.expectedImpact.localServices}% des trains
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      Du {formatDate(strike.startDate)} au {formatDate(strike.endDate)}
                    </span>
                  </div>
                  <button className="flex items-center space-x-1 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    <span>Plus d'informations</span>
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleDismissStrike(strike.id)}
              className="flex-shrink-0 ml-4 p-1 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
              title="Masquer cette alerte"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}