const CACHE = 'aulaia-cos-en-joc-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './credits.html',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './characters/nen.webp',
  './characters/nena.webp',
  './characters/adolescent.webp',
  './characters/home.webp',
  './characters/dona.webp'
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
    }).catch(() => caches.match(event.request).then(cached => cached || (event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
