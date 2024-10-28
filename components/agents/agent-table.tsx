"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, UserCog, Ban } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const agents = [
  {
    id: "1",
    name: "John Smith",
    email: "john@solarpay.com",
    phone: "+1234567890",
    county: "Montserrado",
    status: "active",
    customers: 45,
    sales: 78900,
    commission: 7890,
    lastActive: "2024-01-15",
    emailConfirmed: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@solarpay.com",
    phone: "+1234567891",
    county: "Margibi",
    status: "pending",
    customers: 38,
    sales: 65400,
    commission: 6540,
    lastActive: "2024-01-14",
    emailConfirmed: false,
  },
]

type Agent = typeof agents[0]

const columns: ColumnDef<Agent>[] = [
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
    accessorKey: "county",
    header: "County",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const emailConfirmed = row.original.emailConfirmed

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
          {!emailConfirmed && (
            <Badge variant="outline">Unconfirmed</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "customers",
    header: "Customers",
  },
  {
    accessorKey: "sales",
    header: "Total Sales",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sales"))
      return `$${amount.toLocaleString()}`
    },
  },
  {
    accessorKey: "commission",
    header: "Commission",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("commission"))
      return `$${amount.toLocaleString()}`
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const agent = row.original

      const handleResendEmail = () => {
        toast.success(`Confirmation email resent to ${agent.email}`)
      }

      const handleEditAgent = () => {
        toast.success("Agent details updated successfully")
      }

      const handleDeactivate = () => {
        toast.success("Agent account deactivated")
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!agent.emailConfirmed && (
              <DropdownMenuItem onClick={handleResendEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Resend Email
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleEditAgent}>
              <UserCog className="mr-2 h-4 w-4" />
              Edit Agent
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDeactivate}
              className="text-destructive"
            >
              <Ban className="mr-2 h-4 w-4" />
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface AgentTableProps {
  search: string
}

export function AgentTable({ search }: AgentTableProps) {
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase()) ||
    agent.email.toLowerCase().includes(search.toLowerCase()) ||
    agent.phone.includes(search) ||
    agent.county.toLowerCase().includes(search.toLowerCase())
  )

  return <DataTable columns={columns} data={filteredAgents} />
}