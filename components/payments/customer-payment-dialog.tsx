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
import { toast } from "sonner"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").optional(),
})

interface CustomerPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerPaymentDialog({ open, onOpenChange }: CustomerPaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
      phoneNumber: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    toast.success("Payment processed successfully! New token will be activated shortly.")
    setIsLoading(false)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
          <DialogDescription>
            Pay for your solar system and receive a new token
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedMethod(value)
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="momo">Mobile Money</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedMethod === "momo" && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Money Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1234567890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  "Processing Payment..."
                ) : (
                  `Pay $${form.watch("amount") || "0.00"}`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}