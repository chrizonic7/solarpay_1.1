"use client"

import { Card } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { TokenHistory } from "@/components/tokens/token-history"

export default function AgentReportsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View your performance metrics and analytics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Sales"
          value="$12,234"
          description="This month"
          trend="up"
          percentage="+8.2%"
        />
        <StatsCard
          title="Active Customers"
          value="156"
          description="Total customers"
          trend="up"
          percentage="+12.3%"
        />
        <StatsCard
          title="Commission"
          value="$1,845"
          description="This month"
          trend="up"
          percentage="+15.3%"
        />
        <StatsCard
          title="Conversion Rate"
          value="45%"
          description="Lead to customer"
          trend="up"
          percentage="+5.2%"
        />
      </div>

      <RevenueChart />

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-6">Token Generation History</h2>
        <TokenHistory showFilters={true} />
      </Card>
    </div>
  )
}