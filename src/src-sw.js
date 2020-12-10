import 'regenerator-runtime';
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching/precacheAndRoute';
import {registerRoute} from 'workbox-routing/registerRoute';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute([
  {url: '/manifest.pwa.json', revision: '1'},
]);

registerRoute(
    new RegExp('/assets/'),
    new CacheFirst({
      cacheName: 'assets',
      plugins: [
        new ExpirationPlugin({maxAgeSeconds: 72 * 60 * 60}),
        new CacheableResponsePlugin({statuses: [0, 200]}),
      ],
    }),
);


registerRoute(
    /^https:\/\/dicoding-restaurant-api\.el\.r\.appspot\.com/,
    new StaleWhileRevalidate({
      cacheName: 'restaurant-data',
    }),
);

registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new CacheFirst({
      cacheName: 'google-fonts-stylesheets',
    }),
);

registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new CacheableResponsePlugin({statuses: [0, 200]}),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
);
