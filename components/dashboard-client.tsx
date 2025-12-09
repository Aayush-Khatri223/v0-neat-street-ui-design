"use client"

import { useState } from "react"
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
import Achievements from "@/components/achievements"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function DashboardClient({ user, isAdmin }: { user: any; isAdmin: boolean }) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [showAddLog, setShowAddLog] = useState(false)
  const [userRole] = useState<"user" | "admin">(isAdmin ? "admin" : "user")
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    sessionStorage.removeItem("adminMode")
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
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} userRole={userRole} />

      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "User"}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      <main className="pt-16">
        {userRole === "user" && currentPage === "dashboard" && <Dashboard onAddLog={handleAddLog} />}
        {userRole === "user" && currentPage === "tracker" && <TrashTracker onAddLog={handleAddLog} />}
        {userRole === "user" && currentPage === "waste-types" && <WasteTypes />}
        {userRole === "user" && currentPage === "cost" && <CostCalculator />}
        {userRole === "user" && currentPage === "vehicle" && <VehicleRoute />}
        {userRole === "user" && currentPage === "achievements" && <Achievements />}

        {userRole === "admin" && currentPage === "dashboard" && <AdminDashboard />}
        {userRole === "admin" && currentPage === "tracker" && <TrashTracker onAddLog={handleAddLog} />}
        {userRole === "admin" && currentPage === "cost" && <CostCalculator />}
        {userRole === "admin" && currentPage === "vehicle" && <VehicleRoute />}
      </main>

      {showAddLog && <AddWasteLog onClose={handleCloseAddLog} />}
    </div>
  )
}
