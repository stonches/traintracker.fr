import React from 'react';
import StationSearch from '@/components/ui/StationSearch';
import NextTrainWidget from '@/components/realtime/NextTrainWidget';
import PopularRoutes from '@/components/ui/PopularRoutes';
import LiveUpdates from '@/components/ui/LiveUpdates';
import { Train, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Train className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Train Tracker France
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Informations trains en temps réel pour 50 grandes gares françaises
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Horaires, retards, départs et arrivées en direct. 
              TGV, TER, Intercités, Eurostar, Thalys - toutes les informations dont vous avez besoin.
            </p>
          </div>

          {/* Station Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <StationSearch />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Train className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">50</div>
              <div className="text-sm text-gray-600">Gares couvertes</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">30s</div>
              <div className="text-sm text-gray-600">Mises à jour</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Service continu</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 mb-1">Temps réel</div>
              <div className="text-sm text-gray-600">Alertes perturbations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Next Trains Widget */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Prochains trains
                </h2>
                <p className="text-gray-600">
                  Informations en temps réel pour les principales gares
                </p>
              </div>
              <div className="p-6">
                <NextTrainWidget />
              </div>
            </div>

            {/* Popular Routes */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Itinéraires populaires
                </h2>
                <p className="text-gray-600">
                  Les trajets les plus fréquents
                </p>
              </div>
              <div className="p-6">
                <PopularRoutes />
              </div>
            </div>
          </div>

          {/* Live Updates */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Informations trafic en direct
                </h2>
                <p className="text-gray-600">
                  Perturbations et alertes actuelles
                </p>
              </div>
              <div className="p-6">
                <LiveUpdates />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-yellow-800 mb-4">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">Service indépendant</span>
            </div>
            <p className="text-yellow-700 max-w-3xl mx-auto">
              Train Tracker France est un service indépendant et n'est PAS affilié à la SNCF, 
              au gouvernement français ou à toute autorité de transport officielle. 
              Les données sont fournies à titre informatif uniquement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
