import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/auth" replace />;
  }

  // Si hay token, renderizar el componente hijo
  return <>{children}</>;
} 