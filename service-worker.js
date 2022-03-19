/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-3426163';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./dracula_002.html","./dracula_005.html","./dracula_006.html","./dracula_007.html","./dracula_008.html","./dracula_009.html","./dracula_010.html","./dracula_011.html","./dracula_012.html","./dracula_013.html","./dracula_014.html","./dracula_015.html","./dracula_016.html","./dracula_017.html","./dracula_018.html","./dracula_019.html","./dracula_020.html","./dracula_021.html","./dracula_022.html","./dracula_023.html","./dracula_024.html","./dracula_025.html","./dracula_026.html","./dracula_027.html","./dracula_028.html","./dracula_029.html","./dracula_030.html","./dracula_031.html","./dracula_032.html","./dracula_033.html","./dracula_034.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_dracula_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
