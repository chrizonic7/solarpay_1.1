"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CircleDollarSign } from "lucide-react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/auth")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex items-center gap-2">
        <CircleDollarSign className="h-8 w-8 animate-pulse" />
        <span className="text-xl font-bold">Loading SolarPay...</span>
      </div>
    </div>
  )
}