'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Train, 
  Clock, 
  MapPin, 
  Navigation, 
  AlertCircle,
  ArrowRight,
  Wifi,
  ShoppingBag,
  Car,
  Accessibility,
  UtensilsCrossed
} from 'lucide-react';
import LiveDeparturesBoard from '@/components/realtime/LiveDeparturesBoard';
import { getTimeUntilTrain, getDelayStatus, formatFrenchTime } from '@/lib/utils/dateUtils';
import { getTranslation } from '@/lib/i18n/translations';

interface Station {
  id: string;
  name: string;
  slug: string;
  city: string;
  region: string;
  coordinates: { lat: number; lon: number };
  services: string[];
  facilities?: string[];
  description: string;
  descriptionEn: string;
}

interface StationPageContentProps {
  station: Station;
  language: 'fr' | 'en';
}

export default function StationPageContent({ station, language }: StationPageContentProps) {
  const [activeTab, setActiveTab] = useState<'departures' | 'arrivals'>('departures');
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'restaurants':
        return <UtensilsCrossed className="h-4 w-4" />;
      case 'shops':
        return <ShoppingBag className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'accessibility':
        return <Accessibility className="h-4 w-4" />;
      default:
        return <div className="h-4 w-4 bg-blue-500 rounded-full" />;
    }
  };

  const getFacilityLabel = (facility: string) => {
    const labels = {
      fr: {
        wifi: 'Wi-Fi gratuit',
        restaurants: 'Restaurants',
        shops: 'Boutiques',
        parking: 'Parking',
        accessibility: 'Accessibilité PMR'
      },
      en: {
        wifi: 'Free Wi-Fi',
        restaurants: 'Restaurants',
        shops: 'Shops',
        parking: 'Parking',
        accessibility: 'Accessibility'
      }
    };
    
    return labels[language][facility.toLowerCase() as keyof typeof labels.fr] || facility;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Train className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {station.name}
                  </h1>
                  <div className="flex items-center space-x-2 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{station.city}, {station.region}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                {language === 'fr' ? station.description : station.descriptionEn}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-6">
                {station.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Time */}
            <div className="lg:ml-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {t('time.now')}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {formatFrenchTime(currentTime)}
                </div>
                <div className="text-sm text-blue-700">
                  {currentTime.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Departures/Arrivals */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab('departures')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'departures'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {t('stations.departures')}
                    </button>
                    <button
                      onClick={() => setActiveTab('arrivals')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'arrivals'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {t('stations.arrivals')}
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  <LiveDeparturesBoard 
                    stationId={station.id}
                    type={activeTab}
                    language={language}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Station Info */}
            <div className="space-y-6">
              {/* Facilities */}
              {station.facilities && station.facilities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('stations.facilities')}
                  </h3>
                  <div className="space-y-3">
                    {station.facilities.map((facility) => (
                      <div key={facility} className="flex items-center space-x-3">
                        <div className="text-blue-600">
                          {getFacilityIcon(facility)}
                        </div>
                        <span className="text-gray-700">
                          {getFacilityLabel(facility)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'fr' ? 'Actions rapides' : 'Quick actions'}
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`${language === 'fr' ? '/itineraire' : '/en/journey'}/?from=${station.slug}`}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Navigation className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        {language === 'fr' ? 'Planifier un voyage' : 'Plan a journey'}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${station.name} ${station.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        {language === 'fr' ? 'Voir sur la carte' : 'View on map'}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Station Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'fr' ? 'Informations gare' : 'Station information'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'fr' ? 'Ville' : 'City'}:
                    </span>
                    <span className="font-medium text-gray-900">{station.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'fr' ? 'Région' : 'Region'}:
                    </span>
                    <span className="font-medium text-gray-900">{station.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'fr' ? 'Services' : 'Services'}:
                    </span>
                    <span className="font-medium text-gray-900">
                      {station.services.length} {language === 'fr' ? 'types' : 'types'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'fr' ? 'Coordonnées' : 'Coordinates'}:
                    </span>
                    <span className="font-medium text-gray-900">
                      {station.coordinates.lat.toFixed(4)}, {station.coordinates.lon.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Source */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">
                      {language === 'fr' ? 'Source des données' : 'Data source'}
                    </h4>
                    <p className="text-sm text-yellow-700">
                      {language === 'fr' 
                        ? 'Données fournies par SNCF Connect. Mises à jour toutes les 30 secondes.'
                        : 'Data provided by SNCF Connect. Updated every 30 seconds.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}