'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Clock, Filter, ArrowRight } from 'lucide-react';
import { Station } from '@/lib/api/sncf';
import Link from 'next/link';

interface StationSearchProps {
  locale: 'fr' | 'en';
}

export default function StationSearch({ locale }: StationSearchProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stations/all');
        const data = await response.json();
        
        if (data.success) {
          setStations(data.data);
        } else {
          setError(locale === 'fr' ? 'Erreur lors du chargement des gares' : 'Error loading stations');
        }
      } catch (error) {
        setError(locale === 'fr' ? 'Erreur de connexion' : 'Connection error');
        // Fallback with mock data
        setStations([
          {
            id: 'stop_area:SNCF:87271007',
            nom: 'Paris Gare du Nord',
            slug: 'paris-gare-du-nord',
            coordonnees: { latitude: 48.8803, longitude: 2.3554 },
            region: 'Île-de-France'
          },
          {
            id: 'stop_area:SNCF:87686006',
            nom: 'Paris Gare de Lyon',
            slug: 'paris-gare-de-lyon',
            coordonnees: { latitude: 48.8437, longitude: 2.3737 },
            region: 'Île-de-France'
          },
          {
            id: 'stop_area:SNCF:87723197',
            nom: 'Lyon Part-Dieu',
            slug: 'lyon-part-dieu',
            coordonnees: { latitude: 45.7606, longitude: 4.8600 },
            region: 'Auvergne-Rhône-Alpes'
          },
          {
            id: 'stop_area:SNCF:87751008',
            nom: 'Marseille Saint-Charles',
            slug: 'marseille-saint-charles',
            coordonnees: { latitude: 43.3037, longitude: 5.3808 },
            region: 'Provence-Alpes-Côte d\'Azur'
          },
          {
            id: 'stop_area:SNCF:87286005',
            nom: 'Lille Europe',
            slug: 'lille-europe',
            coordonnees: { latitude: 50.6389, longitude: 3.0755 },
            region: 'Hauts-de-France'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [locale]);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(stations.map(s => s.region).filter(Boolean))];
    return uniqueRegions.sort();
  }, [stations]);

  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      const matchesSearch = !searchTerm || 
        station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.region?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !selectedRegion || station.region === selectedRegion;
      
      return matchesSearch && matchesRegion;
    });
  }, [stations, searchTerm, selectedRegion]);

  const handleStationClick = (station: Station) => {
    const path = locale === 'fr' ? `/gare/${station.slug}` : `/en/station/${station.slug}`;
    window.location.href = path;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  locale === 'fr' 
                    ? 'Recherchez une gare par nom ou région...'
                    : 'Search for a station by name or region...'
                }
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  {locale === 'fr' ? 'Toutes les régions' : 'All regions'}
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {locale === 'fr'
            ? `${filteredStations.length} gare${filteredStations.length !== 1 ? 's' : ''} trouvée${filteredStations.length !== 1 ? 's' : ''}`
            : `${filteredStations.length} station${filteredStations.length !== 1 ? 's' : ''} found`
          }
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600 text-sm">{error}</div>
        </div>
      )}

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((station) => (
          <button
            key={station.id}
            onClick={() => handleStationClick(station)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🚉</div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
              {station.nom}
            </h3>
            
            {station.region && (
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {station.region}
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {locale === 'fr' ? 'Horaires en temps réel' : 'Real-time schedules'}
            </div>
          </button>
        ))}
      </div>

      {/* No Results */}
      {filteredStations.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {locale === 'fr' ? 'Aucune gare trouvée' : 'No stations found'}
          </h3>
          <p className="text-gray-600">
            {locale === 'fr' 
              ? 'Essayez de modifier votre recherche ou de changer le filtre de région.'
              : 'Try modifying your search or changing the region filter.'
            }
          </p>
        </div>
      )}

      {/* Popular Searches */}
      {searchTerm === '' && selectedRegion === '' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'fr' ? 'Recherches populaires' : 'Popular searches'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 'Bordeaux', 'Nantes', 'Strasbourg'].map((city) => (
              <button
                key={city}
                onClick={() => setSearchTerm(city)}
                className="text-left px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="font-medium text-gray-900">{city}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}