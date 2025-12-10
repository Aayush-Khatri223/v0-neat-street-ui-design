(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/map/live-route-map.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_1220c92d._.js",
  "static/chunks/_5bd7357e._.js",
  "static/chunks/node_modules_lucide-react_dist_esm_icons_c4cbc2aa._.js",
  {
    "path": "static/chunks/node_modules_leaflet_dist_leaflet_ef5f0413.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)"
    ]
  },
  "static/chunks/components_map_live-route-map_tsx_210399cd._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/map/live-route-map.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);