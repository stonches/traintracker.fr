/**
 * Traductions pour l'application bilingue
 */

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      stations: 'Gares',
      journey: 'Itinéraire',
      traffic: 'Info trafic',
      about: 'À propos',
      contact: 'Contact'
    },
    
    // Page d'accueil
    home: {
      title: 'Train Tracker France',
      subtitle: 'Informations trains en temps réel',
      description: 'Horaires, retards et informations en temps réel pour 50 grandes gares françaises',
      searchPlaceholder: 'Rechercher une gare...',
      popularRoutes: 'Itinéraires populaires',
      nextTrains: 'Prochains trains',
      liveUpdates: 'Mises à jour en direct',
      disclaimer: 'Service indépendant non affilié à la SNCF'
    },
    
    // Gares
    stations: {
      departures: 'Départs',
      arrivals: 'Arrivées',
      nextTrain: 'Prochain train',
      platform: 'Voie',
      destination: 'Destination',
      origin: 'Provenance',
      scheduledTime: 'Horaire prévu',
      realTime: 'Temps réel',
      delay: 'Retard',
      onTime: 'À l\'heure',
      delayed: 'Retardé',
      cancelled: 'Annulé',
      facilities: 'Services',
      connections: 'Correspondances'
    },
    
    // Itinéraire
    journey: {
      title: 'Planificateur d\'itinéraire',
      from: 'De',
      to: 'Vers',
      departure: 'Départ',
      arrival: 'Arrivée',
      duration: 'Durée',
      transfers: 'Correspondances',
      directTrain: 'Train direct',
      oneTransfer: '1 correspondance',
      multipleTransfers: 'correspondances',
      searchJourney: 'Rechercher un itinéraire',
      noResults: 'Aucun itinéraire trouvé',
      loading: 'Recherche en cours...'
    },
    
    // Trafic
    traffic: {
      title: 'Informations trafic',
      currentDisruptions: 'Perturbations en cours',
      plannedWork: 'Travaux prévus',
      normalTraffic: 'Trafic normal',
      minorDisruptions: 'Perturbations mineures',
      majorDisruptions: 'Perturbations importantes',
      strikes: 'Grèves',
      weatherAlerts: 'Alertes météo'
    },
    
    // Temps
    time: {
      now: 'Maintenant',
      inMinutes: 'Dans {minutes} min',
      inHours: 'Dans {hours}h',
      immediate: 'Immédiat',
      minutesDelay: '{minutes} min de retard',
      hoursDelay: '{hours}h de retard'
    },
    
    // Erreurs
    errors: {
      noData: 'Aucune donnée disponible',
      networkError: 'Erreur de connexion',
      stationNotFound: 'Gare non trouvée',
      searchError: 'Erreur de recherche',
      tryAgain: 'Réessayer'
    },
    
    // Pied de page
    footer: {
      about: 'À propos',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      disclaimer: 'Service indépendant non affilié à la SNCF'
    },
    
    // Métadonnées SEO
    seo: {
      homeTitle: 'Train Tracker France - Horaires Trains en Temps Réel',
      homeDescription: 'Horaires, retards et informations en temps réel pour 50 grandes gares françaises. TGV, TER, Intercités, Eurostar.',
      stationTitle: '{station} - Horaires et Départs | Train Tracker France',
      stationDescription: 'Horaires en temps réel {station} : départs, arrivées, retards, voies. Informations voyageurs actualisées.',
      journeyTitle: 'Planificateur d\'Itinéraire | Train Tracker France',
      journeyDescription: 'Planifiez votre voyage en train avec des horaires en temps réel. Trouvez les meilleurs itinéraires SNCF.',
      trafficTitle: 'Informations Trafic SNCF | Train Tracker France',
      trafficDescription: 'Perturbations, travaux et informations trafic en temps réel pour le réseau SNCF.'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      stations: 'Stations',
      journey: 'Journey',
      traffic: 'Traffic Info',
      about: 'About',
      contact: 'Contact'
    },
    
    // Homepage
    home: {
      title: 'Train Tracker France',
      subtitle: 'Real-time train information',
      description: 'Schedules, delays and real-time information for 50 major French stations',
      searchPlaceholder: 'Search for a station...',
      popularRoutes: 'Popular routes',
      nextTrains: 'Next trains',
      liveUpdates: 'Live updates',
      disclaimer: 'Independent service not affiliated with SNCF'
    },
    
    // Stations
    stations: {
      departures: 'Departures',
      arrivals: 'Arrivals',
      nextTrain: 'Next train',
      platform: 'Platform',
      destination: 'Destination',
      origin: 'Origin',
      scheduledTime: 'Scheduled time',
      realTime: 'Real time',
      delay: 'Delay',
      onTime: 'On time',
      delayed: 'Delayed',
      cancelled: 'Cancelled',
      facilities: 'Facilities',
      connections: 'Connections'
    },
    
    // Journey
    journey: {
      title: 'Journey Planner',
      from: 'From',
      to: 'To',
      departure: 'Departure',
      arrival: 'Arrival',
      duration: 'Duration',
      transfers: 'Transfers',
      directTrain: 'Direct train',
      oneTransfer: '1 transfer',
      multipleTransfers: 'transfers',
      searchJourney: 'Search journey',
      noResults: 'No journeys found',
      loading: 'Searching...'
    },
    
    // Traffic
    traffic: {
      title: 'Traffic Information',
      currentDisruptions: 'Current disruptions',
      plannedWork: 'Planned work',
      normalTraffic: 'Normal traffic',
      minorDisruptions: 'Minor disruptions',
      majorDisruptions: 'Major disruptions',
      strikes: 'Strikes',
      weatherAlerts: 'Weather alerts'
    },
    
    // Time
    time: {
      now: 'Now',
      inMinutes: 'In {minutes} min',
      inHours: 'In {hours}h',
      immediate: 'Immediate',
      minutesDelay: '{minutes} min delay',
      hoursDelay: '{hours}h delay'
    },
    
    // Errors
    errors: {
      noData: 'No data available',
      networkError: 'Network error',
      stationNotFound: 'Station not found',
      searchError: 'Search error',
      tryAgain: 'Try again'
    },
    
    // Footer
    footer: {
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
      disclaimer: 'Independent service not affiliated with SNCF'
    },
    
    // SEO Metadata
    seo: {
      homeTitle: 'Train Tracker France - Real-time Train Schedules',
      homeDescription: 'Real-time schedules, delays and information for 50 major French stations. TGV, TER, Intercités, Eurostar.',
      stationTitle: '{station} - Schedules & Departures | Train Tracker France',
      stationDescription: 'Real-time schedules {station}: departures, arrivals, delays, platforms. Updated passenger information.',
      journeyTitle: 'Journey Planner | Train Tracker France',
      journeyDescription: 'Plan your train journey with real-time schedules. Find the best SNCF routes.',
      trafficTitle: 'SNCF Traffic Information | Train Tracker France',
      trafficDescription: 'Real-time disruptions, work and traffic information for the SNCF network.'
    }
  }
};

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;

/**
 * Obtient une traduction
 */
export function getTranslation(
  lang: Language,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback vers le français si la clé n'existe pas
      value = translations.fr;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Retourne la clé si aucune traduction n'est trouvée
        }
      }
      break;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Remplacement des paramètres
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}

/**
 * Détecte la langue à partir du pathname
 */
export function detectLanguage(pathname: string): Language {
  return pathname.startsWith('/en') ? 'en' : 'fr';
}

/**
 * Génère l'URL alternative pour le changement de langue
 */
export function getAlternateURL(pathname: string, currentLang: Language): string {
  if (currentLang === 'fr') {
    if (pathname === '/') return '/en';
    if (pathname.startsWith('/gare/')) {
      return pathname.replace('/gare/', '/en/station/');
    }
    return pathname === '/' ? '/en' : `/en${pathname}`;
  } else {
    if (pathname === '/en') return '/';
    if (pathname.startsWith('/en/station/')) {
      return pathname.replace('/en/station/', '/gare/');
    }
    return pathname.replace('/en', '') || '/';
  }
}