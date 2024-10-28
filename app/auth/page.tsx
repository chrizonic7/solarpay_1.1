"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CircleDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"

export default function AuthPage() {
  const [role, setRole] = useState("admin")
  const router = useRouter()

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <CircleDollarSign className="h-6 w-6" />
          <span className="text-lg font-bold">SolarPay</span>
        </div>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Choose your role and sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={role} onValueChange={setRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="agent">Agent</TabsTrigger>
            <TabsTrigger value="customer">Customer</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <LoginForm role="admin" />
          </TabsContent>
          <TabsContent value="agent">
            <LoginForm role="agent" />
          </TabsContent>
          <TabsContent value="customer">
            <LoginForm role="customer" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}