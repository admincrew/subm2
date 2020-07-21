const CACHE_NAME = "liganotify-apps-v1.0.0.0.34";
let urlsToCache = [
    "/",
    "manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/team.html",
    "/pages/liga.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/sw-regis.js",
    "/js/show.js",
    "/js/idb.js",
    "/img/logo.png",
    "/img/slider/1.jpg",
    "/img/slider/2.jpg",
    "/img/slider/3.jpg",
    "/img/slider/4.jpg",
    "/img/slider/5.jpg",
    "/img/icon/36x36.png",
    "/img/icon/48x48.png",
    "/img/icon/72x72.png",
    "/img/icon/96x96.png",
    "/img/icon/144x144.png",
    "/img/icon/192x192.png",
    "/img/icon/512x512.png",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});