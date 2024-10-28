"use client"

import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPayments = [
  {
    id: 1,
    customer: "Sarah Johnson",
    amount: 250,
    status: "successful",
    date: "2024-01-15",
    method: "Mobile Money",
  },
  {
    id: 2,
    customer: "Michael Chen",
    amount: 180,
    status: "pending",
    date: "2024-01-14",
    method: "Bank Transfer",
  },
  {
    id: 3,
    customer: "Emma Davis",
    amount: 350,
    status: "successful",
    date: "2024-01-14",
    method: "Mobile Money",
  },
  {
    id: 4,
    customer: "James Wilson",
    amount: 200,
    status: "failed",
    date: "2024-01-13",
    method: "Card Payment",
  },
]

export function RecentPayments() {
  return (
    <Card className="col-span-3 p-6">
      <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
      <div className="space-y-4">
        {recentPayments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 rounded-lg bg-accent/50"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {payment.customer.split(" ").map((n) => n[0]).join("")}
                </div>
              </Avatar>
              <div>
                <p className="font-medium">{payment.customer}</p>
                <p className="text-sm text-muted-foreground">{payment.method}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">${payment.amount}</p>
              <Badge
                variant={
                  payment.status === "successful"
                    ? "default"
                    : payment.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
              >
                {payment.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}