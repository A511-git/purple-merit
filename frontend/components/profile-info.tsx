"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileInfo() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          <p className="text-lg font-semibold">{user.fullName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <p className="text-lg font-semibold capitalize">{user.role.toLowerCase()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              user.status === "ACTIVE"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {user.status}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
