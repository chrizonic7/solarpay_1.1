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
  FormDescription,
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  nationalId: z.string().min(6, "National ID must be at least 6 characters"),
  plan: z.string().min(1, "Please select a plan"),
  county: z.string().min(1, "Please select a county"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  notes: z.string().optional(),
})

interface AddCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isAgent?: boolean
  defaultValues?: Partial<z.infer<typeof formSchema>>
  onSuccess?: () => void
}

export function AddCustomerDialog({ 
  open, 
  onOpenChange, 
  isAgent = false,
  defaultValues,
  onSuccess,
}: AddCustomerDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      nationalId: "",
      plan: "",
      county: "",
      address: "",
      notes: defaultValues?.notes || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Customer added successfully")
    setIsLoading(false)
    onOpenChange(false)
    form.reset()
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter customer details to create a new account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bomi">Bomi</SelectItem>
                      <SelectItem value="bong">Bong</SelectItem>
                      <SelectItem value="gbarpolu">Gbarpolu</SelectItem>
                      <SelectItem value="grand_bassa">Grand Bassa</SelectItem>
                      <SelectItem value="grand_cape_mount">Grand Cape Mount</SelectItem>
                      <SelectItem value="grand_gedeh">Grand Gedeh</SelectItem>
                      <SelectItem value="grand_kru">Grand Kru</SelectItem>
                      <SelectItem value="lofa">Lofa</SelectItem>
                      <SelectItem value="margibi">Margibi</SelectItem>
                      <SelectItem value="maryland">Maryland</SelectItem>
                      <SelectItem value="montserrado">Montserrado</SelectItem>
                      <SelectItem value="nimba">Nimba</SelectItem>
                      <SelectItem value="rivercess">Rivercess</SelectItem>
                      <SelectItem value="river_gee">River Gee</SelectItem>
                      <SelectItem value="sinoe">Sinoe</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solar Plan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basic">Basic Plan (6 months)</SelectItem>
                      <SelectItem value="standard">Standard Plan (12 months)</SelectItem>
                      <SelectItem value="premium">Premium Plan (18 months)</SelectItem>
                      <SelectItem value="onetime">One-time Payment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Installation Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter complete installation address"
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Customer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}