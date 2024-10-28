"use client"

import { useState } from "react"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomerTable } from "@/components/customers/customer-table"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"

export default function CustomersPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base and their solar systems</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex items-center gap-4">
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
      <AddCustomerDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}