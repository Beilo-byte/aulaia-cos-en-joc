const CACHE = 'aulaia-cos-en-joc-v10';
const ASSETS = [
  './?v=10',
  './index.html?v=10',
  './styles.css?v=10',
  './layout.css?v=10',
  './app.js?v=10',
  './manifest.webmanifest',
  './credits.html?v=10',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './characters/nen.webp',
  './characters/nena.webp',
  './characters/adolescent.webp',
  './characters/home.webp',
  './characters/dona.webp',
  './characters/muscles/nen.webp',
  './characters/muscles/nena.webp',
  './characters/muscles/adolescent.webp',
  './characters/muscles/home.webp',
  './characters/muscles/dona.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('aulaia-cos-en-joc-') && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then(response => {
      if (!response.ok) return response;
      return caches.open(CACHE).then(cache => cache.put(event.request, response.clone())).then(() => response).catch(() => response);
    }).catch(() => caches.match(event.request).then(cached => cached || (event.request.mode === 'navigate' ? caches.match('./index.html?v=10') : Response.error())))
  );
});
