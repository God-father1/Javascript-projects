const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/icon.png",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/signin.html",
  "/assets/87.jpg",
  "/assets/spagheti.jpg",
  "/assets/burger.jpg",
  "/assets/Sausages.jpg",
  "/assets/laksa.jpg",
  "/assets/mushroom.jpeg",
  "/assets/singapore-noodles.jpg",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/css/style.css",
  "/assets/css/fontawesome.min.css",
  "/assets/css/brands.min.css",
  "/assets/webfonts/fa-brands-400.eot",
  "/assets/webfonts/fa-brands-400.svg",
  "/assets/webfonts/fa-brands-400.ttf",
  "/assets/webfonts/fa-brands-400.woff",
  "/assets/webfonts/fa-brands-400.woff2",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/js/nav.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("service Worker has been installed");
      return cache.addAll(urlsToCache);
    })
  );
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

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log(response.url);
          return response;
        }

        console.log(event.request.url);
        return fetch(event.request);
      })
  );
});
