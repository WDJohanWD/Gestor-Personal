import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext"

const Task = lazy(() => import("./sections/tasks/Task"));
const AuthPage = lazy(() => import("./sections/auth/Auth-page"));

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6 bg-background-main ">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
