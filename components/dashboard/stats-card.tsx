import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  trend: "up" | "down"
  percentage: string
}

export function StatsCard({ title, value, description, trend, percentage }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="flex items-center pt-2">
          {trend === "up" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} ml-1`}>
            {percentage}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}