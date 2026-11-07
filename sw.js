/* Dumont — Service Worker (Cache Storage API, 100% offline) */
const VERSAO = 'dumont-v1';
const ARQUIVOS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSAO);
    /* allSettled: um arquivo ausente não impede a instalação do restante */
    await Promise.allSettled(
      ARQUIVOS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const chaves = await caches.keys();
    await Promise.all(
      chaves
        .filter((k) => k.startsWith('dumont-') && k !== VERSAO)
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* Estratégia: cache primeiro, atualizando em segundo plano (stale-while-revalidate). */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSAO);
    const emCache = await cache.match(req, { ignoreSearch: true });

    const rede = fetch(req)
      .then((res) => {
        if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
        return res;
      })
      .catch(() => null);

    if (emCache) {
      event.waitUntil(rede);
      return emCache;
    }

    const res = await rede;
    if (res) return res;

    if (req.mode === 'navigate') {
      const inicio = (await cache.match('index.html')) || (await cache.match('./'));
      if (inicio) return inicio;
    }
    return new Response('Sem conexão e recurso não disponível em cache.', {
      status: 503,
      statusText: 'Offline',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  })());
});
