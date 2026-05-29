const CACHE_NAME = 'artaflow-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon-192.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// Fetch dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
