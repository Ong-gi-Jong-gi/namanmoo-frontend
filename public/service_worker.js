self.addEventListener('push', function (event) {
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        }),
      );
    }),
  );
});
