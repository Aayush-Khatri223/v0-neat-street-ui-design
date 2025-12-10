"use client"

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
 */

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  MapPin, 
  Clock, 
  Navigation, 
  Pause, 
  Play, 
  RotateCcw,
  CheckCircle,
  Circle,
  Loader2,
  Home,
  GitBranch
} from "lucide-react"
import type { RouteMapData, VehicleState, PickupPoint, Coordinate } from "@/lib/types/route-map"
import { useRouteSimulation } from "@/lib/hooks/use-route-simulation"
import { 
  getStatusColor, 
  getStatusBgColor,
  formatSpeed,
  calculateProgress 
} from "@/lib/utils/map-utils"
import { getFullRouteFromOSRM } from "@/lib/utils/routing-utils"

// Define the main road network in the Bhaktapur area (roads that the truck follows)
// These are waypoints for OSRM to generate the actual road-following route
// Route from Jagati through the area, passing by collection junctions for houses
const ROUTE_WAYPOINTS: Coordinate[] = [
  { lat: 27.6705, lng: 85.4450 },  // Start: Jagati area
  { lat: 27.6710, lng: 85.4420 },  // Waypoint: Along Jagati road
  { lat: 27.6715, lng: 85.4380 },  // Waypoint: First house cluster junction
  { lat: 27.6720, lng: 85.4340 },  // Waypoint: Second house cluster junction  
  { lat: 27.6725, lng: 85.4300 },  // End: Third house cluster junction
]

// 3 nearby houses - each cluster near different junctions along the route
// Residents walk from these houses to the nearest junction on the road
const NEARBY_HOUSES: { id: string; position: Coordinate; address: string; expectedWaste: number }[] = [
  { 
    id: 'house-1', 
    position: { lat: 27.6720, lng: 85.4375 }, // House 1 - near first junction
    address: 'House #12, Yalachhe Chochhen',
    expectedWaste: 15
  },
  { 
    id: 'house-2', 
    position: { lat: 27.6725, lng: 85.4335 }, // House 2 - near second junction
    address: 'House #45, Lalachi Road',
    expectedWaste: 22
  },
  { 
    id: 'house-3', 
    position: { lat: 27.6730, lng: 85.4295 }, // House 3 - near third junction
    address: 'House #8, Near Sunrise Bank',
    expectedWaste: 18
  },
]

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371 // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c * 1000 // Return distance in meters
}

// Calculate total waste from nearby houses
function getTotalWasteFromHouses(): number {
  return NEARBY_HOUSES.reduce((sum, house) => sum + house.expectedWaste, 0)
}

// Find the nearest point on a route path for a given position
function findNearestPointOnRoute(position: Coordinate, routePath: Coordinate[]): { point: Coordinate; distance: number; index: number } {
  let nearestPoint = routePath[0]
  let minDistance = calculateDistance(position, routePath[0])
  let nearestIndex = 0
  
  for (let i = 0; i < routePath.length; i++) {
    const distance = calculateDistance(position, routePath[i])
    if (distance < minDistance) {
      minDistance = distance
      nearestPoint = routePath[i]
      nearestIndex = i
    }
  }
  
  return { point: nearestPoint, distance: minDistance, index: nearestIndex }
}

// Find the single best collection point that minimizes total walking distance for all houses
function findBestCollectionPoint(houses: typeof NEARBY_HOUSES, routePath: Coordinate[]): { point: Coordinate; index: number } {
  if (routePath.length === 0) {
    return { point: { lat: 27.6705, lng: 85.4305 }, index: 0 }
  }
  
  let bestPoint = routePath[0]
  let bestIndex = 0
  let minTotalDistance = Infinity
  
  // Check every point on the route to find the one that minimizes total walking distance
  for (let i = 0; i < routePath.length; i++) {
    let totalDistance = 0
    for (const house of houses) {
      totalDistance += calculateDistance(house.position, routePath[i])
    }
    if (totalDistance < minTotalDistance) {
      minTotalDistance = totalDistance
      bestPoint = routePath[i]
      bestIndex = i
    }
  }
  
  return { point: bestPoint, index: bestIndex }
}

// Import Leaflet CSS - required for proper map rendering
import "leaflet/dist/leaflet.css"

// Dynamically import map components to prevent SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
)

// Custom hook for vehicle marker icon
function useVehicleIcon() {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    // Import Leaflet on client side only
    import("leaflet").then((L) => {
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
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      })
      setIcon(vehicleIcon)
    })
  }, [])

  return icon
}

// Custom hook for pickup point icon based on status
function usePickupIcon(status: PickupPoint["status"]) {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    import("leaflet").then((L) => {
      const colorClass = status === "completed" 
        ? "pickup-completed" 
        : status === "in-progress" 
          ? "pickup-in-progress" 
          : "pickup-pending"
      
      const pickupIcon = L.divIcon({
        className: `pickup-marker ${colorClass}`,
        html: `
          <div class="pickup-marker-inner">
            <span class="pickup-dot"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
      setIcon(pickupIcon)
    })
  }, [status])

  return icon
}

// Custom hook for selected house icon (houses picked for junction analysis)
function useSelectedHouseIcon() {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    import("leaflet").then((L) => {
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
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })
      setIcon(houseIcon)
    })
  }, [])

  return icon
}

// Custom hook for junction icon
function useJunctionIcon(isNearest: boolean = false) {
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    import("leaflet").then((L) => {
      const junctionIcon = L.divIcon({
        className: isNearest ? "nearest-junction-marker" : "junction-marker",
        html: isNearest 
          ? `
            <div class="nearest-junction-marker-inner" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 8px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.6); border: 3px solid white; animation: pulse 2s infinite;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="1" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="1" y1="12" x2="5" y2="12"></line>
                <line x1="19" y1="12" x2="23" y2="12"></line>
              </svg>
            </div>
          `
          : `
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
        iconSize: isNearest ? [36, 36] : [28, 28],
        iconAnchor: isNearest ? [18, 18] : [14, 14],
      })
      setIcon(junctionIcon)
    })
  }, [isNearest])

  return icon
}

interface LiveRouteMapProps {
  routeData: RouteMapData
  onClose?: () => void
  autoSimulate?: boolean
  simulationSpeed?: number
}

// Junction type for dynamically generated junctions on the route
interface Junction {
  id: string
  position: Coordinate
  name: string
  isCollectionPoint?: boolean
}

// House with its nearest junction info
interface HouseJunctionInfo {
  house: typeof NEARBY_HOUSES[0]
  nearestJunction: Junction
  distance: number
  walkingPath: Coordinate[]
}

/**
 * LiveRouteMap - Main map component for vehicle route visualization
 */
export default function LiveRouteMap({ 
  routeData, 
  onClose,
  autoSimulate = true,
  simulationSpeed = 1000
}: LiveRouteMapProps) {
  const [isMapReady, setIsMapReady] = useState(false)
  const mapRef = useRef<any>(null)
  
  // OSRM Route state - fetched from OpenStreetMap Routing Machine
  const [osrmTruckRoute, setOsrmTruckRoute] = useState<Coordinate[]>([])
  const [isLoadingRoute, setIsLoadingRoute] = useState(true)
  const [routeError, setRouteError] = useState<string | null>(null)
  
  // Animation state for truck following OSRM route
  const [truckPosition, setTruckPosition] = useState<Coordinate>(ROUTE_WAYPOINTS[0])
  const [routeProgress, setRouteProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch OSRM route on component mount
  useEffect(() => {
    const fetchOSRMRoute = async () => {
      setIsLoadingRoute(true)
      setRouteError(null)
      
      try {
        // Get route from OSRM that follows actual roads
        const route = await getFullRouteFromOSRM(ROUTE_WAYPOINTS)
        setOsrmTruckRoute(route)
        if (route.length > 0) {
          setTruckPosition(route[0])
        }
        console.log(`OSRM returned ${route.length} points for truck route`)
      } catch (error) {
        console.error('Failed to fetch OSRM route:', error)
        setRouteError('Failed to load road route, using fallback')
        // Fallback to waypoints if OSRM fails
        setOsrmTruckRoute(ROUTE_WAYPOINTS)
        setTruckPosition(ROUTE_WAYPOINTS[0])
      } finally {
        setIsLoadingRoute(false)
      }
    }
    
    fetchOSRMRoute()
  }, [])

  // Find the nearest junction on the OSRM route for EACH house
  // Returns an array of junctions, one for each house
  const houseJunctions = useMemo((): Junction[] => {
    if (osrmTruckRoute.length === 0) return []
    
    const junctions: Junction[] = []
    
    NEARBY_HOUSES.forEach((house, index) => {
      let nearestPoint = osrmTruckRoute[0]
      let minDistance = Infinity
      
      // Find the nearest point on the route for this house
      for (let i = 0; i < osrmTruckRoute.length; i++) {
        const distance = calculateDistance(house.position, osrmTruckRoute[i])
        if (distance < minDistance) {
          minDistance = distance
          nearestPoint = osrmTruckRoute[i]
        }
      }
      
      junctions.push({
        id: `junction-${index + 1}`,
        position: nearestPoint,
        name: `Junction ${index + 1} (${house.address.split(',')[0]})`,
        isCollectionPoint: true
      })
    })
    
    return junctions
  }, [osrmTruckRoute])

  // Calculate each house's walking distance to its nearest junction
  const houseJunctionInfo = useMemo((): HouseJunctionInfo[] => {
    if (houseJunctions.length === 0) return []
    
    return NEARBY_HOUSES.map((house, index) => {
      const junction = houseJunctions[index]
      const distance = calculateDistance(house.position, junction.position)
      
      // Generate L-shaped walking path from house to its nearest junction
      const walkingPath: Coordinate[] = [
        house.position,
        { lat: house.position.lat, lng: junction.position.lng },
        junction.position
      ]
      
      return {
        house,
        nearestJunction: junction,
        distance: Math.round(distance),
        walkingPath
      }
    })
  }, [houseJunctions])

  // Animate truck along OSRM route
  useEffect(() => {
    if (!isAnimating || osrmTruckRoute.length === 0) return
    
    const animateStep = () => {
      setRouteProgress(prev => {
        const newProgress = prev + 0.5 // 0.5% per step
        if (newProgress >= 100) {
          setIsAnimating(false)
          return 100
        }
        
        // Calculate position along route
        const pointIndex = Math.floor((newProgress / 100) * (osrmTruckRoute.length - 1))
        const clampedIndex = Math.min(pointIndex, osrmTruckRoute.length - 1)
        setTruckPosition(osrmTruckRoute[clampedIndex])
        
        return newProgress
      })
    }
    
    animationRef.current = setInterval(animateStep, simulationSpeed / 10)
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isAnimating, osrmTruckRoute, simulationSpeed])

  // Start animation when route loads
  useEffect(() => {
    if (!isLoadingRoute && osrmTruckRoute.length > 0 && autoSimulate) {
      setIsAnimating(true)
    }
  }, [isLoadingRoute, osrmTruckRoute, autoSimulate])

  // Use route simulation hook for real-time updates (legacy - keeping for pickup points)
  const {
    vehicleState,
    isSimulating,
    progress,
    toggleSimulation,
    resetSimulation
  } = useRouteSimulation(routeData, {
    autoStart: false, // We handle animation ourselves now
    updateInterval: simulationSpeed,
  })

  // Toggle animation
  const handleToggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false)
    } else {
      if (routeProgress >= 100) {
        setRouteProgress(0)
        if (osrmTruckRoute.length > 0) {
          setTruckPosition(osrmTruckRoute[0])
        }
      }
      setIsAnimating(true)
    }
  }

  // Reset animation
  const handleResetAnimation = () => {
    setIsAnimating(false)
    setRouteProgress(0)
    if (osrmTruckRoute.length > 0) {
      setTruckPosition(osrmTruckRoute[0])
    }
  }

  // Get custom icons
  const vehicleIcon = useVehicleIcon()

  // Calculate map center
  const mapCenter = useMemo(() => {
    const path = routeData.routePath
    if (path.length === 0) return [27.6721, 85.4279] as [number, number] // Default to Bhaktapur, Nepal
    
    const sumLat = path.reduce((acc, coord) => acc + coord.lat, 0)
    const sumLng = path.reduce((acc, coord) => acc + coord.lng, 0)
    return [sumLat / path.length, sumLng / path.length] as [number, number]
  }, [routeData.routePath])

  // Handle map load
  const handleMapReady = useCallback(() => {
    setIsMapReady(true)
  }, [])

  // Status info for display
  const statusInfo = useMemo(() => ({
    completed: routeData.pickupPoints.filter(p => p.status === "completed").length,
    inProgress: routeData.pickupPoints.filter(p => p.status === "in-progress").length,
    pending: routeData.pickupPoints.filter(p => p.status === "pending").length,
    total: routeData.pickupPoints.length,
  }), [routeData.pickupPoints])

  // Total waste collected at the junction
  const totalWasteAtJunction = useMemo(() => getTotalWasteFromHouses(), [])

  // Truck road path coordinates for the map - uses OSRM route when available
  const truckRoadPathCoords = useMemo(() => {
    const routeToUse = osrmTruckRoute.length > 0 ? osrmTruckRoute : ROUTE_WAYPOINTS
    return routeToUse.map(coord => [coord.lat, coord.lng] as [number, number])
  }, [osrmTruckRoute])

  // Completed path (truck has traveled) - based on our animation progress
  const completedPathCoords = useMemo(() => {
    const routeToUse = osrmTruckRoute.length > 0 ? osrmTruckRoute : ROUTE_WAYPOINTS
    const completedIndex = Math.floor((routeProgress / 100) * routeToUse.length)
    return routeToUse
      .slice(0, completedIndex + 1)
      .map(coord => [coord.lat, coord.lng] as [number, number])
  }, [osrmTruckRoute, routeProgress])

  return (
    <div className="w-full space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <Truck className="text-primary" size={16} />
            <span className="text-sm font-medium text-foreground">
              Waste Collection Truck
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isAnimating ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {isAnimating ? 'Moving' : routeProgress >= 100 ? 'Completed' : 'Stopped'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
            <Navigation className="text-muted-foreground" size={14} />
            <span className="text-sm text-muted-foreground">
              {Math.round(routeProgress)}% complete
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleAnimation}
            className="gap-2"
            disabled={isLoadingRoute}
          >
            {isAnimating ? <Pause size={14} /> : <Play size={14} />}
            {isAnimating ? "Pause" : "Resume"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetAnimation}
            className="gap-2"
            disabled={isLoadingRoute}
          >
            <RotateCcw size={14} />
            Reset
          </Button>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close Map
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${routeProgress}%` }}
        />
      </div>

      {/* Map Container */}
      <Card className="eco-card overflow-hidden">
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          {(!isMapReady || isLoadingRoute) && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
              <div className="text-center">
                <Loader2 className="animate-spin text-primary mx-auto mb-2" size={32} />
                <p className="text-sm text-muted-foreground">
                  {isLoadingRoute ? 'Loading road route from OSRM...' : 'Loading map...'}
                </p>
              </div>
            </div>
          )}
          
          {routeError && (
            <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md">
              {routeError}
            </div>
          )}
          
          {typeof window !== "undefined" && (
            <MapContainer
              center={mapCenter}
              zoom={14}
              scrollWheelZoom={true}
              className="w-full h-full rounded-lg z-0"
              ref={mapRef}
              whenReady={handleMapReady}
            >
              {/* OpenStreetMap Tiles (free, no API key needed) */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Full Route Path (gray/light) - OSRM route that follows actual roads */}
              <Polyline
                positions={truckRoadPathCoords}
                pathOptions={{
                  color: "#94a3b8",
                  weight: 6,
                  opacity: 0.7,
                }}
              />

              {/* Completed Route Path (primary color) - where truck has traveled */}
              {completedPathCoords.length > 1 && (
                <Polyline
                  positions={completedPathCoords}
                  pathOptions={{
                    color: "oklch(0.62 0.22 142)",
                    weight: 6,
                    opacity: 0.9,
                  }}
                />
              )}

              {/* Pickup Point Markers */}
              {routeData.pickupPoints.map((point) => (
                <PickupPointMarker key={point.id} point={point} />
              ))}

              {/* Vehicle Marker - animated along OSRM route */}
              {vehicleIcon && (
                <Marker
                  position={[truckPosition.lat, truckPosition.lng]}
                  icon={vehicleIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[180px]">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Truck size={16} className="text-primary" />
                        Waste Collection Truck
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          Status: <span className="font-medium text-foreground">{isAnimating ? 'Moving' : 'Stopped'}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Progress: <span className="font-medium text-foreground">{Math.round(routeProgress)}%</span>
                        </p>
                        <p className="text-muted-foreground">
                          Route: <span className="font-medium text-foreground">OSRM Road Following</span>
                        </p>
                      </div>
                    </div>
                  </Popup>
                  <Tooltip direction="top" offset={[0, -20]} permanent={false}>
                    <span className="font-medium">Waste Truck</span>
                  </Tooltip>
                </Marker>
              )}

              {/* Junction Markers - one for each house's nearest point on the route */}
              {houseJunctions.map((junction, index) => (
                <JunctionMarker 
                  key={junction.id}
                  junction={junction} 
                  isNearest={true}
                  totalWaste={NEARBY_HOUSES[index]?.expectedWaste}
                />
              ))}

              {/* Nearby House Markers - 3 houses that bring waste to their nearest junctions */}
              {NEARBY_HOUSES.map((house) => {
                const info = houseJunctionInfo.find(h => h.house.id === house.id)
                return (
                  <NearbyHouseMarker 
                    key={house.id} 
                    house={house} 
                    nearestJunction={info?.nearestJunction || null}
                    walkingDistance={info?.distance || 0}
                  />
                )
              })}

              {/* Walking paths from each house to its nearest junction */}
              {houseJunctionInfo.map((info) => (
                <Polyline
                  key={`walk-${info.house.id}`}
                  positions={info.walkingPath.map(coord => [coord.lat, coord.lng] as [number, number])}
                  pathOptions={{
                    color: "#3b82f6",
                    weight: 2,
                    opacity: 0.7,
                    dashArray: "6, 4",
                  }}
                />
              ))}
            </MapContainer>
          )}
        </div>
      </Card>

      {/* Map Legend */}
      <Card className="eco-card p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="text-primary" size={18} />
          Map Legend
          {osrmTruckRoute.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
              OSRM Road Routing
            </span>
          )}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Home className="text-white" size={12} />
            </div>
            <span className="text-muted-foreground">Nearby House</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <GitBranch className="text-white" size={12} />
            </div>
            <span className="text-muted-foreground">Junction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Truck className="text-white" size={12} />
            </div>
            <span className="text-muted-foreground">Collection Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gray-700 rounded"></div>
            <span className="text-muted-foreground">Truck Road</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 border-t-2 border-dashed border-blue-500"></div>
            <span className="text-muted-foreground">Walking Path</span>
          </div>
        </div>
      </Card>

      {/* Collection Junctions Info - Truck visits each house's nearest junction */}
      <Card className="eco-card p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Truck className="text-amber-500" size={18} />
          Collection Junctions ({houseJunctions.length} stops)
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/80 border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center">
              <GitBranch size={24} />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">Route with {houseJunctions.length} Collection Points</p>
              <p className="text-sm text-muted-foreground">Truck stops at each house's nearest junction along the route</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">{totalWasteAtJunction} kg</p>
            <p className="text-xs text-muted-foreground">total waste collected</p>
            <p className="text-xs text-muted-foreground mt-1">from {NEARBY_HOUSES.length} houses</p>
          </div>
        </div>
      </Card>

      {/* Houses bringing waste to their nearest junctions */}
      <Card className="eco-card p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Home className="text-blue-500" size={18} />
          Houses &amp; Their Nearest Junctions
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Each house walks to its nearest junction on the road. The truck travels along the route
          and stops at each junction to collect waste.
        </p>
        <div className="space-y-3">
          {houseJunctionInfo.map((info, index) => (
            <div 
              key={info.house.id}
              className={`flex items-center justify-between p-3 rounded-lg border
                info.nearestJunction.id === collectionJunction?.id 
                'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{info.house.address}</p>
                  <p className="text-xs text-muted-foreground">
                    → Junction: <span className="font-medium">{info.nearestJunction.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Expected waste: {info.house.expectedWaste} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-600">{info.distance}m</p>
                  <p className="text-xs text-muted-foreground">walking</p>
                </div>
                <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center">
                  <Navigation size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Route Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="eco-card p-4 bg-gradient-to-br from-white to-primary/5">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="text-primary" size={16} />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Completed</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{statusInfo.completed}</p>
        </Card>
        
        <Card className="eco-card p-4 bg-gradient-to-br from-white to-soft-yellow/30">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="text-yellow-600" size={16} />
            <span className="text-xs font-semibold text-muted-foreground uppercase">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{statusInfo.inProgress}</p>
        </Card>
        
        <Card className="eco-card p-4 bg-gradient-to-br from-white to-muted/30">
          <div className="flex items-center gap-2 mb-1">
            <Circle className="text-muted-foreground" size={16} />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Pending</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{statusInfo.pending}</p>
        </Card>
        
        <Card className="eco-card p-4 bg-gradient-to-br from-white to-secondary/10">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="text-secondary" size={16} />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Total Stops</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{statusInfo.total}</p>
        </Card>
      </div>

      {/* Pickup Points List */}
      <Card className="eco-card p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="text-primary" size={18} />
          Pickup Points
        </h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {routeData.pickupPoints.map((point, index) => (
            <div 
              key={point.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                point.status === "in-progress" 
                  ? "bg-soft-yellow/30 border border-yellow-300" 
                  : point.status === "completed"
                    ? "bg-primary/5 border border-primary/20"
                    : "bg-muted/20 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  point.status === "completed" 
                    ? "bg-primary text-white" 
                    : point.status === "in-progress"
                      ? "bg-yellow-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{point.address}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{point.scheduledTime}</span>
                    <span>•</span>
                    <span>{point.expectedWaste} kg</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(point.status)}`}>
                {point.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/**
 * PickupPointMarker - Individual pickup point marker component
 */
function PickupPointMarker({ point }: { point: PickupPoint }) {
  const icon = usePickupIcon(point.status)

  if (!icon) return null

  return (
    <Marker
      position={[point.position.lat, point.position.lng]}
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[160px]">
          <h4 className="font-semibold text-foreground mb-2">Stop #{point.order}</h4>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">{point.address}</p>
            <p className="text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              {point.scheduledTime}
            </p>
            <p className="text-muted-foreground">
              Expected: <span className="font-medium">{point.expectedWaste} kg</span>
            </p>
            <p className={`font-medium ${getStatusColor(point.status)}`}>
              {point.status.charAt(0).toUpperCase() + point.status.slice(1)}
            </p>
          </div>
        </div>
      </Popup>
      <Tooltip direction="top" offset={[0, -10]}>
        <span>#{point.order} - {point.address}</span>
      </Tooltip>
    </Marker>
  )
}

/**
 * JunctionMarker - Junction point marker component
 */
function JunctionMarker({ junction, isNearest, totalWaste }: { junction: Junction; isNearest: boolean; totalWaste?: number }) {
  const icon = useJunctionIcon(isNearest)

  if (!icon) return null

  return (
    <Marker
      position={[junction.position.lat, junction.position.lng]}
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[180px]">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm ${isNearest ? 'bg-amber-500' : 'bg-purple-500'}`}></span>
            {junction.name}
          </h4>
          <div className="space-y-1 text-sm">
            {isNearest && (
              <p className="text-amber-600 font-medium">
                🚛 Optimal Collection Point
              </p>
            )}
            <p className="text-muted-foreground">
              Type: <span className="font-medium">{isNearest ? 'Collection Junction' : 'Road Junction'}</span>
            </p>
            {isNearest && totalWaste && (
              <p className="text-muted-foreground">
                Total Waste: <span className="font-medium">{totalWaste} kg</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              📍 Placed on OSRM road path
            </p>
          </div>
        </div>
      </Popup>
      <Tooltip direction="top" offset={[0, -10]}>
        <span>{isNearest ? '🚛 ' : ''}{junction.name}</span>
      </Tooltip>
    </Marker>
  )
}

/**
 * NearbyHouseMarker - House marker for houses bringing waste to their nearest junction
 */
function NearbyHouseMarker({ house, nearestJunction, walkingDistance }: { 
  house: typeof NEARBY_HOUSES[0]; 
  nearestJunction: Junction | null;
  walkingDistance: number;
}) {
  const icon = useSelectedHouseIcon()

  if (!icon) return null

  return (
    <Marker
      position={[house.position.lat, house.position.lng]}
      icon={icon}
    >
      <Popup>
        <div className="p-2 min-w-[180px]">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Nearby House
          </h4>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground font-medium">{house.address}</p>
            <p className="text-muted-foreground">
              Expected Waste: <span className="font-medium">{house.expectedWaste} kg</span>
            </p>
            {nearestJunction && (
              <>
                <p className="text-muted-foreground">
                  Nearest Junction: <span className="font-medium">{nearestJunction.name}</span>
                </p>
                <p className="text-muted-foreground">
                  Walk Distance: <span className="font-medium">{walkingDistance}m</span>
                </p>
              </>
            )}
            <p className="text-blue-600 text-xs">
              → Residents walk to nearest junction
            </p>
          </div>
        </div>
      </Popup>
      <Tooltip direction="top" offset={[0, -10]}>
        <span>🏠 {house.address}</span>
      </Tooltip>
    </Marker>
  )
}
