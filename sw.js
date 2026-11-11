// Offline support. Network first, so an online visit always gets the newest files (and refreshes the copy kept
// here); the kept copy is only used when the network is unreachable. The page itself adds its scripts to the
// cache after loading (see index.html), so script ?v= numbers never need to be repeated in this file.
"use strict";
const CACHE = "turk";
const SHELL = ["./", "manifest.webmanifest", "fonts/Gaegu-Regular.woff2", "fonts/Gaegu-Bold.woff2",
               "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("./") : Response.error())))
  );
});
