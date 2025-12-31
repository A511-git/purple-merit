"use client"

import { useEffect, useState } from "react"
import { authClient, type User } from "@/lib/auth-client"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Pagination = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function AdminUsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadUsers(currentPage)
  }, [currentPage])

  const loadUsers = async (page: number) => {
    setIsLoading(true)
    try {
      const res = await authClient.getUsers(page)
      setUsers(res.users)
      setPagination(res.pagination)
    } catch {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (
    userId: string,
    currentStatus: "ACTIVE" | "INACTIVE"
  ) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"

    try {
      await authClient.updateUserStatus(userId, newStatus)

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u
        )
      )

      toast({
        title: "Success",
        description: `User ${newStatus.toLowerCase()}`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell className="capitalize">
                    {user.role.toLowerCase()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "ACTIVE"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant={
                            user.status === "ACTIVE"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {user.status === "ACTIVE"
                            ? "Deactivate"
                            : "Activate"}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogTitle>
                          {user.status === "ACTIVE"
                            ? "Deactivate User"
                            : "Activate User"}
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          Are you sure you want to{" "}
                          {user.status === "ACTIVE"
                            ? "deactivate"
                            : "activate"}{" "}
                          {user.email}?
                        </AlertDialogDescription>

                        <div className="flex gap-4">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleStatusChange(user._id, user.status)
                            }
                          >
                            {user.status === "ACTIVE"
                              ? "Deactivate"
                              : "Activate"}
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {pagination?.page ?? 1} of{" "}
          {pagination?.totalPages ?? 1} (
          {pagination?.totalItems ?? users.length} total users)
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={!pagination?.hasPrev}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={!pagination?.hasNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
