"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authClient, type User } from "@/lib/auth-client"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
  updateProfile: (data: { email?: string; fullName?: string }) => Promise<void>
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // If accessToken exists, interceptor will attach it
        const profile = await authClient.getProfile()
        setUser(profile)
      } catch {
        localStorage.removeItem("accessToken")
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])


  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { user: userData } = await authClient.login({ email, password })
      setUser(userData)
      toast({ title: "Success", description: "Logged in successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true)
    try {
      await authClient.register({ email, password, fullName })
      toast({
        title: "Success",
        description: "Account created successfully. Please log in.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setUser(null)
    toast({ title: "Success", description: "Logged out successfully" })
  }


  const updateProfile = async (data: { email?: string; fullName?: string }) => {
    setIsLoading(true)
    try {
      const updatedUser = await authClient.updateProfile(data)
      setUser(updatedUser)
      toast({ title: "Success", description: "Profile updated successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true)
    try {
      await authClient.updatePassword(oldPassword, newPassword)
      toast({ title: "Success", description: "Password updated successfully" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
