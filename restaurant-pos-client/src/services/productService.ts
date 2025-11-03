import apiClient from './api';
import { Product } from '../types';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/Products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/Products/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/Products/Category/${categoryId}`);
    return response.data;
  },

  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await apiClient.post<Product>('/Products', product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>): Promise<void> => {
    await apiClient.put(`/Products/${id}`, product);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Products/${id}`);
  },
};
