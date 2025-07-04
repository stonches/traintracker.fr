'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Station } from '@/lib/api/sncf';

interface SearchSectionProps {
  locale?: 'fr' | 'en';
}

export default function SearchSection({ locale = 'fr' }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('/api/stations/all');
        const data = await response.json();
        
        if (data.success) {
          setStations(data.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des gares:', error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = stations
        .filter(station =>
          station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          station.region?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 8);
      setFilteredStations(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredStations([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, stations]);

  const handleStationSelect = (station: Station) => {
    setSearchTerm('');
    setShowSuggestions(false);
    window.location.href = `/gare/${station.slug}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredStations.length > 0) {
      handleStationSelect(filteredStations[0]);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recherchez votre gare
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez les horaires en temps réel pour plus de 3000 gares françaises
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(searchTerm.length > 1)}
                placeholder="Recherchez une gare (ex: Paris, Lyon, Marseille...)"
                className="block w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {showSuggestions && filteredStations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {filteredStations.map((station) => (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => handleStationSelect(station)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{station.nom}</div>
                      {station.region && (
                        <div className="text-sm text-gray-600">{station.region}</div>
                      )}
                    </div>
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Rechercher
            </button>
          </form>
        </div>

        {/* Quick Access */}
        <div className="mt-12">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            Accès rapide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a
              href="/gare/paris-gare-du-nord"
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🚄</div>
              <div className="font-medium text-gray-900">Paris Nord</div>
              <div className="text-sm text-gray-600">Gare du Nord</div>
            </a>
            <a
              href="/gare/paris-gare-de-lyon"
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🚄</div>
              <div className="font-medium text-gray-900">Paris Lyon</div>
              <div className="text-sm text-gray-600">Gare de Lyon</div>
            </a>
            <a
              href="/gare/lyon-part-dieu"
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🚆</div>
              <div className="font-medium text-gray-900">Lyon</div>
              <div className="text-sm text-gray-600">Part-Dieu</div>
            </a>
            <a
              href="/gare/marseille-saint-charles"
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🚆</div>
              <div className="font-medium text-gray-900">Marseille</div>
              <div className="text-sm text-gray-600">Saint-Charles</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}