/* Auntie Angel service worker.
 *
 * The build step replaces __VERSION__ and __PRECACHE__ with a hash and the
 * list of files emitted into `out/`. The precache is intentionally the app
 * shell (HTML, JS, CSS, fonts, icons) — not the PDFs, which are several
 * megabytes each and are saved per subject only when the learner asks.
 */

const VERSION = '__VERSION__';
const PRECACHE = `auntie-angel-precache-${VERSION}`;
const DOWNLOADS = 'auntie-angel-downloads-v1';
const PRECACHE_URLS = __PRECACHE__;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      // One failed URL must not prevent the rest of the shell from installing.
      await Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' }))),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('auntie-angel-precache-') && key !== PRECACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

async function networkFirstNavigation(request) {
  const cache = await caches.open(PRECACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      // Keep the latest HTML for this route, even if it was not in the build.
      cache.put(request, response.clone()).catch(() => {});
      return response;
    }
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    return response;
  } catch {
    const cached =
      (await caches.match(request, { ignoreSearch: true })) ||
      (await caches.match('/offline/')) ||
      (await caches.match('/'));
    if (cached) return cached;

    return new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body style="font-family:system-ui;background:#fbf7f0;color:#18241f;padding:2rem"><h1>You are offline</h1><p>Auntie Angel could not open this page. Return to a page you saved, or reconnect and try again.</p><p><a href="/">Go to the dashboard</a></p></body>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(PRECACHE);
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    // If the network fails, try again across all caches (including per-subject downloads).
    const fallback = await caches.match(request);
    if (fallback) return fallback;
    throw new Error('offline');
  }
}

async function pdfOrDownload(request) {
  // The explicit "Save offline" action puts a full response in DOWNLOADS.
  // When online, still prefer the network so a newly saved file is fresh.
  try {
    const response = await fetch(request);
    if (response.ok) return response;
  } catch {
    /* fall through to the saved copy */
  }
  const cached = await caches.match(request);
  if (cached) return cached;
  return new Response('This paper is not saved on this device.', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (url.pathname.toLowerCase().endsWith('.pdf')) {
    event.respondWith(pdfOrDownload(request));
    return;
  }

  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/og.png' ||
    url.pathname === '/sw.js'
  ) {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
