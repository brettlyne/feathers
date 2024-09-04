var GHPATH = "/feathers";
var APP_PREFIX = "feathers_";

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…).
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = "version_05";

// The files to make available for offline use. make sure to add
// others to this list
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,

  `${GHPATH}/assets/index-Co2z5do4.js`,
  `${GHPATH}/assets/index-rL9jIaf1.css`,
  `${GHPATH}/mushroom.png`,
  `${GHPATH}/cloud.png`,
  `${GHPATH}/coin.png`,
  `${GHPATH}/drop.png`,
  `${GHPATH}/feather.png`,
  `${GHPATH}/feather.svg`,
  `${GHPATH}/glow.png`,
  `${GHPATH}/moon.png`,
  `${GHPATH}/presets/preset-1.png`,
  `${GHPATH}/presets/preset-2.png`,
  `${GHPATH}/presets/preset-3.png`,
  `${GHPATH}/presets/preset-4.png`,
];
