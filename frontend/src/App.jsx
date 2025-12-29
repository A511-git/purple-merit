import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './contexts/AuthContext';
import { useToast, ToastContainer } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserProfile } from './components/dashboard/UserProfile';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/profile" replace />;

  return children;
};

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { toasts, showToast } = useToast();

  return (
    <Router>
      {isAuthenticated && <Navbar showToast={showToast} />}
      <Routes>
        <Route path="/login" element={<LoginPage showToast={showToast} />} />
        <Route path="/signup" element={<SignupPage showToast={showToast} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard showToast={showToast} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile showToast={showToast} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/profile" replace />} />
      </Routes>
      <ToastContainer toasts={toasts} />
    </Router>
  );
}
