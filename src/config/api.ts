// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;

// Roles del sistema
export const USER_ROLES = {
  COORDINADOR: 'coordinador',
  PROFESOR: 'profesor'
} as const;

// Estados de las guías
export const GUIA_STATES = {
  BORRADOR: 'borrador',
  COMPLETADA: 'completada',
  PUBLICADA: 'publicada'
} as const;

// Rutas de redirección por rol
export const ROLE_REDIRECTS = {
  [USER_ROLES.COORDINADOR]: '/dashboard',
  [USER_ROLES.PROFESOR]: '/profesores'
} as const;