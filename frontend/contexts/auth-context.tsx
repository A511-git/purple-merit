"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { authClient, type User } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast";
import { normalizeApiError } from "@/lib/api-error";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { email?: string; fullName?: string }) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  /* ---------- Init auth ---------- */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await authClient.getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);


  /* ---------- Login ---------- */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await authClient.login({ email, password });
      setUser(userData);

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      const { message } = normalizeApiError(error, "Login failed");

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Register ---------- */
  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      await authClient.register({ email, password, fullName });

      toast({
        title: "Success",
        description: "Account created successfully. Please log in.",
      });
    } catch (error) {
      const { message } = normalizeApiError(error, "Registration failed");

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Logout ---------- */
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);

    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  /* ---------- Update profile ---------- */
  const updateProfile = async (data: {
    email?: string;
    fullName?: string;
  }) => {
    setIsLoading(true);
    try {
      const updatedUser = await authClient.updateProfile(data);
      setUser(updatedUser);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      const { message } = normalizeApiError(
        error,
        "Failed to update profile"
      );

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Update password ---------- */
  const updatePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    try {
      await authClient.updatePassword(oldPassword, newPassword);

      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error) {
      const { message } = normalizeApiError(
        error,
        "Failed to update password"
      );

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
