'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Filter, Grid, List, ArrowRight } from 'lucide-react';
import { Station } from '@/lib/api/sncf';

interface StationDirectoryProps {
  locale: 'fr' | 'en';
}

export default function StationDirectory({ locale }: StationDirectoryProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stations/all');
        const data = await response.json();
        
        if (data.success) {
          setStations(data.data);
        } else {
          // Fallback with more mock data for demonstration
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
            {
              id: 'stop_area:SNCF:87581009',
              nom: 'Bordeaux Saint-Jean',
              slug: 'bordeaux-saint-jean',
              coordonnees: { latitude: 44.8258, longitude: -0.5568 },
              region: 'Nouvelle-Aquitaine'
            },
            {
              id: 'stop_area:SNCF:87611004',
              nom: 'Toulouse Matabiau',
              slug: 'toulouse-matabiau',
              coordonnees: { latitude: 43.6108, longitude: 1.4537 },
              region: 'Occitanie'
            },
            {
              id: 'stop_area:SNCF:87212027',
              nom: 'Strasbourg',
              slug: 'strasbourg',
              coordonnees: { latitude: 48.5847, longitude: 7.7347 },
              region: 'Grand Est'
            },
            {
              id: 'stop_area:SNCF:87481002',
              nom: 'Nantes',
              slug: 'nantes',
              coordonnees: { latitude: 47.2173, longitude: -1.5424 },
              region: 'Pays de la Loire'
            },
            {
              id: 'stop_area:SNCF:87471003',
              nom: 'Rennes',
              slug: 'rennes',
              coordonnees: { latitude: 48.1033, longitude: -1.6721 },
              region: 'Bretagne'
            },
            {
              id: 'stop_area:SNCF:87756056',
              nom: 'Nice Ville',
              slug: 'nice-ville',
              coordonnees: { latitude: 43.7036, longitude: 7.2619 },
              region: 'Provence-Alpes-Côte d\'Azur'
            },
            {
              id: 'stop_area:SNCF:87773002',
              nom: 'Montpellier Saint-Roch',
              slug: 'montpellier-saint-roch',
              coordonnees: { latitude: 43.6052, longitude: 3.8808 },
              region: 'Occitanie'
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

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
    }).sort((a, b) => a.nom.localeCompare(b.nom));
  }, [stations, searchTerm, selectedRegion]);

  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStations, currentPage]);

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  const handleStationClick = (station: Station) => {
    const path = locale === 'fr' ? `/gare/${station.slug}` : `/en/station/${station.slug}`;
    window.location.href = path;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Rechercher' : 'Search'}
            </label>
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
                    ? 'Nom de gare ou région...'
                    : 'Station name or region...'
                }
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Région' : 'Region'}
            </label>
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
                  {locale === 'fr' ? 'Toutes' : 'All'}
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Affichage' : 'View'}
            </label>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center px-4 py-3 rounded-l-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center px-4 py-3 rounded-r-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            {locale === 'fr'
              ? `${filteredStations.length} gare${filteredStations.length !== 1 ? 's' : ''} trouvée${filteredStations.length !== 1 ? 's' : ''}`
              : `${filteredStations.length} station${filteredStations.length !== 1 ? 's' : ''} found`
            }
          </div>
          {totalPages > 1 && (
            <div>
              {locale === 'fr' ? 'Page' : 'Page'} {currentPage} {locale === 'fr' ? 'sur' : 'of'} {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Stations Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedStations.map((station) => (
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
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {station.region}
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          {paginatedStations.map((station, index) => (
            <button
              key={station.id}
              onClick={() => handleStationClick(station)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                index !== paginatedStations.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-xl">🚉</div>
                <div>
                  <h3 className="font-medium text-gray-900">{station.nom}</h3>
                  {station.region && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {station.region}
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'fr' ? 'Précédent' : 'Previous'}
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === pageNum
                    ? 'text-white bg-blue-600'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'fr' ? 'Suivant' : 'Next'}
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredStations.length === 0 && (
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
    </div>
  );
}