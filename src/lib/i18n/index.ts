export const defaultLocale = 'fr';
export const locales = ['fr', 'en'] as const;

export type Locale = typeof locales[number];

export const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.search': 'Recherche',
    'nav.journey': 'Itinéraire',
    'nav.stations': 'Toutes les gares',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Homepage
    'home.title': 'Train Tracker France - Horaires de Trains en Temps Réel',
    'home.description': 'Consultez les horaires et départs de trains en temps réel pour toutes les gares françaises. TGV, TER, Intercités - Informations officielles SNCF mises à jour en direct.',
    'home.hero.title': 'Train Tracker France',
    'home.hero.subtitle': 'Horaires et départs de trains en temps réel pour toutes les gares françaises',
    'home.hero.realtime': 'Temps réel',
    'home.hero.stations': '3000+ gares',
    'home.hero.services': 'TGV, TER, Intercités',
    
    // Search
    'search.title': 'Recherchez votre gare',
    'search.subtitle': 'Trouvez les horaires en temps réel pour plus de 3000 gares françaises',
    'search.placeholder': 'Recherchez une gare (ex: Paris, Lyon, Marseille...)',
    'search.button': 'Rechercher',
    'search.quickAccess': 'Accès rapide',
    
    // Station Page
    'station.nextTrain': 'Prochain Train',
    'station.realTimeDepartures': 'Départs en Temps Réel',
    'station.stationInfo': 'Informations de la gare',
    'station.about': 'À propos de la gare de',
    'station.faq': 'Questions fréquentes',
    'station.direction': 'Itinéraire',
    
    // Train Status
    'train.onTime': 'À l\'heure',
    'train.delayed': 'Retardé',
    'train.cancelled': 'Supprimé',
    'train.unknown': 'Statut inconnu',
    'train.platform': 'Voie',
    'train.destination': 'Destination',
    'train.departure': 'Départ',
    'train.nextIn': 'dans',
    'train.atPlatform': 'À quai',
    
    // Journey Planner
    'journey.title': 'Planificateur d\'Itinéraire',
    'journey.from': 'Départ',
    'journey.to': 'Arrivée',
    'journey.date': 'Date',
    'journey.time': 'Heure',
    'journey.search': 'Rechercher',
    'journey.results': 'Résultats',
    'journey.duration': 'Durée',
    'journey.transfers': 'Correspondances',
    
    // Features
    'features.title': 'Pourquoi choisir Train Tracker France ?',
    'features.subtitle': 'La plateforme la plus complète et la plus fiable pour suivre les trains français',
    'features.realtime.title': 'Temps réel',
    'features.realtime.description': 'Horaires actualisés toutes les 30 secondes avec les dernières informations SNCF',
    'features.coverage.title': '3000+ gares',
    'features.coverage.description': 'Couverture complète du réseau ferroviaire français, des grandes gares aux stations rurales',
    'features.mobile.title': 'Mobile-first',
    'features.mobile.description': 'Interface optimisée pour mobile avec notifications push et mode hors ligne',
    
    // Footer
    'footer.description': 'La plateforme de référence pour consulter les horaires de trains français en temps réel.',
    'footer.services': 'Services',
    'footer.information': 'Information',
    'footer.contact': 'Contact',
    'footer.support': 'Support 24/7',
    'footer.disclaimer': 'Train Tracker France est un service indépendant et n\'est PAS affilié à la SNCF, au gouvernement français ou à toute autorité de transport officielle.',
    
    // Legal
    'legal.privacy': 'Politique de confidentialité',
    'legal.terms': 'Conditions d\'utilisation',
    'legal.cookies': 'Cookies',
    'legal.sitemap': 'Plan du site',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.retry': 'Réessayer',
    'common.update': 'Actualiser',
    'common.more': 'Voir plus',
    'common.close': 'Fermer',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.journey': 'Journey',
    'nav.stations': 'All Stations',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Homepage
    'home.title': 'Train Tracker France - Real-Time French Train Schedules',
    'home.description': 'Check real-time train schedules and departures for all French stations. TGV, TER, Intercités - Official SNCF information updated live.',
    'home.hero.title': 'Train Tracker France',
    'home.hero.subtitle': 'Real-time train schedules and departures for all French stations',
    'home.hero.realtime': 'Real-time',
    'home.hero.stations': '3000+ stations',
    'home.hero.services': 'TGV, TER, Intercités',
    
    // Search
    'search.title': 'Search for your station',
    'search.subtitle': 'Find real-time schedules for over 3000 French stations',
    'search.placeholder': 'Search for a station (e.g. Paris, Lyon, Marseille...)',
    'search.button': 'Search',
    'search.quickAccess': 'Quick access',
    
    // Station Page
    'station.nextTrain': 'Next Train',
    'station.realTimeDepartures': 'Real-Time Departures',
    'station.stationInfo': 'Station Information',
    'station.about': 'About',
    'station.faq': 'Frequently Asked Questions',
    'station.direction': 'Directions',
    
    // Train Status
    'train.onTime': 'On time',
    'train.delayed': 'Delayed',
    'train.cancelled': 'Cancelled',
    'train.unknown': 'Unknown status',
    'train.platform': 'Platform',
    'train.destination': 'Destination',
    'train.departure': 'Departure',
    'train.nextIn': 'in',
    'train.atPlatform': 'At platform',
    
    // Journey Planner
    'journey.title': 'Journey Planner',
    'journey.from': 'From',
    'journey.to': 'To',
    'journey.date': 'Date',
    'journey.time': 'Time',
    'journey.search': 'Search',
    'journey.results': 'Results',
    'journey.duration': 'Duration',
    'journey.transfers': 'Transfers',
    
    // Features
    'features.title': 'Why choose Train Tracker France?',
    'features.subtitle': 'The most comprehensive and reliable platform for tracking French trains',
    'features.realtime.title': 'Real-time',
    'features.realtime.description': 'Schedules updated every 30 seconds with the latest SNCF information',
    'features.coverage.title': '3000+ stations',
    'features.coverage.description': 'Complete coverage of the French railway network, from major stations to rural stops',
    'features.mobile.title': 'Mobile-first',
    'features.mobile.description': 'Mobile-optimized interface with push notifications and offline mode',
    
    // Footer
    'footer.description': 'The reference platform for checking French train schedules in real-time.',
    'footer.services': 'Services',
    'footer.information': 'Information',
    'footer.contact': 'Contact',
    'footer.support': '24/7 Support',
    'footer.disclaimer': 'Train Tracker France is an independent service and is NOT affiliated with SNCF, the French government, or any official transport authority.',
    
    // Legal
    'legal.privacy': 'Privacy Policy',
    'legal.terms': 'Terms of Service',
    'legal.cookies': 'Cookies',
    'legal.sitemap': 'Sitemap',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.update': 'Update',
    'common.more': 'See more',
    'common.close': 'Close',
  },
};

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return pathname;
  }
  
  const cleanPath = removeLocaleFromPath(pathname);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function useTranslation(locale: Locale) {
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value = translations[locale] as any;
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    },
    locale,
  };
}