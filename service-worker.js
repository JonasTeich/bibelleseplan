const cacheName = 'plan-v1'
const staticAssets = [
  './',
  './plan/index.html',
  './plan/plan.css',
  './plan/plan.js',
  './reading/index.html',
  './reading/reading.css',
  './reading/reading.js',
  './selectplan/index.html',
  './selectplan/selectplan.css',
  './selectplan/selectplan.js',
  './signin/index.html',
  './signin/signin.css',
  './signin/signin.js',
  './signup/index.html',
  './signup/signup.css',
  './signip/signup.js',
  './book-icon512x512.png',
  './de_schlachter.js',
  './Jakobus.png',
  './manifest.json'
]

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting() 
})

self.addEventListener('activate', e => {
  self.clients.claim()
})

self.addEventListener('fetch', async e => {
  const req = e.request
  const url = new URL(req.url)

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req))
  } else {
    e.respondWith(networkAndCache(req))
  }
})

async function cacheFirst(req) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  return cached || fetch(req)
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName)
  try {
    const fresh = await fetch(req)
    await cache.put(req, fresh.clone())
    return fresh
  } catch (e) {
    const cached = await cache.match(req)
    return cached
  }
}
