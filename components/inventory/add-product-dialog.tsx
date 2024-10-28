"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  quantity: z.string().min(1, "Quantity is required"),
  price: z.string().min(1, "Price is required"),
  serialNumbers: z.string().optional(),
  description: z.string().optional(),
  tokens: z.object({
    oneTime: z.string().optional(),
    sixMonths: z.string().optional(),
    twelveMonths: z.string().optional(),
    eighteenMonths: z.string().optional(),
  }),
})

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      quantity: "",
      price: "",
      serialNumbers: "",
      description: "",
      tokens: {
        oneTime: "",
        sixMonths: "",
        twelveMonths: "",
        eighteenMonths: "",
      },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Product and tokens added successfully")
    setIsLoading(false)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product with pre-generated tokens for different payment plans
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="tokens">Payment Tokens</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Basic Solar Kit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="BSK-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kits">Solar Kits</SelectItem>
                          <SelectItem value="panels">Solar Panels</SelectItem>
                          <SelectItem value="batteries">Batteries</SelectItem>
                          <SelectItem value="inverters">Inverters</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="serialNumbers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Numbers</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter serial numbers (one per line)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Product description..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="tokens" className="space-y-4">
                <FormField
                  control={form.control}
                  name="tokens.oneTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Payment Tokens</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tokens for one-time payment (one per line)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokens.sixMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>6-Month Plan Tokens</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tokens for 6-month plan (one per line, 6 tokens per product)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokens.twelveMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>12-Month Plan Tokens</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tokens for 12-month plan (one per line, 12 tokens per product)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokens.eighteenMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>18-Month Plan Tokens</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter tokens for 18-month plan (one per line, 18 tokens per product)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}