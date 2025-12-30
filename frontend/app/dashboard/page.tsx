import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="USER">
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to your dashboard</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/profile" className="text-primary hover:underline">
                    View Profile
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-primary hover:underline">
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
