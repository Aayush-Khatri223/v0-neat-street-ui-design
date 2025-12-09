"use client"

import { MapPin, Truck, Clock, AlertCircle, Map } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const routes = [
  {
    id: "route-a",
    name: "Route A",
    vehicle: "Vehicle 1",
    status: "active",
    stops: 12,
    distance: 85,
    duration: "4h 30m",
    stops_list: [
      { id: 1, address: "123 Main St", time: "09:00", waste: 2.5 },
      { id: 2, address: "456 Oak Ave", time: "09:25", waste: 1.8 },
      { id: 3, address: "789 Pine Rd", time: "09:50", waste: 3.2 },
      { id: 4, address: "321 Elm St", time: "10:15", waste: 1.5 },
      { id: 5, address: "654 Maple Dr", time: "10:45", waste: 2.1 },
      { id: 6, address: "987 Cedar Ln", time: "11:15", waste: 1.9 },
    ],
  },
  {
    id: "route-b",
    name: "Route B",
    vehicle: "Vehicle 2",
    status: "active",
    stops: 10,
    distance: 72,
    duration: "4h 15m",
    stops_list: [
      { id: 1, address: "111 Birch St", time: "09:00", waste: 2.0 },
      { id: 2, address: "222 Spruce Ave", time: "09:30", waste: 1.7 },
      { id: 3, address: "333 Ash Rd", time: "10:00", waste: 2.8 },
      { id: 4, address: "444 Willow St", time: "10:30", waste: 1.6 },
      { id: 5, address: "555 Poplar Dr", time: "11:00", waste: 2.2 },
    ],
  },
  {
    id: "route-c",
    name: "Route C",
    vehicle: "Vehicle 3",
    status: "pending",
    stops: 15,
    distance: 95,
    duration: "5h 00m",
    stops_list: [
      { id: 1, address: "101 Hackberry St", time: "08:30", waste: 2.3 },
      { id: 2, address: "202 Sycamore Ave", time: "09:00", waste: 1.9 },
      { id: 3, address: "303 Fir Rd", time: "09:35", waste: 3.0 },
    ],
  },
  {
    id: "route-d",
    name: "Route D",
    vehicle: "Vehicle 4",
    status: "completed",
    stops: 8,
    distance: 65,
    duration: "3h 45m",
    stops_list: [
      { id: 1, address: "505 Juniper St", time: "08:00", waste: 2.1 },
      { id: 2, address: "606 Larch Ave", time: "08:25", waste: 1.8 },
    ],
  },
]

const statusColors = {
  active: "bg-primary/20 text-primary",
  pending: "bg-soft-yellow/40 text-yellow-700",
  completed: "bg-accent/20 text-accent",
}

export default function VehicleRoute() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>("route-a")
  const [showMap, setShowMap] = useState(false)
  const currentRoute = routes.find((r) => r.id === selectedRoute)

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
            {/* Map Section */}
            {showMap && (
              <Card className="eco-card p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground tracking-tight">
                    Live Route Map - {currentRoute.name}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => setShowMap(false)}>
                    Close Map
                  </Button>
                </div>

                <div className="bg-muted/20 rounded-lg p-8 border-2 border-dashed border-primary/30">
                  <div className="flex flex-col items-center justify-center gap-4 min-h-96">
                    <Map className="text-primary/50" size={64} />
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground mb-2">Map Integration Ready</h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        Provide your map API URL and authentication key to display live bus tracking and route
                        visualization.
                      </p>
                    </div>
                    <div className="mt-4 p-4 bg-secondary/10 rounded-lg max-w-md">
                      <p className="text-xs text-muted-foreground font-mono">
                        Ready to integrate: MapBox, Google Maps, or custom API endpoint
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
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
                        {currentRoute.stops_list.map((stop) => (
                          <tr
                            key={stop.id}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 font-medium text-foreground">#{stop.id}</td>
                            <td className="px-6 py-4 text-foreground">{stop.address}</td>
                            <td className="px-6 py-4 text-muted-foreground">{stop.time}</td>
                            <td className="px-6 py-4 text-right text-foreground font-semibold">{stop.waste}</td>
                          </tr>
                        ))}
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
