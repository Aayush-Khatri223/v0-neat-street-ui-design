"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { Users, TrendingUp, Trash2, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

const adminWasteData = [
  { name: "Mon", waste: 125, users: 45 },
  { name: "Tue", waste: 132, users: 48 },
  { name: "Wed", waste: 148, users: 52 },
  { name: "Thu", waste: 118, users: 43 },
  { name: "Fri", waste: 165, users: 58 },
  { name: "Sat", waste: 89, users: 35 },
  { name: "Sun", waste: 105, users: 40 },
]

const vehicleData = [
  { name: "Route A", trips: 12, distance: 85, cost: 120 },
  { name: "Route B", trips: 10, distance: 72, cost: 98 },
  { name: "Route C", trips: 15, distance: 95, cost: 145 },
  { name: "Route D", trips: 8, distance: 65, cost: 85 },
]

const wasteTypeDistribution = [
  { name: "Organic", value: 35, color: "hsl(142, 70%, 50%)" },
  { name: "Plastic", value: 28, color: "hsl(220, 70%, 50%)" },
  { name: "Metal", value: 18, color: "hsl(89, 70%, 50%)" },
  { name: "Paper", value: 12, color: "hsl(55, 70%, 50%)" },
  { name: "Glass", value: 7, color: "hsl(200, 60%, 50%)" },
]

export default function AdminDashboard() {
  const totalWaste = adminWasteData.reduce((sum, item) => sum + item.waste, 0)
  const avgWastePerDay = (totalWaste / adminWasteData.length).toFixed(1)
  const totalUsers = 328
  const activeRoutes = vehicleData.length

  return (
    <div className="eco-gradient min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-2">
          <h1 className="text-4xl font-bold text-foreground mb-1 tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">System overview and fleet management</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="eco-card p-6 bg-gradient-to-br from-white to-primary/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wide">
                  Total Waste (Week)
                </p>
                <p className="text-3xl font-bold text-foreground">{totalWaste} kg</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Trash2 className="text-primary" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Avg {avgWastePerDay} kg/day</p>
          </Card>

          <Card className="eco-card p-6 bg-gradient-to-br from-white to-secondary/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold text-foreground">{totalUsers}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Users className="text-secondary" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">↑ 12% this month</p>
          </Card>

          <Card className="eco-card p-6 bg-gradient-to-br from-white to-accent/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wide">
                  Active Routes
                </p>
                <p className="text-3xl font-bold text-foreground">{activeRoutes}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="text-accent" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">All operational</p>
          </Card>

          <Card className="eco-card p-6 bg-gradient-to-br from-white to-soft-yellow/30">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wide">Fleet Costs</p>
                <p className="text-3xl font-bold text-foreground">$1,248</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-soft-yellow/40 flex items-center justify-center">
                <Zap className="text-yellow-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Waste & Users */}
          <Card className="eco-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Weekly Waste Collection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={adminWasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="waste"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--primary)", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Waste Type Distribution */}
          <Card className="eco-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Waste Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {wasteTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {wasteTypeDistribution.map((type) => (
                <div key={type.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                    <span className="text-muted-foreground">{type.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{type.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Vehicle Routes Performance */}
        <Card className="eco-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Vehicle Routes Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                }}
              />
              <Bar dataKey="trips" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="distance" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Routes Table */}
        <Card className="eco-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Route Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Route</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Trips</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Distance (km)</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Cost</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicleData.map((route) => (
                  <tr key={route.name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{route.name}</td>
                    <td className="px-6 py-4 text-foreground">{route.trips}</td>
                    <td className="px-6 py-4 text-foreground">{route.distance}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">${route.cost}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
