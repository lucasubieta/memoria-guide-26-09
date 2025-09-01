import { HttpClient } from "@/lib/http/client";
import { API_BASE_URL } from "@/config/env";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "coordinador" | "profesor";
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "coordinador" | "profesor";
}

class AuthService {
  private client: HttpClient;

  constructor() {
    // Usar la configuración de API ya establecida
    this.client = new HttpClient(API_BASE_URL);
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>("/auth/login", credentials);
    
    // Guardar el token en localStorage
    if (response.token) {
      localStorage.setItem("auth_token", response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.client.post("/auth/logout");
    } finally {
      // Limpiar el token independientemente de la respuesta del servidor
      localStorage.removeItem("auth_token");
    }
  }

  async getCurrentUser(): Promise<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No token found");
    }

    return this.client.get<User>("/auth/me");
  }

  async refreshToken(): Promise<LoginResponse> {
    return this.client.post<LoginResponse>("/auth/refresh");
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para configurar el token en las peticiones HTTP
  setAuthHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
