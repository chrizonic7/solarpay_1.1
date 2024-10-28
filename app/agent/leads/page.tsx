"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeadsTable } from "@/components/leads/leads-table"
import { AddLeadDialog } from "@/components/leads/add-lead-dialog"
import { StatsCard } from "@/components/dashboard/stats-card"

export default function LeadsPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Leads</h1>
          <p className="text-muted-foreground">Manage your prospective customers</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value="24"
          description="Active leads"
          trend="up"
          percentage="+12.5%"
        />
        <StatsCard
          title="Hot Leads"
          value="8"
          description="High probability"
          trend="up"
          percentage="+33.2%"
        />
        <StatsCard
          title="This Month"
          value="15"
          description="New leads"
          trend="up"
          percentage="+20.1%"
        />
        <StatsCard
          title="Conversion Rate"
          value="45%"
          description="Lead to customer"
          trend="up"
          percentage="+5.2%"
        />
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Lead Pipeline</h2>
          <p className="text-sm text-muted-foreground">Track and manage your sales pipeline</p>
        </div>
        <LeadsTable search={search} onSearchChange={setSearch} />
      </Card>

      <AddLeadDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}