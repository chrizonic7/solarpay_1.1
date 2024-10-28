"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data - In a real app, this would come from an API
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    status: "active",
    balance: 450,
    plan: "Premium",
    lastPayment: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    status: "pending",
    balance: 150,
    plan: "Basic",
    lastPayment: "2024-01-10",
  },
  // Add more sample data as needed
]

type Customer = typeof customers[0]

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.getValue("balance") as number
      return `$${balance.toFixed(2)}`
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "lastPayment",
    header: "Last Payment",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface CustomerTableProps {
  search: string
}

export function CustomerTable({ search }: CustomerTableProps) {
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search)
  )

  return <DataTable columns={columns} data={filteredCustomers} />
}