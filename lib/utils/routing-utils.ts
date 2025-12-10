/**
 * Routing Utilities using OSRM (OpenStreetMap Routing Machine)
 * Provides real road-following routes instead of straight lines
 */

import type { Coordinate } from '@/lib/types/route-map'

/**
 * OSRM API response types
 */
interface OSRMRoute {
  geometry: {
    coordinates: [number, number][] // [lng, lat] pairs
  }
  distance: number
  duration: number
}

interface OSRMResponse {
  code: string
  routes: OSRMRoute[]
}

/**
 * Get a route between two points using OSRM
 * Returns an array of coordinates that follow actual roads
 */
export async function getRouteFromOSRM(
  start: Coordinate,
  end: Coordinate
): Promise<Coordinate[]> {
  try {
    // OSRM uses lng,lat format (opposite of lat,lng)
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.status}`)
    }
    
    const data: OSRMResponse = await response.json()
    
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route found')
    }
    
    // Convert OSRM coordinates [lng, lat] to our format {lat, lng}
    const routeCoordinates: Coordinate[] = data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => ({ lat, lng })
    )
    
    return routeCoordinates
  } catch (error) {
    console.warn('OSRM routing failed, using fallback:', error)
    // Fallback to straight line
    return [start, end]
  }
}

/**
 * Get a complete route through multiple waypoints using OSRM
 * Each segment follows actual roads
 */
export async function getFullRouteFromOSRM(
  waypoints: Coordinate[]
): Promise<Coordinate[]> {
  if (waypoints.length < 2) {
    return waypoints
  }
  
  try {
    // Build coordinates string for OSRM (lng,lat;lng,lat;...)
    const coordString = waypoints
      .map(wp => `${wp.lng},${wp.lat}`)
      .join(';')
    
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.status}`)
    }
    
    const data: OSRMResponse = await response.json()
    
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route found')
    }
    
    // Convert OSRM coordinates [lng, lat] to our format {lat, lng}
    const routeCoordinates: Coordinate[] = data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => ({ lat, lng })
    )
    
    return routeCoordinates
  } catch (error) {
    console.warn('OSRM full route failed, using fallback:', error)
    // Fallback to straight lines between waypoints
    return generateFallbackRoute(waypoints)
  }
}

/**
 * Fallback route generation when OSRM is unavailable
 * Creates intermediate points between waypoints for smoother visualization
 */
function generateFallbackRoute(waypoints: Coordinate[]): Coordinate[] {
  const path: Coordinate[] = []
  
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i]
    const end = waypoints[i + 1]
    
    // Add start point
    path.push(start)
    
    // Add intermediate points for smoother lines
    const steps = 5
    for (let j = 1; j < steps; j++) {
      path.push({
        lat: start.lat + ((end.lat - start.lat) * j) / steps,
        lng: start.lng + ((end.lng - start.lng) * j) / steps,
      })
    }
  }
  
  // Add final point
  if (waypoints.length > 0) {
    path.push(waypoints[waypoints.length - 1])
  }
  
  return path
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in meters
 */
export function calculateDistanceMeters(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371000 // Earth's radius in meters
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Calculate total route distance from an array of coordinates
 */
export function calculateTotalRouteDistance(route: Coordinate[]): number {
  let totalDistance = 0
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistanceMeters(route[i], route[i + 1])
  }
  return totalDistance
}
