// Minimal Service Worker to enable PWA Install Prompt
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Pass through all requests
  e.respondWith(fetch(e.request));
});