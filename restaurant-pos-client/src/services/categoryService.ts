import apiClient from './api';
import { Category } from '../types';

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/Categories');
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/Categories/${id}`);
    return response.data;
  },

  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await apiClient.post<Category>('/Categories', category);
    return response.data;
  },

  update: async (id: number, category: Category): Promise<void> => {
    await apiClient.put(`/Categories/${id}`, category);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Categories/${id}`);
  },
};
