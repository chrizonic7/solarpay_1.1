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
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  county: z.string().min(1, "Please select a county"),
  commission: z.string().min(1, "Commission rate is required"),
  sendWelcomeKit: z.boolean().default(true),
})

interface AddAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAgentDialog({ open, onOpenChange }: AddAgentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      county: "",
      commission: "",
      sendWelcomeKit: true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      // Simulate API call to create agent
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message with email details
      toast.success(
        <div className="space-y-2">
          <p>Agent added successfully!</p>
          <p className="text-sm text-muted-foreground">
            Confirmation email sent to {values.email}
          </p>
        </div>
      )

      // If welcome kit is enabled, show additional message
      if (values.sendWelcomeKit) {
        toast.success(
          <div className="space-y-2">
            <p>Welcome kit will be sent to the agent</p>
            <p className="text-sm text-muted-foreground">
              Including training materials and marketing collateral
            </p>
          </div>
        )
      }

      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to create agent account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Agent</DialogTitle>
          <DialogDescription>
            Add a new sales agent to your team. They will receive an email to complete their registration.
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
                    <Input placeholder="John Smith" {...field} />
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
                  <FormDescription>
                    Agent will receive a confirmation email at this address
                  </FormDescription>
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
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commission Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="100" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sendWelcomeKit"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Send Welcome Kit</FormLabel>
                    <FormDescription>
                      Include training materials and marketing collateral
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Agent"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}