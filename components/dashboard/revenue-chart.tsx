"use client"

import { Card } from "@/components/ui/card"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const data = [
  { month: "Jan", revenue: 2400 },
  { month: "Feb", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 3908 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
  { month: "Jul", revenue: 4300 },
]

const CustomXAxis = ({ ...props }) => (
  <XAxis
    {...props}
    stroke="#888888"
    fontSize={12}
    tickLine={false}
    axisLine={false}
  />
)

const CustomYAxis = ({ ...props }) => (
  <YAxis
    {...props}
    stroke="#888888"
    fontSize={12}
    tickLine={false}
    axisLine={false}
    tickFormatter={(value) => `$${value}`}
  />
)

export function RevenueChart() {
  return (
    <Card className="col-span-4 p-6">
      <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <CustomXAxis dataKey="month" />
            <CustomYAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}