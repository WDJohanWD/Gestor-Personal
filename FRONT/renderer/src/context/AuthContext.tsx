import { createContext, useContext, useState, ReactNode } from "react";
import bcrypt from "bcryptjs";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  hasPasswordStored: () => boolean;

};
const hasPasswordStored = (): boolean => {
  return !!localStorage.getItem("passwordHash");
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string) => {
    const storedHash = localStorage.getItem("passwordHash");
    if (!storedHash) return false;
    const success = bcrypt.compareSync(password, storedHash);
    if (success) setIsAuthenticated(true);
    return success;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, hasPasswordStored }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
