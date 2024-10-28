"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, UserPlus, Phone, Mail, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"
import { toast } from "sonner"

// Sample data - In a real app, this would come from an API
const leads = [
  {
    id: "1",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1234567890",
    status: "hot",
    source: "Referral",
    notes: "Interested in premium package",
    lastContact: "2024-01-15",
    nextFollowUp: "2024-01-22",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1234567891",
    status: "warm",
    source: "Website",
    notes: "Requested pricing information",
    lastContact: "2024-01-14",
    nextFollowUp: "2024-01-21",
  },
  // Add more sample data as needed
]

type Lead = typeof leads[0]

interface LeadsTableProps {
  search: string
  onSearchChange: (value: string) => void
}

export function LeadsTable({ search, onSearchChange }: LeadsTableProps) {
  const [convertDialogOpen, setConvertDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleConvertToCustomer = (lead: Lead) => {
    setSelectedLead(lead)
    setConvertDialogOpen(true)
  }

  const columns: ColumnDef<Lead>[] = [
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
            variant={
              status === "hot"
                ? "destructive"
                : status === "warm"
                ? "default"
                : "secondary"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "source",
      header: "Source",
    },
    {
      accessorKey: "lastContact",
      header: "Last Contact",
    },
    {
      accessorKey: "nextFollowUp",
      header: "Next Follow-up",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const lead = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleConvertToCustomer(lead)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Convert to Customer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                Call Lead
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Follow-up
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.phone.includes(search)
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredLeads} />

      {selectedLead && (
        <AddCustomerDialog
          open={convertDialogOpen}
          onOpenChange={setConvertDialogOpen}
          isAgent={true}
          defaultValues={{
            name: selectedLead.name,
            email: selectedLead.email,
            phone: selectedLead.phone,
            notes: selectedLead.notes,
          }}
          onSuccess={() => {
            toast.success("Lead successfully converted to customer")
            // In a real app, you would remove the lead from the leads list
          }}
        />
      )}
    </div>
  )
}