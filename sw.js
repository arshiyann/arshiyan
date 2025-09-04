// Service Worker for Arshiyan's Portfolio
const CACHE_NAME = 'arshiyan-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/stylesheet.css',
  '/css/bootstrap.min.css',
  '/js/bootstrap.min.js',
  '/images/pp2.jpg',
  '/images/Cisco_logo.png',
  '/images/ISRO.png',
  '/images/g8.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
