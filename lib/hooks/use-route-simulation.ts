"use client"

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
 */

import { useState, useEffect, useCallback, useRef } from "react"
import type { RouteMapData, VehicleState } from "@/lib/types/route-map"
import { simulateVehicleMovement } from "@/lib/data/mock-routes"

interface UseRouteSimulationOptions {
  /** Whether to start simulation automatically */
  autoStart?: boolean
  /** Update interval in milliseconds */
  updateInterval?: number
  /** Speed multiplier for simulation (1 = normal, 2 = 2x speed, etc.) */
  speedMultiplier?: number
}

interface UseRouteSimulationReturn {
  /** Current vehicle state with updated position */
  vehicleState: VehicleState
  /** Whether simulation is currently running */
  isSimulating: boolean
  /** Current progress percentage (0-100) */
  progress: number
  /** Toggle simulation play/pause */
  toggleSimulation: () => void
  /** Start simulation */
  startSimulation: () => void
  /** Pause simulation */
  pauseSimulation: () => void
  /** Reset simulation to beginning */
  resetSimulation: () => void
  /** Set progress manually (0-100) */
  setProgress: (progress: number) => void
}

/**
 * Hook for simulating vehicle movement along a route
 */
export function useRouteSimulation(
  routeData: RouteMapData,
  options: UseRouteSimulationOptions = {}
): UseRouteSimulationReturn {
  const {
    autoStart = false,
    updateInterval = 1000,
    speedMultiplier = 1,
  } = options

  // State
  const [isSimulating, setIsSimulating] = useState(autoStart)
  const [progress, setProgress] = useState(() => {
    // Calculate initial progress based on current stop
    if (routeData.status === "completed") return 100
    const currentIndex = routeData.vehicle.currentStopIndex
    const totalStops = routeData.pickupPoints.length
    return totalStops > 0 ? (currentIndex / totalStops) * 100 : 0
  })
  const [vehicleState, setVehicleState] = useState<VehicleState>(routeData.vehicle)

  // Refs for interval management
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef(progress)

  // Keep progress ref in sync
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // Update vehicle state when progress changes
  useEffect(() => {
    const newVehicleState = simulateVehicleMovement(routeData, progress)
    setVehicleState(newVehicleState)
  }, [routeData, progress])

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Handle simulation interval
  useEffect(() => {
    if (isSimulating && progress < 100) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = (0.5 * speedMultiplier) // Progress increment per tick
          const newProgress = Math.min(prev + increment, 100)
          
          // Stop simulation when complete
          if (newProgress >= 100) {
            setIsSimulating(false)
          }
          
          return newProgress
        })
      }, updateInterval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isSimulating, progress, updateInterval, speedMultiplier])

  // Control functions
  const toggleSimulation = useCallback(() => {
    if (progress >= 100) {
      // Reset and start if completed
      setProgress(0)
      setIsSimulating(true)
    } else {
      setIsSimulating((prev) => !prev)
    }
  }, [progress])

  const startSimulation = useCallback(() => {
    if (progress >= 100) {
      setProgress(0)
    }
    setIsSimulating(true)
  }, [progress])

  const pauseSimulation = useCallback(() => {
    setIsSimulating(false)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsSimulating(false)
    setProgress(0)
    setVehicleState(routeData.vehicle)
  }, [routeData.vehicle])

  const setProgressManually = useCallback((newProgress: number) => {
    setProgress(Math.max(0, Math.min(100, newProgress)))
  }, [])

  return {
    vehicleState,
    isSimulating,
    progress,
    toggleSimulation,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    setProgress: setProgressManually,
  }
}
