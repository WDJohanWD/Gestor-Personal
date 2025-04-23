import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import { Home } from "./sections/Home";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./sections/Login";
import Register from "./sections/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Finance from "./sections/finance/Finance";


function Layout() {
  const { isAuthenticated, hasPasswordStored } = useAuth();
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = isAuthenticated && !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-1 overflow-y-auto p-6 bg-background-main ">
        <Routes>
          {!hasPasswordStored() ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/register" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Navigate to="/login" />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
