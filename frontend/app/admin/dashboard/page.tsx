import { ProtectedRoute } from "@/components/protected-route"
import { AdminUsersTable } from "@/components/admin-users-table"

export const metadata = {
  title: "Admin Dashboard",
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage users and their access</p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Users</h2>
            <AdminUsersTable />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
