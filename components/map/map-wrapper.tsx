"use client"

/**
 * MapWrapper Component
 * 
 * A wrapper component that handles dynamic loading of the LiveRouteMap.
 * This ensures the map is only loaded on the client side and provides
 * a clean integration point for the vehicle-route component.
 */

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Map, Loader2 } from "lucide-react"
import type { RouteMapData } from "@/lib/types/route-map"

// Dynamically import the LiveRouteMap component with no SSR
const LiveRouteMap = dynamic(
  () => import("@/components/map/live-route-map"),
  {
    ssr: false,
    loading: () => <MapLoadingState />,
  }
)

/**
 * Loading state component for the map
 */
function MapLoadingState() {
  return (
    <Card className="eco-card p-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="relative">
          <Map className="text-primary/30" size={64} />
          <Loader2 className="absolute inset-0 m-auto text-primary animate-spin" size={32} />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-foreground mb-1">Loading Map</h3>
          <p className="text-sm text-muted-foreground">
            Preparing route visualization...
          </p>
        </div>
      </div>
    </Card>
  )
}

interface MapWrapperProps {
  routeData: RouteMapData
  onClose?: () => void
  autoSimulate?: boolean
  simulationSpeed?: number
}

/**
 * MapWrapper - Provides lazy loading wrapper for LiveRouteMap
 */
export default function MapWrapper({
  routeData,
  onClose,
  autoSimulate = true,
  simulationSpeed = 1000,
}: MapWrapperProps) {
  return (
    <Suspense fallback={<MapLoadingState />}>
      <LiveRouteMap
        routeData={routeData}
        onClose={onClose}
        autoSimulate={autoSimulate}
        simulationSpeed={simulationSpeed}
      />
    </Suspense>
  )
}
