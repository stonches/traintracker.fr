'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, MapPin, Train } from 'lucide-react';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';
import stationsData from '@/data/stations.json';

interface Station {
  id: string;
  name: string;
  slug: string;
  city: string;
  region: string;
  coordinates: { lat: number; lon: number };
  services: string[];
  description: string;
  descriptionEn: string;
}

export default function StationSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = (key: string) => getTranslation(currentLang, key);

  const stations = stationsData.stations as Station[];

  useEffect(() => {
    if (query.length < 2) {
      setFilteredStations([]);
      return;
    }

    const filtered = stations.filter(station =>
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.city.toLowerCase().includes(query.toLowerCase()) ||
      station.region.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setFilteredStations(filtered);
    setSelectedIndex(-1);
  }, [query, stations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredStations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredStations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectStation(filteredStations[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const selectStation = (station: Station) => {
    const url = currentLang === 'fr' 
      ? `/gare/${station.slug}/`
      : `/en/station/${station.slug}/`;
    
    router.push(url);
    setQuery('');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={t('home.searchPlaceholder')}
          className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm placeholder-gray-500"
          autoComplete="off"
        />
      </div>

      {/* Résultats de recherche */}
      {isOpen && filteredStations.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {filteredStations.map((station, index) => (
              <button
                key={station.id}
                onClick={() => selectStation(station)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Train className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {station.name}
                      </p>
                      <div className="flex space-x-1">
                        {station.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{station.city}, {station.region}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Footer des résultats */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              {currentLang === 'fr' 
                ? `${filteredStations.length} gare${filteredStations.length > 1 ? 's' : ''} trouvée${filteredStations.length > 1 ? 's' : ''}`
                : `${filteredStations.length} station${filteredStations.length > 1 ? 's' : ''} found`
              }
            </p>
          </div>
        </div>
      )}

      {/* État de recherche vide */}
      {isOpen && query.length >= 2 && filteredStations.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-1">
              {t('errors.stationNotFound')}
            </p>
            <p className="text-sm">
              {currentLang === 'fr' 
                ? 'Essayez avec le nom d\'une autre gare'
                : 'Try with another station name'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}