const CACHE_NAME = 'traintracker-v1';
const STATIC_CACHE_NAME = 'traintracker-static-v1';
const DYNAMIC_CACHE_NAME = 'traintracker-dynamic-v1';

// Resources to cache on install
const STATIC_ASSETS = [
  '/',
  '/en',
  '/offline',
  '/manifest.json',
  // Add your critical CSS and JS files here
];

// API endpoints to cache with different strategies
const API_CACHE_PATTERNS = [
  { pattern: /\/api\/stations/, strategy: 'cacheFirst', ttl: 24 * 60 * 60 * 1000 }, // 24 hours
  { pattern: /\/api\/departures/, strategy: 'networkFirst', ttl: 30 * 1000 }, // 30 seconds
  { pattern: /\/api\/strikes/, strategy: 'networkFirst', ttl: 5 * 60 * 1000 }, // 5 minutes
  { pattern: /\/api\/disruptions/, strategy: 'networkFirst', ttl: 5 * 60 * 1000 }, // 5 minutes
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME &&
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    // API requests
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleApiRequest(request));
      return;
    }

    // Page requests
    if (request.headers.get('accept')?.includes('text/html')) {
      event.respondWith(handlePageRequest(request));
      return;
    }

    // Static assets
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle API requests with appropriate caching strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  // Find matching cache pattern
  const cachePattern = API_CACHE_PATTERNS.find(pattern => 
    pattern.pattern.test(url.pathname)
  );

  if (!cachePattern) {
    // No cache pattern, just fetch
    return fetch(request);
  }

  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cacheKey = request.url;

  if (cachePattern.strategy === 'cacheFirst') {
    return cacheFirst(request, cache, cacheKey, cachePattern.ttl);
  } else if (cachePattern.strategy === 'networkFirst') {
    return networkFirst(request, cache, cacheKey, cachePattern.ttl);
  }

  return fetch(request);
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first for pages
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // If network fails, try cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache, return offline page
    const offlineResponse = await cache.match('/offline');
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Fallback response
    return new Response('Offline - Train Tracker France', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Handle static asset requests
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  
  // Try cache first for static assets
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Failed to fetch static asset:', request.url);
    throw error;
  }
}

// Cache first strategy with TTL
async function cacheFirst(request, cache, cacheKey, ttl) {
  const cachedResponse = await cache.match(cacheKey);
  
  if (cachedResponse) {
    const cachedTime = cachedResponse.headers.get('sw-cached-time');
    if (cachedTime && Date.now() - parseInt(cachedTime) < ttl) {
      return cachedResponse;
    }
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseToCache = response.clone();
      responseToCache.headers.set('sw-cached-time', Date.now().toString());
      cache.put(cacheKey, responseToCache);
    }
    return response;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network first strategy with TTL
async function networkFirst(request, cache, cacheKey, ttl) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseToCache = response.clone();
      responseToCache.headers.set('sw-cached-time', Date.now().toString());
      cache.put(cacheKey, responseToCache);
    }
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse) {
      const cachedTime = cachedResponse.headers.get('sw-cached-time');
      if (!cachedTime || Date.now() - parseInt(cachedTime) < ttl * 10) { // Allow stale cache for 10x TTL
        return cachedResponse;
      }
    }
    
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'search-sync') {
    event.waitUntil(handleSearchSync());
  }
});

async function handleSearchSync() {
  // Handle background sync for searches when back online
  try {
    const searches = await getOfflineSearches();
    for (const search of searches) {
      await syncSearch(search);
    }
    await clearOfflineSearches();
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    body: 'Nouvelles informations de transport disponibles',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'transport-update',
    renotify: true,
    actions: [
      {
        action: 'view',
        title: 'Voir les détails',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Ignorer',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Train Tracker France', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Helper functions for IndexedDB operations
async function getOfflineSearches() {
  // In a real implementation, this would use IndexedDB
  return [];
}

async function syncSearch(search) {
  // Sync offline search when back online
  console.log('[SW] Syncing search:', search);
}

async function clearOfflineSearches() {
  // Clear synced searches from IndexedDB
  console.log('[SW] Clearing offline searches');
}
