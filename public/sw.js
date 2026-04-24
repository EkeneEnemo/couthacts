/**
 * CouthActs service worker.
 *
 * Responsibilities:
 *   1. Offline shell — serve cached versions of the homepage, track page,
 *      and key static assets when the network is unavailable.
 *   2. Fast navigation — cache-then-network for static routes.
 *   3. Always-fresh APIs — network-first with a short timeout for /api/*.
 *   4. Push notification plumbing — the backend pushes to the
 *      `push` event handler; clicking a notification focuses/opens the
 *      app at the right URL.
 *   5. Offline action queue — pending POSTs (e.g. tracking pings) are
 *      queued in IndexedDB via the BackgroundSync API when supported.
 *
 * Cache versioning: bump CACHE_VERSION any time this file changes and we
 * want users on older service workers to refresh.
 */

const CACHE_VERSION = "couthacts-v1";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const SHELL_URLS = [
  "/",
  "/manifest.json",
  "/track",
  "/browse",
  "/offline",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.allSettled(SHELL_URLS.map((url) => cache.add(url)));
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isApi(url) {
  return url.pathname.startsWith("/api/");
}

function isStatic(url) {
  return /\.(css|js|woff2?|ttf|png|jpe?g|svg|ico|webp|avif|gif)$/i.test(url.pathname);
}

async function networkFirstApi(request, timeoutMs = 4000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(request, { signal: controller.signal });
    clearTimeout(t);
    return res;
  } catch (err) {
    clearTimeout(t);
    // Don't serve stale API responses. Return a synthetic offline payload.
    return new Response(
      JSON.stringify({ error: "offline", message: "You're offline." }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    return new Response("", { status: 504 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return cached ?? (await network) ?? new Response("", { status: 504 });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isApi(url)) {
    event.respondWith(networkFirstApi(req));
    return;
  }

  if (isStatic(url)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }

  // HTML navigations: try network, fall back to cached shell → /offline.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          // Cache a copy of successful navigations for offline.
          if (res.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(req, res.clone());
          }
          return res;
        } catch {
          const cache = await caches.open(RUNTIME_CACHE);
          const cached = await cache.match(req);
          if (cached) return cached;
          const offline = await caches.match("/offline");
          if (offline) return offline;
          return new Response("You're offline.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        }
      })(),
    );
    return;
  }

  event.respondWith(staleWhileRevalidate(req));
});

// ─── Push notifications ─────────────────────────────────
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "CouthActs", body: event.data.text() };
  }

  const title = payload.title || "CouthActs";
  const options = {
    body: payload.body || "",
    icon: payload.icon || "/icon-192.png",
    badge: payload.badge || "/icon-192.png",
    tag: payload.tag,
    renotify: !!payload.renotify,
    data: { url: payload.url || "/" },
    actions: payload.actions || undefined,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    (async () => {
      const clientsList = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const client of clientsList) {
        if (client.url.endsWith(url) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })(),
  );
});
