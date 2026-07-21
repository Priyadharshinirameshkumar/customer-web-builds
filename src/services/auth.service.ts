import api from "../api/api";
import type { LoginResponse, MeResponse } from "../types/auth.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAdmin = async (credentials: LoginCredentials) => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

export const getAuthenticatedAdmin = async () => {
  const response = await api.get<MeResponse>("/auth/me");
  return response.data;
};
