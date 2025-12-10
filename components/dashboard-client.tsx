"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import AdminDashboard from "@/components/admin-dashboard"
import TrashTracker from "@/components/trash-tracker"
import AddWasteLog from "@/components/add-waste-log"
import WasteTypes from "@/components/waste-types"
import CostCalculator from "@/components/cost-calculator"
import VehicleRoute from "@/components/vehicle-route"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function DashboardClient({ user, isAdmin, username }: { user: any; isAdmin: boolean; username: string | null }) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [showAddLog, setShowAddLog] = useState(false)
  const [userRole, setUserRole] = useState<"user" | "admin">("user")
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false)
  const router = useRouter()

  // Check sessionStorage for admin mode on client side
  // Only allow admin role if authenticated via admin password
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminMode = sessionStorage.getItem("adminMode")
      if (adminMode === "true") {
        setIsAuthenticatedAdmin(true)
        setUserRole("admin")
      } else {
        setIsAuthenticatedAdmin(false)
        setUserRole("user") // Force user role if not admin authenticated
      }
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("adminMode")
    }
    router.push("/auth/login")
  }

  const handleAddLog = () => {
    setShowAddLog(true)
  }

  const handleCloseAddLog = () => {
    setShowAddLog(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        userRole={userRole} 
        setUserRole={setUserRole}
        userEmail={isAuthenticatedAdmin ? "Administrator" : (username || user?.email)}
        userLabel={isAuthenticatedAdmin ? "Admin Access" : "User"}
        onLogout={handleLogout}
      />

      <main className="pt-16">
        {/* User views - shown for regular users only */}
        {!isAuthenticatedAdmin && currentPage === "dashboard" && <Dashboard onAddLog={handleAddLog} />}
        {!isAuthenticatedAdmin && currentPage === "tracker" && <TrashTracker onAddLog={handleAddLog} />}
        {!isAuthenticatedAdmin && currentPage === "waste-types" && <WasteTypes />}
        {!isAuthenticatedAdmin && currentPage === "cost" && <CostCalculator />}
        {!isAuthenticatedAdmin && currentPage === "vehicle" && <VehicleRoute />}

        {/* Admin views - ONLY shown if authenticated as admin via password */}
        {isAuthenticatedAdmin && currentPage === "dashboard" && <AdminDashboard />}
        {isAuthenticatedAdmin && currentPage === "tracker" && <TrashTracker onAddLog={handleAddLog} />}
        {isAuthenticatedAdmin && currentPage === "cost" && <CostCalculator />}
        {isAuthenticatedAdmin && currentPage === "vehicle" && <VehicleRoute />}
      </main>

      {showAddLog && <AddWasteLog onClose={handleCloseAddLog} />}
    </div>
  )
}
