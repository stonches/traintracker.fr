'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';

interface PopularRoute {
  id: string;
  from: string;
  to: string;
  fromSlug: string;
  toSlug: string;
  duration: string;
  frequency: string;
  popularity: number;
  services: string[];
}

export default function PopularRoutes() {
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);
  const t = (key: string) => getTranslation(currentLang, key);

  const popularRoutes: PopularRoute[] = [
    {
      id: '1',
      from: 'Paris Gare du Nord',
      to: 'Lyon Part-Dieu',
      fromSlug: 'paris-gare-du-nord',
      toSlug: 'lyon-part-dieu',
      duration: '2h 00min',
      frequency: '1 train toutes les heures',
      popularity: 95,
      services: ['TGV']
    },
    {
      id: '2',
      from: 'Paris Montparnasse',
      to: 'Bordeaux Saint-Jean',
      fromSlug: 'paris-montparnasse',
      toSlug: 'bordeaux-saint-jean',
      duration: '2h 05min',
      frequency: '1 train toutes les 2 heures',
      popularity: 88,
      services: ['TGV']
    },
    {
      id: '3',
      from: 'Paris Gare de Lyon',
      to: 'Marseille Saint-Charles',
      fromSlug: 'paris-gare-de-lyon',
      toSlug: 'marseille-saint-charles',
      duration: '3h 20min',
      frequency: 'Plusieurs trains par jour',
      popularity: 92,
      services: ['TGV']
    },
    {
      id: '4',
      from: 'Lyon Part-Dieu',
      to: 'Nice-Ville',
      fromSlug: 'lyon-part-dieu',
      toSlug: 'nice-ville',
      duration: '4h 30min',
      frequency: '2-3 trains par jour',
      popularity: 75,
      services: ['TGV']
    },
    {
      id: '5',
      from: 'Paris Gare du Nord',
      to: 'Lille Europe',
      fromSlug: 'paris-gare-du-nord',
      toSlug: 'lille-europe',
      duration: '1h 00min',
      frequency: 'Trains fréquents',
      popularity: 85,
      services: ['TGV', 'Eurostar']
    },
    {
      id: '6',
      from: 'Paris Saint-Lazare',
      to: 'Rennes',
      fromSlug: 'paris-saint-lazare',
      toSlug: 'rennes',
      duration: '1h 30min',
      frequency: '1 train par heure',
      popularity: 78,
      services: ['TGV']
    }
  ];

  const getRouteUrl = (route: PopularRoute) => {
    const baseUrl = currentLang === 'fr' ? '/itineraire/' : '/en/journey/';
    return `${baseUrl}?from=${route.fromSlug}&to=${route.toSlug}`;
  };

  const getStationUrl = (slug: string) => {
    return currentLang === 'fr' ? `/gare/${slug}/` : `/en/station/${slug}/`;
  };

  return (
    <div className="space-y-4">
      {popularRoutes.map((route) => (
        <div
          key={route.id}
          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Link 
                  href={getStationUrl(route.fromSlug)}
                  className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {route.from}
                </Link>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <Link 
                  href={getStationUrl(route.toSlug)}
                  className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {route.to}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {route.services.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{route.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{route.frequency}</span>
            </div>
          </div>

          {/* Barre de popularité */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>
                {currentLang === 'fr' ? 'Popularité' : 'Popularity'}
              </span>
              <span>{route.popularity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${route.popularity}%` }}
              ></div>
            </div>
          </div>

          <Link
            href={getRouteUrl(route)}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <span>
              {currentLang === 'fr' ? 'Voir les horaires' : 'View schedules'}
            </span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      ))}

      {/* Lien vers tous les itinéraires */}
      <div className="text-center pt-4 border-t border-gray-200">
        <Link
          href={currentLang === 'fr' ? '/itineraire/' : '/en/journey/'}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span>
            {currentLang === 'fr' ? 'Planifier un autre itinéraire' : 'Plan another journey'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}