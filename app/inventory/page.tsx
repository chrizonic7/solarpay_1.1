"use client"

import { useState } from "react"
import { PlusCircle, Search, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductTable } from "@/components/inventory/product-table"
import { AddProductDialog } from "@/components/inventory/add-product-dialog"
import { AllocateProductDialog } from "@/components/inventory/allocate-product-dialog"
import { Card } from "@/components/ui/card"

export default function InventoryPage() {
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [allocateOpen, setAllocateOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your solar system inventory and allocations</p>
        </div>
        <div className="space-x-4">
          <Button onClick={() => setAllocateOpen(true)} variant="outline">
            <Box className="mr-2 h-4 w-4" />
            Allocate to Agent
          </Button>
          <Button onClick={() => setAddProductOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Products</h3>
          <div className="text-2xl font-bold">245</div>
          <p className="text-sm text-muted-foreground">In stock</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Allocated</h3>
          <div className="text-2xl font-bold">82</div>
          <p className="text-sm text-muted-foreground">To agents</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Low Stock</h3>
          <div className="text-2xl font-bold text-yellow-600">12</div>
          <p className="text-sm text-muted-foreground">Items below threshold</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Out of Stock</h3>
          <div className="text-2xl font-bold text-red-600">3</div>
          <p className="text-sm text-muted-foreground">Need restock</p>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      <ProductTable search={search} />
      <AddProductDialog open={addProductOpen} onOpenChange={setAddProductOpen} />
      <AllocateProductDialog open={allocateOpen} onOpenChange={setAllocateOpen} />
    </div>
  )
}