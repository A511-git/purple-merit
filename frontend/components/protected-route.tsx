"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "ADMIN" | "USER"
}

export function ProtectedRoute({ children, requiredRole = "USER" }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole === "ADMIN" && user?.role !== "ADMIN") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, isLoading, requiredRole, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole === "ADMIN" && user?.role !== "ADMIN") {
    return null
  }

  return <>{children}</>
}
