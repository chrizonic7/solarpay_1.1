"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentPayments } from "@/components/dashboard/recent-payments"
import { Button } from "@/components/ui/button"
import { Users, Package, Wallet, Plus } from "lucide-react"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"

export default function AdminDashboard() {
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your admin dashboard</p>
          </div>
          <Button onClick={() => setAddCustomerOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231"
            description="Monthly revenue"
            trend="up"
            percentage="+20.1%"
          />
          <StatsCard
            title="Active Customers"
            value="2,345"
            description="Across all regions"
            trend="up"
            percentage="+15.2%"
          />
          <StatsCard
            title="Active Devices"
            value="1,789"
            description="Connected systems"
            trend="up"
            percentage="+12.3%"
          />
          <StatsCard
            title="Token Generation"
            value="4,567"
            description="Monthly tokens"
            trend="up"
            percentage="+18.4%"
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
          <RevenueChart />
          <RecentPayments />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Top Performing Agents</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">$12,234 in sales</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">$10,456 in sales</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Emma Davis</p>
                  <p className="text-sm text-muted-foreground">$9,876 in sales</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Basic Solar Kits</p>
                  <p className="text-sm text-muted-foreground">45 units in stock</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Premium Panels</p>
                  <p className="text-sm text-muted-foreground">28 units in stock</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Battery Packs</p>
                  <p className="text-sm text-muted-foreground">34 units in stock</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent System Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Low Battery Alert</p>
                  <p className="text-sm text-muted-foreground">3 systems affected</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Token Expiring Soon</p>
                  <p className="text-sm text-muted-foreground">12 customers</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Maintenance Due</p>
                  <p className="text-sm text-muted-foreground">8 systems</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <AddCustomerDialog 
          open={addCustomerOpen} 
          onOpenChange={setAddCustomerOpen}
        />
      </div>
    </div>
  )
}