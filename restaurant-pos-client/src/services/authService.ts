import apiClient from './api';
import { LoginRequest, RegisterRequest, LoginResponse, User } from '../types/auth';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/Auth/Login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  return response.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/Auth/Register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): LoginResponse | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
  return null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
  const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/Auth/Users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/Auth/Users/${id}`);
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/Auth/ChangePassword', { oldPassword, newPassword });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/Auth/ForgotPassword', { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiClient.post('/Auth/ResetPassword', { token, newPassword });
  },

  validateResetToken: async (token: string): Promise<void> => {
await apiClient.get(`/Auth/ValidateResetToken/${token}`);
  },
};
