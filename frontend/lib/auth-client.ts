import { http } from "./http";

/* =========================
   Types
========================= */

export interface User {
  _id: string;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

/* =========================
   Auth Client
========================= */

class AuthClient {
  /* ---------- AUTH ---------- */

  async login(data: LoginPayload): Promise<User> {
    const res = await http.post("/user/login", data);

    const token = res.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Missing access token");

    localStorage.setItem("accessToken", token);
    return res.data.data ?? res.data;
  }

  async register(data: RegisterPayload): Promise<void> {
    await http.post("/user/register", data);
  }

  async logout() {
    localStorage.removeItem("accessToken");
  }

  /* ---------- USER ---------- */

  async getProfile(): Promise<User> {
    const res = await http.get("/user/profile");
    return res.data.data ?? res.data;
  }

  async updateProfile(data: {
    email?: string;
    fullName?: string;
  }): Promise<User> {
    const res = await http.put("/user/profile", data);
    return res.data.data ?? res.data;
  }

  async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await http.put("/user/profile/password", {
      oldPassword,
      newPassword,
    });
  }

  /* ---------- ADMIN ---------- */

  async getUsers(): Promise<User[]> {
    const res = await http.get("/admin/users");
    return res.data.data ?? res.data;
  }

  async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "INACTIVE"
  ): Promise<User> {
    const res = await http.put(`/admin/users/${userId}`, { status });
    return res.data.data ?? res.data;
  }
}

export const authClient = new AuthClient();
