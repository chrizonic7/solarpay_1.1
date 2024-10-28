"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { CircleDollarSign, Users, Package, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: BarChart3,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: Package,
    },
    {
      name: "Agents",
      href: "/admin/agents",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    toast.success("Logged out successfully")
    router.push("/auth")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={cn(
        "bg-card p-6 shadow-lg transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="flex items-center gap-2 mb-8">
          <CircleDollarSign className="h-6 w-6 flex-shrink-0" />
          {!collapsed && <span className="text-lg font-bold">SolarPay Admin</span>}
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-4 px-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            Powered by Best Brains Technology Inc.
          </p>
        </footer>
      </div>
    </div>
  )
}