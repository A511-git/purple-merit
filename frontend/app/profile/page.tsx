import { ProtectedRoute } from "@/components/protected-route"
import { ProfileInfo } from "@/components/profile-info"
import { ProfileEditForm } from "@/components/profile-edit-form"

export const metadata = {
  title: "User Profile",
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="USER">
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account information</p>
          </div>

          <div className="space-y-6">
            <ProfileInfo />
            <ProfileEditForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
