"use client"

/**
 * LiveRouteMap Component
 * 
 * A dynamic map component for visualizing waste collection vehicle routes.
 * Uses Leaflet + React-Leaflet for mapping functionality.
 * 
 * Features:
 * - Real-time vehicle position tracking
 * - Route polyline visualization
 * - Custom markers for vehicle and pickup points
 * - Responsive design for desktop and mobile
 * - Lazy loading for performance optimization
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
  Loader2
} from "lucide-react"
import type { RouteMapData, VehicleState, PickupPoint, Coordinate } from "@/lib/types/route-map"
import { useRouteSimulation } from "@/lib/hooks/use-route-simulation"
import { 
  getStatusColor, 
  getStatusBgColor,
  formatSpeed,
  calculateProgress 
} from "@/lib/utils/map-utils"

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

interface LiveRouteMapProps {
  routeData: RouteMapData
  onClose?: () => void
  autoSimulate?: boolean
  simulationSpeed?: number
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

  // Use route simulation hook for real-time updates
  const {
    vehicleState,
    isSimulating,
    progress,
    toggleSimulation,
    resetSimulation
  } = useRouteSimulation(routeData, {
    autoStart: autoSimulate && routeData.status === "active",
    updateInterval: simulationSpeed,
  })

  // Get custom icons
  const vehicleIcon = useVehicleIcon()

  // Convert coordinates for Leaflet (lat, lng tuple format)
  const routePathCoords = useMemo(() => 
    routeData.routePath.map(coord => [coord.lat, coord.lng] as [number, number]),
    [routeData.routePath]
  )

  // Completed path (vehicle has traveled)
  const completedPathCoords = useMemo(() => {
    const totalPoints = routeData.routePath.length
    const completedIndex = Math.floor((progress / 100) * totalPoints)
    return routeData.routePath
      .slice(0, completedIndex + 1)
      .map(coord => [coord.lat, coord.lng] as [number, number])
  }, [routeData.routePath, progress])

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

  return (
    <div className="w-full space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <Truck className="text-primary" size={16} />
            <span className="text-sm font-medium text-foreground">
              {vehicleState.name}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBgColor(vehicleState.status)}`}>
              {vehicleState.status}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
            <Navigation className="text-muted-foreground" size={14} />
            <span className="text-sm text-muted-foreground">
              {formatSpeed(vehicleState.speed)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {routeData.status === "active" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSimulation}
                className="gap-2"
              >
                {isSimulating ? <Pause size={14} /> : <Play size={14} />}
                {isSimulating ? "Pause" : "Resume"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetSimulation}
                className="gap-2"
              >
                <RotateCcw size={14} />
                Reset
              </Button>
            </>
          )}
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
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Map Container */}
      <Card className="eco-card overflow-hidden">
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
              <div className="text-center">
                <Loader2 className="animate-spin text-primary mx-auto mb-2" size={32} />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
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

              {/* Full Route Path (gray/light) */}
              <Polyline
                positions={routePathCoords}
                pathOptions={{
                  color: "#94a3b8",
                  weight: 4,
                  opacity: 0.5,
                  dashArray: "8, 8",
                }}
              />

              {/* Completed Route Path (primary color) */}
              {completedPathCoords.length > 1 && (
                <Polyline
                  positions={completedPathCoords}
                  pathOptions={{
                    color: "oklch(0.62 0.22 142)",
                    weight: 5,
                    opacity: 0.9,
                  }}
                />
              )}

              {/* Pickup Point Markers */}
              {routeData.pickupPoints.map((point) => (
                <PickupPointMarker key={point.id} point={point} />
              ))}

              {/* Vehicle Marker */}
              {vehicleIcon && (
                <Marker
                  position={[vehicleState.position.lat, vehicleState.position.lng]}
                  icon={vehicleIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[180px]">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Truck size={16} className="text-primary" />
                        {vehicleState.name}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          Status: <span className="font-medium text-foreground">{vehicleState.status}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Speed: <span className="font-medium text-foreground">{formatSpeed(vehicleState.speed)}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Current Stop: <span className="font-medium text-foreground">#{vehicleState.currentStopIndex + 1}</span>
                        </p>
                      </div>
                    </div>
                  </Popup>
                  <Tooltip direction="top" offset={[0, -20]} permanent={false}>
                    <span className="font-medium">{vehicleState.name}</span>
                  </Tooltip>
                </Marker>
              )}
            </MapContainer>
          )}
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
