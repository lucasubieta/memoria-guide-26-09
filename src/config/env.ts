// Environment configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
// Default to mock in development when no environment variable is set
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";