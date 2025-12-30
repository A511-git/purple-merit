"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user?.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else if (isAuthenticated) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [isAuthenticated, user, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-muted-foreground">Loading...</div>
    </div>
  )
}
