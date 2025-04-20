import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import { Home } from "./sections/Home";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./sections/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {isAuthenticated && <Navbar />}
      <main className="flex-1 overflow-y-auto p-6 bg-background-main ">
        <Routes>
          <Route path="/" element={<PrivateRoute> <Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
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
