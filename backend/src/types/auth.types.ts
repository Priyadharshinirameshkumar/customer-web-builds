export interface AdminJwtPayload {
  adminId: number;
  email: string;
}

export interface AuthenticatedAdmin {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}
