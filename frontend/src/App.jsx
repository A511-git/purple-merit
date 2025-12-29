import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

import GlobalDashboard from "./components/dashboard/GlobalDashboard";
import AdminUsersTable from "./components/dashboard/AdminUsersTable";
import UserProfile from "./components/dashboard/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<GlobalDashboard />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* Admin-only */}
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersTable />
              </AdminRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
