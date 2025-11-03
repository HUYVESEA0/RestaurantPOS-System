export interface User {
  id: number;
  username: string;
  email: string;
fullName: string;
  phoneNumber?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  expiresAt: string;
}

export interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
