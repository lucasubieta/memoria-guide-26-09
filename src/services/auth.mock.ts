import { LoginRequest, LoginResponse, User } from "./auth.service";

// Usuarios mock para desarrollo
const MOCK_USERS = [
  {
    id: "coord-1",
    name: "Dr. Ana García",
    email: "coordinador@universidad.edu",
    password: "123456",
    role: "coordinador" as const,
  },
  {
    id: "prof-1", 
    name: "Prof. Carlos Ruiz",
    email: "profesor@universidad.edu",
    password: "123456",
    role: "profesor" as const,
  },
];

export class MockAuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error("Credenciales incorrectas");
    }

    this.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const response: LoginResponse = {
      token: `mock-token-${user.id}-${Date.now()}`,
      user: this.currentUser,
    };

    // Guardar el token en localStorage
    localStorage.setItem("auth_token", response.token);

    return response;
  }

  async logout(): Promise<void> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 200));
    
    this.currentUser = null;
    localStorage.removeItem("auth_token");
  }

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("No token found");
    }

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));

    // Extraer el ID del usuario del token mock
    const tokenParts = token.split("-");
    if (tokenParts.length < 3) {
      throw new Error("Invalid token");
    }

    const userId = `${tokenParts[2]}-${tokenParts[3]}`;
    const user = MOCK_USERS.find(u => u.id === userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    this.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return this.currentUser;
  }

  async refreshToken(): Promise<LoginResponse> {
    const currentUser = await this.getCurrentUser();
    
    return {
      token: `mock-token-${currentUser.id}-${Date.now()}`,
      user: currentUser,
    };
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setAuthHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}