'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [GA_MEASUREMENT_ID]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    // Track page views
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [pathname, GA_MEASUREMENT_ID]);

  return null;
}

// Helper functions for tracking custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackStationView = (stationName: string, stationId: string) => {
  trackEvent('station_view', {
    station_name: stationName,
    station_id: stationId,
  });
};

export const trackNextTrainCheck = (stationName: string, timeToTrain: number, trainType: string) => {
  trackEvent('next_train_check', {
    station_name: stationName,
    time_to_train: timeToTrain,
    train_service: trainType,
  });
};

export const trackJourneyPlanned = (origin: string, destination: string, travelTime: number) => {
  trackEvent('journey_planned', {
    origin: origin,
    destination: destination,
    travel_time: travelTime,
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};