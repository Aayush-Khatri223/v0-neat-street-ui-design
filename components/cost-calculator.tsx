"use client"

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const costData = [
  { type: "Organic", cost: 0, color: "var(--primary)" },
  { type: "Plastic", cost: 4.5, color: "var(--secondary)" },
  { type: "Metal", cost: 8.0, color: "var(--accent)" },
  { type: "Paper", cost: 2.0, color: "var(--soft-yellow)" },
]

const vehicleCostData = [
  { vehicle: "Vehicle 1", fuel: 45, maintenance: 25, insurance: 60, route: "Route A" },
  { vehicle: "Vehicle 2", fuel: 52, maintenance: 15, insurance: 60, route: "Route B" },
  { vehicle: "Vehicle 3", fuel: 38, maintenance: 40, insurance: 60, route: "Route C" },
  { vehicle: "Vehicle 4", fuel: 48, maintenance: 20, insurance: 60, route: "Route D" },
]

const monthlyData = [
  { week: "Week 1", waste: 8, vehicle: 35 },
  { week: "Week 2", waste: 9, vehicle: 38 },
  { week: "Week 3", waste: 10, vehicle: 40 },
  { week: "Week 4", waste: 8.5, vehicle: 36 },
]

export default function CostCalculator() {
  const [activeTab, setActiveTab] = useState<"waste" | "vehicle">("waste")

  const wasteTotalCost = costData.reduce((sum, item) => sum + item.cost, 0)
  const vehicleTotalCost = vehicleCostData.reduce((sum, item) => sum + item.fuel + item.maintenance + item.insurance, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-background/80 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-2">
          <h1 className="text-4xl font-bold text-foreground mb-1 tracking-tight">Cost Tracker</h1>
          <p className="text-muted-foreground text-lg">Monitor disposal and vehicle costs</p>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("waste")}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "waste"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-border/60"
            }`}
          >
            Waste Costs
          </button>
          <button
            onClick={() => setActiveTab("vehicle")}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "vehicle"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-border/60"
            }`}
          >
            Vehicle Costs
          </button>
        </div>

        {activeTab === "waste" && (
          <>
            {/* Waste Costs Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="eco-card p-6 bg-gradient-to-br from-white to-accent/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  Total Cost This Month
                </p>
                <p className="text-4xl font-bold text-foreground">${wasteTotalCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">↓ 12% from last month</p>
              </Card>

              <Card className="eco-card p-6 bg-gradient-to-br from-white to-primary/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  Average per Week
                </p>
                <p className="text-4xl font-bold text-primary">${(wasteTotalCost / 4).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">Stable spending</p>
              </Card>

              <Card className="eco-card p-6 bg-gradient-to-br from-white to-secondary/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  Projections Next Month
                </p>
                <p className="text-4xl font-bold text-secondary">${(wasteTotalCost * 1.05).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">Based on trends</p>
              </Card>
            </div>

            {/* Waste Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="eco-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Cost by Waste Type</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="type" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="cost" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="eco-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costData.filter((item) => item.cost > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="cost"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Waste Municipal Rates Table */}
            <Card className="eco-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Municipal Waste Rates</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Waste Type</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Per kg</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Collection Frequency</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Organic", rate: "$0.00/kg", freq: "Weekly", updated: "Jan 2025" },
                      { type: "Plastic", rate: "$1.50/kg", freq: "Bi-weekly", updated: "Jan 2025" },
                      { type: "Metal", rate: "$2.00/kg", freq: "Monthly", updated: "Jan 2025" },
                      { type: "Paper", rate: "$0.50/kg", freq: "Bi-weekly", updated: "Jan 2025" },
                      { type: "Glass", rate: "$0.75/kg", freq: "Monthly", updated: "Jan 2025" },
                    ].map((row) => (
                      <tr
                        key={row.type}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-foreground">{row.type}</td>
                        <td className="px-6 py-4 text-foreground">{row.rate}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.freq}</td>
                        <td className="px-6 py-4 text-muted-foreground">{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {activeTab === "vehicle" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="eco-card p-6 bg-gradient-to-br from-white to-accent/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  Total Vehicle Cost This Month
                </p>
                <p className="text-4xl font-bold text-foreground">${vehicleTotalCost.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">4 active vehicles</p>
              </Card>

              <Card className="eco-card p-6 bg-gradient-to-br from-white to-primary/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                  Average per Vehicle
                </p>
                <p className="text-4xl font-bold text-primary">${(vehicleTotalCost / 4).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">Monthly cost</p>
              </Card>

              <Card className="eco-card p-6 bg-gradient-to-br from-white to-secondary/10 hover:shadow-md">
                <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Cost per km</p>
                <p className="text-4xl font-bold text-secondary">$0.58</p>
                <p className="text-xs text-muted-foreground mt-2">Average efficiency</p>
              </Card>
            </div>

            {/* Vehicle Cost Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="eco-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Combined Costs & Waste</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="waste" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="vehicle" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="eco-card p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Vehicle Cost Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Fuel", value: 40, color: "hsl(142, 70%, 50%)" },
                        { name: "Maintenance", value: 35, color: "hsl(220, 70%, 50%)" },
                        { name: "Insurance", value: 25, color: "hsl(55, 70%, 50%)" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Fuel", value: 40, color: "hsl(142, 70%, 50%)" },
                        { name: "Maintenance", value: 35, color: "hsl(220, 70%, 50%)" },
                        { name: "Insurance", value: 25, color: "hsl(55, 70%, 50%)" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="eco-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 tracking-tight">Vehicle Cost Details</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Vehicle</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Fuel Cost</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Maintenance</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Insurance</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Total Cost</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Route</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleCostData.map((vehicle) => {
                      const totalCost = vehicle.fuel + vehicle.maintenance + vehicle.insurance
                      return (
                        <tr
                          key={vehicle.vehicle}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 font-medium text-foreground">{vehicle.vehicle}</td>
                          <td className="px-6 py-4 text-foreground">${vehicle.fuel}</td>
                          <td className="px-6 py-4 text-foreground">${vehicle.maintenance}</td>
                          <td className="px-6 py-4 text-foreground">${vehicle.insurance}</td>
                          <td className="px-6 py-4 font-semibold text-foreground">${totalCost}</td>
                          <td className="px-6 py-4 text-foreground">{vehicle.route}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
