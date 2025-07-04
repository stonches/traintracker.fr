export const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      stations: "Gares",
      strikes: "Grèves",
      journey: "Itinéraire",
      regional: "Transports régionaux",
      about: "À propos",
      contact: "Contact",
      privacy: "Confidentialité",
      terms: "Conditions"
    },
    // Homepage
    home: {
      title: "Train Tracker France",
      tagline: "Suivez vos trains en France en temps réel",
      strikeAlert: "Alerte grève",
      noStrikesToday: "Aucune grève prévue aujourd'hui",
      currentStrikes: "Grèves en cours",
      liveDelays: "Retards en direct",
      searchPlaceholder: "Rechercher une gare...",
      popularStations: "Gares populaires",
      recentDisruptions: "Perturbations récentes"
    },
    // Station details
    station: {
      departures: "Départs",
      arrivals: "Arrivées",
      platform: "Voie",
      destination: "Destination",
      time: "Heure",
      delay: "Retard",
      onTime: "À l'heure",
      cancelled: "Annulé",
      delayed: "Retardé",
      minutes: "min",
      updated: "Mis à jour",
      noData: "Aucune donnée disponible"
    },
    // Strikes
    strikes: {
      title: "Grèves SNCF",
      current: "Grèves actuelles",
      upcoming: "Grèves à venir",
      impact: "Impact",
      affected: "Lignes affectées",
      severity: "Gravité",
      high: "Élevée",
      medium: "Moyenne",
      low: "Faible",
      duration: "Durée",
      alternatives: "Alternatives"
    },
    // Journey planner
    journey: {
      title: "Planificateur d'itinéraire",
      from: "De",
      to: "Vers",
      departure: "Départ",
      arrival: "Arrivée",
      search: "Rechercher",
      results: "Résultats",
      duration: "Durée",
      changes: "Correspondances",
      price: "Prix",
      book: "Réserver"
    },
    // Regional transport
    regional: {
      title: "Transports régionaux",
      ter: "TER",
      transilien: "Transilien",
      buses: "Bus régionaux",
      disruptions: "Perturbations",
      schedules: "Horaires"
    },
    // Common
    common: {
      loading: "Chargement...",
      error: "Erreur",
      retry: "Réessayer",
      close: "Fermer",
      more: "Plus",
      less: "Moins",
      search: "Rechercher",
      clear: "Effacer",
      submit: "Valider",
      cancel: "Annuler"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      stations: "Stations",
      strikes: "Strikes",
      journey: "Journey",
      regional: "Regional Transport",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms"
    },
    // Homepage
    home: {
      title: "Train Tracker France",
      tagline: "Track your trains across France in real-time",
      strikeAlert: "Strike Alert",
      noStrikesToday: "No strikes scheduled today",
      currentStrikes: "Current strikes",
      liveDelays: "Live delays",
      searchPlaceholder: "Search for a station...",
      popularStations: "Popular stations",
      recentDisruptions: "Recent disruptions"
    },
    // Station details
    station: {
      departures: "Departures",
      arrivals: "Arrivals",
      platform: "Platform",
      destination: "Destination",
      time: "Time",
      delay: "Delay",
      onTime: "On time",
      cancelled: "Cancelled",
      delayed: "Delayed",
      minutes: "min",
      updated: "Updated",
      noData: "No data available"
    },
    // Strikes
    strikes: {
      title: "SNCF Strikes",
      current: "Current strikes",
      upcoming: "Upcoming strikes",
      impact: "Impact",
      affected: "Affected lines",
      severity: "Severity",
      high: "High",
      medium: "Medium",
      low: "Low",
      duration: "Duration",
      alternatives: "Alternatives"
    },
    // Journey planner
    journey: {
      title: "Journey Planner",
      from: "From",
      to: "To",
      departure: "Departure",
      arrival: "Arrival",
      search: "Search",
      results: "Results",
      duration: "Duration",
      changes: "Changes",
      price: "Price",
      book: "Book"
    },
    // Regional transport
    regional: {
      title: "Regional Transport",
      ter: "TER",
      transilien: "Transilien",
      buses: "Regional buses",
      disruptions: "Disruptions",
      schedules: "Schedules"
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      close: "Close",
      more: "More",
      less: "Less",
      search: "Search",
      clear: "Clear",
      submit: "Submit",
      cancel: "Cancel"
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['fr'];