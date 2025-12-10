(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/hooks/use-route-simulation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRouteSimulation",
    ()=>useRouteSimulation
]);
/**
 * useRouteSimulation Hook
 * 
 * Custom hook for simulating real-time vehicle movement along a route.
 * Provides smooth animation of vehicle position updates.
 * 
 * Features:
 * - Configurable update interval
 * - Play/pause/reset controls
 * - Progress tracking
 * - Automatic stop detection
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$mock$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/mock-routes.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useRouteSimulation(routeData, options = {}) {
    _s();
    const { autoStart = false, updateInterval = 1000, speedMultiplier = 1 } = options;
    // State
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(autoStart);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useRouteSimulation.useState": ()=>{
            // Calculate initial progress based on current stop
            if (routeData.status === "completed") return 100;
            const currentIndex = routeData.vehicle.currentStopIndex;
            const totalStops = routeData.pickupPoints.length;
            return totalStops > 0 ? currentIndex / totalStops * 100 : 0;
        }
    }["useRouteSimulation.useState"]);
    const [vehicleState, setVehicleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(routeData.vehicle);
    // Refs for interval management
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(progress);
    // Keep progress ref in sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRouteSimulation.useEffect": ()=>{
            progressRef.current = progress;
        }
    }["useRouteSimulation.useEffect"], [
        progress
    ]);
    // Update vehicle state when progress changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRouteSimulation.useEffect": ()=>{
            const newVehicleState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$mock$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulateVehicleMovement"])(routeData, progress);
            setVehicleState(newVehicleState);
        }
    }["useRouteSimulation.useEffect"], [
        routeData,
        progress
    ]);
    // Clear interval on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRouteSimulation.useEffect": ()=>{
            return ({
                "useRouteSimulation.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["useRouteSimulation.useEffect"];
        }
    }["useRouteSimulation.useEffect"], []);
    // Handle simulation interval
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRouteSimulation.useEffect": ()=>{
            if (isSimulating && progress < 100) {
                intervalRef.current = setInterval({
                    "useRouteSimulation.useEffect": ()=>{
                        setProgress({
                            "useRouteSimulation.useEffect": (prev)=>{
                                const increment = 0.5 * speedMultiplier// Progress increment per tick
                                ;
                                const newProgress = Math.min(prev + increment, 100);
                                // Stop simulation when complete
                                if (newProgress >= 100) {
                                    setIsSimulating(false);
                                }
                                return newProgress;
                            }
                        }["useRouteSimulation.useEffect"]);
                    }
                }["useRouteSimulation.useEffect"], updateInterval);
            } else if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return ({
                "useRouteSimulation.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            })["useRouteSimulation.useEffect"];
        }
    }["useRouteSimulation.useEffect"], [
        isSimulating,
        progress,
        updateInterval,
        speedMultiplier
    ]);
    // Control functions
    const toggleSimulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRouteSimulation.useCallback[toggleSimulation]": ()=>{
            if (progress >= 100) {
                // Reset and start if completed
                setProgress(0);
                setIsSimulating(true);
            } else {
                setIsSimulating({
                    "useRouteSimulation.useCallback[toggleSimulation]": (prev)=>!prev
                }["useRouteSimulation.useCallback[toggleSimulation]"]);
            }
        }
    }["useRouteSimulation.useCallback[toggleSimulation]"], [
        progress
    ]);
    const startSimulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRouteSimulation.useCallback[startSimulation]": ()=>{
            if (progress >= 100) {
                setProgress(0);
            }
            setIsSimulating(true);
        }
    }["useRouteSimulation.useCallback[startSimulation]"], [
        progress
    ]);
    const pauseSimulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRouteSimulation.useCallback[pauseSimulation]": ()=>{
            setIsSimulating(false);
        }
    }["useRouteSimulation.useCallback[pauseSimulation]"], []);
    const resetSimulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRouteSimulation.useCallback[resetSimulation]": ()=>{
            setIsSimulating(false);
            setProgress(0);
            setVehicleState(routeData.vehicle);
        }
    }["useRouteSimulation.useCallback[resetSimulation]"], [
        routeData.vehicle
    ]);
    const setProgressManually = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRouteSimulation.useCallback[setProgressManually]": (newProgress)=>{
            setProgress(Math.max(0, Math.min(100, newProgress)));
        }
    }["useRouteSimulation.useCallback[setProgressManually]"], []);
    return {
        vehicleState,
        isSimulating,
        progress,
        toggleSimulation,
        startSimulation,
        pauseSimulation,
        resetSimulation,
        setProgress: setProgressManually
    };
}
_s(useRouteSimulation, "DEXnjtAZwknyuN13xgfIvLTsL0Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils/map-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map Utility Functions
 * 
 * Helper functions for map-related calculations and styling.
 * Used by the LiveRouteMap component.
 */ __turbopack_context__.s([
    "calculateBounds",
    ()=>calculateBounds,
    "calculateCenter",
    ()=>calculateCenter,
    "calculateDistance",
    ()=>calculateDistance,
    "calculateHeading",
    ()=>calculateHeading,
    "calculateProgress",
    ()=>calculateProgress,
    "formatDistance",
    ()=>formatDistance,
    "formatDuration",
    ()=>formatDuration,
    "formatSpeed",
    ()=>formatSpeed,
    "getStatusBgColor",
    ()=>getStatusBgColor,
    "getStatusColor",
    ()=>getStatusColor,
    "interpolatePosition",
    ()=>interpolatePosition
]);
function getStatusColor(status) {
    switch(status){
        case "completed":
            return "text-primary";
        case "in-progress":
        case "collecting":
            return "text-yellow-600";
        case "moving":
            return "text-secondary";
        case "pending":
        case "idle":
            return "text-muted-foreground";
        case "skipped":
            return "text-destructive";
        case "stopped":
            return "text-orange-500";
        default:
            return "text-muted-foreground";
    }
}
function getStatusBgColor(status) {
    switch(status){
        case "completed":
            return "bg-primary/20 text-primary";
        case "in-progress":
        case "collecting":
            return "bg-soft-yellow/40 text-yellow-700";
        case "moving":
            return "bg-secondary/20 text-secondary";
        case "pending":
        case "idle":
            return "bg-muted/50 text-muted-foreground";
        case "skipped":
            return "bg-destructive/20 text-destructive";
        case "stopped":
            return "bg-orange-100 text-orange-600";
        default:
            return "bg-muted/50 text-muted-foreground";
    }
}
function formatSpeed(speed) {
    if (speed === 0) return "Stopped";
    return `${Math.round(speed)} km/h`;
}
function calculateProgress(currentPosition, routePath) {
    if (routePath.length === 0) return 0;
    // Find the closest point on the route
    let minDistance = Infinity;
    let closestIndex = 0;
    for(let i = 0; i < routePath.length; i++){
        const distance = calculateDistance(currentPosition, routePath[i]);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }
    return closestIndex / (routePath.length - 1) * 100;
}
function calculateDistance(coord1, coord2) {
    const R = 6371 // Earth's radius in km
    ;
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
/**
 * Convert degrees to radians
 */ function toRad(deg) {
    return deg * (Math.PI / 180);
}
function calculateCenter(coordinates) {
    if (coordinates.length === 0) {
        return {
            lat: 0,
            lng: 0
        };
    }
    const sumLat = coordinates.reduce((acc, coord)=>acc + coord.lat, 0);
    const sumLng = coordinates.reduce((acc, coord)=>acc + coord.lng, 0);
    return {
        lat: sumLat / coordinates.length,
        lng: sumLng / coordinates.length
    };
}
function calculateBounds(coordinates) {
    if (coordinates.length === 0) {
        return {
            north: 0,
            south: 0,
            east: 0,
            west: 0
        };
    }
    return {
        north: Math.max(...coordinates.map((c)=>c.lat)),
        south: Math.min(...coordinates.map((c)=>c.lat)),
        east: Math.max(...coordinates.map((c)=>c.lng)),
        west: Math.min(...coordinates.map((c)=>c.lng))
    };
}
function interpolatePosition(start, end, progress// 0 to 1
) {
    return {
        lat: start.lat + (end.lat - start.lat) * progress,
        lng: start.lng + (end.lng - start.lng) * progress
    };
}
function calculateHeading(from, to) {
    const dLng = toRad(to.lng - from.lng);
    const lat1 = toRad(from.lat);
    const lat2 = toRad(to.lat);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    const heading = Math.atan2(y, x) * (180 / Math.PI);
    return (heading + 360) % 360;
}
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${Math.round(minutes)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (mins === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
}
function formatDistance(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/map/live-route-map.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveRouteMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * LiveRouteMap Component
 * 
 * A dynamic map component for visualizing waste collection vehicle routes.
 * Uses Leaflet + React-Leaflet for mapping functionality.
 * Now uses OSRM (OpenStreetMap Routing Machine) for real road-following routes.
 * 
 * Features:
 * - Real-time vehicle position tracking
 * - OSRM-powered route visualization (follows actual roads)
 * - Route polyline visualization
 * - Custom markers for vehicle and pickup points
 * - Responsive design for desktop and mobile
 * - Lazy loading for performance optimization
 * - Junction markers with nearest junction highlighting for selected houses
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$route$2d$simulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-route-simulation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/map-utils.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Define the main road network in the Bhaktapur area (roads that the truck follows)
// Based on actual DIAGONAL road visible in map: Kedarnath Temple → Yalachhen → Sunrise Bank
// The road runs from SOUTHWEST to NORTHEAST at approximately 45 degrees
const ROAD_NETWORK = [
    {
        id: 'road-main',
        name: 'Yalachhen Road (Diagonal)',
        path: [
            {
                lat: 27.6693,
                lng: 85.4252
            },
            {
                lat: 27.6695,
                lng: 85.4260
            },
            {
                lat: 27.6697,
                lng: 85.4270
            },
            {
                lat: 27.6699,
                lng: 85.4280
            },
            {
                lat: 27.6701,
                lng: 85.4290
            },
            {
                lat: 27.6703,
                lng: 85.4298
            },
            {
                lat: 27.6705,
                lng: 85.4305
            },
            {
                lat: 27.6707,
                lng: 85.4315
            },
            {
                lat: 27.6709,
                lng: 85.4325
            },
            {
                lat: 27.6711,
                lng: 85.4335
            },
            {
                lat: 27.6714,
                lng: 85.4350
            },
            {
                lat: 27.6716,
                lng: 85.4362
            },
            {
                lat: 27.6718,
                lng: 85.4375
            }
        ]
    }
];
// Combined road path for truck to follow (matching the DIAGONAL road geometry)
const TRUCK_ROAD_PATH = [
    {
        lat: 27.6693,
        lng: 85.4252
    },
    {
        lat: 27.6695,
        lng: 85.4260
    },
    {
        lat: 27.6697,
        lng: 85.4270
    },
    {
        lat: 27.6699,
        lng: 85.4280
    },
    {
        lat: 27.6701,
        lng: 85.4290
    },
    {
        lat: 27.6703,
        lng: 85.4298
    },
    {
        lat: 27.6705,
        lng: 85.4305
    },
    {
        lat: 27.6707,
        lng: 85.4315
    },
    {
        lat: 27.6709,
        lng: 85.4325
    },
    {
        lat: 27.6711,
        lng: 85.4335
    },
    {
        lat: 27.6714,
        lng: 85.4350
    },
    {
        lat: 27.6716,
        lng: 85.4362
    },
    {
        lat: 27.6718,
        lng: 85.4375
    }
];
// Define junctions on the road network (actual road intersections from the map)
const JUNCTIONS = [
    {
        id: 'junction-1',
        position: {
            lat: 27.6697,
            lng: 85.4270
        },
        name: 'Mul Chowk Junction'
    },
    {
        id: 'junction-2',
        position: {
            lat: 27.6701,
            lng: 85.4290
        },
        name: 'Yalachhen Junction'
    },
    {
        id: 'junction-3',
        position: {
            lat: 27.6705,
            lng: 85.4305
        },
        name: 'Central Collection Point',
        isCollectionPoint: true
    }
];
// 3 nearby houses that will bring waste to the collection junction
// Houses positioned NORTH of the diagonal road - residents walk south to the junction
const NEARBY_HOUSES = [
    {
        id: 'house-1',
        position: {
            lat: 27.6712,
            lng: 85.4300
        },
        address: 'House #12, Yalachhe Chochhen',
        expectedWaste: 15
    },
    {
        id: 'house-2',
        position: {
            lat: 27.6715,
            lng: 85.4315
        },
        address: 'House #45, Lalachi Road',
        expectedWaste: 22
    },
    {
        id: 'house-3',
        position: {
            lat: 27.6720,
            lng: 85.4325
        },
        address: 'House #8, Near Sunrise Bank',
        expectedWaste: 18
    }
];
// The single collection junction where truck collects waste from all houses
const COLLECTION_JUNCTION = JUNCTIONS.find((j)=>j.isCollectionPoint) || JUNCTIONS[1];
// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(coord1, coord2) {
    const R = 6371 // Earth's radius in km
    ;
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000 // Return distance in meters
    ;
}
// Calculate total waste from nearby houses
function getTotalWasteFromHouses() {
    return NEARBY_HOUSES.reduce((sum, house)=>sum + house.expectedWaste, 0);
}
// Generate walking path from house to collection junction (residents walk to bring waste)
function generateWalkingPath(housePosition, junctionPosition) {
    // Create an L-shaped walking path from house to junction
    const midPoint = {
        lat: housePosition.lat,
        lng: junctionPosition.lng
    };
    return [
        housePosition,
        midPoint,
        junctionPosition
    ];
}
;
// Dynamically import map components to prevent SSR issues with Leaflet
const MapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.MapContainer), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = MapContainer;
const TileLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.TileLayer), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = TileLayer;
const Polyline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.Polyline), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c2 = Polyline;
const Marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.Marker), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c3 = Marker;
const Popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.Popup), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c4 = Popup;
const Tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.Tooltip), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-leaflet/lib/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c5 = Tooltip;
// Custom hook for vehicle marker icon
function useVehicleIcon() {
    _s();
    const [icon, setIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVehicleIcon.useEffect": ()=>{
            // Import Leaflet on client side only
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "useVehicleIcon.useEffect": (L)=>{
                    const vehicleIcon = L.divIcon({
                        className: "vehicle-marker",
                        html: `
          <div class="vehicle-marker-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <path d="M15 18H9"/>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="2"/>
            </svg>
          </div>
        `,
                        iconSize: [
                            48,
                            48
                        ],
                        iconAnchor: [
                            24,
                            24
                        ]
                    });
                    setIcon(vehicleIcon);
                }
            }["useVehicleIcon.useEffect"]);
        }
    }["useVehicleIcon.useEffect"], []);
    return icon;
}
_s(useVehicleIcon, "oNshnm1pgavwlIYm4chxBCV/Xsw=");
// Custom hook for pickup point icon based on status
function usePickupIcon(status) {
    _s1();
    const [icon, setIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePickupIcon.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "usePickupIcon.useEffect": (L)=>{
                    const colorClass = status === "completed" ? "pickup-completed" : status === "in-progress" ? "pickup-in-progress" : "pickup-pending";
                    const pickupIcon = L.divIcon({
                        className: `pickup-marker ${colorClass}`,
                        html: `
          <div class="pickup-marker-inner">
            <span class="pickup-dot"></span>
          </div>
        `,
                        iconSize: [
                            24,
                            24
                        ],
                        iconAnchor: [
                            12,
                            12
                        ]
                    });
                    setIcon(pickupIcon);
                }
            }["usePickupIcon.useEffect"]);
        }
    }["usePickupIcon.useEffect"], [
        status
    ]);
    return icon;
}
_s1(usePickupIcon, "oNshnm1pgavwlIYm4chxBCV/Xsw=");
// Custom hook for selected house icon (houses picked for junction analysis)
function useSelectedHouseIcon() {
    _s2();
    const [icon, setIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSelectedHouseIcon.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "useSelectedHouseIcon.useEffect": (L)=>{
                    const houseIcon = L.divIcon({
                        className: "selected-house-marker",
                        html: `
          <div class="selected-house-marker-inner" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5); border: 3px solid white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        `,
                        iconSize: [
                            32,
                            32
                        ],
                        iconAnchor: [
                            16,
                            16
                        ]
                    });
                    setIcon(houseIcon);
                }
            }["useSelectedHouseIcon.useEffect"]);
        }
    }["useSelectedHouseIcon.useEffect"], []);
    return icon;
}
_s2(useSelectedHouseIcon, "oNshnm1pgavwlIYm4chxBCV/Xsw=");
// Custom hook for junction icon
function useJunctionIcon(isNearest = false) {
    _s3();
    const [icon, setIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useJunctionIcon.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript, async loader)").then({
                "useJunctionIcon.useEffect": (L)=>{
                    const junctionIcon = L.divIcon({
                        className: isNearest ? "nearest-junction-marker" : "junction-marker",
                        html: isNearest ? `
            <div class="nearest-junction-marker-inner" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 8px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.6); border: 3px solid white; animation: pulse 2s infinite;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="1" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="1" y1="12" x2="5" y2="12"></line>
                <line x1="19" y1="12" x2="23" y2="12"></line>
              </svg>
            </div>
          ` : `
            <div class="junction-marker-inner" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(139, 92, 246, 0.4); border: 2px solid white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="1" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="1" y1="12" x2="5" y2="12"></line>
                <line x1="19" y1="12" x2="23" y2="12"></line>
              </svg>
            </div>
          `,
                        iconSize: isNearest ? [
                            36,
                            36
                        ] : [
                            28,
                            28
                        ],
                        iconAnchor: isNearest ? [
                            18,
                            18
                        ] : [
                            14,
                            14
                        ]
                    });
                    setIcon(junctionIcon);
                }
            }["useJunctionIcon.useEffect"]);
        }
    }["useJunctionIcon.useEffect"], [
        isNearest
    ]);
    return icon;
}
_s3(useJunctionIcon, "oNshnm1pgavwlIYm4chxBCV/Xsw=");
function LiveRouteMap({ routeData, onClose, autoSimulate = true, simulationSpeed = 1000 }) {
    _s4();
    const [isMapReady, setIsMapReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Use route simulation hook for real-time updates
    const { vehicleState, isSimulating, progress, toggleSimulation, resetSimulation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$route$2d$simulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteSimulation"])(routeData, {
        autoStart: autoSimulate && routeData.status === "active",
        updateInterval: simulationSpeed
    });
    // Get custom icons
    const vehicleIcon = useVehicleIcon();
    // Convert coordinates for Leaflet (lat, lng tuple format)
    const routePathCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[routePathCoords]": ()=>routeData.routePath.map({
                "LiveRouteMap.useMemo[routePathCoords]": (coord)=>[
                        coord.lat,
                        coord.lng
                    ]
            }["LiveRouteMap.useMemo[routePathCoords]"])
    }["LiveRouteMap.useMemo[routePathCoords]"], [
        routeData.routePath
    ]);
    // Completed path (vehicle has traveled)
    const completedPathCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[completedPathCoords]": ()=>{
            const totalPoints = routeData.routePath.length;
            const completedIndex = Math.floor(progress / 100 * totalPoints);
            return routeData.routePath.slice(0, completedIndex + 1).map({
                "LiveRouteMap.useMemo[completedPathCoords]": (coord)=>[
                        coord.lat,
                        coord.lng
                    ]
            }["LiveRouteMap.useMemo[completedPathCoords]"]);
        }
    }["LiveRouteMap.useMemo[completedPathCoords]"], [
        routeData.routePath,
        progress
    ]);
    // Calculate map center
    const mapCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[mapCenter]": ()=>{
            const path = routeData.routePath;
            if (path.length === 0) return [
                27.6721,
                85.4279
            ]; // Default to Bhaktapur, Nepal
            const sumLat = path.reduce({
                "LiveRouteMap.useMemo[mapCenter].sumLat": (acc, coord)=>acc + coord.lat
            }["LiveRouteMap.useMemo[mapCenter].sumLat"], 0);
            const sumLng = path.reduce({
                "LiveRouteMap.useMemo[mapCenter].sumLng": (acc, coord)=>acc + coord.lng
            }["LiveRouteMap.useMemo[mapCenter].sumLng"], 0);
            return [
                sumLat / path.length,
                sumLng / path.length
            ];
        }
    }["LiveRouteMap.useMemo[mapCenter]"], [
        routeData.routePath
    ]);
    // Handle map load
    const handleMapReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveRouteMap.useCallback[handleMapReady]": ()=>{
            setIsMapReady(true);
        }
    }["LiveRouteMap.useCallback[handleMapReady]"], []);
    // Status info for display
    const statusInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[statusInfo]": ()=>({
                completed: routeData.pickupPoints.filter({
                    "LiveRouteMap.useMemo[statusInfo]": (p)=>p.status === "completed"
                }["LiveRouteMap.useMemo[statusInfo]"]).length,
                inProgress: routeData.pickupPoints.filter({
                    "LiveRouteMap.useMemo[statusInfo]": (p)=>p.status === "in-progress"
                }["LiveRouteMap.useMemo[statusInfo]"]).length,
                pending: routeData.pickupPoints.filter({
                    "LiveRouteMap.useMemo[statusInfo]": (p)=>p.status === "pending"
                }["LiveRouteMap.useMemo[statusInfo]"]).length,
                total: routeData.pickupPoints.length
            })
    }["LiveRouteMap.useMemo[statusInfo]"], [
        routeData.pickupPoints
    ]);
    // Calculate walking distances from each house to the collection junction
    const houseWalkingInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[houseWalkingInfo]": ()=>{
            return NEARBY_HOUSES.map({
                "LiveRouteMap.useMemo[houseWalkingInfo]": (house)=>({
                        house,
                        distance: Math.round(calculateDistance(house.position, COLLECTION_JUNCTION.position)),
                        walkingPath: generateWalkingPath(house.position, COLLECTION_JUNCTION.position)
                    })
            }["LiveRouteMap.useMemo[houseWalkingInfo]"]);
        }
    }["LiveRouteMap.useMemo[houseWalkingInfo]"], []);
    // Total waste collected at the junction
    const totalWasteAtJunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[totalWasteAtJunction]": ()=>getTotalWasteFromHouses()
    }["LiveRouteMap.useMemo[totalWasteAtJunction]"], []);
    // Truck road path coordinates for the map
    const truckRoadPathCoords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveRouteMap.useMemo[truckRoadPathCoords]": ()=>TRUCK_ROAD_PATH.map({
                "LiveRouteMap.useMemo[truckRoadPathCoords]": (coord)=>[
                        coord.lat,
                        coord.lng
                    ]
            }["LiveRouteMap.useMemo[truckRoadPathCoords]"])
    }["LiveRouteMap.useMemo[truckRoadPathCoords]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                        className: "text-primary",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-foreground",
                                        children: vehicleState.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-0.5 rounded-full text-xs font-semibold ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusBgColor"])(vehicleState.status)}`,
                                        children: vehicleState.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                        className: "text-muted-foreground",
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-muted-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSpeed"])(vehicleState.speed)
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            routeData.status === "active" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: toggleSimulation,
                                        className: "gap-2",
                                        children: [
                                            isSimulating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 428,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 428,
                                                columnNumber: 55
                                            }, this),
                                            isSimulating ? "Pause" : "Resume"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: resetSimulation,
                                        className: "gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, this),
                                            "Reset"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 431,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: onClose,
                                children: "Close Map"
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-muted/30 rounded-full h-2 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-primary h-full rounded-full transition-all duration-300 ease-out",
                    style: {
                        width: `${progress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 452,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "eco-card overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-[400px] sm:h-[500px] lg:h-[600px]",
                    children: [
                        !isMapReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center bg-muted/20 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "animate-spin text-primary mx-auto mb-2",
                                        size: 32
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 464,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "Loading map..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 465,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 462,
                            columnNumber: 13
                        }, this),
                        ("TURBOPACK compile-time value", "object") !== "undefined" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapContainer, {
                            center: mapCenter,
                            zoom: 14,
                            scrollWheelZoom: true,
                            className: "w-full h-full rounded-lg z-0",
                            ref: mapRef,
                            whenReady: handleMapReady,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TileLayer, {
                                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 480,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polyline, {
                                    positions: routePathCoords,
                                    pathOptions: {
                                        color: "#94a3b8",
                                        weight: 4,
                                        opacity: 0.5,
                                        dashArray: "8, 8"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 486,
                                    columnNumber: 15
                                }, this),
                                completedPathCoords.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polyline, {
                                    positions: completedPathCoords,
                                    pathOptions: {
                                        color: "oklch(0.62 0.22 142)",
                                        weight: 5,
                                        opacity: 0.9
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 498,
                                    columnNumber: 17
                                }, this),
                                routeData.pickupPoints.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PickupPointMarker, {
                                        point: point
                                    }, point.id, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 510,
                                        columnNumber: 17
                                    }, this)),
                                vehicleIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
                                    position: [
                                        vehicleState.position.lat,
                                        vehicleState.position.lng
                                    ],
                                    icon: vehicleIcon,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Popup, {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 min-w-[180px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-foreground mb-2 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                size: 16,
                                                                className: "text-primary"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 25
                                                            }, this),
                                                            vehicleState.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground",
                                                                children: [
                                                                    "Status: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-foreground",
                                                                        children: vehicleState.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground",
                                                                children: [
                                                                    "Speed: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-foreground",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSpeed"])(vehicleState.speed)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                                        lineNumber: 530,
                                                                        columnNumber: 34
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground",
                                                                children: [
                                                                    "Current Stop: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-foreground",
                                                                        children: [
                                                                            "#",
                                                                            vehicleState.currentStopIndex + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                                        lineNumber: 533,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 532,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 520,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 519,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                                            direction: "top",
                                            offset: [
                                                0,
                                                -20
                                            ],
                                            permanent: false,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: vehicleState.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 539,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 538,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 515,
                                    columnNumber: 17
                                }, this),
                                JUNCTIONS.map((junction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(JunctionMarker, {
                                        junction: junction,
                                        isNearest: junction.id === COLLECTION_JUNCTION.id
                                    }, junction.id, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 546,
                                        columnNumber: 17
                                    }, this)),
                                NEARBY_HOUSES.map((house)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NearbyHouseMarker, {
                                        house: house
                                    }, house.id, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 555,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polyline, {
                                    positions: truckRoadPathCoords,
                                    pathOptions: {
                                        color: "#374151",
                                        weight: 6,
                                        opacity: 0.8
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 559,
                                    columnNumber: 15
                                }, this),
                                houseWalkingInfo.map((info)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polyline, {
                                        positions: info.walkingPath.map((coord)=>[
                                                coord.lat,
                                                coord.lng
                                            ]),
                                        pathOptions: {
                                            color: "#3b82f6",
                                            weight: 2,
                                            opacity: 0.7,
                                            dashArray: "6, 4"
                                        }
                                    }, `walk-${info.house.id}`, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 570,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 471,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 460,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "eco-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-foreground mb-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "text-primary",
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this),
                            "Map Legend"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                            className: "text-white",
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 595,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 594,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Nearby House"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 597,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                            className: "text-white",
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 601,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Junction"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 599,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                            className: "text-white",
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 606,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Collection Point"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 609,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 605,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-1 bg-gray-700 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 612,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Truck Road"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 613,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 611,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-1 border-t-2 border-dashed border-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 616,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Walking Path"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 617,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 592,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "eco-card p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-foreground mb-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                className: "text-amber-500",
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 625,
                                columnNumber: 11
                            }, this),
                            "Waste Collection Junction"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 624,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-4 rounded-lg bg-white/80 border border-amber-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 631,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold text-foreground",
                                                children: COLLECTION_JUNCTION.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 634,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: [
                                                    "Truck stops here - residents bring waste from ",
                                                    NEARBY_HOUSES.length,
                                                    " houses"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 635,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 633,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 629,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-amber-600",
                                        children: [
                                            totalWasteAtJunction,
                                            " kg"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "total waste collected"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 640,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mt-1",
                                        children: [
                                            "from ",
                                            NEARBY_HOUSES.length,
                                            " houses"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 641,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 638,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 623,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "eco-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-foreground mb-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                className: "text-blue-500",
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 649,
                                columnNumber: 11
                            }, this),
                            "Houses Bringing Waste to Collection Point"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 648,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mb-3",
                        children: "Residents from these 3 nearby houses walk to the collection junction to deposit their waste. The truck collects from all houses at once without going to each house individually."
                    }, void 0, false, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 652,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: houseWalkingInfo.map((info, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold",
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 663,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-foreground",
                                                        children: info.house.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: [
                                                            "Expected waste: ",
                                                            info.house.expectedWaste,
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 666,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold text-blue-600",
                                                        children: [
                                                            info.distance,
                                                            "m"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "walking distance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/map/live-route-map.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 676,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, info.house.id, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 647,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "eco-card p-4 bg-gradient-to-br from-white to-primary/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "text-primary",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 689,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-muted-foreground uppercase",
                                        children: "Completed"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 690,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 688,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-foreground",
                                children: statusInfo.completed
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 692,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 687,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "eco-card p-4 bg-gradient-to-br from-white to-soft-yellow/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "text-yellow-600",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 697,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-muted-foreground uppercase",
                                        children: "In Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 698,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 696,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-foreground",
                                children: statusInfo.inProgress
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 700,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 695,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "eco-card p-4 bg-gradient-to-br from-white to-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        className: "text-muted-foreground",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 705,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-muted-foreground uppercase",
                                        children: "Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 706,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 704,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-foreground",
                                children: statusInfo.pending
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 708,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "eco-card p-4 bg-gradient-to-br from-white to-secondary/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "text-secondary",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 713,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-muted-foreground uppercase",
                                        children: "Total Stops"
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 714,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 712,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-foreground",
                                children: statusInfo.total
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 716,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 686,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "eco-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-foreground mb-3 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "text-primary",
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 723,
                                columnNumber: 11
                            }, this),
                            "Pickup Points"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 722,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-[200px] overflow-y-auto",
                        children: routeData.pickupPoints.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center justify-between p-3 rounded-lg transition-colors ${point.status === "in-progress" ? "bg-soft-yellow/30 border border-yellow-300" : point.status === "completed" ? "bg-primary/5 border border-primary/20" : "bg-muted/20 border border-transparent"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${point.status === "completed" ? "bg-primary text-white" : point.status === "in-progress" ? "bg-yellow-500 text-white" : "bg-muted text-muted-foreground"}`,
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 739,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-foreground",
                                                        children: point.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 749,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 751,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: point.scheduledTime
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 753,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    point.expectedWaste,
                                                                    " kg"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                                lineNumber: 754,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/map/live-route-map.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/map/live-route-map.tsx",
                                                lineNumber: 748,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 738,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2 py-1 rounded-full text-xs font-semibold ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusBgColor"])(point.status)}`,
                                        children: point.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/map/live-route-map.tsx",
                                        lineNumber: 758,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, point.id, true, {
                                fileName: "[project]/components/map/live-route-map.tsx",
                                lineNumber: 728,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/map/live-route-map.tsx",
                        lineNumber: 726,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 721,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/live-route-map.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
_s4(LiveRouteMap, "7wrEbaPNEmMt7mHfxpwcspFuPJI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$route$2d$simulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteSimulation"],
        useVehicleIcon
    ];
});
_c6 = LiveRouteMap;
/**
 * PickupPointMarker - Individual pickup point marker component
 */ function PickupPointMarker({ point }) {
    _s5();
    const icon = usePickupIcon(point.status);
    if (!icon) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
        position: [
            point.position.lat,
            point.position.lng
        ],
        icon: icon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Popup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2 min-w-[160px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-semibold text-foreground mb-2",
                            children: [
                                "Stop #",
                                point.order
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 784,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: point.address
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 786,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 788,
                                            columnNumber: 15
                                        }, this),
                                        point.scheduledTime
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 787,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Expected: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: [
                                                point.expectedWaste,
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 792,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 791,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `font-medium ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$map$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusColor"])(point.status)}`,
                                    children: point.status.charAt(0).toUpperCase() + point.status.slice(1)
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 794,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 785,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 783,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 782,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                direction: "top",
                offset: [
                    0,
                    -10
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "#",
                        point.order,
                        " - ",
                        point.address
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 801,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 800,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/live-route-map.tsx",
        lineNumber: 778,
        columnNumber: 5
    }, this);
}
_s5(PickupPointMarker, "CeXlCsU0rNC7mAZ4XR+vha2shQM=", false, function() {
    return [
        usePickupIcon
    ];
});
_c7 = PickupPointMarker;
/**
 * JunctionMarker - Junction point marker component
 */ function JunctionMarker({ junction, isNearest }) {
    _s6();
    const icon = useJunctionIcon(isNearest);
    if (!icon) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
        position: [
            junction.position.lat,
            junction.position.lng
        ],
        icon: icon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Popup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2 min-w-[180px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-semibold text-foreground mb-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `w-3 h-3 rounded-sm ${isNearest ? 'bg-amber-500' : 'bg-purple-500'}`
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 823,
                                    columnNumber: 13
                                }, this),
                                junction.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 822,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1 text-sm",
                            children: [
                                isNearest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-amber-600 font-medium",
                                    children: "🚛 Waste Collection Point"
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 828,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Type: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: isNearest ? 'Collection Junction' : 'Junction'
                                        }, void 0, false, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 833,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 832,
                                    columnNumber: 13
                                }, this),
                                isNearest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Total Waste: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: [
                                                getTotalWasteFromHouses(),
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 837,
                                            columnNumber: 30
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 836,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 826,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 821,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 820,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                direction: "top",
                offset: [
                    0,
                    -10
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        isNearest ? '🚛 ' : '',
                        junction.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 844,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 843,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/live-route-map.tsx",
        lineNumber: 816,
        columnNumber: 5
    }, this);
}
_s6(JunctionMarker, "dF/sJJu/yMfrLF0ziv8Bap1d90U=", false, function() {
    return [
        useJunctionIcon
    ];
});
_c8 = JunctionMarker;
/**
 * NearbyHouseMarker - House marker for houses bringing waste to collection junction
 */ function NearbyHouseMarker({ house }) {
    _s7();
    const icon = useSelectedHouseIcon();
    if (!icon) return null;
    const distanceToJunction = Math.round(calculateDistance(house.position, COLLECTION_JUNCTION.position));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marker, {
        position: [
            house.position.lat,
            house.position.lng
        ],
        icon: icon,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Popup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-2 min-w-[180px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-semibold text-foreground mb-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-3 h-3 rounded-full bg-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 868,
                                    columnNumber: 13
                                }, this),
                                "Nearby House"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 867,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground font-medium",
                                    children: house.address
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 872,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Expected Waste: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: [
                                                house.expectedWaste,
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 874,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 873,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Walk to Junction: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: [
                                                distanceToJunction,
                                                "m"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/map/live-route-map.tsx",
                                            lineNumber: 877,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 876,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-blue-600 text-xs",
                                    children: "→ Residents walk to collection point"
                                }, void 0, false, {
                                    fileName: "[project]/components/map/live-route-map.tsx",
                                    lineNumber: 879,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/map/live-route-map.tsx",
                            lineNumber: 871,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 866,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 865,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tooltip, {
                direction: "top",
                offset: [
                    0,
                    -10
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "🏠 ",
                        house.address
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/map/live-route-map.tsx",
                    lineNumber: 886,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/map/live-route-map.tsx",
                lineNumber: 885,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/live-route-map.tsx",
        lineNumber: 861,
        columnNumber: 5
    }, this);
}
_s7(NearbyHouseMarker, "D0Qc5HF5T9SzSxgZR01hv26wkzY=", false, function() {
    return [
        useSelectedHouseIcon
    ];
});
_c9 = NearbyHouseMarker;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "MapContainer");
__turbopack_context__.k.register(_c1, "TileLayer");
__turbopack_context__.k.register(_c2, "Polyline");
__turbopack_context__.k.register(_c3, "Marker");
__turbopack_context__.k.register(_c4, "Popup");
__turbopack_context__.k.register(_c5, "Tooltip");
__turbopack_context__.k.register(_c6, "LiveRouteMap");
__turbopack_context__.k.register(_c7, "PickupPointMarker");
__turbopack_context__.k.register(_c8, "JunctionMarker");
__turbopack_context__.k.register(_c9, "NearbyHouseMarker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/map/live-route-map.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/map/live-route-map.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_0a07aede._.js.map