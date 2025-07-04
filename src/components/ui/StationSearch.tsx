'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface StationSearchProps {
  lang: Language;
  onStationSelect?: (station: Station) => void;
  placeholder?: string;
}

interface Station {
  id: string;
  name: string;
  slug: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  region: string;
  departement: string;
}

const POPULAR_STATIONS: Station[] = [
  {
    id: 'stop_area:OCE:SA:87686006',
    name: 'Gare du Nord',
    slug: 'gare-du-nord',
    coordinates: { lat: 48.8809, lon: 2.3553 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
  {
    id: 'stop_area:OCE:SA:87686077',
    name: 'Gare de Lyon',
    slug: 'gare-de-lyon',
    coordinates: { lat: 48.8447, lon: 2.3740 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
  {
    id: 'stop_area:OCE:SA:87391003',
    name: 'Montparnasse',
    slug: 'montparnasse',
    coordinates: { lat: 48.8404, lon: 2.3193 },
    region: 'Île-de-France',
    departement: 'Paris',
  },
  {
    id: 'stop_area:OCE:SA:87271007',
    name: 'Lille Flandres',
    slug: 'lille-flandres',
    coordinates: { lat: 50.6356, lon: 3.0707 },
    region: 'Hauts-de-France',
    departement: 'Nord',
  },
  {
    id: 'stop_area:OCE:SA:87722025',
    name: 'Lyon Part-Dieu',
    slug: 'lyon-part-dieu',
    coordinates: { lat: 45.7606, lon: 4.8599 },
    region: 'Auvergne-Rhône-Alpes',
    departement: 'Rhône',
  },
];

export function StationSearch({ lang, onStationSelect, placeholder }: StationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Station[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(lang, key);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recent-stations');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  useEffect(() => {
    const searchStations = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // In a real implementation, this would call the API
        // For now, we'll filter the popular stations
        const filtered = POPULAR_STATIONS.filter(station =>
          station.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error('Error searching stations:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchStations, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStationSelect = (station: Station) => {
    setQuery(station.name);
    setIsOpen(false);
    
    // Add to recent searches
    const newRecent = [station, ...recentSearches.filter(s => s.id !== station.id)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent-stations', JSON.stringify(newRecent));
    
    onStationSelect?.(station);
  };

  const displayedStations = query.length < 2 
    ? recentSearches.length > 0 
      ? recentSearches 
      : POPULAR_STATIONS.slice(0, 5)
    : results;

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || t('home.searchPlaceholder')}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none transition-colors bg-white shadow-soft"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-strong border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          {displayedStations.length > 0 ? (
            <div className="py-2">
              {query.length < 2 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                  {recentSearches.length > 0 ? 'Recherches récentes' : t('home.popularStations')}
                </div>
              )}
              {displayedStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleStationSelect(station)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <div className="flex-shrink-0">
                    {recentSearches.some(s => s.id === station.id) ? (
                      <Clock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <MapPin className="w-4 h-4 text-primary-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {station.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {station.region} • {station.departement}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              {query.length >= 2 ? 'Aucune gare trouvée' : 'Commencez à taper pour rechercher'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}