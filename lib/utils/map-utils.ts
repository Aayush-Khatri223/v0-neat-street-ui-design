/**
 * Map Utility Functions
 * 
 * Helper functions for map-related calculations and styling.
 * Used by the LiveRouteMap component.
 */

import type { Coordinate, VehicleState, PickupPoint } from "@/lib/types/route-map"

/**
 * Get text color class based on status
 */
export function getStatusColor(status: VehicleState["status"] | PickupPoint["status"]): string {
  switch (status) {
    case "completed":
      return "text-primary"
    case "in-progress":
    case "collecting":
      return "text-yellow-600"
    case "moving":
      return "text-secondary"
    case "pending":
    case "idle":
      return "text-muted-foreground"
    case "skipped":
      return "text-destructive"
    case "stopped":
      return "text-orange-500"
    default:
      return "text-muted-foreground"
  }
}

/**
 * Get background color class based on status
 */
export function getStatusBgColor(status: VehicleState["status"] | PickupPoint["status"]): string {
  switch (status) {
    case "completed":
      return "bg-primary/20 text-primary"
    case "in-progress":
    case "collecting":
      return "bg-soft-yellow/40 text-yellow-700"
    case "moving":
      return "bg-secondary/20 text-secondary"
    case "pending":
    case "idle":
      return "bg-muted/50 text-muted-foreground"
    case "skipped":
      return "bg-destructive/20 text-destructive"
    case "stopped":
      return "bg-orange-100 text-orange-600"
    default:
      return "bg-muted/50 text-muted-foreground"
  }
}

/**
 * Format speed for display
 */
export function formatSpeed(speed: number): string {
  if (speed === 0) return "Stopped"
  return `${Math.round(speed)} km/h`
}

/**
 * Calculate progress percentage based on current position along route
 */
export function calculateProgress(
  currentPosition: Coordinate,
  routePath: Coordinate[]
): number {
  if (routePath.length === 0) return 0
  
  // Find the closest point on the route
  let minDistance = Infinity
  let closestIndex = 0
  
  for (let i = 0; i < routePath.length; i++) {
    const distance = calculateDistance(currentPosition, routePath[i])
    if (distance < minDistance) {
      minDistance = distance
      closestIndex = i
    }
  }
  
  return (closestIndex / (routePath.length - 1)) * 100
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat)
  const dLng = toRad(coord2.lng - coord1.lng)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  
  return R * c
}

/**
 * Convert degrees to radians
 */
function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Calculate the center point of multiple coordinates
 */
export function calculateCenter(coordinates: Coordinate[]): Coordinate {
  if (coordinates.length === 0) {
    return { lat: 0, lng: 0 }
  }
  
  const sumLat = coordinates.reduce((acc, coord) => acc + coord.lat, 0)
  const sumLng = coordinates.reduce((acc, coord) => acc + coord.lng, 0)
  
  return {
    lat: sumLat / coordinates.length,
    lng: sumLng / coordinates.length,
  }
}

/**
 * Calculate bounds for a set of coordinates
 */
export function calculateBounds(coordinates: Coordinate[]): {
  north: number
  south: number
  east: number
  west: number
} {
  if (coordinates.length === 0) {
    return { north: 0, south: 0, east: 0, west: 0 }
  }
  
  return {
    north: Math.max(...coordinates.map(c => c.lat)),
    south: Math.min(...coordinates.map(c => c.lat)),
    east: Math.max(...coordinates.map(c => c.lng)),
    west: Math.min(...coordinates.map(c => c.lng)),
  }
}

/**
 * Interpolate position between two coordinates
 */
export function interpolatePosition(
  start: Coordinate,
  end: Coordinate,
  progress: number // 0 to 1
): Coordinate {
  return {
    lat: start.lat + (end.lat - start.lat) * progress,
    lng: start.lng + (end.lng - start.lng) * progress,
  }
}

/**
 * Calculate heading (bearing) between two coordinates
 */
export function calculateHeading(from: Coordinate, to: Coordinate): number {
  const dLng = toRad(to.lng - from.lng)
  const lat1 = toRad(from.lat)
  const lat2 = toRad(to.lat)
  
  const y = Math.sin(dLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - 
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)
  
  const heading = Math.atan2(y, x) * (180 / Math.PI)
  
  return (heading + 360) % 360
}

/**
 * Format duration from minutes to human readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  
  if (mins === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${mins}m`
}

/**
 * Format distance in kilometers
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${km.toFixed(1)} km`
}
