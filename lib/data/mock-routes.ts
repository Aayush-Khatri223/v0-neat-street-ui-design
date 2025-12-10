/**
 * Mock route data for vehicle tracking map
 * Contains realistic coordinates for Bhaktapur, Nepal
 * Based on actual locations in Bhaktapur for waste collection routes
 */

import type { RouteMapData, Coordinate, PickupPoint, VehicleState } from '@/lib/types/route-map'

/**
 * Generate a route path with intermediate points for smooth visualization
 */
function generateRoutePath(points: Coordinate[]): Coordinate[] {
  const path: Coordinate[] = []
  
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i]
    const end = points[i + 1]
    
    // Add start point
    path.push(start)
    
    // Add intermediate points for smoother lines
    const steps = 3
    for (let j = 1; j < steps; j++) {
      path.push({
        lat: start.lat + ((end.lat - start.lat) * j) / steps,
        lng: start.lng + ((end.lng - start.lng) * j) / steps,
      })
    }
  }
  
  // Add final point
  if (points.length > 0) {
    path.push(points[points.length - 1])
  }
  
  return path
}

/**
 * Durbar Square Route - Morning Collection
 * Covers Bhaktapur area following actual road network visible in map
 * Road: Kedarnath Temple → Mul Chowk → Yalachhen (diagonal road) → Sunrise Bank
 * The road goes DIAGONALLY from southwest to northeast
 */
export const downtownRoute: RouteMapData = {
  id: 'route-downtown-001',
  name: 'Yalachhen Morning Route',
  status: 'active',
  totalDistance: 1.2,
  estimatedDuration: '45m',
  startPoint: { lat: 27.6693, lng: 85.4252 },
  endPoint: { lat: 27.6718, lng: 85.4375 },
  vehicle: {
    id: 'truck-001',
    name: 'ECO-001',
    position: { lat: 27.6705, lng: 85.4305 },
    heading: 45,
    speed: 15,
    status: 'moving',
    currentStopIndex: 2,
    lastUpdated: new Date(),
  },
  pickupPoints: [
    {
      id: 'stop-001',
      position: { lat: 27.6693, lng: 85.4252 },
      address: 'Kedarnath Temple',
      scheduledTime: '06:00 AM',
      expectedWaste: 45,
      status: 'completed',
      order: 1,
    },
    {
      id: 'stop-002',
      position: { lat: 27.6697, lng: 85.4270 },
      address: 'Mul Chowk Yamawar',
      scheduledTime: '06:15 AM',
      expectedWaste: 32,
      status: 'completed',
      order: 2,
    },
    {
      id: 'stop-003',
      position: { lat: 27.6705, lng: 85.4305 },
      address: 'Yalachhen Junction',
      scheduledTime: '06:30 AM',
      expectedWaste: 28,
      status: 'in-progress',
      order: 3,
    },
    {
      id: 'stop-004',
      position: { lat: 27.6712, lng: 85.4340 },
      address: 'Near Sunrise Bank',
      scheduledTime: '06:45 AM',
      expectedWaste: 55,
      status: 'pending',
      order: 4,
    },
    {
      id: 'stop-005',
      position: { lat: 27.6718, lng: 85.4375 },
      address: 'Sata Pharm Area',
      scheduledTime: '07:00 AM',
      expectedWaste: 41,
      status: 'pending',
      order: 5,
    },
  ],
  // Route path following the DIAGONAL road from Kedarnath Temple to Sunrise Bank
  // This road goes from southwest to northeast at approximately 45 degree angle
  routePath: generateRoutePath([
    { lat: 27.6693, lng: 85.4252 },  // Start: Kedarnath Temple
    { lat: 27.6695, lng: 85.4260 },  // Road going northeast
    { lat: 27.6697, lng: 85.4270 },  // Mul Chowk junction
    { lat: 27.6699, lng: 85.4280 },  // Continuing diagonal
    { lat: 27.6701, lng: 85.4290 },  // Along Yalachhen road
    { lat: 27.6703, lng: 85.4298 },  // Road continues diagonal
    { lat: 27.6705, lng: 85.4305 },  // Central junction (Collection Point)
    { lat: 27.6707, lng: 85.4315 },  // Continuing northeast
    { lat: 27.6709, lng: 85.4325 },  // Road still diagonal
    { lat: 27.6711, lng: 85.4335 },  // Approaching Sunrise Bank
    { lat: 27.6714, lng: 85.4350 },  // Near Sunrise Bank
    { lat: 27.6716, lng: 85.4362 },  // Past bank
    { lat: 27.6718, lng: 85.4375 },  // End: Sata Pharm area
  ]),
}

/**
 * Suryabinayak Route - Afternoon Collection
 * Covers Suryabinayak and surrounding residential areas of Bhaktapur
 */
export const suburbanRoute: RouteMapData = {
  id: 'route-suburban-002',
  name: 'Suryabinayak Afternoon',
  status: 'pending',
  totalDistance: 4.2,
  estimatedDuration: '2h 00m',
  startPoint: { lat: 27.6650, lng: 85.4180 },
  endPoint: { lat: 27.6590, lng: 85.4280 },
  vehicle: {
    id: 'truck-002',
    name: 'ECO-002',
    position: { lat: 27.6650, lng: 85.4180 },
    heading: 0,
    speed: 0,
    status: 'idle',
    currentStopIndex: 0,
    lastUpdated: new Date(),
  },
  pickupPoints: [
    {
      id: 'sub-stop-001',
      position: { lat: 27.6650, lng: 85.4180 },
      address: 'Suryabinayak Temple',
      scheduledTime: '01:00 PM',
      expectedWaste: 35,
      status: 'pending',
      order: 1,
    },
    {
      id: 'sub-stop-002',
      position: { lat: 27.6635, lng: 85.4200 },
      address: 'Kamal Binayak',
      scheduledTime: '01:25 PM',
      expectedWaste: 42,
      status: 'pending',
      order: 2,
    },
    {
      id: 'sub-stop-003',
      position: { lat: 27.6620, lng: 85.4220 },
      address: 'Madhyapur Thimi Junction',
      scheduledTime: '01:50 PM',
      expectedWaste: 29,
      status: 'pending',
      order: 3,
    },
    {
      id: 'sub-stop-004',
      position: { lat: 27.6610, lng: 85.4245 },
      address: 'Bode Village',
      scheduledTime: '02:15 PM',
      expectedWaste: 48,
      status: 'pending',
      order: 4,
    },
    {
      id: 'sub-stop-005',
      position: { lat: 27.6600, lng: 85.4260 },
      address: 'Nagadesh Temple Area',
      scheduledTime: '02:40 PM',
      expectedWaste: 36,
      status: 'pending',
      order: 5,
    },
    {
      id: 'sub-stop-006',
      position: { lat: 27.6590, lng: 85.4280 },
      address: 'Balkumari',
      scheduledTime: '03:05 PM',
      expectedWaste: 52,
      status: 'pending',
      order: 6,
    },
  ],
  routePath: generateRoutePath([
    { lat: 27.6650, lng: 85.4180 },
    { lat: 27.6635, lng: 85.4200 },
    { lat: 27.6620, lng: 85.4220 },
    { lat: 27.6610, lng: 85.4245 },
    { lat: 27.6600, lng: 85.4260 },
    { lat: 27.6590, lng: 85.4280 },
  ]),
}

/**
 * Kamalbinayak Route - Evening Collection
 * Covers industrial and commercial areas of Bhaktapur
 */
export const industrialRoute: RouteMapData = {
  id: 'route-industrial-003',
  name: 'Kamalbinayak Evening',
  status: 'completed',
  totalDistance: 3.8,
  estimatedDuration: '1h 30m',
  startPoint: { lat: 27.6780, lng: 85.4150 },
  endPoint: { lat: 27.6850, lng: 85.4250 },
  vehicle: {
    id: 'truck-003',
    name: 'ECO-003',
    position: { lat: 27.6850, lng: 85.4250 },
    heading: 180,
    speed: 0,
    status: 'idle',
    currentStopIndex: 5,
    lastUpdated: new Date(),
  },
  pickupPoints: [
    {
      id: 'ind-stop-001',
      position: { lat: 27.6780, lng: 85.4150 },
      address: 'Sallaghari Bus Park',
      scheduledTime: '05:00 PM',
      expectedWaste: 120,
      status: 'completed',
      order: 1,
    },
    {
      id: 'ind-stop-002',
      position: { lat: 27.6795, lng: 85.4170 },
      address: 'Chyamasingh Market',
      scheduledTime: '05:30 PM',
      expectedWaste: 95,
      status: 'completed',
      order: 2,
    },
    {
      id: 'ind-stop-003',
      position: { lat: 27.6810, lng: 85.4190 },
      address: 'Libali Gaun',
      scheduledTime: '06:00 PM',
      expectedWaste: 150,
      status: 'completed',
      order: 3,
    },
    {
      id: 'ind-stop-004',
      position: { lat: 27.6825, lng: 85.4210 },
      address: 'Byasi Area',
      scheduledTime: '06:35 PM',
      expectedWaste: 85,
      status: 'completed',
      order: 4,
    },
    {
      id: 'ind-stop-005',
      position: { lat: 27.6840, lng: 85.4230 },
      address: 'Golmadhi Tole',
      scheduledTime: '07:05 PM',
      expectedWaste: 110,
      status: 'completed',
      order: 5,
    },
    {
      id: 'ind-stop-006',
      position: { lat: 27.6850, lng: 85.4250 },
      address: 'Bhaktapur Municipality Office',
      scheduledTime: '07:35 PM',
      expectedWaste: 0,
      status: 'completed',
      order: 6,
    },
  ],
  routePath: generateRoutePath([
    { lat: 27.6780, lng: 85.4150 },
    { lat: 27.6795, lng: 85.4170 },
    { lat: 27.6810, lng: 85.4190 },
    { lat: 27.6825, lng: 85.4210 },
    { lat: 27.6840, lng: 85.4230 },
    { lat: 27.6850, lng: 85.4250 },
  ]),
}

/**
 * All available routes
 */
export const mockRoutes: RouteMapData[] = [
  downtownRoute,
  suburbanRoute,
  industrialRoute,
]

/**
 * Get route data by ID
 */
export function getRouteById(id: string): RouteMapData | undefined {
  return mockRoutes.find(route => route.id === id)
}

/**
 * Get route data by name (case-insensitive partial match)
 */
export function getRouteByName(name: string): RouteMapData | undefined {
  const normalizedName = name.toLowerCase()
  return mockRoutes.find(route => 
    route.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(route.name.toLowerCase())
  )
}

/**
 * Simulate vehicle movement along the route
 * Returns a new vehicle state with updated position
 */
export function simulateVehicleMovement(
  route: RouteMapData,
  progressPercent: number
): VehicleState {
  const path = route.routePath
  const totalPoints = path.length
  const currentIndex = Math.min(
    Math.floor((progressPercent / 100) * totalPoints),
    totalPoints - 1
  )
  
  const currentPosition = path[currentIndex]
  const nextPosition = path[Math.min(currentIndex + 1, totalPoints - 1)]
  
  // Calculate heading based on direction of travel
  const heading = Math.atan2(
    nextPosition.lng - currentPosition.lng,
    nextPosition.lat - currentPosition.lat
  ) * (180 / Math.PI)
  
  // Determine current stop index
  let currentStopIndex = 0
  for (let i = 0; i < route.pickupPoints.length; i++) {
    const stop = route.pickupPoints[i]
    const stopPathIndex = path.findIndex(
      p => Math.abs(p.lat - stop.position.lat) < 0.001 && 
           Math.abs(p.lng - stop.position.lng) < 0.001
    )
    if (stopPathIndex <= currentIndex) {
      currentStopIndex = i
    }
  }
  
  return {
    ...route.vehicle,
    position: currentPosition,
    heading: (heading + 360) % 360,
    speed: progressPercent < 100 ? 20 + Math.random() * 15 : 0,
    status: progressPercent < 100 ? 'moving' : 'idle',
    currentStopIndex,
    lastUpdated: new Date(),
  }
}
