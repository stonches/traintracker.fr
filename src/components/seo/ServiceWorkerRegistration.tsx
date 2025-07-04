'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          console.log('SW registered with scope:', registration.scope);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content is available, ask user to refresh
                    if (confirm('Une nouvelle version est disponible. Recharger ?')) {
                      newWorker.postMessage({ type: 'SKIP_WAITING' });
                      window.location.reload();
                    }
                  }
                }
              });
            }
          });
          
          // Listen for service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SW_UPDATED') {
              // Handle SW update notification
              console.log('Service Worker updated');
            }
          });
          
        } catch (error) {
          console.error('SW registration failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  return null; // This component doesn't render anything
}