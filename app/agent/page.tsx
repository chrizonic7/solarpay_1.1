"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, Package, Wallet, Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReceivePaymentDialog } from "@/components/payments/receive-payment-dialog"
import { TokenHistory } from "@/components/tokens/token-history"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"

export default function AgentDashboard() {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage your customers and track sales</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setCustomerDialogOpen(true)} variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
            <Button onClick={() => setPaymentDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Receive Payment & Generate Token
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="My Customers"
            value="156"
            description="Active customers"
            trend="up"
            percentage="+12.3%"
          />
          <StatsCard
            title="Monthly Sales"
            value="$12,234"
            description="This month"
            trend="up"
            percentage="+8.2%"
          />
          <StatsCard
            title="Commission"
            value="$1,845"
            description="Earned this month"
            trend="up"
            percentage="+15.3%"
          />
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
              <Wallet className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Token Generated</p>
                <p className="text-sm text-muted-foreground">ABC123XYZ - John Doe</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">New Customer Onboarded</p>
                <p className="text-sm text-muted-foreground">Jane Smith - Basic Solar Package</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">System Installation</p>
                <p className="text-sm text-muted-foreground">Premium Solar Package - Completed</p>
              </div>
            </div>
          </div>
        </Card>

        <TokenHistory showFilters={true} />

        <ReceivePaymentDialog 
          open={paymentDialogOpen} 
          onOpenChange={setPaymentDialogOpen} 
        />

        <AddCustomerDialog 
          open={customerDialogOpen} 
          onOpenChange={setCustomerDialogOpen}
          isAgent={true}
        />
      </div>
    </div>
  )
}