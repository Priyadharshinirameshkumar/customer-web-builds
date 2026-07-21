import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAuthenticatedAdmin, loginAdmin } from "../services/auth.service";
import type { AdminUser } from "../types/auth.types";
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from "../utils/authStorage";

interface AuthContextValue {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bootstrapAuth = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getAuthenticatedAdmin();
      setAdmin(response.data);
    } catch {
      clearAuthToken();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginAdmin({ email, password });
    setAuthToken(response.data.token);
    setAdmin(response.data.admin);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      isLoading,
      login,
      logout,
    }),
    [admin, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
