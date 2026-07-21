export interface AdminUser {
  id: number;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: AdminUser;
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}
