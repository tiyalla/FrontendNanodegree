const CACHE_NAME = 'restaurant-cache-v32';
let cacheFiles = [
    './',
    './index.html',
    './restaurant.html',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './img/1.jpg',
    './img/10.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
]

// Cache all the app assets
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installed');

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
        .catch(err => {
            console.log('[ServiceWorker] Error caching files' + err);
        })
    );
});

// Clearing old cache
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            // Loop over all the cache names
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant') && cacheName != CACHE_NAME;
                }).map(function(cacheName) {
                    // Delete caches that do not match CACHE_NAME
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Return the cached assets if there is a cache available
self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] Fetching', e.request.url);
    e.respondWith(
        // Check in cache whether requested url already exists
        caches.match(e.request)
        .then(function(response) {
            // If response is in the cache
            if (response) {
                console.log('[ServiceWorker] Found in cache', e.request.url);
                // Return the cached version
                return response;
            }
            // If not found in the cache, when fetched first time cache as well
            var requestClone = e.request.clone();

            return fetch(requestClone)
            .then(function(response) {
                // If no response
                if(!response) {
                    console.log('[ServiceWorker] No response from fetch');
                    return response;
                }
                // If response, clone response
                var responseClone = response.clone();
                // Open the cache again
                return caches.open(CACHE_NAME)
                .then(function(cache) {
                    // Put request and response clone into cache
                    cache.put(e.request, responseClone);
                    // Return this response
                    return response;
                })
                .catch(function(err) {
                    console.log('[ServiceWorker] Error Fetching and Caching new files');
                })
            })
        })
    )
});
