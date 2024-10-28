"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Token {
  id: string
  token: string
  customerId: string
  customerName: string
  productId: string
  productName: string
  generatedAt: string
  expiresAt: string
  amount: number
  status: "active" | "expired" | "pending"
}

// Sample data - In a real app, this would come from an API
const tokens: Token[] = [
  {
    id: "1",
    token: "ABC123XYZ",
    customerId: "1",
    customerName: "John Doe",
    productId: "1",
    productName: "Basic Solar Kit",
    generatedAt: "2024-01-15",
    expiresAt: "2024-02-15",
    amount: 150,
    status: "active",
  },
  {
    id: "2",
    token: "DEF456UVW",
    customerId: "1",
    customerName: "John Doe",
    productId: "1",
    productName: "Basic Solar Kit",
    generatedAt: "2023-12-15",
    expiresAt: "2024-01-15",
    amount: 150,
    status: "expired",
  },
  {
    id: "3",
    token: "GHI789RST",
    customerId: "2",
    customerName: "Jane Smith",
    productId: "2",
    productName: "Premium Solar Panel",
    generatedAt: "2024-02-15",
    expiresAt: "2024-03-15",
    amount: 200,
    status: "pending",
  },
]

interface TokenHistoryProps {
  customerId?: string
  productId?: string
  showFilters?: boolean
}

export function TokenHistory({ customerId, productId, showFilters = true }: TokenHistoryProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>(customerId || "all")
  const [selectedProduct, setSelectedProduct] = useState<string>(productId || "all")
  const [search, setSearch] = useState("")

  // Get unique customers and products for filters
  const customers = Array.from(new Set(tokens.map(t => t.customerId))).map(id => ({
    id,
    name: tokens.find(t => t.customerId === id)?.customerName || ""
  }))

  const products = Array.from(new Set(tokens.map(t => t.productId))).map(id => ({
    id,
    name: tokens.find(t => t.productId === id)?.productName || ""
  }))

  // Filter tokens based on selection and search
  const filteredTokens = tokens.filter(token => {
    const matchesCustomer = selectedCustomer === "all" || token.customerId === selectedCustomer
    const matchesProduct = selectedProduct === "all" || token.productId === selectedProduct
    const matchesSearch = !search || 
      token.token.toLowerCase().includes(search.toLowerCase()) ||
      token.customerName.toLowerCase().includes(search.toLowerCase()) ||
      token.productName.toLowerCase().includes(search.toLowerCase())
    
    return matchesCustomer && matchesProduct && matchesSearch
  })

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Token History</h2>
        {showFilters && (
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            {!customerId && (
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {!productId && (
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            {!customerId && <TableHead>Customer</TableHead>}
            {!productId && <TableHead>Product</TableHead>}
            <TableHead>Generated</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTokens.map((token) => (
            <TableRow key={token.id}>
              <TableCell className="font-mono">{token.token}</TableCell>
              {!customerId && <TableCell>{token.customerName}</TableCell>}
              {!productId && <TableCell>{token.productName}</TableCell>}
              <TableCell>{token.generatedAt}</TableCell>
              <TableCell>{token.expiresAt}</TableCell>
              <TableCell>${token.amount}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    token.status === "active"
                      ? "default"
                      : token.status === "expired"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {token.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {filteredTokens.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No tokens found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}