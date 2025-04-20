import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(password);
    if (success) navigate("/dashboard");
    else setError("Contraseña incorrecta");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
