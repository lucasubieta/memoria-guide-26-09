import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, User } from "@/services/auth.service";

export type UserRole = "coordinador" | "profesor";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasRole: (role: UserRole) => boolean;
  canUploadMemoria: () => boolean;
  canDeleteMemoria: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Si hay error, limpiar cualquier token inválido
        localStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  const canUploadMemoria = () => {
    return user?.role === "coordinador";
  };

  const canDeleteMemoria = () => {
    return user?.role === "coordinador";
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        hasRole, 
        canUploadMemoria, 
        canDeleteMemoria,
        login,
        logout,
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}