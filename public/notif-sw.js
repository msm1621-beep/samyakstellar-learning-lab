// Notification-only service worker (no caching, no offline app shell).
// Required because Android Chrome forbids `new Notification()` and only allows
// notifications shown via a ServiceWorkerRegistration.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const url = (event.notification.data && event.notification.data.url) || '/';
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of allClients) {
        if ('focus' in client) {
          await client.focus();
          if ('navigate' in client) {
            try {
              await client.navigate(url);
            } catch (e) {
              /* ignore */
            }
          }
          return;
        }
      }
      if (self.clients.openWindow) await self.clients.openWindow(url);
    })(),
  );
});
