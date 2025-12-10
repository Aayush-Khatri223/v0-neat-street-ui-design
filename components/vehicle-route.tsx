"use client"

import { useEffect, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import { MapPin, Truck, Clock, AlertCircle, Map } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { getRouteByName, mockRoutes } from "@/lib/data/mock-routes"
import type { RouteMapData } from "@/lib/types/route-map"

// Dynamically import the MapWrapper to enable lazy loading
const MapWrapper = dynamic(
  () => import("@/components/map/map-wrapper"),
  { 
    ssr: false,
    loading: () => (
      <Card className="eco-card p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Map className="text-primary/30 animate-pulse" size={64} />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </Card>
    )
  }
)

interface RouteStop {
  id: string
  address: string
  time: string
  waste: number
  order_index: number
}

interface RouteData {
  id: string
  name: string
  vehicle: string
  status: string
  stops: number
  distance: number
  duration: string
  stops_list: RouteStop[]
}

const statusColors = {
  active: "bg-primary/20 text-primary",
  pending: "bg-soft-yellow/40 text-yellow-700",
  completed: "bg-accent/20 text-accent",
}

export default function VehicleRoute() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [routes, setRoutes] = useState<RouteData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    const supabase = createClient()
    
    try {
      // Fetch routes with vehicle and stops
      const { data: routesData } = await supabase
        .from('routes')
        .select(`
          id,
          name,
          status,
          total_stops,
          distance,
          duration,
          vehicles (
            name
          )
        `)
        .order('name')

      if (routesData) {
        const processedRoutes: RouteData[] = []
        
        for (const route of routesData) {
          // Fetch stops for each route
          const { data: stops } = await supabase
            .from('route_stops')
            .select('*')
            .eq('route_id', route.id)
            .order('order_index')

          const routeStops: RouteStop[] = (stops || []).map((stop: any) => ({
            id: stop.id,
            address: stop.address,
            time: stop.scheduled_time || 'TBD',
            waste: Number(stop.expected_waste) || 0,
            order_index: stop.order_index
          }))

          processedRoutes.push({
            id: route.id,
            name: route.name,
            vehicle: (route as any).vehicles?.name || 'Unassigned',
            status: route.status,
            stops: route.total_stops,
            distance: Number(route.distance),
            duration: route.duration || 'TBD',
            stops_list: routeStops
          })
        }

        setRoutes(processedRoutes)
        if (processedRoutes.length > 0) {
          setSelectedRoute(processedRoutes[0].id)
        }
      }

    } catch (error) {
      console.error('Error fetching routes:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentRoute = routes.find((r) => r.id === selectedRoute)

  if (loading) {
    return (
      <div className="eco-gradient min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading routes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="eco-gradient min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-2">
          <h1 className="text-4xl font-bold text-foreground mb-1 tracking-tight">Vehicle Routes</h1>
          <p className="text-muted-foreground text-lg">Manage waste collection routes and vehicle assignments</p>
        </div>

        {/* Routes Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`text-left transition-all duration-200 ${
                selectedRoute === route.id ? "ring-2 ring-primary shadow-lg" : ""
              }`}
            >
              <Card className={`eco-card p-6 cursor-pointer ${selectedRoute === route.id ? "bg-primary/5" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{route.name}</h3>
                    <p className="text-xs text-muted-foreground">{route.vehicle}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[route.status as keyof typeof statusColors]
                    }`}
                  >
                    {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin size={16} /> {route.distance} km
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock size={16} /> {route.duration}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Truck size={16} /> {route.stops} stops
                  </p>
                </div>
              </Card>
            </button>
          ))}
        </div>

        {currentRoute && (
          <>
            {/* Map Section - Live Route Map with Vehicle Tracking */}
            {showMap && (
              <div className="mb-8">
                <Card className="eco-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">
                      Live Route Map - {currentRoute.name}
                    </h2>
                  </div>
                  
                  {/* Render the actual map component */}
                  <RouteMapSection 
                    routeName={currentRoute.name}
                    routeStatus={currentRoute.status}
                    onClose={() => setShowMap(false)}
                  />
                </Card>
              </div>
            )}

            {!showMap && (
              <Button onClick={() => setShowMap(true)} className="mb-8 gap-2" variant="default">
                <Map size={18} />
                View Live Route Map
              </Button>
            )}

            {/* Route Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className="eco-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">
                      {currentRoute.name} Details
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[currentRoute.status as keyof typeof statusColors]}`}
                    >
                      {currentRoute.status.charAt(0).toUpperCase() + currentRoute.status.slice(1)}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">Stop</th>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">Address</th>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">Scheduled Time</th>
                          <th className="px-6 py-4 text-right font-semibold text-foreground">Waste (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRoute.stops_list.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                              No stops found for this route
                            </td>
                          </tr>
                        ) : (
                          currentRoute.stops_list.map((stop, index) => (
                            <tr
                              key={stop.id}
                              className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 font-medium text-foreground">#{index + 1}</td>
                              <td className="px-6 py-4 text-foreground">{stop.address}</td>
                              <td className="px-6 py-4 text-muted-foreground">{stop.time}</td>
                              <td className="px-6 py-4 text-right text-foreground font-semibold">{stop.waste}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Route Summary */}
              <div className="space-y-4">
                <Card className="eco-card p-6 bg-gradient-to-br from-white to-primary/10">
                  <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                    Total Distance
                  </p>
                  <p className="text-3xl font-bold text-foreground">{currentRoute.distance} km</p>
                  <p className="text-xs text-muted-foreground mt-2">Route coverage area</p>
                </Card>

                <Card className="eco-card p-6 bg-gradient-to-br from-white to-secondary/10">
                  <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                    Estimated Duration
                  </p>
                  <p className="text-3xl font-bold text-secondary">{currentRoute.duration}</p>
                  <p className="text-xs text-muted-foreground mt-2">Collection time</p>
                </Card>

                <Card className="eco-card p-6 bg-gradient-to-br from-white to-accent/10">
                  <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                    Total Stops
                  </p>
                  <p className="text-3xl font-bold text-accent">{currentRoute.stops}</p>
                  <p className="text-xs text-muted-foreground mt-2">Pickup locations</p>
                </Card>

                <Card className="eco-card p-6 bg-gradient-to-br from-white to-soft-yellow/30">
                  <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                    Assigned Vehicle
                  </p>
                  <p className="text-lg font-bold text-foreground">{currentRoute.vehicle}</p>
                  <p className="text-xs text-muted-foreground mt-2">Primary collection unit</p>
                </Card>
              </div>
            </div>

            {/* Alerts Section */}
            {currentRoute.status === "active" && (
              <Card className="eco-card p-6 mb-8 border-2 border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Route in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      This route is currently being executed. Real-time updates will be shown as stops are completed.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/**
 * RouteMapSection - Helper component that matches DB routes with map data
 * and renders the appropriate map view
 */
function RouteMapSection({ 
  routeName, 
  routeStatus,
  onClose 
}: { 
  routeName: string
  routeStatus: string
  onClose: () => void 
}) {
  // Try to match DB route name with mock map data
  const mapRouteData = useMemo(() => {
    // First try exact name match
    let matchedRoute = getRouteByName(routeName)
    
    // If no match, use the first route with matching status
    if (!matchedRoute) {
      matchedRoute = mockRoutes.find(r => r.status === routeStatus) || mockRoutes[0]
    }
    
    // Override status to match the DB route status
    if (matchedRoute) {
      return {
        ...matchedRoute,
        name: routeName,
        status: routeStatus as "active" | "pending" | "completed",
      }
    }
    
    return mockRoutes[0]
  }, [routeName, routeStatus])

  return (
    <MapWrapper
      routeData={mapRouteData}
      onClose={onClose}
      autoSimulate={routeStatus === "active"}
      simulationSpeed={800}
    />
  )
}
