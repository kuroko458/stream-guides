self.addEventListener("install", e => {
    console.log("Service Worker Installed");
});

self.addEventListener("fetch", e => {
    // offline support basic cache can be added later
});o