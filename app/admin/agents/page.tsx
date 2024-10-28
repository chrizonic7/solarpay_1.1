"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { AgentTable } from "@/components/agents/agent-table"
import { Button } from "@/components/ui/button"
import { UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AddAgentDialog } from "@/components/agents/add-agent-dialog"
import { StatsCard } from "@/components/dashboard/stats-card"

export default function AdminAgentsPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Agents</h1>
          <p className="text-muted-foreground">Manage your sales team and their performance</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Agents"
          value="24"
          description="Active agents"
          trend="up"
          percentage="+12.5%"
        />
        <StatsCard
          title="Top Performers"
          value="8"
          description="Above target"
          trend="up"
          percentage="+33.2%"
        />
        <StatsCard
          title="This Month"
          value="15"
          description="New agents"
          trend="up"
          percentage="+20.1%"
        />
        <StatsCard
          title="Commission Paid"
          value="$45,678"
          description="This month"
          trend="up"
          percentage="+15.2%"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>

        <AgentTable search={search} />
      </Card>

      <AddAgentDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}