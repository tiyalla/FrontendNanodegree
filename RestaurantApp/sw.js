self.addEventListener('install', (event) => {
   event.waitUntil(
    caches.open('restaurant-review-v1').then( (cache) => {
       return cache.addAll([
        '/css/styles.css',
        'index.html',
        'restaurant.html',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
  	caches.open('restaurant-review-v1').then((cache) => {
  		caches.match(event.request).then(function(response) {
  			if (response) return response;
    	return fetch(event.request);
  		})
  	})
	);
});