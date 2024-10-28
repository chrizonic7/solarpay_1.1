"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CustomerTable } from "@/components/customers/customer-table"
import { Button } from "@/components/ui/button"
import { UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"

export default function AgentCustomersPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Customers</h1>
          <p className="text-muted-foreground">Manage your assigned customers</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>

        <CustomerTable search={search} />
      </Card>

      <AddCustomerDialog 
        open={open} 
        onOpenChange={setOpen}
        isAgent={true}
      />
    </div>
  )
}