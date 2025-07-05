declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track station searches
export const trackStationSearch = (stationName: string, language: string) => {
  event('station_search', 'engagement', `${stationName} (${language})`);
};

// Track journey planner usage
export const trackJourneySearch = (from: string, to: string, language: string) => {
  event('journey_search', 'engagement', `${from} -> ${to} (${language})`);
};

// Track language switching
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  event('language_switch', 'engagement', `${fromLang} -> ${toLang}`);
};

// Track departure board views
export const trackDepartureView = (stationName: string, language: string) => {
  event('departure_view', 'engagement', `${stationName} (${language})`);
};

// Track traffic info views
export const trackTrafficView = (language: string) => {
  event('traffic_view', 'engagement', language);
};