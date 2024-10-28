"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Sun, Battery, Calendar, Download, HeadphonesIcon } from "lucide-react"
import { TokenHistory } from "@/components/tokens/token-history"
import { CustomerPaymentDialog } from "@/components/payments/customer-payment-dialog"
import { toast } from "sonner"

export default function CustomerDashboard() {
  const [paymentOpen, setPaymentOpen] = useState(false)
  // In a real app, this would come from authentication context
  const customerId = "1"

  const handleDownloadStatement = () => {
    toast.success("Statement downloaded successfully")
  }

  const handleContactSupport = () => {
    toast.success("Support ticket created. Our team will contact you shortly.")
  }

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Solar System</h1>
          <p className="text-muted-foreground">Monitor your solar system and payments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="System Status"
            value="Active"
            description="Premium Package"
            trend="up"
            percentage="98% uptime"
          />
          <StatsCard
            title="Current Token"
            value="ABC123XYZ"
            description="Expires in 15 days"
            trend="up"
            percentage="Active"
          />
          <StatsCard
            title="Power Generated"
            value="1,234 kWh"
            description="This month"
            trend="up"
            percentage="+10.2%"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">System Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Sun className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Solar Panels</p>
                  <p className="text-sm text-muted-foreground">4 x 400W Panels</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Battery className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Battery Storage</p>
                  <p className="text-sm text-muted-foreground">5kWh Capacity</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">Installation Date</p>
                  <p className="text-sm text-muted-foreground">January 15, 2024</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center justify-center gap-2" 
                onClick={() => setPaymentOpen(true)}
              >
                <Battery className="h-4 w-4" />
                Make a Payment
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleDownloadStatement}
              >
                <Download className="h-4 w-4" />
                Download Statement
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleContactSupport}
              >
                <HeadphonesIcon className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>

        <TokenHistory customerId={customerId} showFilters={false} />
      </div>

      <CustomerPaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen}
      />
    </div>
  )
}