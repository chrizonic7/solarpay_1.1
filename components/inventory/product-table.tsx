"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Box } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "1",
    name: "Basic Solar Kit",
    sku: "BSK-001",
    category: "Solar Kits",
    status: "in_stock",
    quantity: 45,
    allocated: 12,
    price: 599.99,
    serialNumbers: ["SN001", "SN002", "SN003"],
  },
  {
    id: "2",
    name: "Premium Solar Panel",
    sku: "PSP-002",
    category: "Panels",
    status: "low_stock",
    quantity: 8,
    allocated: 5,
    price: 899.99,
    serialNumbers: ["SN004", "SN005"],
  },
  // Add more sample data as needed
]

type Product = typeof products[0]

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "in_stock"
              ? "default"
              : status === "low_stock"
              ? "secondary"
              : "destructive"
          }
        >
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "allocated",
    header: "Allocated",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      return `$${price.toFixed(2)}`
    },
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
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Box className="mr-2 h-4 w-4" />
              View Serial Numbers
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface ProductTableProps {
  search: string
}

export function ProductTable({ search }: ProductTableProps) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase())
  )

  return <DataTable columns={columns} data={filteredProducts} />
}