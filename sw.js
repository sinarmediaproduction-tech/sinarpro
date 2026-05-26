const CACHE_NAME = 'artaflow-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Tahap Install: Simpan semua aset statis ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Menyimpan aset ke dalam cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Tahap Aktivasi: Bersihkan cache lama jika ada pembaruan versi
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Tahap Fetch: Gunakan aset dari cache saat offline
self.addEventListener('fetch', event => {
  // Biarkan request API Google Sheets langsung menembus jaringan (tidak dicache)
  if (event.request.url.includes('script.google.com')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Jika ada di cache pakai cache, jika tidak ambil dari internet
      return cachedResponse || fetch(event.request);
    })
  );
});
