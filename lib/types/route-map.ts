/**
 * Type definitions for vehicle route map tracking
 * Used by the LiveRouteMap component for visualizing waste collection routes
 */

/**
 * Geographic coordinate point
 */
export interface Coordinate {
  lat: number
  lng: number
}

/**
 * Waste pickup point on the route
 */
export interface PickupPoint {
  id: string
  position: Coordinate
  address: string
  scheduledTime: string
  expectedWaste: number // in kg
  status: 'pending' | 'completed' | 'in-progress' | 'skipped'
  order: number
}

/**
 * Vehicle information and current state
 */
export interface VehicleState {
  id: string
  name: string
  position: Coordinate
  heading: number // direction in degrees (0-360)
  speed: number // km/h
  status: 'moving' | 'stopped' | 'collecting' | 'idle'
  currentStopIndex: number
  lastUpdated: Date
}

/**
 * Complete route data for map visualization
 */
export interface RouteMapData {
  id: string
  name: string
  vehicle: VehicleState
  pickupPoints: PickupPoint[]
  routePath: Coordinate[] // Full polyline path
  totalDistance: number // km
  estimatedDuration: string
  startPoint: Coordinate
  endPoint: Coordinate
  status: 'active' | 'pending' | 'completed'
}

/**
 * Map configuration options
 */
export interface MapConfig {
  center: Coordinate
  zoom: number
  minZoom?: number
  maxZoom?: number
}

/**
 * Marker customization options
 */
export interface MarkerStyle {
  color: string
  size: number
  icon?: string
}
